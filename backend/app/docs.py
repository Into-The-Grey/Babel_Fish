# app/docs.py

import os
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import FileResponse
from typing import List
from . import crud, models, db

router = APIRouter()
DOCS_FOLDER = os.path.abspath("data/docs")

os.makedirs(DOCS_FOLDER, exist_ok=True)

def get_file_path(filename: str) -> str:
    # Prevent directory traversal
    safe_name = filename.replace("..", "_").replace("/", "_")
    return os.path.join(DOCS_FOLDER, safe_name)

@router.get("/docs", response_model=List[models.Doc])
async def list_docs(
    search: str = Query(None, description="Search by filename"),
    session: AsyncSession = Depends(db.get_db),
):
    docs = await crud.list_docs(session, search)
    # Build full download URLs for the frontend
    return [
        models.Doc(
            id=getattr(d, "id") if not isinstance(d.id, int) else d.id,
            filename=d.filename if isinstance(d.filename, str) else getattr(d, "filename"),
            url=f"/api/docs/{getattr(d, 'id') if not isinstance(d.id, int) else d.id}/download",
            uploaded_at=getattr(d, "uploaded_at"),
        )
        for d in docs
    ]

@router.post("/docs", response_model=List[models.Doc])
async def upload_docs(
    files: List[UploadFile] = File(...),
    session: AsyncSession = Depends(db.get_db),
):
    saved_docs = []
    for f in files:
        if not f.filename:
            raise HTTPException(status_code=400, detail="Filename is required for all uploaded files.")
        path = get_file_path(f.filename)
        # Save file to disk
        with open(path, "wb") as out:
            content = await f.read()
            out.write(content)
        db_doc = await crud.create_doc(session, f.filename, path)
        saved_docs.append(
            models.Doc(
                id=getattr(db_doc, "id"),
                filename=getattr(db_doc, "filename"),
                url=f"/api/docs/{getattr(db_doc, 'id')}/download",
                uploaded_at=getattr(db_doc, "uploaded_at"),
            )
        )
    return saved_docs

@router.delete("/docs/{doc_id}")
async def delete_doc(
    doc_id: int, session: AsyncSession = Depends(db.get_db)
):
    return await crud.delete_doc(session, doc_id)

@router.get("/docs/{doc_id}/download")
async def download_doc(
    doc_id: int, session: AsyncSession = Depends(db.get_db)
):
    doc = await crud.get_doc(session, doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Doc not found")
    return FileResponse(str(doc.filepath), filename=str(doc.filename), media_type="application/pdf")
