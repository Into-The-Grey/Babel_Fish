from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Text, ARRAY, TIMESTAMP, text, Boolean
from sqlalchemy.orm import declarative_base

Base = declarative_base()

DATABASE_URL = "postgresql+asyncpg://ncacord:zelda@localhost/babel_fish"


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


engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
