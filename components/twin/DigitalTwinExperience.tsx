"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bot, Github, LoaderCircle, Network, Send, Sparkles, User, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
};

const suggestions = [
  "Which projects best show Jeremy's strengths?",
  "What kind of AI work has Jeremy done?",
  "How would you describe Jeremy's working style?",
];

const API_BASE = process.env.NEXT_PUBLIC_TWIN_API_URL ?? "http://localhost:8000";
const PROFILE_IMAGE = "https://raw.githubusercontent.com/JeremyDemers/digital-twin/main/frontend/public/profile_round_sm.png";

export function DigitalTwinExperience() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    endRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }, [messages, isLoading]);

  async function sendMessage(prompt?: string) {
    const content = (prompt ?? input).trim();
    if (!content || isLoading) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, session_id: sessionId || undefined }),
      });

      if (!response.ok) throw new Error(`Chat request failed with ${response.status}`);
      const data = (await response.json()) as { response: string; session_id: string };
      if (!sessionId) setSessionId(data.session_id);
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "The digital twin API is offline right now. The interface is ready, but its AWS backend needs to be running to answer questions.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <main className="twin-experience">
      <section className="twin-page-heading shell">
        <div>
          <Link className="back-link" href="/#work">← All projects</Link>
          <p className="eyebrow">Generative AI on AWS</p>
          <h1>Meet my <em>digital twin.</em></h1>
          <p>Ask about my experience, projects, approach to engineering, or working style.</p>
        </div>
        <div className="twin-heading-actions">
          <button type="button" onClick={() => setShowArchitecture(true)}><Network size={17} /> Architecture</button>
          <a href="https://github.com/JeremyDemers/digital-twin" target="_blank" rel="noreferrer"><Github size={17} /> Source</a>
        </div>
      </section>

      <section className="twin-chat shell" aria-label="Conversation with Jeremy's digital twin">
        <div className="twin-chat-bar">
          <div className="twin-identity">
            <span className="twin-avatar">
              <Image src={PROFILE_IMAGE} width={80} height={80} alt="Jeremy Demers" priority />
              <i aria-hidden="true" />
            </span>
            <div><strong>Jeremy&apos;s Digital Twin</strong><span>AI representation · Amazon Bedrock</span></div>
          </div>
          <span className="twin-status"><i /> Ready to chat</span>
        </div>

        <div className="twin-message-list" role="log" aria-live="polite" aria-busy={isLoading}>
          {messages.length === 0 ? (
            <div className="twin-intro">
              <span className="twin-intro-icon"><Sparkles /></span>
              <p className="section-kicker">A conversation with context</p>
              <h2>Curious about the person behind the code?</h2>
              <p>This twin is grounded in curated professional facts and project history. Pick a starting point or ask your own question.</p>
              <div className="twin-suggestions">
                {suggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => void sendMessage(suggestion)} disabled={isLoading}>
                    {suggestion}<ArrowUpRight size={15} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="twin-conversation">
              {messages.map((message) => (
                <article className={`twin-message ${message.role} ${message.isError ? "error" : ""}`} key={message.id}>
                  <span className="message-avatar">{message.role === "user" ? <User /> : <Bot />}</span>
                  <div>
                    <strong>{message.role === "user" ? "You" : "Digital Twin"}</strong>
                    <div className="markdown-message"><ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown></div>
                  </div>
                </article>
              ))}
              {isLoading ? (
                <article className="twin-message assistant loading">
                  <span className="message-avatar"><Bot /></span>
                  <div><strong>Digital Twin</strong><p><LoaderCircle className="spinner" /> Thinking with context…</p></div>
                </article>
              ) : null}
              <div ref={endRef} />
            </div>
          )}
        </div>

        <form className="twin-composer" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Jeremy's work…"
            rows={1}
            maxLength={2000}
            aria-label="Message"
          />
          <button type="submit" disabled={!input.trim() || isLoading} aria-label="Send message"><Send /></button>
          <p>Enter to send · Shift+Enter for a new line</p>
        </form>
      </section>

      {showArchitecture ? (
        <div className="architecture-backdrop" role="presentation" onMouseDown={() => setShowArchitecture(false)}>
          <section className="architecture-dialog" role="dialog" aria-modal="true" aria-labelledby="architecture-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="architecture-dialog-heading">
              <div><p className="section-kicker">Under the hood</p><h2 id="architecture-title">Serverless by design.</h2></div>
              <button type="button" onClick={() => setShowArchitecture(false)} aria-label="Close architecture"><X /></button>
            </div>
            <div className="twin-architecture-flow">
              <div><span>01</span><strong>Next.js</strong><small>Static client</small></div><i>→</i>
              <div><span>02</span><strong>API Gateway</strong><small>HTTP API</small></div><i>→</i>
              <div><span>03</span><strong>Lambda</strong><small>FastAPI + Mangum</small></div><i>→</i>
              <div><span>04</span><strong>Bedrock</strong><small>Amazon Nova</small></div>
            </div>
            <p className="architecture-note">Conversation memory is stored privately in Amazon S3. CloudFront delivers the static interface, while Terraform defines the complete AWS deployment.</p>
          </section>
        </div>
      ) : null}
    </main>
  );
}

