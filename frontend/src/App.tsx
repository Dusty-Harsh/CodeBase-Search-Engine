import React, { useState, useRef, useEffect } from 'react';

import {
  chatWithRepository,
  indexRepository
} from './services/api';

import {
  Search, Code2, Database, Terminal, Settings, ChevronDown,
  Plus, Trash2, RefreshCw, Send, Loader2, GitBranch,
  FileCode2, X, CheckCircle2, AlertCircle, Box, Braces
} from 'lucide-react';

interface Repository {
  id: string;
  name: string;
  url: string;
  status: 'indexed' | 'indexing' | 'failed';
  stats: {
    chunks: number;
    languages: string[];
    lastUpdated: string;
  };
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface CodeSnippet {
  id: string;
  filePath: string;
  language: string;
  content: string;
  functionName?: string;
  relevanceScore: number;
}

const initialRepos: Repository[] = [];

const initialMessages: Message[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content:
      'Hello! I am connected to the Semantic Codebase Search Engine. Ask questions about your indexed repositories.',
    timestamp: new Date()
  }
];

const HeaderBar = ({ activeRepo }: { activeRepo: Repository | null }) => (
  <div className="h-14 border-b border-[#1f1f2e] bg-[#0a0a0f] flex items-center justify-between px-4 shrink-0 text-sm">
    <div className="flex items-center space-x-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
        <Box size={18} />
      </div>
      <span className="font-semibold text-gray-200 tracking-wide">
        SemanticCode<span className="text-indigo-400">.ai</span>
      </span>
    </div>

    <div className="flex items-center bg-[#14141e] border border-[#2a2a3c] rounded-md px-3 py-1.5">
      <Code2 size={16} className="text-gray-400 mr-2" />
      <span className="text-gray-300 font-medium mr-2">
        {activeRepo ? activeRepo.name : 'No Repository Selected'}
      </span>
      <ChevronDown size={14} className="text-gray-500" />
    </div>

    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 text-xs">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-gray-400">API Connected</span>
      </div>
      <button className="text-gray-400 hover:text-gray-200 transition-colors p-1.5 rounded-md hover:bg-[#1a1a24]">
        <Settings size={18} />
      </button>
    </div>
  </div>
);

