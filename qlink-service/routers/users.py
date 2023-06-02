from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
from typing import Union, List, Optional
from queries.users import (
    UsersIn,
    UserRepository,
    UsersOut,
    Error,
    DuplicateAccountError,
    EditIn,
)
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


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: UsersOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/users", response_model=AccountToken | HttpError)
async def create_user(
    user: UsersIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
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
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(user_id)


@router.put("/users/{username}", response_model=Union[UsersOut, Error])
async def update_user_(
    username: str,
    user: EditIn,
    response: Response,
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[UsersOut, Error]:
    if user.password:
        hashed_password = authenticator.hash_password(user.password)
    else:
        hashed_password = "None"
    print("hash:", hashed_password)
    message = repo.edit(username, user, hashed_password)

    if message == {"message": "ID doesn't exist"}:
        response.status_code = 404
    return message


@router.get("/users", response_model=Union[List[UsersOut], Error])
def get_all(
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: UserRepository = Depends(),
):
    message = repo.get_all()
    if message == {"message": "Could not get all users"}:
        response.status_code = 404
    return message


@router.get("/users/{username}", response_model=Optional[UsersOut])
def get_one(
    username: str,
    response: Response,
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UsersOut:
    user = repo.get_one(username)
    if user is None:
        response.status_code = 404
    return user
