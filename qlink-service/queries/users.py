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
    # gender: Optional[str]
    # profile_picture_url: Optional[str]
    # other_picture: Optional[str]
    # pronouns: Optional[str]
    # location: Optional[str]
    # looking_for: Optional[str]
    # about_me: Optional[str]
    # matches: Optional[str]
    # messages: Optional[str]
    # interests: Optional[str]
    # blocked: Optional[str]


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



class EditIn(BaseModel):
    password: Optional[str]
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
                        [user_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def create(
        self, user: UsersIn, hashed_password: str
    ) -> UsersOutWithPassword:
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
                            , phone_number)

                        Values
                            (%s, %s, %s, %s, %s, %s, %s)
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


                        ],
                    )
                    print(result)
                    gender = ''
                    profile_picture_url = ''
                    other_picture = ''
                    pronouns = ''
                    location = ''
                    looking_for = ''
                    about_me = ''
                    matches = ''
                    messages = ''
                    interests = ''
                    blocked = ''
                    id = result.fetchone()[0]
                    return self.user_in_to_out_hash(id, gender, profile_picture_url, other_picture,
                                                    pronouns,
                                                    location,
                                                    looking_for,
                                                    about_me,
                                                    matches,
                                                    messages,
                                                    interests,
                                                    blocked,
                                                    user)

        except Exception as e:
            print(e)
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
                                , interests
                                , blocked
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
                            interests=record[16],
                            blocked=record[17],
                        )
                        result.append(user)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def get_one(self, username: str) -> Optional[UsersOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
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
                            , interests
                            , blocked
                        from users
                        where username = %s;
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_user_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not find user"}

    def edit(
        self, username: str, user: EditIn, hashed_password: str
    ) -> Union[UsersOut, Error]:
        update_list = []
        item_dict = {
            "password": f"{hashed_password}",
            "first_name": f"{user.first_name}",
            "last_name": f"{user.last_name}",
            "date_of_birth": f"{user.date_of_birth}",
            "email": f"{user.email}",
            "phone_number": f"{user.phone_number}",
            "gender": f"{user.gender}",
            "profile_picture_url": f"{user.profile_picture_url}",
            "other_picture": f"{user.other_picture}",
            "pronouns": f"{user.pronouns}",
            "location": f"{user.location}",
            "looking_for": f"{user.looking_for}",
            "about_me": f"{user.about_me}",
            "matches": f"{user.matches}",
            "messages": f"{user.messages}",
            "interests": f"{user.interests}",
            "blocked": f"{user.blocked}",
        }

        for key in item_dict:
            if item_dict[key] != "None":
                update_list.append(f"{key} = '{item_dict[key]}'")
        update_string = ", ".join(update_list)
        print("Update list: ", update_list)
        instructions = f"""UPDATE users
        SET {update_string}
        WHERE username = '{username}'
        returning id;
        """
        print("instructions: ", instructions)
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(instructions)
                    id = result.fetchone()[0]
                    return self.user_in_to_out(username, user, id)
        except Exception as e:
            print(e)
            return {"Could not update, error": e}

    def user_in_to_out(
        self,
        username: str,
        user: Union[UsersIn, EditIn],
        id: int,
    ):
        if isinstance(user, UsersIn):
            data = user.dict()
            del data["password"]
            return UsersOut(id=id, **data)
        else:
            data = user.dict()
            del data["password"]
            return UsersOut(username=username, id=id, **data)

    def user_in_to_out_hash(self, id: int,
                            gender: str,
                            profile_picture_url: str,
                            other_picture: str,
                            pronouns:str,
                            location:str,
                            looking_for:str,
                            about_me:str,
                            matches:str,
                            messages:str,
                            interests: str,
                            blocked:str,
                            user: UsersIn):
        data = user.dict()
        del data["password"]
        return UsersOut(id=id, gender=gender, profile_picture_url=profile_picture_url,
                        other_picture=other_picture, pronouns=pronouns,
                         location=location, looking_for=looking_for,
                          about_me=about_me, matches=matches,
                           messages=messages,interests=interests, blocked=blocked, **data)

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
            interests=record[17],
            blocked=record[18],
        )
