import faiss
import numpy as np
import os
import pickle


dimension = 384

INDEX_PATH = "../vector_indexes/code_index.faiss"
METADATA_PATH = "../metadata/metadata.pkl"


# Load existing index if available
if os.path.exists(INDEX_PATH):

    index = faiss.read_index(INDEX_PATH)

    print("✅ FAISS index loaded from disk.")

else:

    index = faiss.IndexFlatL2(dimension)

    print("🆕 New FAISS index created.")


# Load metadata
if os.path.exists(METADATA_PATH):

    with open(METADATA_PATH, "rb") as f:

        metadata_store = pickle.load(f)

    print("✅ Metadata loaded.")

else:

    metadata_store = []


def save_index():

    faiss.write_index(index, INDEX_PATH)

    with open(METADATA_PATH, "wb") as f:

        pickle.dump(metadata_store, f)

    print("💾 Index and metadata saved.")


def add_to_index(embedding, metadata):

    vector = np.array([embedding]).astype("float32")

    index.add(vector)

    metadata_store.append(metadata)


def search(query_embedding, k=3):

    query_vector = np.array([query_embedding]).astype("float32")

    distances, indices = index.search(query_vector, k)

    results = []

    for idx in indices[0]:

        if idx < len(metadata_store):

            results.append(metadata_store[idx])

    return results