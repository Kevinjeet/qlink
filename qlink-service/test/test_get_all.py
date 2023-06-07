from pydantic import BaseModel
from typing import Optional
from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository
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

class FakeUserRepository:
    def get_all(self):
        return []

def fake_user():
    user = UsersOut(id=1,
        username="KG",
        first_name="Kev",
        last_name="G",
        date_of_birth="01/01/1111",
        email="test@test.com",
        phone_number=5555555,
        gender="male",
        profile_picture_url="string",
        other_profile="string",
        pronouns="him",
        location="NA",
        looking_for="everybody",
        about_me="No",
        matches="string",
        messages="string",
        interests="string",
        blocked="string",
    )
    return user.__dict__

def test_get_all():
    #Arrange
    app.dependency_overrides[UserRepository] = FakeUserRepository
    app.dependency_overrides[
        authenticator.get_current_account_data] = fake_user
    #Act
    response = client.get("/users")

    #Clean up
    app.dependency_overrides = {}

    #Assert
    assert response.status_code == 200
    assert response.json() == []
