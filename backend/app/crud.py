from sqlalchemy import select, or_, func
from sqlalchemy.ext.asyncio import AsyncSession
from .db import PayloadTable
from .models import PayloadCreate
from fastapi import HTTPException
from sqlalchemy.future import select
from . import models

async def search_payloads(session, q=None, tags=None, platform=None, author=None):
    stmt = select(PayloadTable)
    if q:
        ts_vector = func.to_tsvector(
            "english",
            PayloadTable.title
            + " "
            + func.coalesce(PayloadTable.description, "")
            + " "
            + PayloadTable.code,
        )
        stmt = stmt.where(ts_vector.match(q))
    if tags:
        stmt = stmt.where(PayloadTable.tags.overlap(tags))
    if platform:
        stmt = stmt.where(PayloadTable.platform == platform)
    if author:
        stmt = stmt.where(PayloadTable.author == author)
    stmt = stmt.order_by(PayloadTable.created_at.desc())
    result = await session.execute(stmt)
    return result.scalars().all()


async def get_payload_by_id(session, payload_id: int):
    result = await session.execute(
        select(PayloadTable).where(PayloadTable.id == payload_id)
    )
    return result.scalar_one_or_none()

async def get_payload_by_title(session: AsyncSession, title: str):
    result = await session.execute(
        select(PayloadTable).where(PayloadTable.title == title)
    )
    return result.scalars().first()

async def create_payload(session: AsyncSession, payload: PayloadCreate):
    existing = await session.execute(
        select(PayloadTable).where(
            or_(PayloadTable.title == payload.title, PayloadTable.code == payload.code)
        )
    )
    if existing.scalar():

        raise HTTPException(
            status_code=409, detail="Duplicate payload: Title or code already exists."
        )
    db_payload = PayloadTable(**payload.dict())
    session.add(db_payload)
    await session.commit()
    await session.refresh(db_payload)
    return db_payload


import os
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from .db import DocTable
from fastapi import HTTPException

async def create_doc(session: AsyncSession, filename: str, filepath: str):
    db_doc = DocTable(filename=filename, filepath=filepath)
    session.add(db_doc)
    await session.commit()
    await session.refresh(db_doc)
    return db_doc

async def list_docs(session: AsyncSession, search: str | None = None):
    stmt = select(DocTable)
    if search:
        stmt = stmt.where(DocTable.filename.ilike(f"%{search}%"))
    stmt = stmt.order_by(DocTable.uploaded_at.desc())
    result = await session.execute(stmt)
    return result.scalars().all()

async def get_doc(session: AsyncSession, doc_id: int):
    result = await session.execute(select(DocTable).where(DocTable.id == doc_id))
    return result.scalar_one_or_none()

async def delete_doc(session: AsyncSession, doc_id: int):
    doc = await get_doc(session, doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Doc not found")
    os.remove(str(doc.filepath))  # Remove file from disk
    await session.delete(doc)
    await session.commit()
    return {"detail": "Doc deleted"}


import os
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from .db import MediaTable
from fastapi import HTTPException

MEDIA_CUTOFF = 100 * 1024 * 1024  # 100MB


async def create_media(
    session: AsyncSession,
    filename,
    media_type,
    data,
    size,
    tags=None,
    author=None,
    description=None,
    storage_type="db",
    file_path=None,
):
    db_media = MediaTable(
        filename=filename,
        media_type=media_type,
        storage_type=storage_type,
        size=size,
        tags=tags or [],
        author=author,
        description=description,
        data=data if storage_type == "db" else None,
        file_path=file_path if storage_type == "file" else None,
    )
    session.add(db_media)
    await session.commit()
    await session.refresh(db_media)
    return db_media


from typing import Optional, List

async def list_media(
    session: AsyncSession, search: Optional[str] = None, tags: Optional[List[str]] = None, media_type: Optional[str] = None
):
    stmt = select(MediaTable).where(
        MediaTable.deleted == False
    ) # pylint: disable=singleton-comparison

    if search:
        stmt = stmt.where(MediaTable.filename.ilike(f"%{search}%"))
    if tags:
        stmt = stmt.where(MediaTable.tags.overlap(tags))
    if media_type:
        stmt = stmt.where(MediaTable.media_type == media_type)
    stmt = stmt.order_by(MediaTable.uploaded_at.desc())
    result = await session.execute(stmt)
    return result.scalars().all()


async def get_media(session: AsyncSession, media_id: int):
    result = await session.execute(select(MediaTable).where(MediaTable.id == media_id))
    return result.scalar_one_or_none()


async def soft_delete_media(session: AsyncSession, media_id: int):
    media = await get_media(session, media_id)
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    setattr(media, "deleted", True)
    await session.commit()
    return {"detail": "Media marked as deleted"}