const Sidebar = ({
  repos,
  activeRepoId,
  setActiveRepoId,
  onIndexClick
}: {
  repos: Repository[];
  activeRepoId: string | null;
  setActiveRepoId: (id: string) => void;
  onIndexClick: () => void;
}) => {
  const activeRepo = repos.find(r => r.id === activeRepoId);

  return (
    <div className="w-72 bg-[#0a0a0f] border-r border-[#1f1f2e] flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-[#1f1f2e]">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          Repositories
        </h2>

        <div className="space-y-1">
          {repos.map(repo => (
            <button
              key={repo.id}
              onClick={() => setActiveRepoId(repo.id)}
              className={`w-full text-left flex items-center px-3 py-2 rounded-md text-sm transition-colors ${activeRepoId === repo.id
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-gray-400 hover:bg-[#14141e] border border-transparent'
                }`}
            >
              <Database size={14} className="mr-2 shrink-0" />
              <span className="truncate">{repo.name}</span>

              {repo.status === 'indexed' ? (
                <CheckCircle2
                  size={12}
                  className="ml-auto text-emerald-500 shrink-0"
                />
              ) : (
                <Loader2
                  size={12}
                  className="ml-auto text-yellow-500 animate-spin shrink-0"
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={onIndexClick}
          className="w-full mt-3 flex items-center justify-center space-x-2 border border-dashed border-[#2a2a3c] text-gray-400 hover:text-gray-200 hover:border-gray-500 rounded-md py-2 text-sm transition-all"
        >
          <Plus size={16} />
          <span>Index New Repository</span>
        </button>
      </div>

      {activeRepo && (
        <div className="p-4 flex-1 overflow-y-auto">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            Repository Stats
          </h2>

          <div className="space-y-4">
            <div className="bg-[#14141e] p-3 rounded-lg border border-[#1f1f2e]">
              <div className="text-gray-400 text-xs mb-1">Total Chunks Indexed</div>
              <div className="text-gray-100 text-xl font-mono">
                {activeRepo.stats.chunks}
              </div>
            </div>

            <div className="bg-[#14141e] p-3 rounded-lg border border-[#1f1f2e]">
              <div className="text-gray-400 text-xs mb-2">Supported Languages</div>

              <div className="flex flex-wrap gap-2">
                {activeRepo.stats.languages.map(lang => (
                  <span
                    key={lang}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#1f1f2e] text-gray-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-8 mb-4">
            Workspace Actions
          </h2>

          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-400 bg-[#14141e] border border-[#1f1f2e] rounded-md hover:bg-[#1a1a24] transition-colors">
              <RefreshCw size={14} className="mr-2" />
              Refresh Graph
            </button>

            <button className="w-full flex items-center px-3 py-2 text-sm text-red-400 bg-red-950/20 border border-red-900/30 rounded-md hover:bg-red-950/40 transition-colors">
              <Trash2 size={14} className="mr-2" />
              Clear Memory
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ChatWorkspace = ({
  messages,
  onSendMessage,
  isLoading
}: {
  messages: Message[];
  onSendMessage: (msg: string) => void;
  isLoading: boolean;
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#050508] min-w-0">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[80%]">
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${msg.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-[#14141e] border border-[#2a2a3c] text-gray-200'
                  }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center text-gray-400 text-sm">
            <Loader2 size={16} className="animate-spin mr-2" />
            Querying vector database...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-[#0a0a0f] border-t border-[#1f1f2e]">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything about the codebase..."
            className="w-full bg-[#14141e] border border-[#2a2a3c] text-gray-200 rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            className="absolute right-2 top-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

const ContextViewer = ({ snippets }: { snippets: CodeSnippet[] }) => {
  return (
    <div className="w-96 bg-[#0a0a0f] border-l border-[#1f1f2e] flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-[#1f1f2e] text-sm font-semibold">
        Retrieved Context
      </div>

      <div className="overflow-y-auto p-3 space-y-3 flex-1">
        {snippets.length === 0 ? (
          <div className="text-gray-500 text-sm text-center mt-10">
            No context retrieved yet.
          </div>
        ) : (
          snippets.map(snippet => (
            <div
              key={snippet.id}
              className="bg-[#14141e] border border-[#2a2a3c] rounded-lg overflow-hidden"
            >
              <div className="px-3 py-2 border-b border-[#2a2a3c]">
                <div className="text-indigo-400 text-sm font-medium">
                  {snippet.functionName}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {snippet.filePath}
                </div>
              </div>

              <pre className="p-3 overflow-x-auto text-xs text-gray-300">
                <code>{snippet.content}</code>
              </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const IndexRepoModal = ({
  isOpen,
  onClose,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => Promise<void>;
}) => {
  const [url, setUrl] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#0a0a0f] border border-[#2a2a3c] rounded-xl w-full max-w-md p-5">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
          Index Repository
        </h2>

        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://github.com/..."
          className="w-full bg-[#14141e] border border-[#2a2a3c] text-gray-200 rounded-lg px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              await onSubmit(url);
              onClose();
            }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg"
          >
            Start Indexing
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [repos, setRepos] = useState<Repository[]>(initialRepos);
  const [activeRepoId, setActiveRepoId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const response = await chatWithRepository(content);

      const aiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response.answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);

      if (
        response.sources &&
        Array.isArray(response.sources)
      ) {
        const formattedSnippets = response.sources.map(
          (source: any, index: number) => ({
            id: `snippet-${index}`,
            filePath: source.file_path || 'unknown',
            language: source.language || 'python',
            content: source.code || '',
            functionName: source.function_name || 'unknown',
            relevanceScore: 0.95
          })
        );

        setSnippets(formattedSnippets);
      } else {
        setSnippets([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleIndexRepo = async (url: string) => {
    try {
      await indexRepository(url);

      const repoName = url
        .split('/')
        .slice(-2)
        .join('/');

      const newRepo: Repository = {
        id: `repo-${Date.now()}`,
        name: repoName,
        url,
        status: 'indexing',
        stats: {
          chunks: 0,
          languages: [],
          lastUpdated: 'Just now'
        }
      };

      setRepos(prev => [...prev, newRepo]);
      setActiveRepoId(newRepo.id);

      setTimeout(() => {
        setRepos(prev =>
          prev.map(repo =>
            repo.id === newRepo.id
              ? {
                ...repo,
                status: 'indexed',
                stats: {
                  chunks: 150,
                  languages: ['Python', 'TypeScript'],
                  lastUpdated: 'Just now'
                }
              }
              : repo
          )
        );
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const activeRepo = repos.find(r => r.id === activeRepoId) || null;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#050508] text-gray-200 font-sans flex flex-col">
      <HeaderBar activeRepo={activeRepo} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          repos={repos}
          activeRepoId={activeRepoId}
          setActiveRepoId={setActiveRepoId}
          onIndexClick={() => setIsModalOpen(true)}
        />

        <ChatWorkspace
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isChatLoading}
        />

        <ContextViewer snippets={snippets} />
      </div>

      <IndexRepoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleIndexRepo}
      />
    </div>
  );
}
