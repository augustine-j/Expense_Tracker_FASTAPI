from fastapi import FastAPI, Depends, HTTPException, status
from datetime import datetime,timedelta,timezone
from typing import Optional
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, Field
from jose import jwt, JWTError
from passlib.context import CryptContext
from contextlib import asynccontextmanager
from database import init_db, get_user, create_user

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app= FastAPI(title="JWT Auth", lifespan=lifespan)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")       # token comes from/login

@app.get("/")

def root():
    return {"message":"Hello World"}