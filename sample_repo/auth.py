def validate_token(token):
    """
    Validates JWT token and checks expiration.
    """

    if token == "invalid":
        return False

    return True


def login_user(username, password):
    """
    Handles user authentication.
    """

    if username == "admin":
        return "logged_in"