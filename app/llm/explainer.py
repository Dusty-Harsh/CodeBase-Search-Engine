import ollama


def explain_code(code_snippet):

    prompt = f"""
    You are a senior software engineer.

    Explain the following code clearly and simply.

    Mention:
    - what the function does
    - key logic
    - purpose

    Code:
    {code_snippet}
    """

    response = ollama.chat(
        model='mistral',
        messages=[
            {
                'role': 'user',
                'content': prompt
            }
        ]
    )

    explanation = response['message']['content']

    return explanation