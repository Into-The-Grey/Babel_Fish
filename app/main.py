from fastapi import FastAPI, Depends, status, HTTPException, APIRouter
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import secrets

app = FastAPI()
security = HTTPBasic()
router = APIRouter()


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


@router.get("/protected")
def protected_route(username: str = Depends(get_current_username)):
    return {"message": f"Hello, {username}!"}


app.include_router(router)
