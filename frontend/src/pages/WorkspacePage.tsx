import React, { useState, useEffect, useRef } from 'react';
import { chatWithRepository } from '../services/api';
import {
    Terminal, GitBranch, Database, Cpu, Network, Sparkles,
    ChevronRight, MessageSquare, Settings, Send, FileCode2,
    Layers, Search, Command, CheckCircle2, RotateCw, Trash2,
    Box, Zap, Braces, ArrowRight, Activity
} from 'lucide-react';

const customStyles = `
  .bg-grid-pattern {
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 32px 32px;
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  }
  .glass-panel {
    background: linear-gradient(180deg, rgba(15,15,18,0.7) 0%, rgba(10,10,12,0.9) 100%);
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    border-left: 1px solid rgba(255, 255, 255, 0.05);
  }
  .input-glow:focus-within {
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.15), inset 0 0 20px rgba(99, 102, 241, 0.05);
    border-color: rgba(99, 102, 241, 0.4);
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .code-block-gradient {
    background: linear-gradient(180deg, #111116 0%, #0a0a0c 100%);
  }
  @keyframes flow {
    0% { stroke-dashoffset: 24; }
    100% { stroke-dashoffset: 0; }
  }
  .animate-flow {
    stroke-dasharray: 4 4;
    animation: flow 1s linear infinite;
  }
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-message {
    animation: fade-in-up 0.4s ease-out forwards;
  }
`;

const INITIAL_MESSAGES = [
    {
        id: 1,
        role: 'user',
        content: 'Where is the authentication logic handled for the API?'
    },
    {
        id: 2,
        role: 'assistant',
        isReasoning: true,
        content: 'Querying semantic index for "authentication logic API"... Found 14 matching nodes. Expanding dependency graph... Tracing JWT validation middleware and auth controllers. Local LLM generating response...'
    },
    {
        id: 3,
        role: 'assistant',
        content: `Based on the semantic graph, the core authentication logic is centralized in the \`src/middleware/auth.ts\` and \`src/controllers/auth.controller.ts\` files. 

The API uses **JWT (JSON Web Tokens)** for stateless authentication. Here is the primary middleware that intercepts requests:

\`\`\`typescript
// src/middleware/auth.ts
import { verifyToken } from '../utils/jwt';

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  try {
    const decoded = await verifyToken(token);
    req.user = decoded; // Injects user payload into context
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
\`\`\`

This middleware acts as a gatekeeper and is applied to protected routes via the \`API Router\` node in the dependency graph.`
    }
];

const RETRIEVED_CONTEXT = [
    { id: 1, file: 'src/middleware/auth.ts', type: 'Function', name: 'authenticate', relevance: 98, codeSnippet: 'export const authenticate = async (req, res, next) => {\n  const token = req.headers.authorization...' },
    { id: 2, file: 'src/utils/jwt.ts', type: 'Helper', name: 'verifyToken', relevance: 92, codeSnippet: 'export const verifyToken = (token: string) => {\n  return jwt.verify(token, process.env.SECRET)...' },
    { id: 3, file: 'src/controllers/auth.controller.ts', type: 'Class', name: 'AuthController.login', relevance: 85, codeSnippet: 'public async login(req: Request, res: Response) {\n  const { email, password } = req.body...' },
];

