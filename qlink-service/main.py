from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from authenticator import authenticator

app = FastAPI()

app.include_router(users.router)
app.include_router(authenticator.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def test():
    return {"message": "HELLO WORLD"}
