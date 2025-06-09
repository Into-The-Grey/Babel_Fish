# app/media.py

import os
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import StreamingResponse, FileResponse
from typing import List
from . import crud, models, db

router = APIRouter()
MEDIA_FOLDER = os.environ.get("MEDIA_FOLDER", "data/media")
os.makedirs(MEDIA_FOLDER, exist_ok=True)


@router.post("/media", response_model=List[models.Media])
async def upload_media(
    files: List[UploadFile] = File(...),
    tags: List[str] = Query(None),
    author: str = Query(None),
    description: str = Query(None),
    session: AsyncSession = Depends(db.get_db),
):
    saved_media = []
    for f in files:
        data = await f.read()
        size = len(data)
        media_type = f.content_type
        storage_type = "db" if size <= 100 * 1024 * 1024 else "file"
        file_path = None
        if storage_type == "file":
            safe_filename = (f.filename or "unnamed_upload").replace("..", "_")
            file_path = os.path.join(MEDIA_FOLDER, safe_filename)
            try:
                with open(file_path, "wb") as out:
                    out.write(data)
            except Exception as e:
                # LOG: Log error when file write fails
                # logger.error(f"Failed to write media file '{file_path}': {e}")
                raise HTTPException(
                    status_code=500, detail="Failed to save media file to disk"
                ) from e
            data_to_save = None
            # LOG: Log info about storing large file on disk
            # logger.info(f"Stored large file '{safe_filename}' on disk at '{file_path}'")
        else:
            data_to_save = data
            # LOG: Log info about storing small file in DB
            # logger.info(f"Stored file '{f.filename}' in database (size: {size} bytes)")
        db_media = await crud.create_media(
            session,
            filename=f.filename,
            media_type=media_type,
            data=data_to_save,
            size=size,
            tags=tags,
            author=author,
            description=description,
            storage_type=storage_type,
            file_path=file_path,
        )
        saved_media.append(
            models.Media(
                id=db_media.id,  # type: ignore
                filename=db_media.filename,  # type: ignore
                media_type=db_media.media_type,  # type: ignore
                tags=db_media.tags,  # type: ignore
                author=db_media.author,  # type: ignore
                description=db_media.description,  # type: ignore
                size=db_media.size,  # type: ignore
                storage_type=db_media.storage_type,  # type: ignore
                uploaded_at=db_media.uploaded_at,  # type: ignore
                url=f"/api/media/{db_media.id}/download",
            )
        )
    return saved_media


@router.get("/media", response_model=List[models.Media])
async def list_media(
    search: str = Query(None),
    tags: List[str] = Query(None),
    media_type: str = Query(None),
    session: AsyncSession = Depends(db.get_db),
):
    media_items = await crud.list_media(session, search, tags, media_type)
    # LOG: Optionally log access to the media listing
    # logger.info(f"Media list accessed (search={search}, tags={tags}, media_type={media_type})")
    return [
        models.Media(
            id=m.id,  # type: ignore
            filename=m.filename,  # type: ignore
            media_type=m.media_type,  # type: ignore
            tags=m.tags,  # type: ignore
            author=m.author,  # type: ignore
            description=m.description,  # type: ignore
            size=m.size,  # type: ignore
            storage_type=m.storage_type,  # type: ignore
            uploaded_at=m.uploaded_at,  # type: ignore
            url=f"/api/media/{m.id}/download",
        )
        for m in media_items
    ]


@router.get("/media/{media_id}/download")
async def download_media(media_id: int, session: AsyncSession = Depends(db.get_db)):
    media = await crud.get_media(session, media_id)
    if not media or (hasattr(media, "deleted") and media.deleted is True):
        # LOG: Log warning when a requested media is not found or deleted
        # logger.warning(f"Media ID {media_id} not found or marked as deleted")
        raise HTTPException(status_code=404, detail="Media not found")
    if getattr(media, "storage_type", None) == "db":
        data = getattr(media, "data", None)
        if not isinstance(data, bytes):
            # LOG: Log error when media data in DB is not available
            # logger.error(f"Media ID {media_id} in DB has no bytes data")
            raise HTTPException(
                status_code=500,
                detail="Media data is not available or not in bytes format",
            )
        media_type_value = (
            media.media_type
            if isinstance(media.media_type, str)
            else getattr(media.media_type, "value", None)
        )
        return StreamingResponse(
            iter([data]),
            media_type=media_type_value,
            headers={"Content-Disposition": f'attachment; filename="{media.filename}"'},
        )
    if getattr(media, "storage_type", None) == "file":
        file_path_value = getattr(media, "file_path", None)
        if not file_path_value or not os.path.exists(file_path_value):
            # LOG: Log error when file is missing on disk
            # logger.error(f"Media file '{file_path_value}' missing for media ID {media_id}")
            raise HTTPException(status_code=500, detail="Media file missing on disk")
        media_type_value = (
            media.media_type
            if isinstance(media.media_type, str)
            else getattr(media.media_type, "value", None)
        )
        return FileResponse(
            file_path_value,
            media_type=media_type_value,
            filename=(
                str(media.filename)
                if not isinstance(media.filename, str) and media.filename is not None
                else media.filename
            ),
        )
    # LOG: Log error for unknown storage type
    # logger.error(f"Unknown storage type for media ID {media_id}")
    raise HTTPException(status_code=500, detail="Unknown storage type")


@router.delete("/media/{media_id}")
async def soft_delete_media(media_id: int, session: AsyncSession = Depends(db.get_db)):
    # LOG: Log soft delete operation for audit trail
    # logger.info(f"Soft deleted media ID {media_id}")
    return await crud.soft_delete_media(session, media_id)
