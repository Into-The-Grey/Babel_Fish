from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from . import crud, models, db
from fastapi.responses import PlainTextResponse, JSONResponse
from .main import get_current_username  # Import the auth dependency

router = APIRouter()


@router.get("/payloads", response_model=List[models.Payload])
async def list_payloads(
    q: Optional[str] = Query(None, description="Full-text search query"),
    tags: Optional[List[str]] = Query(None, description="Filter by tags"),
    platform: Optional[str] = Query(None, description="Filter by platform"),
    author: Optional[str] = Query(None, description="Filter by author"),
    session: AsyncSession = Depends(db.get_db),
):
    return await crud.search_payloads(session, q, tags, platform, author)


@router.post("/payloads", response_model=models.Payload)
async def add_payload(
    payload: models.PayloadCreate,
    session: AsyncSession = Depends(db.get_db),
    username: str = Depends(get_current_username),
):
    # Check for duplicate payloads
    existing_payload = await crud.get_payload_by_title(session, payload.title)
    if existing_payload:
        raise HTTPException(
            status_code=409, detail="A payload with this title already exists"
        )
    return await crud.create_payload(session, payload)


@router.get("/payloads/{payload_id}", response_model=models.Payload)
async def get_payload(payload_id: int, session: AsyncSession = Depends(db.get_db)):
    return await crud.get_payload_by_id(session, payload_id)


@router.get("/payloads/export", response_class=JSONResponse)
async def export_payloads(
    q: Optional[str] = Query(None),
    tags: Optional[List[str]] = Query(None),
    platform: Optional[str] = Query(None),
    author: Optional[str] = Query(None),
    session: AsyncSession = Depends(db.get_db),
    username: str = Depends(get_current_username),
):
    payloads = await crud.search_payloads(session, q, tags, platform, author)

    # Convert ORM models to dicts for JSON
    def serialize(payload):
        return {
            "id": payload.id,
            "title": payload.title,
            "description": payload.description,
            "code": payload.code,
            "tags": payload.tags,
            "platform": payload.platform,
            "author": payload.author,
            "created_at": (
                payload.created_at.isoformat() if payload.created_at else None
            ),
            "updated_at": (
                payload.updated_at.isoformat() if payload.updated_at else None
            ),
        }

    return JSONResponse(content=[serialize(p) for p in payloads])


@router.post("/payloads/import")
async def import_payloads(
    payloads: List[models.PayloadCreate],
    session: AsyncSession = Depends(db.get_db),
    username: str = Depends(get_current_username),
):
    imported = []
    for payload in payloads:
        try:
            obj = await crud.create_payload(session, payload)
            imported.append(obj)
        except HTTPException as e:
            # You can log or track duplicates here, skip or handle as needed
            continue
    return {"imported": [p.id for p in imported]}


@router.get("/payloads/{payload_id}/download")
async def download_payload(payload_id: int, session: AsyncSession = Depends(db.get_db)):
    payload = await crud.get_payload_by_id(session, payload_id)
    if payload is None:
        raise HTTPException(status_code=404, detail="Payload not found")
    return PlainTextResponse(payload.code, media_type="text/plain")


@router.delete("/payloads/{payload_id}")
async def soft_delete_payload(
    payload_id: int,
    session: AsyncSession = Depends(db.get_db),
    username: str = Depends(get_current_username),
):
    payload = await crud.get_payload_by_id(session, payload_id)
    if not payload:
        raise HTTPException(status_code=404, detail="Payload not found")
    payload.deleted = True
    await session.commit()
    return {"detail": "Payload marked as deleted"}
