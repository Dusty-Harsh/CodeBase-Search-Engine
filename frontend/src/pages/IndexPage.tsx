import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { indexRepository } from "../services/api";
import {
    FolderGit2,
    Terminal,
    CheckCircle2,
    Loader2,
    Sparkles,
    Code2,
    Network,
    ArrowRight,
    Database,
    Cpu,
    ChevronRight,
    Zap
} from 'lucide-react';

// Custom styles for specific cinematic animations
const customStyles = `
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; filter: blur(40px); }
    50% { opacity: 0.8; filter: blur(60px); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .bg-grid-pattern {
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  }
  .glass-card {
    background: linear-gradient(180deg, rgba(20,20,22,0.7) 0%, rgba(10,10,12,0.8) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .hero-text-gradient {
    background: linear-gradient(to right, #fff, #a5b4fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .shimmer {
    position: relative;
    overflow: hidden;
  }
  .shimmer::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent);
    transform: rotate(30deg);
    animation: shimmer-effect 2.5s infinite linear;
  }
  @keyframes shimmer-effect {
    0% { transform: translateX(-100%) rotate(30deg); }
    100% { transform: translateX(100%) rotate(30deg); }
  }
`;

const INDEXING_STEPS = [
    { id: 1, text: "Cloning Repository", time: 1500, icon: FolderGit2 },
    { id: 2, text: "Parsing Abstract Syntax Trees", time: 2500, icon: Code2 },
    { id: 3, text: "Building Dependency Graph", time: 3000, icon: Network },
    { id: 4, text: "Generating Semantic Embeddings", time: 3500, icon: Database },
    { id: 5, text: "Creating Vector Index", time: 2000, icon: Zap },
    { id: 6, text: "Preparing AI Workspace", time: 1000, icon: Cpu },
];

