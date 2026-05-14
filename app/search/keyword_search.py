from rank_bm25 import BM25Okapi


def keyword_search(query, chunks, top_k=5):

    tokenized_chunks = []

    for chunk in chunks:

        tokens = chunk["code"].split()

        tokenized_chunks.append(tokens)

    bm25 = BM25Okapi(tokenized_chunks)

    query_tokens = query.split()

    scores = bm25.get_scores(query_tokens)

    ranked_results = sorted(
        zip(chunks, scores),
        key=lambda x: x[1],
        reverse=True
    )

    return ranked_results[:top_k]