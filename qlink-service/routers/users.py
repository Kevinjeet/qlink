from fastapi import APIRouter
from queries import UsersIn

router = APIRouter()



@router.post("/users")
def create_user(user: UsersIn):
    return user
