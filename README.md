# QLink

## QLink - Love is Love: Connect, date, and celebrate your queerness!

_Avisha Achaal
Kevinjeet Gill
Robert Venegas
Dylan Winn_

[General Design](#general-design)

[API design](#api-design)

[Data Model](#data-model)

[GHI](#ghi)

[Intended Market](#intended-market)

[Functionality](#functionality)

[Project Initialization for Local Version](#project-initialization-for-local-version)

### General Design

This application is has been designed as a dating app with the LGBTQ+ community in mind, taking into account multiple things other dating apps may miss. For instance, both the gender a person is looking for and the user's own gender, rather than being dropdowns, are just text boxes. This allows for a greater range in options and for everyone's gender identity to be represented

### API design

The GHI for the API can be accessed [here](https://feb-23-pt-7-qlink-fastapi.mod3projects.com/docs), or you can access the API directly using [https://feb-23-pt-7-qlink-fastapi.mod3projects.com/{your endpoint of choice}](https://feb-23-pt-7-qlink-fastapi.mod3projects.com/). It has endpoints for creating users, editing and deleting users, signing in and out, as well as listing all users or just one.

From /users/ you can:
: Create a user via `POST`. The "Create user" function also automatically signs the user in as their new account.
: Return a list of every user in the database via `GET`.

From /users/{username}/ you can:
: Return a single user's profile information via `GET`.
: Edit you the profile you're signed in to via `PUT`. The `PUT` function has been specially written to allow a user to only put in their JSON request the fields they wish to change, to avoid needing to put back in their password or otherwise potentially cause issues.

From /users/{user_id}/ you can:
: Delete the users corresponding to the ID

From /token/ you can:
: View the token you already have via `GET`.
: Sign in via username and password via `POST`.
: Delete your token/sign out via `DELETE`.

You can also print Hello World at `/` with nothing after it.

When creating a user, follow this format:

: >`{
  "username": "string",
  "password": "string",
  "first_name": "string",
  "last_name": "string",
  "date_of_birth": "string",
  "email": "string",
  "phone_number": 0
}`

When getting a response in from any API call involving a user, it will follow this format:

: >`{
  "id": 0,
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "date_of_birth": "string",
  "email": "string",
  "phone_number": 0,
  "gender": "string",
  "profile_picture_url": "string",
  "other_picture": "string",
  "pronouns": "string",
  "location": "string",
  "looking_for": "string",
  "about_me": "string",
  "matches": "string",
  "messages": "string",
  "interests": "string",
  "blocked": "string"
}`

And when editing a user, you can edit any or all of the of the following fields in this format:
: >`{
  "password": "string",
  "first_name": "string",
  "last_name": "string",
  "date_of_birth": "string",
  "email": "string",
  "phone_number": 0,
  "gender": "string",
  "profile_picture_url": "string",
  "other_picture": "string",
  "pronouns": "string",
  "location": "string",
  "looking_for": "string",
  "about_me": "string",
  "matches": "string",
  "messages": "string",
  "interests": "string",
  "blocked": "string"
}`

Please note that it is **_not_** possible to edit username or id via the API. This is intentional.

### Data Model

| Name                |  Type   | Unique | Optional |
| :------------------ | :-----: | -----: | -------: |
| id                  | string  |     no |      yes |
| username            | varchar |    yes |       no |
| password            | varchar |     no |       no |
| first_name          | varchar |     no |       no |
| last_name           | varchar |     no |      yes |
| date_of_birth       | varchar |     no |       no |
| email               | varchar |    yes |       no |
| phone_numnber       |   int   |     no |       no |
| gender              | varchar |     no |      yes |
| profile_picture_url | varchar |     no |      yes |
| other_picture       | varchar |     no |      yes |
| pronouns            | varchar |     no |      yes |
| location            | varchar |     no |      yes |
| looking_for         | varchar |     no |      yes |
| about_me            | varchar |     no |      yes |
| matches             | varchar |     no |      yes |
| messages            | varchar |     no |      yes |
| interests           | varchar |     no |      yes |
| blocked             | varchar |     no |      yes |

### GHI

The GHI of this application can be accessed at [https://q-link.gitlab.io/q-link/](https://q-link.gitlab.io/q-link/users)

It begins with a sign up page, though the users also has the ability to access a login page if they've already created an account, but are signed out.

Upon account creation or sign-in, the user is redirected to a list of potential matches. From here, they can choose to match or decline with other users, as well as view the user info for another user.

In the navbar on top, there are options to view your own profile, edit your profile, or message other users.

The view profile page includes the user's:

- first and last name
- Gender
- Pronouns
- Location
- About Me
- Profile Picture
- Another picture

The Edit Profile page includes the ability to edit everything on the view profile page for the signed in user, as well as:

- Date of Birth
- Email Address
- Phone Number
- Looking For
- Interests

On the Chat page you can access all users and talk to them globally.

- Access by hitting the + button and search for a user or hit the down arrow key and names should pop up
- Send them a message and all messaging should be in real time.

### Intended Market

We are targeting the LGBTQ+ community. We notice how this market is untapped and wanted to provide a safe space for them to meet eachother.

### Functionality

A user can sign up, or sign in if they are already a user.
Once logged in, they will be a taken to the list of profile pages to view potential matches.
On that page, they have the ability to type in a search bar that could filter the list of profiles by their prefrences.
Also on that page they can click to match with someone or not.
When someone is in your matches or decline they will no longer see them on the list of profiles.
Also each profile that is listed has a button to view that person's profile.

As a user, they are able to view their own profile by clicking on the link My Profile from there a user is able view
their user info, name, location, interests, about me and view some pictures. Edits can be made by the user as well.

A user is also able to view another profile by clicking on the view profile link in the list of profiles page. From there the user can view the invdivdual profile
and match or decline the user from the list of profile pages.

### Project Initialization for Local Version:

To initialize our application on your own local machine, please follow the steps below.

1. Clone this repository to your local machine
2. `cd` into the project
3. Run `docker volume create postgres-data`
4. Run `docker compose build`
5. Run `docker compose up`
6. Run `docker exec -it q-link-qlink-fastapi-1 bash`
7. Run `python -m migrations up`
8. Have fun!