export default function App() {
    const navigate = useNavigate();
    const [repoUrl, setRepoUrl] = useState('');
    const [status, setStatus] = useState('idle'); // idle, indexing, complete
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        let timeoutId;
        let progressInterval;

        if (status === 'indexing') {
            let currentProgress = 0;
            const totalTime = INDEXING_STEPS.reduce((acc, step) => acc + step.time, 0);
            const updateRate = 50; // ms

            // Smooth progress bar
            progressInterval = setInterval(() => {
                currentProgress += (updateRate / totalTime) * 100;
                if (currentProgress > 100) currentProgress = 100;
                setProgress(currentProgress);
            }, updateRate);

            // Step sequencer
            const runSteps = async () => {
                for (let i = 0; i < INDEXING_STEPS.length; i++) {
                    setCurrentStepIndex(i);
                    await new Promise(resolve => setTimeout(resolve, INDEXING_STEPS[i].time));
                }
                clearInterval(progressInterval);
                setProgress(100);
                setTimeout(() => setStatus('complete'), 600);
            };

            runSteps();
        }

        return () => {
            clearTimeout(timeoutId);
            clearInterval(progressInterval);
        };
    }, [status]);

    const handleStart = async (e) => {
        e.preventDefault();
        if (!repoUrl) return;
        setStatus('indexing');
        await indexRepository(repoUrl);
        setProgress(0);
        setCurrentStepIndex(0);
    };

    const handleOpenWorkspace = () => {
        // Simulated navigation to /workspace
        navigate("/workspace");
    };

    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans overflow-hidden relative selection:bg-indigo-500/30">
            <style>{customStyles}</style>

            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
                {/* Glow Orbs */}
                <div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full mix-blend-screen"
                    style={{ animation: 'pulse-glow 8s ease-in-out infinite' }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full mix-blend-screen"
                    style={{ animation: 'pulse-glow 12s ease-in-out infinite reverse' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]"></div>
            </div>

            {/* Main Layout Container */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">

                {/* Hero Section */}
                <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${status !== 'idle' ? 'opacity-0 -translate-y-10 h-0 overflow-hidden' : 'opacity-100 translate-y-0 mb-12'}`}>
                    <div className="flex flex-col items-center gap-2 mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-sm text-indigo-300 border-indigo-500/20">
                            <Sparkles className="w-4 h-4" />
                            <span>Codebase Search Engine</span>
                        </div>
                        <span className="text-xs text-indigo-400 font-mono uppercase tracking-wider">AI-Powered Repository Intelligence Platform</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 hero-text-gradient">
                        Turn Any Repository Into an AI Workspace
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light">
                        The Codebase Search Engine parses repositories, builds semantic embeddings, constructs dependency graphs,
                        and transforms your codebase into a conversational AI system.
                    </p>
                </div>

                {/* Central Interactive Panel */}
                <div className={`w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${status === 'idle' ? 'max-w-2xl' : 'max-w-3xl'}`}>

                    <div className="glass-card rounded-2xl overflow-hidden relative">

                        {/* Top Border Highlight */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

                        {/* --- STATE: IDLE (INPUT) --- */}
                        <div className={`p-8 sm:p-12 transition-all duration-500 ${status === 'idle' ? 'block' : 'hidden'}`}>
                            <form onSubmit={handleStart} className="flex flex-col gap-6">
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                                        <FolderGit2 className="w-4 h-4" />
                                        GitHub Repository URL
                                    </label>
                                    <div className={`relative flex items-center transition-all duration-300 rounded-xl bg-black/40 border ${focused ? 'border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.2)]' : 'border-white/10'}`}>
                                        <div className="pl-4 text-neutral-500">
                                            <Terminal className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={repoUrl}
                                            onChange={(e) => setRepoUrl(e.target.value)}
                                            onFocus={() => setFocused(true)}
                                            onBlur={() => setFocused(false)}
                                            placeholder="https://github.com/psf/requests"
                                            className="w-full bg-transparent border-none text-white px-4 py-4 focus:outline-none focus:ring-0 placeholder-neutral-600 font-mono text-sm"
                                            required
                                        />
                                        <div className="pr-2">
                                            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-neutral-500">
                                                <span>⌘</span>
                                                <span>V</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!repoUrl}
                                    className={`group relative w-full flex items-center justify-center gap-3 py-4 rounded-xl font-medium transition-all duration-300 overflow-hidden
                    ${repoUrl
                                            ? 'bg-white text-black hover:bg-neutral-200'
                                            : 'bg-white/5 text-neutral-500 cursor-not-allowed border border-white/5'
                                        }`}
                                >
                                    {repoUrl && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        Start Semantic Indexing
                                        <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${repoUrl ? 'group-hover:translate-x-1' : ''}`} />
                                    </span>
                                </button>
                            </form>
                        </div>

                        {/* --- STATE: INDEXING --- */}
                        <div className={`p-8 sm:p-12 transition-all duration-500 ${status === 'indexing' ? 'block' : 'hidden'}`}>
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-1">Indexing Repository</h3>
                                        <p className="text-sm text-neutral-400 font-mono truncate max-w-[250px] sm:max-w-md">{repoUrl}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-light text-indigo-400 font-mono">{Math.round(progress)}%</div>
                                    </div>
                                </div>

                                {/* Master Progress Bar */}
                                <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 relative transition-all duration-[50ms] ease-linear"
                                        style={{ width: `${progress}%` }}
                                    >
                                        <div className="absolute inset-0 w-full h-full shimmer"></div>
                                        <div className="absolute top-0 right-0 w-10 h-full bg-white/30 blur-[2px]"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Step Sequence */}
                            <div className="space-y-1 mt-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {INDEXING_STEPS.map((step, index) => {
                                    const isActive = index === currentStepIndex;
                                    const isCompleted = index < currentStepIndex;
                                    const isPending = index > currentStepIndex;
                                    const StepIcon = step.icon;

                                    return (
                                        <div
                                            key={step.id}
                                            className={`flex items-center p-3 sm:p-4 rounded-xl transition-all duration-500
                        ${isActive ? 'bg-indigo-500/10 border border-indigo-500/20 scale-[1.02]' : 'bg-transparent border border-transparent'}
                        ${isPending ? 'opacity-40' : 'opacity-100'}
                      `}
                                        >
                                            <div className="mr-4">
                                                {isCompleted ? (
                                                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                                ) : isActive ? (
                                                    <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                                                ) : (
                                                    <div className="w-6 h-6 rounded-full border border-neutral-700 flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <h4 className={`text-sm font-medium ${isActive ? 'text-indigo-200' : isCompleted ? 'text-neutral-300' : 'text-neutral-500'}`}>
                                                    {step.text}
                                                </h4>
                                            </div>

                                            <div className={`text-neutral-600 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                                <StepIcon className="w-5 h-5 text-indigo-500/50" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Simulated Terminal Output for active step */}
                            <div className="mt-8 bg-black/60 border border-white/5 rounded-xl p-4 font-mono text-xs text-neutral-500 h-24 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 pointer-events-none"></div>
                                <div className="flex flex-col gap-1 opacity-70 animate-float">
                                    <div>[system] allocating semantic tensors...</div>
                                    <div>[info] parsing ast nodes: {Math.round(progress * 142)} complete</div>
                                    <div>[graph] extracting imports & exports...</div>
                                    <div>[vector] building faiss index mapping...</div>
                                    <div>[worker] embedding thread {Math.floor(Math.random() * 8)} running</div>
                                    <div className="text-indigo-400/70">{'>'} {INDEXING_STEPS[currentStepIndex]?.text.toLowerCase()}...</div>
                                </div>
                            </div>
                        </div>

                        {/* --- STATE: COMPLETE (PREVIEW) --- */}
                        <div className={`p-8 sm:p-12 transition-all duration-700 ${status === 'complete' ? 'block animate-fade-in-up' : 'hidden'}`}>
                            <div className="flex flex-col items-center text-center mb-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">Indexing Complete</h2>
                                <p className="text-neutral-400">Your repository is now an intelligent AI workspace.</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                <StatCard label="Repository" value={repoUrl.split('/').slice(-2).join('/') || "project/repo"} />
                                <StatCard label="Languages" value="Py, TS, JS" />
                                <StatCard label="Indexed Chunks" value="14,208" />
                                <StatCard label="Graph Nodes" value="3,492" />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={handleOpenWorkspace}
                                    className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium text-white transition-all duration-300 overflow-hidden bg-indigo-600 hover:bg-indigo-500 w-full sm:w-auto shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_50px_rgba(79,70,229,0.5)] border border-indigo-400/30"
                                >
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                                    <span className="relative z-10 flex items-center gap-2 text-lg">
                                        Open AI Workspace
                                        <Sparkles className="w-5 h-5 text-indigo-200 group-hover:scale-110 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer indicators (simulated features) */}
                <div className={`mt-16 flex items-center gap-8 text-sm text-neutral-600 font-medium transition-all duration-1000 delay-300 ${status !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex items-center gap-2"><Database className="w-4 h-4" /> Hybrid Retrieval</div>
                    <div className="hidden sm:flex items-center gap-2"><Network className="w-4 h-4" /> Graph Reasoning</div>
                    <div className="flex items-center gap-2"><Cpu className="w-4 h-4" /> Local LLM Ready</div>
                </div>

            </div>
        </div>
    );
}

// Small helper component for stats
function StatCard({ label, value }) {
    return (
        <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center group hover:bg-white/[0.02] transition-colors">
            <span className="text-xs text-neutral-500 mb-1 font-medium">{label}</span>
            <span className="text-white font-mono text-sm sm:text-base tracking-tight">{value}</span>
        </div>
    );
}