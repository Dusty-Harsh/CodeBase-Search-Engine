from sentence_transformers import SentenceTransformer


model = SentenceTransformer(
    'all-MiniLM-L6-v2'
)


def generate_embedding(text):

    return model.encode(text)


def generate_embeddings_batch(texts):

    return model.encode(texts)