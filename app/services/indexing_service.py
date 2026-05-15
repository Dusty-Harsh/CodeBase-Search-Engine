from parser.repo_loader import clone_repository

from parser.file_scanner import get_code_files

from parser.tree_sitter_parser import (
    extract_functions_tree_sitter
)

from embeddings.embedding_service import (
    generate_embeddings_batch
)

from vector_store.faiss_index import (
    add_to_index,
    save_index
)

from parser.dependency_graph import (
    extract_dependencies
)


MAX_CHUNKS = 300


def index_repository(repo_url):

    repo_path = clone_repository(repo_url)

    all_chunks = []

    code_files = get_code_files(repo_path)

    print(f"📂 Files found: {len(code_files)}")


    for file in code_files:

        chunks = extract_functions_tree_sitter(file)
        extract_dependencies(file)

        all_chunks.extend(chunks)

        if len(all_chunks) >= MAX_CHUNKS:

            print(f"⚠️ Chunk limit reached ({MAX_CHUNKS})")

            break


    all_chunks = all_chunks[:MAX_CHUNKS]

    print(f"🧠 Total chunks: {len(all_chunks)}")


    # =========================
    # BATCH EMBEDDINGS
    # =========================

    texts = [
        chunk["code"]
        for chunk in all_chunks
    ]

    embeddings = generate_embeddings_batch(texts)

    print("⚡ Embeddings generated.")


    # =========================
    # STORE IN FAISS
    # =========================

    for embedding, chunk in zip(
        embeddings,
        all_chunks
    ):

        add_to_index(
            embedding,
            chunk
        )


    save_index()

    print("✅ Repository indexed successfully.")