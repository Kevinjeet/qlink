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
            gender VARCHAR(100) DEFAULT '',
            profile_picture_url TEXT DEFAULT '',
            other_picture TEXT DEFAULT '',
            pronouns VARCHAR(100) DEFAULT '',
            location VARCHAR(1000) DEFAULT '',
            looking_for TEXT DEFAULT '',
            about_me TEXT DEFAULT '',
            matches TEXT DEFAULT '',
            messages TEXT DEFAULT '',
            interests TEXT DEFAULT '',
            blocked TEXT DEFAULT ''

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ],
]
