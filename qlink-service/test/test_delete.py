from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository
from authenticator import authenticator

client = TestClient(app)


class FakeUserRepository:
    def delete(self, user_id):
        return True


def fake_user():
    return {
        "id": 1,
        "username": "avishak",
        "first_name": "Avisha",
        "last_name": "K",
        "date_of_birth": "12/17/1996",
        "email": "test@test.com",
        "phone_number": 5555555,
        "gender": "female",
        "profile_picture_url": "string",
        "other_profile": "string",
        "pronouns": "she/they",
        "location": "NA",
        "looking_for": "besties",
        "about_me": " I like ^cats^ and naps",
        "matches": "string",
        "messages": "string",
        "interests": "string",
        "blocked": "string",
    }


def test_delete_user():
    # Arrange
    user_id = 1  # Define user id that you want to delete
    app.dependency_overrides[UserRepository] = FakeUserRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_user

    # Act
    response = client.delete(f"/users/{user_id}")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() is True
