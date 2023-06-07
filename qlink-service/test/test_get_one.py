from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository
from pydantic import BaseModel
from typing import Optional
from authenticator import authenticator

client = TestClient(app)


class UsersOut(BaseModel):
    id: int
    username: str
    first_name: Optional[str]
    last_name: Optional[str]
    date_of_birth: Optional[str]
    email: Optional[str]
    phone_number: Optional[int]
    gender: Optional[str]
    profile_picture_url: Optional[str]
    other_picture: Optional[str]
    pronouns: Optional[str]
    location: Optional[str]
    looking_for: Optional[str]
    about_me: Optional[str]
    matches: Optional[str]
    messages: Optional[str]
    interests: Optional[str]
    blocked: Optional[str]


user = UsersOut(
    id=1,
    username="Rob",
    first_name="Robert",
    last_name="V",
    date_of_birth="12/30/1994",
    email="test",
    phone_number=111111,
    gender="male",
    profile_picture_url="string",
    other_picture="string",
    pronouns="string",
    location="string",
    looking_for="string",
    about_me="string",
    matches="string",
    messages="string",
    interests="string",
    blocked="string",
)


class EmptyUserRepository:
    def get_one(self, username):
        return user


def fake_user():
    return user


def test_get_one():
    app.dependency_overrides[UserRepository] = EmptyUserRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_user

    response = client.get("/users/Rob")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == user
