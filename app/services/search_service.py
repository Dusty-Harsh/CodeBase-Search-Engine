from embeddings.embedding_service import generate_embedding

from vector_store.faiss_index import search

from llm.explainer import explain_code


def search_codebase(query):

    query_embedding = generate_embedding(query)

    results = search(query_embedding)

    enhanced_results = []

    for result in results:

        explanation = explain_code(result["code"])

        enhanced_results.append({
            "function_name": result["function_name"],
            "file_path": result["file_path"],
            "code": result["code"],
            "explanation": explanation
        })

    return enhanced_results