try:
    from sentence_transformers import SentenceTransformer
    # all-MiniLM-L6-v2 outputs 384-dimensional embeddings (matching faiss_index.py)
    model = SentenceTransformer('all-MiniLM-L6-v2')
except ImportError:
    print("Warning: 'sentence_transformers' is not installed. Please install it using `pip install sentence-transformers`. Falling back to random embeddings.")
    model = None
    import numpy as np

def generate_embedding(text):
    """
    Generates an embedding for the given text.
    Returns a list of floats.
    """
    if model is not None:
        return model.encode(text).tolist()
    else:
        # Fallback to random embedding of dimension 384
        return np.random.rand(384).tolist()
