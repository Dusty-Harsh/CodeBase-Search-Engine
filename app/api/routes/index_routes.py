from fastapi import APIRouter
from fastapi import BackgroundTasks

from services.indexing_service import (
    index_repository
)


router = APIRouter()


@router.post("/index")
def index_repo(
    repo_url: str,
    background_tasks: BackgroundTasks
):

    background_tasks.add_task(
        index_repository,
        repo_url
    )

    return {
        "message": "Background indexing started",
        "repo_url": repo_url
    }