export default function WorkspacePage() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [retrievedContext, setRetrievedContext] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [rightPanelTab, setRightPanelTab] = useState('context'); // 'context' or 'graph'
    const chatEndRef = useRef(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);

        try {
            const response = await chatWithRepository(currentInput);

            if (response.sources && Array.isArray(response.sources)) {
                const formattedSources = response.sources.map((source: any, index: number) => ({
                    id: index,
                    file: source.file_path || "unknown",
                    type: "Function",
                    name: source.function_name || "unknown",
                    relevance: 95,
                    codeSnippet: source.code || ""
                }));
                setRetrievedContext(formattedSources);
            }

            const aiMessage = {
                id: Date.now() + 1,
                role: 'assistant',
                content: response.answer
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="h-screen w-screen overflow-hidden bg-[#030303] text-white flex font-sans selection:bg-indigo-500/30 relative">
            <style>{customStyles}</style>

            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-indigo-900/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            {/* 1. LEFT SIDEBAR - CONTROL PANEL */}
            <div className="w-[280px] glass-panel z-10 flex flex-col shrink-0">

                {/* Logo / Header */}
                <div className="p-5 flex items-center gap-3 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h1 className="font-semibold tracking-tight text-sm">SemanticCode.ai</h1>
                        <p className="text-[10px] text-indigo-400 font-mono uppercase tracking-wider">Workspace Mode</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-6">

                    {/* Active Repository Card */}
                    <div>
                        <h2 className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-3">Active Repository</h2>
                        <div className="bg-[#0a0a0c] border border-white/10 rounded-xl p-4 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

                            <div className="flex items-center gap-2 mb-4">
                                <Terminal className="w-4 h-4 text-neutral-400" />
                                <span className="font-mono text-sm text-neutral-200">psf/requests</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-neutral-500 font-medium">INDEXED CHUNKS</span>
                                    <span className="text-sm font-mono text-indigo-300">14,208</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-neutral-500 font-medium">GRAPH NODES</span>
                                    <span className="text-sm font-mono text-purple-300">3,492</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono">Python</span>
                                <span className="px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-mono">TS</span>
                            </div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div>
                        <h2 className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-3">System Status</h2>
                        <div className="flex flex-col gap-2">
                            <StatusIndicator icon={Database} text="Vector DB Connected" active={true} />
                            <StatusIndicator icon={Network} text="Semantic Graph Ready" active={true} />
                            <StatusIndicator icon={Cpu} text="Local LLM Running" active={true} color="emerald" />
                        </div>
                    </div>

                    {/* Actions */}
                    <div>
                        <h2 className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-3">Actions</h2>
                        <div className="flex flex-col gap-1.5">
                            <ActionButton icon={RotateCw} text="Sync Repository" />
                            <ActionButton icon={Trash2} text="Clear Context Memory" />
                            <ActionButton icon={Settings} text="Workspace Settings" />
                        </div>
                    </div>

                    {/* Recent Conversations */}
                    <div className="mt-auto">
                        <h2 className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-3">Recent Chats</h2>
                        <div className="flex flex-col gap-2">
                            <div className="text-xs text-neutral-400 hover:text-white cursor-pointer truncate transition-colors flex items-center gap-2">
                                <MessageSquare className="w-3 h-3" /> API Auth Logic
                            </div>
                            <div className="text-xs text-neutral-600 hover:text-white cursor-pointer truncate transition-colors flex items-center gap-2">
                                <MessageSquare className="w-3 h-3" /> Retry mechanism in sessions...
                            </div>
                            <div className="text-xs text-neutral-600 hover:text-white cursor-pointer truncate transition-colors flex items-center gap-2">
                                <MessageSquare className="w-3 h-3" /> Optimize URL parsing
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. CENTER PANEL - AI CONVERSATION WORKSPACE */}
            <div className="flex-1 flex flex-col relative z-10 min-w-0">

                {/* Top Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#030303]/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-2 text-sm text-neutral-400 font-mono">
                        <span className="text-white">Workspace</span>
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                        <span>psf/requests</span>
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                        <span className="text-indigo-400">Current Session</span>
                    </div>

                    {/* Floating AI Status Bar */}
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-neutral-300">Llama 3 (Local)</span>
                        </div>
                        <div className="w-px h-3 bg-white/10"></div>
                        <div className="flex items-center gap-1.5 text-indigo-400">
                            <Activity className="w-3 h-3" />
                            <span>Graph Engine Active</span>
                        </div>
                    </div>
                </div>

                {/* Chat Feed */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-8 md:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-32">
                        {messages.map((msg) => (
                            <ChatMessage key={msg.id} message={msg} />
                        ))}
                        {isTyping && (
                            <div className="flex gap-4 animate-message opacity-50">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                                </div>
                                <div className="flex-1 flex items-center gap-2 text-sm text-neutral-400 font-mono">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    <span className="ml-2">Synthesizing semantic graph...</span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#030303] via-[#030303]/90 to-transparent">
                    <div className="max-w-4xl mx-auto">
                        <form
                            onSubmit={handleSend}
                            className="relative rounded-2xl bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 input-glow transition-all duration-300 flex items-end p-2"
                        >
                            <div className="p-3 shrink-0 text-neutral-500">
                                <Command className="w-5 h-5" />
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend(e);
                                    }
                                }}
                                placeholder="Ask anything about the repository architecture, code, or logic..."
                                className="w-full bg-transparent border-none text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-0 resize-none max-h-[200px] min-h-[44px] py-3 text-sm"
                                rows={1}
                            />
                            <div className="p-2 shrink-0 flex items-center gap-2">
                                <div className="hidden sm:flex items-center gap-1 text-[10px] text-neutral-600 font-mono px-2">
                                    <span>↵</span> to send
                                </div>
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center
                    ${input.trim()
                                            ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:bg-indigo-500'
                                            : 'bg-white/5 text-neutral-600 cursor-not-allowed'}`}
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

            {/* 3. RIGHT PANEL - CONTEXT & GRAPH VIEWER */}
            <div className="w-[400px] glass-panel z-10 flex flex-col shrink-0">

                {/* Tabs Header */}
                <div className="flex border-b border-white/5">
                    <button
                        onClick={() => setRightPanelTab('context')}
                        className={`flex-1 py-4 text-xs font-semibold tracking-wide uppercase transition-colors relative
              ${rightPanelTab === 'context' ? 'text-indigo-400' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                        Retrieved Context
                        {rightPanelTab === 'context' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                        )}
                    </button>
                    <button
                        onClick={() => setRightPanelTab('graph')}
                        className={`flex-1 py-4 text-xs font-semibold tracking-wide uppercase transition-colors relative
              ${rightPanelTab === 'graph' ? 'text-purple-400' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                        Dependency Graph
                        {rightPanelTab === 'graph' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                        )}
                    </button>
                </div>

                {/* Panel Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative">

                    {/* CONTEXT TAB */}
                    {rightPanelTab === 'context' && (
                        <div className="p-4 flex flex-col gap-4 animate-fade-in-up">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-neutral-400 font-mono">Semantic Matches: 3</span>
                                <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                                    <CheckCircle2 className="w-3 h-3" /> Grounded
                                </span>
                            </div>

                            {retrievedContext.map((ctx) => (
                                <div key={ctx.id} className="bg-black/50 border border-white/5 rounded-xl overflow-hidden hover:border-indigo-500/30 transition-colors group">
                                    <div className="flex items-center justify-between p-3 border-b border-white/5 bg-white/[0.02]">
                                        <div className="flex items-center gap-2 truncate">
                                            <FileCode2 className="w-4 h-4 text-indigo-400 shrink-0" />
                                            <span className="text-xs font-mono text-neutral-300 truncate">{ctx.file}</span>
                                        </div>
                                        <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded font-mono shrink-0">
                                            {ctx.relevance}%
                                        </span>
                                    </div>
                                    <div className="p-3 bg-[#0d0d12]">
                                        <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                                            <Box className="w-3 h-3" /> {ctx.type} • {ctx.name}
                                        </div>
                                        <pre className="text-xs text-neutral-400 font-mono overflow-hidden">
                                            <code>{ctx.codeSnippet}</code>
                                        </pre>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* GRAPH TAB */}
                    {rightPanelTab === 'graph' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0c] animate-fade-in-up overflow-hidden">
                            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

                            {/* Synthetic Graph Visualization */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full" pointerEvents="none">
                                    {/* Edges */}
                                    <path d="M 200 150 Q 200 250 120 300" fill="none" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="2" />
                                    <path d="M 200 150 Q 200 250 120 300" fill="none" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" className="animate-flow" />

                                    <path d="M 200 150 Q 200 250 280 300" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="2" />
                                    <path d="M 200 150 Q 200 250 280 300" fill="none" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="2" className="animate-flow" style={{ animationDelay: '0.5s' }} />
                                </svg>

                                {/* Nodes */}
                                <div className="absolute top-[120px] flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-2xl bg-[#030303] border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)] flex items-center justify-center z-10">
                                        <Network className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <span className="text-[10px] font-mono text-neutral-400 bg-black/50 px-2 py-1 rounded">auth.controller.ts</span>
                                </div>

                                <div className="absolute top-[280px] left-[60px] flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-[#030303] border border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)] flex items-center justify-center z-10">
                                        <Layers className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <span className="text-[10px] font-mono text-neutral-400 bg-black/50 px-2 py-1 rounded">auth.ts (Middleware)</span>
                                </div>

                                <div className="absolute top-[280px] right-[60px] flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-[#030303] border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center z-10">
                                        <Braces className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <span className="text-[10px] font-mono text-neutral-400 bg-black/50 px-2 py-1 rounded">jwt.ts (Utils)</span>
                                </div>

                                <div className="absolute bottom-6 left-0 right-0 text-center">
                                    <span className="text-xs text-neutral-500 font-mono flex items-center justify-center gap-2">
                                        <Search className="w-3 h-3" /> Live Graph Expansion
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

function StatusIndicator({ icon: Icon, text, active, color = 'indigo' }) {
    const colorMap = {
        indigo: 'text-indigo-400 bg-indigo-400/10 border-indigo-500/20 dot-indigo-500',
        emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20 dot-emerald-500',
    };
    const theme = colorMap[color];

    return (
        <div className="flex items-center gap-3 text-xs text-neutral-300">
            <div className={`w-6 h-6 rounded flex items-center justify-center border ${theme.split(' ').slice(1, 3).join(' ')}`}>
                <Icon className={`w-3.5 h-3.5 ${theme.split(' ')[0]}`} />
            </div>
            <span className="flex-1">{text}</span>
            {active && (
                <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500 shadow-[0_0_8px_rgba(0,0,0,1)] shadow-${color}-500`}></div>
            )}
        </div>
    );
}

