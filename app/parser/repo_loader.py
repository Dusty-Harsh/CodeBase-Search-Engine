import os
from git import Repo


BASE_DIR = "../../indexed_repositories"


def clone_repository(repo_url):

    repo_name = repo_url.split("/")[-1].replace(".git", "")

    repo_path = os.path.join(BASE_DIR, repo_name)

    # Avoid recloning
    if os.path.exists(repo_path):

        print("Repository already exists.")

        return repo_path

    print("Cloning repository...")

    Repo.clone_from(repo_url, repo_path)

    print("Repository cloned successfully.")

    return repo_path