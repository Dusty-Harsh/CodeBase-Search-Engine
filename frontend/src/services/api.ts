import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const api = axios.create({
    baseURL: API_BASE_URL,
});


// =========================
// CHAT API
// =========================

export async function chatWithRepository(query: string) {

    const response = await api.get("/chat", {
        params: { query }
    });

    return response.data;
}


// =========================
// SEARCH API
// =========================

export async function searchCodebase(query: string) {

    const response = await api.get("/search", {
        params: { query }
    });

    return response.data;
}


// =========================
// INDEX REPO API
// =========================

export async function indexRepository(repoUrl: string) {

    const response = await api.post("/index", null, {
        params: { repo_url: repoUrl }
    });

    return response.data;
}


// =========================
// MEMORY APIs
// =========================

export async function getMemory() {

    const response = await api.get("/memory");

    return response.data;
}


export async function clearMemory() {

    const response = await api.delete("/memory");

    return response.data;
}


// =========================
// GRAPH API
// =========================

export async function getDependencyGraph() {

    const response = await api.get("/graph");

    return response.data;
}