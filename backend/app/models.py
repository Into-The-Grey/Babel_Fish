from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PayloadBase(BaseModel):
    title: str
    description: Optional[str] = None
    code: str
    tags: Optional[List[str]] = []
    platform: Optional[str] = None
    author: Optional[str] = None

class PayloadCreate(PayloadBase):
    pass

class Payload(PayloadBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

from pydantic import BaseModel
from datetime import datetime


class DocBase(BaseModel):
    filename: str


class Doc(DocBase):
    id: int
    url: str
    uploaded_at: datetime

    class Config:
        orm_mode = True


class DocList(BaseModel):
    docs: list[Doc]



from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class MediaBase(BaseModel):
    filename: str
    media_type: str
    tags: Optional[List[str]] = []
    author: Optional[str] = None
    description: Optional[str] = None


class MediaCreate(MediaBase):
    pass


class Media(MediaBase):
    id: int
    size: int
    storage_type: str
    uploaded_at: datetime
    url: str

    class Config:
        orm_mode = True
