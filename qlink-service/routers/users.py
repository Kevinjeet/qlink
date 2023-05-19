from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.users import UsersIn, UserRepository, UsersOut, Error

router = APIRouter()



@router.post("/users", response_model=Union[UsersOut, Error])
def create_user(user: UsersIn, response:Response,
                repo: UserRepository = Depends()) -> UsersOut:
    message = repo.create(user)
    if message == {'message': 'could not create'}:
        response.status_code = 404
    return message

@router.put("/users/{id}", response_model = Union[UsersOut, Error])
def update_user(
    id: int,
    user: UsersIn,
    repo: UserRepository = Depends(),
) -> Union[UsersOut, Error]:
    return repo.edit(id, user)

@router.get("/users", response_model=Union[List[UsersOut], Error])
def get_all(repo: UserRepository = Depends(),):
    # message = repo.get_all()
    # if message == {'message': 'could not create'}:
    #     response.status_code = 404
    return repo.get_all()
