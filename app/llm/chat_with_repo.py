import ollama

from llm.memory_store import (
    add_to_memory,
    get_memory
)


def chat_with_repository(query, context_chunks):

    context = "\n\n".join([
        chunk["code"]
        for chunk in context_chunks
    ])


    memory = get_memory()


    messages = [
        {
            "role": "system",
            "content": """
            You are an expert software engineer.

            Answer using ONLY repository context.
            """
        }
    ]


    # =========================
    # ADD MEMORY
    # =========================

    messages.extend(memory)


    # =========================
    # CURRENT QUERY
    # =========================

    user_prompt = f"""
    USER QUESTION:
    {query}


    REPOSITORY CONTEXT:
    {context}
    """


    messages.append({
        "role": "user",
        "content": user_prompt
    })


    response = ollama.chat(
        model='mistral',
        messages=messages
    )


    answer = response['message']['content']


    # =========================
    # STORE MEMORY
    # =========================

    add_to_memory(
        "user",
        query
    )

    add_to_memory(
        "assistant",
        answer
    )


    return answer