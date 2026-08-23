import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'intro',
    role: 'ai',
    text: "Hi! I'm Amruth's AI Agent. Ask me about his projects, skills, or availability for AI / Data Science roles.",
  },
];

const QUICK_REPLIES = [
  'Tell me about your RAG project',
  'What skills do you have?',
  'Are you open to work?',
];

const getAIResponse = (input: string): string => {
  const lower = input.toLowerCase();

  if (lower.includes('rag') || lower.includes('kannada') || lower.includes('project')) {
    return "Amruth's Kannada RAG Agent uses a hybrid retriever (BM25 + vector) with a 95% answer-relevance RAGAS score and a custom sentence-piece tokenizer. It is built with LangChain, FAISS, and FastAPI.";
  }

  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
    return "Amruth works with Python, PyTorch, LangChain, LLMs, GenAI, MLOps, FastAPI, vector databases, Docker, and AWS/GCP for AI engineering.";
  }

  if (lower.includes('open') || lower.includes('work') || lower.includes('hire') || lower.includes('job') || lower.includes('available')) {
    return "Yes — Amruth is currently open to full-time AI Engineer, ML Engineer, and GenAI / Data Science roles. He is based in Bangalore and open to remote or relocation.";
  }

  if (lower.includes('experience') || lower.includes('intern')) {
    return "Amruth completed a Data Science internship and has built production-grade RAG pipelines, ML models, and deployed AI services.";
  }

  if (lower.includes('contact') || lower.includes('email') || lower.includes('linkedin') || lower.includes('schedule') || lower.includes('call')) {
    return "You can reach Amruth at amruth.kumar.portfolio@gmail.com, schedule a 15-min chat via Calendly, or connect on LinkedIn — all links are in the Contact section.";
  }

  if (lower.includes('blog') || lower.includes('article')) {
    return "Amruth writes about AI on Dev.to. His latest post is 'Kannada Hybrid RAG: Building a Low-Resource Multilingual Agent' — check the Blog section.";
  }

  return "Thanks for reaching out! I'm a lightweight portfolio agent. For a detailed answer, use the Contact section to message Amruth directly.";
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiText = getAIResponse(userMsg.text);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'ai', text: aiText },
      ]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-4 h-[520px] w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] sm:w-96 sm:max-w-sm rounded-2xl border border-slate-700/50 bg-slate-900 shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-700/50 bg-slate-800/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500/10 ring-1 ring-yellow-500/20">
                  <Bot className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Amruth's AI Agent</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <p className="text-xs text-slate-400">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-700 hover:text-slate-100 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-2xl rounded-br-md bg-yellow-500 text-slate-900 shadow-sm'
                        : 'rounded-2xl rounded-bl-md bg-slate-800 text-slate-200 border border-slate-700/50'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-slate-800 border border-slate-700/50 px-4 py-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {messages.length < 3 && !isLoading && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-xs rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-slate-300 hover:border-yellow-500/50 hover:text-yellow-500 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-slate-700/50 p-3">
              <div className="flex items-center gap-2 rounded-xl bg-slate-800/50 border border-slate-700/50 px-3 py-2 focus-within:border-yellow-500/50 focus-within:ring-1 focus-within:ring-yellow-500/20 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask about Amruth..."
                  className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500 text-slate-900 hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20 hover:bg-yellow-400 transition-colors"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <MessageSquare className="h-6 w-6" />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-yellow-500 opacity-40 animate-ping" />
      </motion.button>
    </div>
  );
};

export default ChatWidget;
