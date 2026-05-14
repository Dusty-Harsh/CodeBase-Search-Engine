from services.search_service import (
    search_codebase
)

from llm.chat_with_repo import (
    chat_with_repository
)


def chat_with_codebase(query):

    relevant_chunks = search_codebase(query)

    answer = chat_with_repository(
        query,
        relevant_chunks
    )

    return {
        "query": query,
        "answer": answer,
        "sources": relevant_chunks
    }