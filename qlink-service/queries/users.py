from pydantic import BaseModel
from typing import Optional

class UsersIn(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: str
    email: str
    phone_number: int
    gender: Optional[str]
    profile_picture_url: Optional[str]
    other_picture: Optional[str]
    pronouns: Optional[str]
    location: Optional[str]
    looking_for: Optional[str]
    about_me: Optional[str]
    matches: Optional[str]
    messages: Optional[str]
