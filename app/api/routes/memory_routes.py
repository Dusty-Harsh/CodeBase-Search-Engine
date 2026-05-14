from fastapi import APIRouter

from llm.memory_store import (
    get_memory,
    clear_memory
)


router = APIRouter()


@router.get("/memory")
def view_memory():

    return get_memory()


@router.delete("/memory")
def delete_memory():

    clear_memory()

    return {
        "message": "Conversation memory cleared"
    }