from fastapi import APIRouter

from services.indexing_service import index_repository


router = APIRouter()


@router.post("/index")
def index_repo(repo_url: str):

    index_repository(repo_url)

    return {
        "message": "Repository indexed successfully",
        "repo_url": repo_url
    }