import datetime

from sqlalchemy import Column, ForeignKey,Integer,String,DateTime
from database import Base

class Users(Base):
    __tablename__ = "users"
    id= Column(Integer,primary_key=True,index=True)
    username= Column(String,unique=True)
    hashed_password=Column(String)


class Categories(Base):
    __tablename__ = "categories"
    id = Column(Integer,primary_key=True,index=True)
    category_name = Column(String,unique=True)
    
class Expenses(Base):
    __tablename__ = "expenses"
    id= Column(Integer,primary_key=True,index=True)
    user_id = Column(Integer,ForeignKey("users.id"),nullable=False)
    category_id = Column(Integer,ForeignKey("categories.id"),nullable=False)
    expense_name = Column(String,nullable=True)
    expense_amount = Column(Integer,nullable=False)
    description = Column(String,nullable=True)
    date = Column(DateTime,nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), nullable=False)