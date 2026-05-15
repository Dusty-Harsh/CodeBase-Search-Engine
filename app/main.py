from fastapi import FastAPI

from api.routes.search_routes import router as search_router
from api.routes.index_routes import router as index_router

from api.routes.chat_routes import (
    router as chat_router
)
from api.routes.memory_routes import (
    router as memory_router
)

from api.routes.graph_routes import (
    router as graph_router
)
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(search_router)
app.include_router(index_router)
app.include_router(chat_router)
app.include_router(memory_router)
app.include_router(graph_router)


@app.get("/")
def home():

    return {
        "message": "Codebase Search Engine API Running"
    }