import os


SUPPORTED_EXTENSIONS = [
    ".py",
    ".js",
    ".ts"
]


IGNORE_DIRECTORIES = [
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    "coverage",
    "venv",
    "__pycache__"
    "tests",
    "test",
    "__tests__"
]


MAX_FILES = 50


def get_code_files(repo_path):

    code_files = []

    for root, dirs, files in os.walk(repo_path):

        # Remove ignored directories
        dirs[:] = [
            d for d in dirs
            if d not in IGNORE_DIRECTORIES
        ]

        for file in files:

            for ext in SUPPORTED_EXTENSIONS:

                if file.endswith(ext):

                    code_files.append(
                        os.path.join(root, file)
                    )

        if len(code_files) >= MAX_FILES:

            print(f"⚠️ File limit reached ({MAX_FILES})")

            break

    return code_files[:MAX_FILES]