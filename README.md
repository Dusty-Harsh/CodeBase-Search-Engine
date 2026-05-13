# 🚀 Codebase Search Engine

An AI-powered semantic code search engine that allows developers to search large codebases using natural language queries.

## ✨ Features

- Semantic code search using embeddings
- GitHub repository indexing
- AST-based function extraction
- FAISS vector database
- FastAPI backend
- Persistent vector storage
- Natural language querying

## 🧠 Example Queries

- "Where is authentication implemented?"
- "How are HTTP requests handled?"
- "Find payment processing logic"

## 🏗️ Tech Stack

- Python
- FastAPI
- Sentence Transformers
- FAISS
- GitPython
- AST Parsing

## 🚀 How It Works

1. Clone GitHub repository
2. Parse Python functions
3. Generate embeddings
4. Store vectors in FAISS
5. Perform semantic similarity search

## ⚡ Setup

```bash
git clone <repo-url>

cd codebase-search-engine

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

## 📌 Future Improvements

- Tree-sitter parsing
- Multi-language support
- LLM-based code explanations
- Hybrid search
- Async indexing pipeline
- Frontend UI
