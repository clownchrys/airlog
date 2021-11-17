import sys

from fastapi import FastAPI

version = f"{sys.version_info.major}.{sys.version_info.minor}"

app = FastAPI()


@app.get("/")
async def status():
    return {
        "status": "OK",
        "message": "FastAPI running on Uvicorn with Gunicorn",
        "python_version": version,
    }
