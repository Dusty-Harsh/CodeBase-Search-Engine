import os


SUPPORTED_EXTENSIONS = [
    ".py",
    ".js",
    ".ts"
]


def get_code_files(repo_path):

    code_files = []

    for root, dirs, files in os.walk(repo_path):

        for file in files:

            for ext in SUPPORTED_EXTENSIONS:

                if file.endswith(ext):

                    code_files.append(
                        os.path.join(root, file)
                    )

    return code_files