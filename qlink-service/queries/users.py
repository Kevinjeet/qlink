from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


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

    def get_all(self) -> Union[List[UsersOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            SELECT id
                                , first_name
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
                                , messages
                            FROM users
                        """
                    )
                    result = []
                    for record in db:
                        user = UsersOut(
                            id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            date_of_birth=record[3],
                            email=record[4],
                            phone_number=record[5],
                            gender=record[6],
                            profile_picture_url=record[7],
                            other_picture=record[8],
                            pronouns=record[9],
                            location=record[10],
                            looking_for=record[11],
                            about_me=record[12],
                            matches=record[13],
                            messages=record[14],
                        )
                        result.append(user)
                    return result
        except Exception as e:
            return {"message": "Could not get all users"}


    def user_in_to_out(self, id: int, user: UsersIn):
        data = user.dict()
        return UsersOut(id=id, **data)

    def record_to_user_out(self, record):
        return UsersOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            date_of_birth=record[3],
            email=record[4],
            phone_number=record[5],
            gender=record[6],
            profile_picture_url=record[7],
            other_picture=record[8],
            pronouns=record[9],
            location=record[10],
            looking_for=record[11],
            about_me=record[12],
            matches=record[13],
            messages=record[14],
        )
