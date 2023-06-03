from pydantic import BaseModel
from typing import Optional, List

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
    locatiwon: Optional[str]
    looking_for: Optional[str]
    about_me: Optional[str]
    matches: Optional[str]
    messages: Optional[str]

def fake_get_all_account_data():
    return List[UsersOut()]

def test_get_all():
    #Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data] = fake_get_all_account_data

    #Act
    repsonse = client.get("/users")

    #Clean up
    app.dependency_overrides = {}

    #Assert

