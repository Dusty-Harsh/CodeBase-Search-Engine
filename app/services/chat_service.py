from services.search_service import (
    search_codebase
)

from llm.chat_with_repo import (
    chat_with_repository
)

from parser.dependency_graph import (
    get_related_functions
)

from vector_store.faiss_index import (
    get_all_metadata
)


def chat_with_codebase(query):

    # =========================
    # INITIAL RETRIEVAL
    # =========================

    relevant_chunks = search_codebase(query)


    # =========================
    # GRAPH EXPANSION
    # =========================

    all_chunks = get_all_metadata()

    expanded_chunks = list(relevant_chunks)

    added = set()


    for chunk in relevant_chunks:

        function_name = chunk["function_name"]

        related_functions = (
            get_related_functions(function_name)
        )


        for related_function in related_functions:

            for candidate in all_chunks:

                if (
                    candidate["function_name"]
                    == related_function
                ):

                    key = (
                        candidate["file_path"],
                        candidate["function_name"]
                    )

                    if key not in added:

                        expanded_chunks.append(
                            candidate
                        )

                        added.add(key)


    # =========================
    # LLM RESPONSE
    # =========================

    answer = chat_with_repository(
        query,
        expanded_chunks
    )


    return {
        "query": query,
        "answer": answer,
        "sources": expanded_chunks
    }