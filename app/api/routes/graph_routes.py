from fastapi import APIRouter

from parser.dependency_graph import (
    get_dependency_graph
)


router = APIRouter()


@router.get("/graph")
def dependency_graph():

    return get_dependency_graph()