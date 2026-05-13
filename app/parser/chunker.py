import ast

def extract_functions_from_file(file_path):
    """
    Parses a python file and extracts all top-level and class-level functions.
    """
    chunks = []
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            source = f.read()
            
        tree = ast.parse(source)
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef) or isinstance(node, ast.AsyncFunctionDef):
                code = ast.get_source_segment(source, node)
                if code:
                    chunks.append({
                        "function_name": node.name,
                        "file_path": file_path,
                        "code": code
                    })
    except Exception as e:
        print(f"Failed to parse {file_path}: {e}")
        
    return chunks