function ActionButton({ icon: Icon, text }) {
    return (
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left group w-full">
            <Icon className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
            {text}
        </button>
    );
}

function ChatMessage({ message }) {
    const isUser = message.role === 'user';

    if (message.isReasoning) {
        return (
            <div className="flex gap-4 animate-message opacity-70">
                <div className="w-8 h-8 rounded-lg border border-dashed border-neutral-600 flex items-center justify-center shrink-0">
                    <Network className="w-4 h-4 text-neutral-500" />
                </div>
                <div className="flex-1 text-xs text-neutral-500 font-mono pt-2">
                    {message.content}
                </div>
            </div>
        );
    }

    return (
        <div className={`flex gap-4 animate-message ${isUser ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1
        ${isUser
                    ? 'bg-neutral-800 border border-neutral-700'
                    : 'bg-indigo-500/10 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                }`}
            >
                {isUser ? <Terminal className="w-4 h-4 text-neutral-300" /> : <Sparkles className="w-4 h-4 text-indigo-400" />}
            </div>

            {/* Content */}
            <div className={`flex flex-col gap-2 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
                    {isUser ? 'Developer' : 'Semantic Engine'}
                </div>

                {isUser ? (
                    <div className="bg-neutral-800/80 border border-neutral-700 rounded-2xl rounded-tr-sm px-5 py-3 text-sm text-neutral-200">
                        {message.content}
                    </div>
                ) : (
                    <div className="text-sm text-neutral-300 leading-relaxed prose prose-invert prose-p:leading-relaxed prose-pre:my-4 prose-pre:border prose-pre:border-white/10 w-full">
                        {/* Simple Markdown Renderer for the static demo */}
                        {message.content.split('```').map((part, index) => {
                            if (index % 2 !== 0) {
                                // Code block
                                const language = part.split('\n')[0];
                                const code = part.replace(`${language}\n`, '').trim();
                                return (
                                    <div key={index} className="rounded-xl overflow-hidden border border-white/10 my-4 shadow-xl">
                                        <div className="bg-[#1a1a1f] px-4 py-2 border-b border-white/5 flex justify-between items-center text-xs font-mono">
                                            <span className="text-neutral-400">{language || 'code'}</span>
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-neutral-600"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-neutral-600"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-neutral-600"></div>
                                            </div>
                                        </div>
                                        <pre className="p-4 bg-[#0d0d12] overflow-x-auto custom-scrollbar">
                                            <code className="text-sm font-mono text-indigo-200">
                                                {/* Mock simple syntax highlighting via naive line split for visual effect */}
                                                {code.split('\n').map((line, i) => (
                                                    <div key={i} className="table-row">
                                                        <span className="table-cell pr-4 text-neutral-600 select-none text-right w-8">{i + 1}</span>
                                                        <span className="table-cell">{line}</span>
                                                    </div>
                                                ))}
                                            </code>
                                        </pre>
                                    </div>
                                );
                            }
                            // Text block
                            return <p key={index} className="mb-4 whitespace-pre-wrap">{part.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}