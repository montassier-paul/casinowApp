from fastapi import  FastAPI, Depends
from .routers import routes
from fastapi.middleware.cors import CORSMiddleware
from . import config
from functools import lru_cache
from fastapi.staticfiles import StaticFiles
import os


 
app = FastAPI()


app.include_router(routes.router)

script_dir = os.path.dirname(__file__)
st_abs_file_path = os.path.join(script_dir, "routers/static/")
app.mount("/static", StaticFiles(directory=st_abs_file_path), name="static")


origins = [
    "http://localhost:3000",
    "localhost:3000", 
    "*"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@lru_cache()
def get_settings():
    return config.Settings()


# @app.get("/")
# async def root(settings: config.Settings = Depends(get_settings)):
#      return {
#         "message": "API working",
#         "app_name": settings.app_name,
#         "admin_email": settings.admin_email,
#         "items_per_user": settings.items_per_user,
#     }

@app.get("/")
async def root():
     return {
        "message": "API working",
    }






   
