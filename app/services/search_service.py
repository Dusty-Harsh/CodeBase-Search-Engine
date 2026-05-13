from embeddings.embedding_service import generate_embedding

from vector_store.faiss_index import search


def search_codebase(query):

    query_embedding = generate_embedding(query)

    results = search(query_embedding)

    return results