import os
from dotenv import load_dotenv

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ARRAY,
    TIMESTAMP,
    text,
    Boolean,
    LargeBinary,
)
from sqlalchemy.orm import declarative_base

# --- Load environment and DB URL ---
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set")

# --- Single Base declaration ---
Base = declarative_base()


# --- Tables ---
class PayloadTable(Base):
    __tablename__ = "payloads"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    code = Column(Text, nullable=False)
    tags = Column(ARRAY(String))
    platform = Column(String(64))
    author = Column(String(100))
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("NOW()"))
    updated_at = Column(
        TIMESTAMP(timezone=True), server_default=text("NOW()"), onupdate=text("NOW()")
    )
    deleted = Column(Boolean, default=False)


class DocTable(Base):
    __tablename__ = "docs"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    filepath = Column(String(512), nullable=False)
    uploaded_at = Column(TIMESTAMP(timezone=True), server_default=text("NOW()"))


class MediaTable(Base):
    __tablename__ = "media"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    media_type = Column(String(50), nullable=False)
    storage_type = Column(String(10), nullable=False, default="db")
    size = Column(Integer, nullable=False)
    tags = Column(ARRAY(String))
    author = Column(String(100))
    description = Column(Text)
    uploaded_at = Column(TIMESTAMP(timezone=True), server_default=text("NOW()"))
    deleted = Column(Boolean, default=False)
    data = Column(LargeBinary, nullable=True)
    file_path = Column(String(512), nullable=True)


# --- Async engine/session ---
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
