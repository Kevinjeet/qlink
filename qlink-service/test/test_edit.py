from pydantic import BaseModel
from typing import Optional, List
from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository, EditIn, UsersOut
from authenticator import authenticator


client = TestClient(app)
start_user = []


class MockAuthenticator:
    def get_current_account_data(self):
        pass


class DummyAccount:
    def edit(self, username, user, hashed_password):
        username = "test"
        return {
            "id": 1,
            "username": username,
            "password": hashed_password,
            **user.dict(),
        }


def test_edit():
    app.dependency_overrides[UserRepository] = DummyAccount
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = MockAuthenticator
    json = {
        "password": "dummy",
        "first_name": "Dummy",
        "last_name": "Dumdum",
        "date_of_birth": "04/21/13",
        "email": "dummy@dummy.com",
        "phone_number": 421131325,
        "gender": "mystery",
        "profile_picture_url": "http://google.com",
        "other_picture": "string",
        "pronouns": "they/them",
        "location": "Nah",
        "looking_for": "everybody",
        "about_me": "No",
        "matches": "dummy",
        "messages": "dummy",
        "interests": "dummy",
        "blocked": "dummy",
    }
    expected = {
        "id": 1,
        "username": "test",
        "first_name": "Dummy",
        "last_name": "Dumdum",
        "date_of_birth": "04/21/13",
        "email": "dummy@dummy.com",
        "phone_number": 421131325,
        "gender": "mystery",
        "profile_picture_url": "http://google.com",
        "other_picture": "string",
        "pronouns": "they/them",
        "location": "Nah",
        "looking_for": "everybody",
        "about_me": "No",
        "matches": "dummy",
        "messages": "dummy",
        "interests": "dummy",
        "blocked": "dummy",
    }
    response = client.put("/users/test", json=json)
    assert response.status_code == 200
    assert response.json() == expected
