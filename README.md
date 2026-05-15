# 🚀 Semantic Codebase Search Engine

An AI-powered semantic code search engine and conversational repository assistant that enables developers to query large codebases using natural language.

The platform indexes real GitHub repositories, parses multi-language codebases using Tree-sitter, generates semantic embeddings, stores vectors in FAISS, performs hybrid retrieval (semantic + keyword search), and provides conversational AI responses over repository context.

The system also includes a full-stack AI developer workspace built with React + Tailwind for interactive repository exploration and AI-assisted code understanding.

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
- 🖥️ Full-stack React developer workspace
- 🌐 Frontend/backend API integration
- 🧠 Graph-aware retrieval and dependency reasoning

---

# 🖥️ Frontend Workspace

The project includes a modern AI-powered developer workspace built using React + Tailwind.

Frontend capabilities include:
- AI-powered repository chat
- Semantic code retrieval UI
- Retrieved context viewer
- Repository indexing dashboard
- Graph-aware repository reasoning
- Interactive developer-style layout
- Real-time backend integration

The UI is inspired by modern developer tools such as:
- Cursor
- GitHub Copilot Chat
- Sourcegraph Cody

---

# 🧠 Example Queries

```text
Where is authentication implemented?

How are HTTP requests handled?

Explain routing logic.

Where is middleware used?

How does token validation work?

Which functions call validate_token?
```

---

# 🏗️ Full System Architecture

```text
                    React Frontend Workspace
                                ↓
                        FastAPI Backend APIs
                                ↓
                   Hybrid Retrieval Engine
                  (Semantic + BM25 Search)
                                ↓
                    Dependency Graph Layer
                                ↓
                    Repository Context Expansion
                                ↓
                        FAISS Vector Store
                                ↓
                     Embedding Retrieval Layer
                                ↓
                 Tree-sitter Multi-language Parsing
                                ↓
                        GitHub Repository
                                ↓
                     Ollama + Mistral LLM
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
- Graph-aware Retrieval
- Dependency Graph Expansion
- Async Background Processing
- Persistent Vector Indexing
- Repository Ingestion Pipelines
- Local LLM Orchestration
- Full-stack AI System Design

---

# ⚙️ Tech Stack

| Component | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| UI Icons | Lucide React |
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
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   ├── components/
│   │   └── App.tsx
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

## Dependency Graph

```http
GET /graph
```

---

# 🔍 How Hybrid Retrieval Works

The system combines:

## 1. Semantic Search
- Embedding-based similarity search
- Captures meaning and developer intent

## 2. BM25 Keyword Search
- Exact keyword matching
- Improves precision for APIs/libraries

## Final Retrieval
Both retrieval methods are merged to produce highly relevant repository context.

---

# 🧠 Graph-Aware Retrieval

The system builds dependency graphs during repository indexing using AST analysis.

This enables:
- function relationship tracing
- contextual retrieval expansion
- architecture-aware AI responses
- execution flow understanding

Example:

```text
login_user()
    ↓
validate_token()
    ↓
auth_middleware()
```

The dependency graph is injected into the retrieval pipeline to improve repository reasoning quality.

---

# 💬 Conversational Repository AI

The system supports repository-aware conversations using:

- semantic retrieval
- hybrid search
- dependency graph expansion
- conversational memory
- local LLM inference

This enables follow-up questions such as:

```text
How does authentication work?

What happens after validation?

Which middleware calls it?
```

without losing repository context.

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

## 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Install Frontend Dependencies

```bash
cd frontend

npm install
```

---

## 5. Install Ollama

Download Ollama:

https://ollama.com

Then pull the Mistral model:

```bash
ollama run mistral
```

---

# ▶️ Running the Full System

## Terminal 1 — Backend

```bash
venv\Scripts\activate

cd app

uvicorn main:app --reload
```

---

## Terminal 2 — Ollama

```bash
ollama serve
```

---

## Terminal 3 — Frontend

```bash
cd frontend

npm run dev
```

---

# 🌐 Frontend URL

```text
http://localhost:5173
```

---

# 📚 Swagger API Docs

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
How does request handling work?
```

```text
Explain authentication flow.
```

```text
Which functions call validate_token?
```

---

# 📌 Future Improvements

- 🔥 Streaming AI responses
- 🔥 Dependency graph visualization
- 🔥 Multi-repository intelligence
- 🔥 Dockerized deployment
- 🔥 Distributed worker queues
- 🔥 Incremental indexing
- 🔥 GPU embedding acceleration
- 🔥 Agentic repository navigation
- 🔥 Repository summarization
- 🔥 Architecture visualization

---

# ⚠️ Current Limitations

- CPU-only embedding generation
- In-memory conversation history
- Single-node FAISS indexing
- No distributed workers yet
- Simplified frontend repository state synchronization

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
- Graph-aware retrieval
- Frontend/backend API integration
- Full-stack AI application development
- Local LLM orchestration
- AI systems engineering

---

# 🚀 Why This Project Matters

Traditional code search relies heavily on exact keyword matching, making large repositories difficult to navigate and understand.

This project explores a modern AI-first approach to repository understanding by combining:
- semantic embeddings
- hybrid retrieval
- graph-aware reasoning
- conversational AI
- multi-language parsing

The result is an AI-powered developer workspace capable of understanding repository structure, retrieving relevant code context, and supporting conversational software engineering workflows.

---

# 📜 License

MIT License