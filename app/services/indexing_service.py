from parser.repo_loader import clone_repository

from parser.file_scanner import get_python_files
from parser.chunker import extract_functions_from_file

from embeddings.embedding_service import generate_embedding

from vector_store.faiss_index import add_to_index
from vector_store.faiss_index import add_to_index, save_index


def index_repository(repo_url):

    repo_path = clone_repository(repo_url)

    all_chunks = []

    python_files = get_python_files(repo_path)

    print("Python files:", python_files)

    for file in python_files:

        chunks = extract_functions_from_file(file)

        all_chunks.extend(chunks)

    print("Chunks extracted:", len(all_chunks))

    for chunk in all_chunks:

        embedding = generate_embedding(chunk["code"])

        add_to_index(embedding, chunk)

    save_index()
    print("✅ Repository indexed successfully.")
