from pydantic import BaseModel
from typing import Optional, List, Union

from queries.pool import pool

class DuplicateAccountError(ValueError):
    pass

class Error(BaseModel):
    message: str

class UsersIn(BaseModel):
    username: str
    password: str
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

class UsersOut(BaseModel):
    id: int
    username: str
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

class UsersOutWithPassword(UsersOut):
    hashed_password: str

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


    def create(self, user: UsersIn, hashed_password: str) -> UsersOutWithPassword:
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (run some SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (username
                            , password
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
                            , messages)
                        Values
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.username,
                            hashed_password,
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
                                , username
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
                            ORDER BY id;
                        """
                    )
                    result = []
                    for record in db:
                        user = UsersOut(
                            id=record[0],
                            username=record[1],
                            first_name=record[2],
                            last_name=record[3],
                            date_of_birth=record[4],
                            email=record[5],
                            phone_number=record[6],
                            gender=record[7],
                            profile_picture_url=record[8],
                            other_picture=record[9],
                            pronouns=record[10],
                            location=record[11],
                            looking_for=record[12],
                            about_me=record[13],
                            matches=record[14],
                            messages=record[15],
                        )
                        result.append(user)
                    return result
        except Exception as e:
            return {"message": "Could not get all users"}


    def get_one(self, username:str)-> Optional[UsersOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result=db.execute(
                        """
                        Select id
                            , username
                            , password
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
                        from users
                        where username = %s
                        """,
                        [username]
                    )
                    record=result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_user_out(record)
        except Exception as e:
            return {"message": "Could not find user"}


    def edit(self, id: int, user: UsersIn) -> Union[UsersOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET username = %s
                            , password = %s
                            , first_name = %s
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
                            user.username,
                            user.password,
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
                    if db.rowcount == 0:
                        return {"message": "ID doesn't exist"}
                    else:
                        return self.user_in_to_out(id, user)
        except Exception as e:
            print(e)
            return {"message": "could not update"}


    def user_in_to_out(self, id: int, user: UsersIn):
        data = user.dict()
        del data["password"]
        return UsersOut(id=id, **data)


    def record_to_user_out(self, record):
        return UsersOutWithPassword(
            id=record[0],
            username=record[1],
            hashed_password=record[2],
            first_name=record[3],
            last_name=record[4],
            date_of_birth=record[5],
            email=record[6],
            phone_number=record[7],
            gender=record[8],
            profile_picture_url=record[9],
            other_picture=record[10],
            pronouns=record[11],
            location=record[12],
            looking_for=record[13],
            about_me=record[14],
            matches=record[15],
            messages=record[16],
        )
