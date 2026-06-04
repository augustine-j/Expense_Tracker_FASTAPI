from typing import Annotated, List

import uvicorn
from fastapi import Depends, FastAPI, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

import models
from auth import get_current_user, router
from database import SessionLocal, engine
from dependency import db_dependency as db_dependency

from categories import router as categories_router
from expenses import router as expenses_router


app = FastAPI()
app.include_router(router)
app.include_router(categories_router)
app.include_router(expenses_router)

models.Base.metadata.create_all(bind=engine)
user_dependency = Annotated[dict, Depends(get_current_user)]


@app.get("/",status_code=status.HTTP_200_OK)
async def user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")
    return {"User": user}

