from fastapi import APIRouter, Depends, Response, HTTPException, status, Request
from typing import Union, List, Optional
from queries.users import UsersIn, UserRepository, UsersOut, Error, DuplicateAccountError
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel



class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: UsersOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.post("/users", response_model=AccountToken | HttpError)
async def create_user(user: UsersIn, request: Request, response:Response,
                repo: UserRepository = Depends()):
    hashed_password = authenticator.hash_password(user.password)
    try:
        account = repo.create(user, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an user with those credentials",
        )
    form = AccountForm(username=user.username, password=user.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
    # message = repo.create(user)
    # if message == {'message': 'could not create'}:
    #     response.status_code = 404
    # return message


@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    repo: UserRepository = Depends()
) -> bool:
    return repo.delete(user_id)

@router.put("/users/{id}", response_model = Union[UsersOut, Error])
def update_user(
    id: int,
    user: UsersIn,
    response:Response,
    repo: UserRepository = Depends(),
) -> Union[UsersOut, Error]:
    message = repo.edit(id, user)
    if message == {"messaage": "ID doesn't exist"}:
        response.status_code = 404
    return message

@router.get("/users", response_model=Union[List[UsersOut], Error])
def get_all(response:Response, repo: UserRepository = Depends(),):
    message = repo.get_all()
    if message == {'message': 'could not get all users'}:
        response.status_code = 404
    return message

@router.get("/users/{id}", response_model=Optional[UsersOut])
def get_one(
    id: int,
    response:Response,
    repo:UserRepository=Depends()
)->UsersOut:
    user= repo.get_one(id)
    if user is None:
        response.status_code=404
    return user
