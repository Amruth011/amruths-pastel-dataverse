import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'intro',
    role: 'ai',
    text: "Hi! I'm Amruth's AI Agent. Ask me about his projects, skills, background, or availability for AI / Data Science roles.",
  },
];

const QUICK_REPLIES = [
  'Tell me about your RAG project',
  'What is your native place?',
  'Are you open to work?',
  'What is your experience?',
  'How can I contact you?',
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://amruth-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      });

      if (!response.ok) throw new Error('Backend API failed');

      const data = await response.json();
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: data.response }]);
      
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: "Sorry, I'm having trouble connecting to the server right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-4 h-[520px] w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] sm:w-96 sm:max-w-sm rounded-2xl border border-border/40 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col glow-gold"
          >
            <div className="flex items-center justify-between border-b border-border/40 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/25">
                  <Sparkle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-heading">Amruth's AI Agent</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Online</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-md p-1.5 text-muted-foreground hover:bg-white/[0.05] hover:text-primary transition-colors" aria-label="Close chat">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[82%] px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user' ? 'rounded-2xl rounded-br-sm bg-primary text-primary-foreground font-medium' : 'rounded-2xl rounded-bl-sm bg-white/[0.04] text-foreground/90 border border-border/40'}`}>
                    {msg.role === 'ai' ? (
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => <h1 className="text-base font-semibold text-heading mb-1 mt-2 first:mt-0">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-sm font-semibold text-heading mb-1 mt-2 first:mt-0">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-semibold text-heading mb-1 mt-2 first:mt-0">{children}</h3>,
                          p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5">{children}</ol>,
                          li: ({ children }) => <li>{children}</li>,
                          a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">{children}</a>,
                          strong: ({ children }) => <strong className="font-semibold text-heading">{children}</strong>,
                          em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
                          code: ({ children }) => <code className="rounded bg-white/[0.08] px-1 py-0.5 font-mono text-[11px] text-primary">{children}</code>,
                          blockquote: ({ children }) => <blockquote className="border-l-2 border-primary/40 pl-2 italic text-muted-foreground">{children}</blockquote>,
                          br: () => <br />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white/[0.04] border border-border/40 px-4 py-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {messages.length < 6 && !isLoading && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button key={reply} onClick={() => handleSend(reply)} className="font-mono text-[11px] rounded-full border border-primary/20 bg-primary/[0.04] px-3 py-1.5 text-primary/80 hover:border-primary/50 hover:text-primary hover:bg-primary/[0.08] transition-colors">
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div className="border-t border-border/40 p-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] border border-border/40 px-3 py-2 focus-within:border-primary/40 transition-colors">
                <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()} placeholder="Ask about Amruth..." aria-label="Ask the AI assistant about Amruth" className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
                <button onClick={() => handleSend()} disabled={!input.trim() || isLoading} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" aria-label="Send message">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          trackEvent(isOpen ? 'chat_close' : 'chat_open');
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex h-14 items-center gap-2.5 rounded-full border border-primary/40 bg-card/95 px-5 text-primary shadow-2xl shadow-black/60 backdrop-blur-xl glow-gold hover:bg-primary/10 transition-colors"
        aria-label={isOpen ? 'Close chat' : 'Open chat with AI Agent'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <MessageSquare className="h-5 w-5" aria-hidden="true" />}
        <span className="hidden sm:inline text-sm font-medium tracking-tight">{isOpen ? 'Close' : 'Chat with AI'}</span>
        {!isOpen && (
          <>
            <span className="pointer-events-none absolute -inset-0.5 rounded-full border border-primary/40 animate-ping opacity-30" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-primary" />
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
