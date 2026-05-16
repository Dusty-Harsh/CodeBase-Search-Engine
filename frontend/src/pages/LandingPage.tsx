import React, { useState, useEffect } from 'react';
import {
    Search, GitBranch, BrainCircuit, MessageSquare,
    Code2, Database, Network, Cpu, ChevronRight,
    Terminal, FolderGit2, Sparkles, ArrowRight, X,
    Menu, Bot, Layout, Zap, Fingerprint, Activity,
    FileCode2, Check
} from 'lucide-react';

const GlobalStyles = () => (
    <style>{`
    :root {
      color-scheme: dark;
    }
    body {
      background-color: #030303;
      color: #fafafa;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(1deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    
    @keyframes float-reverse {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(20px) rotate(-1deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }

    @keyframes border-beam {
      100% { offset-distance: 100%; }
    }

    @keyframes grid-scroll {
      0% { transform: translateY(0); }
      100% { transform: translateY(40px); }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-float-delayed {
      animation: float-reverse 7s ease-in-out infinite 1s;
    }

    .animate-pulse-glow {
      animation: pulse-glow 4s ease-in-out infinite;
    }

    .bg-grid-pattern {
      background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    .glass-panel {
      background: rgba(20, 20, 20, 0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    
    .text-gradient {
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: linear-gradient(90deg, #fff 0%, #a5b4fc 50%, #818cf8 100%);
    }

    .text-gradient-purple {
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: linear-gradient(135deg, #c084fc 0%, #818cf8 100%);
    }

    /* Hide scrollbar for clean UI */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #030303; 
    }
    ::-webkit-scrollbar-thumb {
      background: #333; 
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }
  `}</style>
);

const FEATURES = [
    {
        icon: Search,
        title: "Semantic Search",
        description: "Search by intent, not just keywords. Find exact logic blocks across thousands of files instantly."
    },
    {
        icon: Database,
        title: "Hybrid Retrieval",
        description: "Combines dense vector embeddings with BM25 lexical search for unmatched retrieval accuracy."
    },
    {
        icon: Network,
        title: "Graph-Aware Reasoning",
        description: "Understands relationships. If you change a function, it knows which downstream services are affected."
    },
    {
        icon: MessageSquare,
        title: "AI Repository Chat",
        description: "Talk to your codebase naturally. Ask 'How does auth work?' and get a deeply contextual answer."
    },
    {
        icon: FileCode2,
        title: "Multi-language Parsing",
        description: "Built-in Tree-sitter integration ensures deep structural understanding of 40+ programming languages."
    },
    {
        icon: BrainCircuit,
        title: "Conversational Memory",
        description: "Remembers previous prompts and context within your session for fluid, ongoing technical discussions."
    },
    {
        icon: GitBranch,
        title: "Dependency Graphs",
        description: "Generates real-time visual dependency maps so you can navigate complex microservices easily."
    },
    {
        icon: Cpu,
        title: "Local LLM Integration",
        description: "Privacy first. Connect local open-source models via Ollama to keep your proprietary code strictly offline."
    }
];

