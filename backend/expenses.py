from fastapi import APIRouter,HTTPException,Depends
from pydantic import BaseModel
from starlette import status

from dependency import db_dependency
from models import Expenses,Categories
from datetime import datetime, timedelta,date
from dateutil.relativedelta import relativedelta
from typing import Annotated
from auth import get_current_user


user_dependency  = Annotated[dict,Depends(get_current_user)]

router = APIRouter(prefix="/expenses",tags=["expenses"])

class CreateExpenseRequest(BaseModel):
    
    category_id: int
    expense_name: str
    expense_amount: int
    description: str | None = None
    date: datetime



    

@router.post("/", status_code=status.HTTP_201_CREATED)

async def create_expense(
    user: user_dependency,
    db:db_dependency,
    create_expense_request: CreateExpenseRequest):

    existing_category = db.query(Categories).filter(Categories.id == create_expense_request.category_id).first()
    if not existing_category:
        raise HTTPException(status_code=404, detail="Category not found")

    create_expense_model =  Expenses(
        user_id = user.get("id"),
        category_id = create_expense_request.category_id,
        expense_name = create_expense_request.expense_name,
        expense_amount = create_expense_request.expense_amount,
        description = create_expense_request.description,
        date = create_expense_request.date,
        
    )

    db.add(create_expense_model)
    db.commit()

    return {"message": "Expense created successfully"}


@router.get("/",status_code=status.HTTP_200_OK)
async def get_expenses( user: user_dependency, 
                       db: db_dependency,
                       filter: str | None =None,
                       start_date: date | None= None,
                       end_date: date | None =None):
    user_id= user.get("id")
    now = datetime.now()

    filter_map = {
        "pastweek":now -relativedelta(weeks=1),
        "past_month":now -relativedelta(months=1),
        "3_month":now -relativedelta(months=3),
    }

    query = db.query(Expenses).filter(Expenses.user_id == user_id)

    if filter and (start_date or end_date):
        raise HTTPException(status_code=400, detail="Use either filter or date range, not both")
    

    if filter in filter_map:
      
        query = query.filter(Expenses.date >= filter_map[filter])

    elif filter:
        raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid filter"
        )

    elif start_date or end_date:
        if start_date:
             query = query.filter(Expenses.date >= start_date)
        if end_date:
           query = query.filter(Expenses.date <= end_date)

    
    return query.order_by(Expenses.date.desc()).all()


    
@router.get("/{expense_id}",status_code=status.HTTP_200_OK)
def read_expense(user:user_dependency,db:db_dependency,expense_id:int):

    expense = (db.query(Expenses).filter(Expenses.id == expense_id).
               filter(Expenses.user_id == user.get("id")).first())
    

    if expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    
    return expense



class UpdateExpenseRequest(BaseModel):
    category_id: int
    expense_name: str
    expense_amount: int
    description: str | None=None
    date:datetime

@router.put("/{expense_id}",status_code=status.HTTP_200_OK)
def update_expense(user:user_dependency,db:db_dependency,expense_id:int,
                   update_expense_request:UpdateExpenseRequest):

    expense = (db.query(Expenses).filter(Expenses.id == expense_id )
                .filter(Expenses.user_id == user.get("id")).first())
    
    if expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense Not Found"
        )
    category = (db.query(Categories).filter(Categories.id == update_expense_request.category_id).first())

    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    
    expense.category_id=update_expense_request.category_id
    expense.expense_name=update_expense_request.expense_name
    expense.expense_amount=update_expense_request.expense_amount
    expense.description=update_expense_request.description
    expense.date=update_expense_request.date

    
    db.commit()
    return {"message": "Expense updated successfully"}


@router.delete("/{expense_id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_expense(user:user_dependency,db:db_dependency,expense_id:int):

    expense = (db.query(Expenses).filter(Expenses.id == expense_id)
               .filter(Expenses.user_id == user.get("id")).first())
    
    if expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    
    db.delete(expense)
    db.commit()
