from parser.repo_loader import clone_repository

from parser.file_scanner import get_code_files
from parser.tree_sitter_parser import extract_functions_tree_sitter

from embeddings.embedding_service import generate_embedding

from vector_store.faiss_index import add_to_index
from vector_store.faiss_index import add_to_index, save_index


def index_repository(repo_url):

    repo_path = clone_repository(repo_url)

    all_chunks = []

    code_files = get_code_files(repo_path)

    print("code file:", code_files)

    for file in code_files:

        chunks = extract_functions_tree_sitter(file)

        all_chunks.extend(chunks)

    print("Chunks extracted:", len(all_chunks))

    for chunk in all_chunks:

        embedding = generate_embedding(chunk["code"])

        add_to_index(embedding, chunk)

    save_index()
    print("✅ Repository indexed successfully.")
