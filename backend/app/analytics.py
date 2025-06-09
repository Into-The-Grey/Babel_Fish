from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from .db import PayloadTable, DocTable, MediaTable
from . import db

router = APIRouter()


@router.get("/analytics/summary")
async def analytics_summary(session: AsyncSession = Depends(db.get_db)):
    # Counts
    payload_count = (
        await session.execute(select(func.count()).select_from(PayloadTable))
    ).scalar()
    docs_count = (
        await session.execute(select(func.count()).select_from(DocTable))
    ).scalar()
    media_count = (
        await session.execute(select(func.count()).select_from(MediaTable))
    ).scalar()
    # Storage (media size)
    media_size = (
        await session.execute(select(func.coalesce(func.sum(MediaTable.size), 0)))
    ).scalar()
    return {
        "payload_count": payload_count,
        "docs_count": docs_count,
        "media_count": media_count,
        "media_total_size_bytes": media_size,
    }


@router.get("/analytics/trends")
async def analytics_trends():
    # TODO: Return real time-series from logs/history later.
    # For now, fake 2 weeks of trend data for each resource.
    from datetime import datetime, timedelta

    today = datetime.utcnow().date()
    trends = []
    for i in range(14):
        day = today - timedelta(days=13 - i)
        trends.append(
            {
                "date": day.isoformat(),
                "payloads": 10 + i,  # replace with real queries
                "docs": 20 + (i % 5),  # replace with real queries
                "media": 5 + (i % 3),  # replace with real queries
            }
        )
    return trends


@router.get("/analytics/breakdown")
async def analytics_breakdown():
    # TODO: Return breakdowns (by tag, type, etc) later.
    # For now, return dummy data.
    return {
        "payload_platforms": {"windows": 12, "mac": 4, "linux": 6},
        "media_types": {"image": 18, "video": 6, "audio": 2},
        "doc_types": {"pdf": 22, "epub": 0, "md": 1},
    }
