from pydantic import BaseModel
from typing import Optional
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
    def delete(self, user_id: int) -> bool:
        try:
            # connect it to database
            with pool.connection() as conn:
                # SQL
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False





    def create(self, user: UsersIn) -> UsersOut:
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (run some SQL with)
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
