# 🚀 Semantic Codebase Search Engine

An AI-powered semantic code search engine and conversational repository assistant that enables developers to query large codebases using natural language.

The system indexes real GitHub repositories, parses multi-language codebases using Tree-sitter, generates semantic embeddings, stores vectors in FAISS, performs hybrid retrieval (semantic + keyword search), and provides conversational AI responses over repository context.

---

# ✨ Features

- 🔍 Semantic code search using embeddings
- 🌳 Multi-language Tree-sitter parsing
- 🌐 Python, JavaScript, and TypeScript support
- 🔀 Hybrid retrieval (Semantic + BM25 keyword search)
- 💬 AI chat with repositories
- 🧠 Conversational memory
- ⚡ Async background indexing
- 📦 Real GitHub repository indexing
- 💾 Persistent FAISS vector storage
- 🗂️ Metadata persistence
- 🚀 FastAPI backend APIs
- 🤖 Local LLM integration using Ollama + Mistral

---

# 🧠 Example Queries

```text
Where is authentication implemented?

How are HTTP requests handled?

Explain routing logic.

Where is middleware used?

How does token validation work?
```

---

# 🏗️ System Architecture

```text
                    GitHub Repository
                            ↓
                    Repository Cloning
                            ↓
                  Multi-language File Scanner
                            ↓
                 Tree-sitter Syntax Parsing
                            ↓
                    Function Extraction
                            ↓
                    Chunk Generation
                            ↓
                  Embedding Generation
                            ↓
                     FAISS Vector Store
                            ↓
          Hybrid Retrieval (Semantic + BM25)
                            ↓
                 Relevant Repository Context
                            ↓
                  LLM Context Injection
                            ↓
                Conversational AI Responses
```

---

# 🧠 Advanced Concepts Implemented

- Retrieval-Augmented Generation (RAG)
- Hybrid Search Systems
- Semantic Retrieval
- Vector Databases
- Conversational Memory
- Context Injection
- Multi-language Syntax Parsing
- Async Background Processing
- Persistent Vector Indexing
- Repository Ingestion Pipelines

---

# ⚙️ Tech Stack

| Component | Technology |
|---|---|
| Backend API | FastAPI |
| Vector Database | FAISS |
| Embeddings | Sentence Transformers |
| Parsing Engine | Tree-sitter |
| Keyword Search | BM25 |
| Local LLM | Ollama + Mistral |
| Repository Cloning | GitPython |
| Persistence | Pickle + FAISS Storage |
| Async Processing | FastAPI BackgroundTasks |
| Language | Python |

---

# 📁 Project Structure

```text
codebase-search-engine/
│
├── app/
│   ├── api/
│   │   └── routes/
│   │
│   ├── embeddings/
│   │
│   ├── llm/
│   │
│   ├── parser/
│   │
│   ├── search/
│   │
│   ├── services/
│   │
│   ├── vector_store/
│   │
│   └── main.py
│
├── indexed_repositories/
│
├── metadata/
│
├── vector_indexes/
│
├── requirements.txt
│
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

## Semantic Search

```http
GET /search?query=authentication
```

---

## AI Repository Chat

```http
GET /chat?query=How does authentication work?
```

---

## View Conversation Memory

```http
GET /memory
```

---

## Clear Conversation Memory

```http
DELETE /memory
```

---

# 🔍 How Hybrid Retrieval Works

The system combines:

## 1. Semantic Search
- Embedding-based similarity search
- Captures meaning and intent

## 2. BM25 Keyword Search
- Exact keyword matching
- Improves precision for APIs/libraries

## Final Retrieval
Both retrieval methods are merged to produce highly relevant repository context.

---

# 🧠 Conversational Repository AI

The system supports repository-aware conversations using:

- Hybrid retrieval
- Context injection
- Conversational memory
- Local LLM inference

This enables follow-up questions such as:

```text
How does authentication work?

What happens after token validation?

Which middleware calls it?
```

without losing conversational context.

---

# 💾 Persistent Storage

The project persists:

- FAISS indexes
- repository metadata
- indexed repositories

This prevents re-indexing after server restarts.

---

# ⚡ Async Background Indexing

Repository indexing runs asynchronously using FastAPI BackgroundTasks.

Benefits:
- non-blocking APIs
- improved responsiveness
- scalable indexing pipeline

---

# 🌳 Multi-language Parsing

The project uses Tree-sitter for language-aware syntax parsing.

Currently supported:
- Python
- JavaScript
- TypeScript

---

# 🚀 Setup Instructions

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

## 4. Install Ollama

Download Ollama:

https://ollama.com

Then pull Mistral model:

```bash
ollama run mistral
```

---

## 5. Start Backend

```bash
cd app

uvicorn main:app --reload
```

---

## 6. Open Swagger Docs

```text
http://127.0.0.1:8000/docs
```

---

# 🧪 Example Workflow

## Step 1 — Index Repository

```text
POST /index
```

Repository:
```text
https://github.com/psf/requests
```

---

## Step 2 — Ask Questions

```text
GET /chat
```

Example:
```text
How does request handling work?
```

---

# 📌 Future Improvements

- 🔥 Function dependency graphs
- 🔥 Code flow tracing
- 🔥 Multi-repository indexing
- 🔥 Streaming LLM responses
- 🔥 Frontend workspace UI
- 🔥 Docker deployment
- 🔥 Distributed task queues
- 🔥 Agentic repository navigation
- 🔥 Reranking models
- 🔥 Repository analytics dashboard

---

# ⚠️ Current Limitations

- CPU-only embedding generation
- In-memory conversation history
- Single-node FAISS indexing
- No distributed workers yet

---

# 🎯 Learning Outcomes

This project demonstrates:

- Backend system design
- Retrieval-Augmented Generation (RAG)
- Vector databases
- Semantic retrieval systems
- Hybrid search systems
- Conversational AI
- Multi-language syntax parsing
- Async backend processing
- Repository ingestion pipelines
- AI systems engineering

---

# 📜 License

MIT License
