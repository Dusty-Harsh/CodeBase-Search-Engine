conversation_history = []


def add_to_memory(role, content):

    conversation_history.append({
        "role": role,
        "content": content
    })


def get_memory():

    return conversation_history


def clear_memory():

    conversation_history.clear()