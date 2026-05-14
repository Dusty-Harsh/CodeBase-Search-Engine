from embeddings.embedding_service import (
    generate_embedding
)

from vector_store.faiss_index import (
    search,
    get_all_metadata
)

from search.keyword_search import (
    keyword_search
)


def search_codebase(query):

    # =========================
    # SEMANTIC SEARCH
    # =========================

    query_embedding = generate_embedding(query)

    semantic_results = search(
        query_embedding,
        k=5
    )


    # =========================
    # KEYWORD SEARCH
    # =========================

    all_chunks = get_all_metadata()

    keyword_results = keyword_search(
        query,
        all_chunks,
        top_k=5
    )


    # =========================
    # MERGE RESULTS
    # =========================

    combined_results = []

    seen = set()


    for result in semantic_results:

        key = (
            result["file_path"],
            result["function_name"]
        )

        if key not in seen:

            combined_results.append(result)

            seen.add(key)


    for result, score in keyword_results:

        key = (
            result["file_path"],
            result["function_name"]
        )

        if key not in seen:

            combined_results.append(result)

            seen.add(key)


    return combined_results[:5]