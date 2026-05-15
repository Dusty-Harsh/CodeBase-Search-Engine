import ast


dependency_graph = {}


def extract_dependencies(file_path):

    with open(file_path, "r", encoding="utf-8") as f:

        source_code = f.read()

    tree = ast.parse(source_code)


    for node in ast.walk(tree):

        if isinstance(node, ast.FunctionDef):

            function_name = node.name

            called_functions = []


            for child in ast.walk(node):

                if isinstance(child, ast.Call):

                    if isinstance(child.func, ast.Name):

                        called_functions.append(
                            child.func.id
                        )


            dependency_graph[function_name] = {
                "calls": called_functions
            }


def get_dependency_graph():

    return dependency_graph


def get_related_functions(function_name):

    if function_name not in dependency_graph:

        return []

    return dependency_graph[
        function_name
    ]["calls"]