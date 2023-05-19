from pydantic import BaseModel
from typing import Optional, Union
from datetime import date
from queries.pool import pool
from fastapi import Response

class Error(BaseModel):
    message: str

class UsersIn(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
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

class UsersOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    date_of_birth: date
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


class UserRepository:
    def create(self, user: UsersIn) -> UsersOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (first_name
                            , last_name
                            , date_of_birth
                            , email
                            , phone_number
                            , gender
                            , profile_picture_url
                            , other_picture
                            , pronouns
                            , location
                            , looking_for
                            , about_me
                            , matches
                            , messages)
                        Values
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.date_of_birth,
                            user.email,
                            user.phone_number,
                            user.gender,
                            user.profile_picture_url,
                            user.other_picture,
                            user.pronouns,
                            user.location,
                            user.looking_for,
                            user.about_me,
                            user.matches,
                            user.messages
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.user_in_to_out(id, user)
        except Exception as e:
            return {"message": "could not create"}




    def user_in_to_out(self, id: int, user: UsersIn):
        data = user.dict()
        return UsersOut(id=id, **data)



































































    def edit(self, id: int, user: UsersIn) -> Union[UsersOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE users
                        SET first_name = %s
                            , last_name = %s
                            , date_of_birth = %s
                            , email = %s
                            , phone_number = %s
                            , gender = %s
                            , profile_picture_url = %s
                            , other_picture = %s
                            , pronouns = %s
                            , location = %s
                            , looking_for = %s
                            , about_me = %s
                            , matches = %s
                            , messages = %s
                            WHERE id = %s
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.date_of_birth,
                            user.email,
                            user.phone_number,
                            user.gender,
                            user.profile_picture_url,
                            user.other_picture,
                            user.pronouns,
                            user.location,
                            user.looking_for,
                            user.about_me,
                            user.matches,
                            user.messages,
                            id
                        ]
                    )
                    return self.user_in_to_out(id, user)
        except Exception as e:
            print(e)
            return {"message": "could not update"}
