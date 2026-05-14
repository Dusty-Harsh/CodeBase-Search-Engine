from tree_sitter import Language, Parser

import tree_sitter_python as tspython
import tree_sitter_javascript as tsjavascript
import tree_sitter_typescript as tstypescript


# =========================
# LANGUAGE CONFIGURATION
# =========================

PY_LANGUAGE = Language(tspython.language())

JS_LANGUAGE = Language(tsjavascript.language())

TS_LANGUAGE = Language(
    tstypescript.language_typescript()
)


# =========================
# PARSERS
# =========================

python_parser = Parser(PY_LANGUAGE)

javascript_parser = Parser(JS_LANGUAGE)

typescript_parser = Parser(TS_LANGUAGE)


# =========================
# FILE EXTENSION MAP
# =========================

LANGUAGE_MAP = {
    ".py": {
        "parser": python_parser,
        "function_node": "function_definition",
        "name_node": "identifier"
    },

    ".js": {
        "parser": javascript_parser,
        "function_node": "function_declaration",
        "name_node": "identifier"
    },

    ".ts": {
        "parser": typescript_parser,
        "function_node": "function_declaration",
        "name_node": "identifier"
    }
}


# =========================
# MAIN EXTRACTION FUNCTION
# =========================

def extract_functions_tree_sitter(file_path):

    extension = None

    for ext in LANGUAGE_MAP:

        if file_path.endswith(ext):

            extension = ext

            break

    if extension is None:

        return []

    config = LANGUAGE_MAP[extension]

    parser = config["parser"]

    function_node_type = config["function_node"]

    name_node_type = config["name_node"]


    with open(file_path, "r", encoding="utf-8") as f:

        source_code = f.read()

    tree = parser.parse(bytes(source_code, "utf8"))

    root_node = tree.root_node

    chunks = []


    def traverse(node):

        if node.type == function_node_type:

            start_byte = node.start_byte
            end_byte = node.end_byte

            function_code = source_code[
                start_byte:end_byte
            ]

            function_name = "unknown"

            for child in node.children:

                if child.type == name_node_type:

                    function_name = source_code[
                        child.start_byte:child.end_byte
                    ]

            chunks.append({
                "function_name": function_name,
                "code": function_code,
                "file_path": file_path,
                "language": extension
            })

        for child in node.children:

            traverse(child)


    traverse(root_node)

    return chunks