const FLOW_STEPS = [
    { icon: FolderGit2, title: "GitHub Repository", desc: "Connect your repo securely." },
    { icon: GitBranch, title: "Tree-sitter Parsing", desc: "Extract ASTs and logic structures." },
    { icon: Fingerprint, title: "Semantic Embeddings", desc: "Vectorize code blocks." },
    { icon: Database, title: "Hybrid Retrieval", desc: "Index for fast, accurate search." },
    { icon: Network, title: "Graph Expansion", desc: "Map code dependencies." },
    { icon: Cpu, title: "Local LLM Reasoning", desc: "Analyze securely offline." },
    { icon: Bot, title: "AI Responses", desc: "Interact via chat UI." }
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#030303]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                        <BrainCircuit className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="font-semibold tracking-tight text-lg text-white">SemanticCode<span className="text-indigo-400">.ai</span></span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
                    <a href="#workspace" className="hover:text-white transition-colors">Workspace</a>
                    <a href="#why-it-matters" className="hover:text-white transition-colors">Why It Matters</a>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <a href="/index" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Sign In</a>
                    <a href="/index" className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors">
                        Get Started
                    </a>
                </div>

                <button className="md:hidden text-zinc-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-[#0a0a0a] border-b border-white/5 p-6 flex flex-col gap-4 glass-panel">
                    <a href="#features" className="text-zinc-300 py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="#architecture" className="text-zinc-300 py-2" onClick={() => setMobileMenuOpen(false)}>Architecture</a>
                    <a href="#workspace" className="text-zinc-300 py-2" onClick={() => setMobileMenuOpen(false)}>Workspace</a>
                    <a href="/index" className="mt-4 px-4 py-3 rounded-md bg-white text-black text-center font-medium">Get Started</a>
                </div>
            )}
        </nav>
    );
};

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none animate-pulse-glow" />
            <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

            {/* Floating Code Snippets - Decorative */}
            <div className="hidden lg:block absolute top-1/4 left-[10%] glass-panel p-4 rounded-xl text-xs font-mono text-indigo-300 animate-float border-indigo-500/20 shadow-2xl shadow-indigo-900/20 opacity-70">
                <div className="flex gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <span className="text-pink-400">import</span> &#123; createEmbedding &#125; <span className="text-pink-400">from</span> <span className="text-green-400">'@ai/core'</span>;<br />
                <span className="text-blue-400">const</span> <span className="text-yellow-200">vector</span> = <span className="text-pink-400">await</span> <span className="text-blue-200">createEmbedding</span>(ast.node);
            </div>

            <div className="hidden lg:block absolute bottom-1/3 right-[10%] glass-panel p-4 rounded-xl text-xs font-mono text-indigo-300 animate-float-delayed border-purple-500/20 shadow-2xl shadow-purple-900/20 opacity-70">
                <span className="text-zinc-500">{"// Semantic search execution"}</span><br />
                <span className="text-blue-400">const</span> results = <span className="text-pink-400">await</span> <span className="text-blue-200">db.query</span>(&#123;<br />
                &nbsp;&nbsp;vector,<br />
                &nbsp;&nbsp;topK: <span className="text-orange-400">5</span>,<br />
                &nbsp;&nbsp;filter: &#123; lang: <span className="text-green-400">'typescript'</span> &#125;<br />
                &#125;);
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8 backdrop-blur-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>SemanticCode 2.0 is now available</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                    Understand Any Codebase <br className="hidden md:block" />
                    <span className="text-gradient">with AI Intelligence</span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    SemanticCode.ai transforms repositories into conversational AI workspaces using semantic retrieval, graph-aware reasoning, and local LLM intelligence.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/index" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group">
                        Let's Begin
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="#architecture" className="w-full sm:w-auto px-8 py-4 rounded-lg glass-panel text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        View Architecture
                    </a>
                </div>
            </div>
        </section>
    );
};

