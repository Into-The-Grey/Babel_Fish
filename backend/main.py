# main.py (move to backend root!)

from fastapi import FastAPI, Depends, status, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import secrets

from app.payloads import router as payloads_router
from app.docs import router as docs_router

app = FastAPI()
security = HTTPBasic()


# Auth dependency (import this in your routers for protected endpoints)
def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "ncacord")
    correct_password = secrets.compare_digest(credentials.password, "zelda")
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


# (Optional) test/protected route
@app.get("/api/protected")
def protected_route(username: str = Depends(get_current_username)):
    return {"message": f"Hello, {username}!"}


# Include all resource routers, always under /api
app.include_router(payloads_router, prefix="/api")
app.include_router(docs_router, prefix="/api")
# (future: media_router, logs_router, etc.)
