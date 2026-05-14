from fastapi import APIRouter

from services.chat_service import (
    chat_with_codebase
)


router = APIRouter()


@router.get("/chat")
def chat(query: str):

    response = chat_with_codebase(query)

    return response