from fastapi import APIRouter,HTTPException
from pydantic import BaseModel
from starlette import status
from dependency import db_dependency
from models import Categories

router = APIRouter(prefix="/categories",tags=["categories"])

class CreateCategoryRequest(BaseModel):
    category_name: str

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_category(db: db_dependency,create_category_request: CreateCategoryRequest):
    
    existing_category = db.query(Categories.category_name).filter(
        Categories.category_name == create_category_request.category_name).first()
    if existing_category:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category already exists")
    
    create_category_model = Categories(
        category_name = create_category_request.category_name 
    )

    db.add(create_category_model)
    db.commit()

    return {"message": "Category created successfully"}


@router.get("/",status_code=status.HTTP_200_OK)

def get_category(db:db_dependency):
    query = db.query(Categories).all()
    return query