const FeaturesSection = () => {
    return (
        <section id="features" className="py-32 relative border-t border-white/5 bg-[#030303]">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Engineered for deep understanding</h2>
                    <p className="text-zinc-400 text-lg">
                        Stop grepping through thousands of files. Our platform combines dense vector search with architectural graph awareness to answer your hardest technical questions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((feature, idx) => (
                        <div
                            key={idx}
                            className="glass-panel p-8 rounded-2xl hover:bg-white/[0.08] transition-all duration-300 group hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors">
                                <feature.icon className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{feature.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ArchitectureSection = () => {
    return (
        <section id="architecture" className="py-32 relative border-t border-white/5 bg-[#0a0a0a] overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Architecture Flow</h2>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        From raw source code to intelligent reasoning. See how SemanticCode processes your repositories into a structured, queryable knowledge base.
                    </p>
                </div>

                <div className="relative">
                    {/* Desktop Flow Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2" />

                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 relative z-10">
                        {FLOW_STEPS.map((step, idx) => (
                            <div key={idx} className="relative flex lg:flex-col items-center gap-6 lg:gap-4 group">
                                {/* Mobile Connector */}
                                {idx !== FLOW_STEPS.length - 1 && (
                                    <div className="lg:hidden absolute left-8 top-16 w-[2px] h-full bg-white/5" />
                                )}

                                <div className="relative z-10 w-16 h-16 rounded-2xl glass-panel flex items-center justify-center flex-shrink-0 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
                                    <step.icon className="w-8 h-8 text-zinc-400 group-hover:text-indigo-400 transition-colors" />

                                    {/* Glowing dot for desktop flow */}
                                    <div className="hidden lg:block absolute -top-[2px] left-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2" />
                                </div>

                                <div className="lg:text-center">
                                    <h4 className="text-white font-medium mb-1 text-sm">{step.title}</h4>
                                    <p className="text-zinc-500 text-xs hidden lg:block">{step.desc}</p>
                                    <p className="text-zinc-500 text-sm lg:hidden">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const WorkspacePreviewSection = () => {
    return (
        <section id="workspace" className="py-32 relative border-t border-white/5 bg-[#030303]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Your Intelligent Workspace</h2>
                    <p className="text-zinc-400 text-lg">
                        A premium IDE-like experience in your browser. Chat with your repo, visualize dependencies, and write better code with full context.
                    </p>
                </div>

                {/* IDE Mockup */}
                <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-indigo-500/5 flex flex-col h-[700px]">

                    {/* IDE Header */}
                    <div className="h-12 border-b border-white/5 flex items-center px-4 bg-[#0a0a0a] justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-xs text-zinc-400 font-mono">
                            <Search className="w-3 h-3" />
                            <span>Ask SemanticCode (⌘K)</span>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-500">
                            <Activity className="w-4 h-4" />
                            <Layout className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="flex flex-1 overflow-hidden">
                        {/* Sidebar (File Tree) */}
                        <div className="w-64 border-r border-white/5 bg-[#030303] flex flex-col hidden md:flex">
                            <div className="p-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase border-b border-white/5">
                                Explorer
                            </div>
                            <div className="p-2 flex flex-col gap-1 text-sm font-mono text-zinc-400">
                                <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded cursor-pointer text-white bg-white/5">
                                    <ChevronRight className="w-4 h-4 rotate-90" />
                                    <span className="text-indigo-400">src</span>
                                </div>
                                <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded cursor-pointer pl-6">
                                    <FileCode2 className="w-4 h-4 text-blue-400" />
                                    <span>main.ts</span>
                                </div>
                                <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded cursor-pointer pl-6">
                                    <FileCode2 className="w-4 h-4 text-yellow-400" />
                                    <span>retriever.ts</span>
                                </div>
                                <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded cursor-pointer pl-6">
                                    <FileCode2 className="w-4 h-4 text-green-400" />
                                    <span>graph.ts</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Code Editor */}
                        <div className="flex-1 bg-[#0a0a0a] flex flex-col relative">
                            <div className="flex text-xs font-mono text-zinc-400 border-b border-white/5 bg-[#050505]">
                                <div className="px-4 py-2 border-r border-white/5 bg-[#0a0a0a] text-indigo-300 flex items-center gap-2">
                                    <FileCode2 className="w-4 h-4 text-yellow-400" /> retriever.ts
                                </div>
                                <div className="px-4 py-2 border-r border-white/5 hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                                    <FileCode2 className="w-4 h-4 text-green-400" /> graph.ts
                                </div>
                            </div>
                            <div className="p-6 font-mono text-sm leading-relaxed overflow-y-auto">
                                <div className="text-zinc-500 mb-4">{"// Core semantic retrieval logic"}</div>
                                <div><span className="text-pink-500">export class</span> <span className="text-yellow-200">SemanticRetriever</span> &#123;</div>
                                <div className="pl-4 mt-2">
                                    <span className="text-blue-400">private</span> db: <span className="text-green-300">VectorDB</span>;
                                </div>
                                <div className="pl-4 mt-4">
                                    <span className="text-pink-500">constructor</span>(connectionString: <span className="text-green-300">string</span>) &#123;<br />
                                    &nbsp;&nbsp;<span className="text-blue-400">this</span>.db = <span className="text-pink-500">new</span> <span className="text-yellow-200">VectorDB</span>(connectionString);<br />
                                    &#125;
                                </div>
                                <div className="pl-4 mt-4">
                                    <span className="text-pink-500">async</span> <span className="text-blue-200">queryByIntent</span>(prompt: <span className="text-green-300">string</span>): <span className="text-green-300">Promise</span>&lt;<span className="text-green-300">Result</span>[]&gt; &#123;<br />
                                    &nbsp;&nbsp;<span className="text-blue-400">const</span> embedding = <span className="text-pink-500">await</span> <span className="text-blue-200">generateEmbedding</span>(prompt);<br />
                                    <br />
                                    &nbsp;&nbsp;<span className="text-zinc-500">{"// Perform hybrid search combining dense and lexical vectors"}</span><br />
                                    &nbsp;&nbsp;<span className="text-blue-400">const</span> nodes = <span className="text-pink-500">await</span> <span className="text-blue-400">this</span>.db.<span className="text-blue-200">hybridSearch</span>(&#123;<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;vector: embedding,<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;alpha: <span className="text-orange-400">0.75</span>, <span className="text-zinc-500">{"// Bias towards semantic meaning"}</span><br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;limit: <span className="text-orange-400">10</span><br />
                                    &nbsp;&nbsp;&#125;);<br />
                                    <br />
                                    &nbsp;&nbsp;<span className="text-pink-500">return</span> <span className="text-blue-400">this</span>.<span className="text-blue-200">expandGraphContext</span>(nodes);<br />
                                    &#125;
                                </div>
                                <div>&#125;</div>
                            </div>

                            {/* Floating Dependency Map Snippet inside editor */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border-indigo-500/20 flex items-center justify-between shadow-2xl shadow-[#000]">
                                <div className="flex items-center gap-4">
                                    <Network className="text-indigo-400 w-5 h-5" />
                                    <div>
                                        <div className="text-sm font-medium text-white">Dependency Graph Expanded</div>
                                        <div className="text-xs text-zinc-400">Retrieved 3 downstream files affected by Retriever changes.</div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/30">
                                    View Graph
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar (AI Chat) */}
                        <div className="w-80 border-l border-white/5 bg-[#030303] flex flex-col hidden lg:flex">
                            <div className="p-4 border-b border-white/5 flex items-center gap-2">
                                <Bot className="w-5 h-5 text-indigo-400" />
                                <span className="font-medium text-sm text-white">AI Assistant</span>
                            </div>
                            <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
                                <div className="self-end bg-white/10 p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm text-zinc-200">
                                    How does the hybrid search work in the Retriever class?
                                </div>
                                <div className="self-start bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-2xl rounded-tl-sm max-w-[90%] text-sm text-zinc-300">
                                    <p className="mb-2">The <code className="text-indigo-300 bg-indigo-500/10 px-1 rounded">queryByIntent</code> method uses a hybrid approach:</p>
                                    <ol className="list-decimal pl-4 space-y-1 text-xs">
                                        <li>Generates an embedding from your prompt.</li>
                                        <li>Calls <code className="text-indigo-300">db.hybridSearch</code> with an <code className="text-indigo-300">alpha</code> of 0.75, leaning heavily on dense semantic similarity rather than raw keyword matches.</li>
                                        <li>Passes results to <code className="text-indigo-300">expandGraphContext</code> to fetch related AST nodes.</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="p-4 border-t border-white/5">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Ask about this code..."
                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-3 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
                                        <Zap className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const WhyItMattersSection = () => {
    return (
        <section id="why-it-matters" className="py-32 relative border-t border-white/5 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            Code search is broken. <br />
                            <span className="text-zinc-500">We fixed it.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            Traditional regex and keyword searches fail when looking for architectural concepts, complex logic, or abstract patterns. You end up wasting hours piecing together fragmented files.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Understands intent, not just string matches",
                                "Maps dependencies automatically",
                                "Provides conversational onboarding for new hires",
                                "Runs locally for maximum enterprise security"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-zinc-300">
                                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-indigo-400" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
                        <div className="relative glass-panel rounded-3xl p-8 border border-white/10">
                            <div className="mb-6 flex items-center gap-4 border-b border-white/5 pb-6">
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <X className="w-6 h-6 text-red-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">The Old Way</h4>
                                    <p className="text-zinc-500 text-sm">grep -r "auth implementation" .</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">SemanticCode</h4>
                                    <p className="text-indigo-300/80 text-sm">"How does the auth flow handle expired JWT tokens across microservices?"</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

const FooterCTA = () => {
    return (
        <footer className="relative border-t border-white/5 bg-[#030303] overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 py-32 px-6 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    Turn Repositories into <br />
                    <span className="text-gradient-purple">Intelligent Workspaces</span>
                </h2>
                <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
                    Join thousands of elite engineering teams using SemanticCode to navigate, understand, and build faster.
                </p>

                <a href="/index" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                    Start Exploring
                    <ArrowRight className="w-4 h-4" />
                </a>
            </div>

            <div className="border-t border-white/5 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <BrainCircuit className="w-4 h-4 text-zinc-400" />
                        <span>© 2026 SemanticCode.ai. All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-white transition-colors">Documentation</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#030303] text-zinc-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            <GlobalStyles />
            <Navbar />

            <main>
                <HeroSection />
                <FeaturesSection />
                <ArchitectureSection />
                <WorkspacePreviewSection />
                <WhyItMattersSection />
            </main>

            <FooterCTA />
        </div>
    );
}