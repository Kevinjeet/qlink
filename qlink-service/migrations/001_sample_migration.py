steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(25) NOT NULL UNIQUE,
            password VARCHAR(2000) NOT NULL,
            first_name VARCHAR(1000) NOT NULL,
            last_name VARCHAR(1000) NOT NULL,
            email VARCHAR(1000) NOT NULL UNIQUE,
            date_of_birth VARCHAR(100) NOT NULL,
            phone_number INTEGER,
            interests TEXT,
            gender VARCHAR(100),
            profile_picture_url TEXT,
            other_picture TEXT,
            pronouns VARCHAR(100),
            location VARCHAR(1000),
            looking_for TEXT,
            about_me TEXT,
            matches TEXT,
            messages TEXT

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
#     [
#         # "Up" SQL statement
#         """
#         CREATE TABLE big_dummy (
#             id SERIAL PRIMARY KEY NOT NULL,
#             required_limited_text VARCHAR(1000) NOT NULL,
#             required_unlimited_text TEXT NOT NULL,
#             required_date_time TIMESTAMP NOT NULL,
#             automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
#             required_integer INTEGER NOT NULL,
#             required_money MONEY NOT NULL
#         );
#         """,
#         # "Down" SQL statement
#         """
#         DROP TABLE big_dummy;
#         """,
#     ],
]
