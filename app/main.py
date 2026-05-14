from fastapi import FastAPI

from api.routes.search_routes import router as search_router
from api.routes.index_routes import router as index_router

from api.routes.chat_routes import (
    router as chat_router
)
from api.routes.memory_routes import (
    router as memory_router
)

app = FastAPI()


app.include_router(search_router)
app.include_router(index_router)
app.include_router(chat_router)
app.include_router(memory_router)


@app.get("/")
def home():

    return {
        "message": "Codebase Search Engine API Running"
    }