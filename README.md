# 🚀 Semantic Codebase Search Engine

An AI-powered semantic code search engine that enables developers to query large codebases using natural language instead of traditional keyword matching.

This project indexes real GitHub repositories, generates embeddings for code chunks, stores them in a FAISS vector database, and retrieves semantically relevant code snippets through similarity search.

---

# ✨ Features

- 🔍 Semantic code search using embeddings
- 📦 Real GitHub repository indexing
- 🧠 Natural language querying
- ⚡ FastAPI backend APIs
- 🗂️ AST-based function extraction
- 💾 Persistent FAISS vector storage
- 📁 Metadata persistence
- 🚀 Real-time semantic retrieval

---

# 🧠 Example Queries

```text
Where is authentication implemented?

How are HTTP requests handled?

Find payment processing logic

Where is JWT validation done?
```

---

# 🏗️ System Architecture

```text
                    GitHub Repository
                            ↓
                    Repository Cloning
                            ↓
                      File Scanning
                            ↓
                     AST Parsing Layer
                            ↓
                     Function Chunking
                            ↓
                  Embedding Generation
                            ↓
                    FAISS Vector Store
                            ↓
                  Semantic Similarity Search
                            ↓
                     Relevant Code Results
```

---

# ⚙️ Tech Stack

| Component | Technology |
|---|---|
| Backend | FastAPI |
| Embeddings | Sentence Transformers |
| Vector Database | FAISS |
| Parsing | Python AST |
| Repository Cloning | GitPython |
| Persistence | Pickle + FAISS Storage |
| Language | Python |

---

# 📁 Project Structure

```text
codebase-search-engine/
│
├── app/
│   ├── api/
│   ├── embeddings/
│   ├── parser/
│   ├── services/
│   ├── vector_store/
│   ├── llm/
│   └── main.py
│
├── indexed_repositories/
├── vector_indexes/
├── metadata/
│
├── requirements.txt
└── README.md
```

---

# 🚀 API Endpoints

## Index Repository

```http
POST /index
```

### Example

```text
https://github.com/psf/requests
```

---

## Search Codebase

```http
GET /search?query=authentication
```

---

# 🧠 How Semantic Search Works

Traditional code search relies on keyword matching.

This system instead:
1. Parses functions/classes
2. Converts code into embeddings
3. Stores vectors in FAISS
4. Converts user queries into embeddings
5. Finds semantically similar code

This allows retrieval even when exact keywords are missing.

---

# 💾 Persistent Storage

The project persists:
- FAISS indexes
- metadata
- indexed repositories

This prevents re-indexing after server restarts.

---

# ⚡ Setup Instructions

## 1. Clone Repository

```bash
git clone <your-repo-url>
```

---

## 2. Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Start FastAPI Server

```bash
cd app

uvicorn main:app --reload
```

---

## 5. Open Swagger Docs

```text
http://127.0.0.1:8000/docs
```

---

# 📌 Future Improvements

- 🌳 Tree-sitter parsing
- 🌐 Multi-language support
- 🤖 LLM-based code explanations
- ⚡ Hybrid retrieval (keyword + semantic)
- 🔄 Async indexing pipeline
- 🐳 Docker deployment
- 🎨 Frontend UI
- 📊 Repository analytics dashboard

---

# 🧪 Current Limitations

- Python-only parsing
- CPU-based embedding generation
- Single-node FAISS indexing
- Synchronous indexing pipeline

---

# 🎯 Learning Outcomes

This project demonstrates:
- Backend system design
- Semantic retrieval systems
- Vector databases
- Embedding pipelines
- API engineering
- Repository parsing
- Persistent storage design

---

# 📜 License

MIT License