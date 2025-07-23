'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { marked } from 'marked';
import { SendIcon, Plus, History } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
}

const SYSTEM_PROMPT = `You are SkillSlack's virtual assistant. Your goal is to provide helpful, accurate, and platform-specific information ONLY about SkillSlack and its features.

ABOUT SKILLSLACK:
- SkillSlack is a developer-first workspace designed for real-time coding, collaboration, GitHub PR syncing, and live terminal/voice rooms.
- It enables developers to create workspaces, invite team members, and collaborate using code editors, chat, and GitHub integration.

KEY FEATURES:
1. Real-time Channels: Collaborate using text and code blocks inside team channels.
2. GitHub PR Sync: Sync pull requests from linked GitHub repositories and get updates.
3. Terminal Access: Share terminal sessions in real time during collaboration.
4. Voice Rooms: Speak directly with team members using integrated voice chat.
5. Workspace Invites: Create/join workspaces using unique invite links.

INSTRUCTIONS:
1. ONLY respond to questions related to SkillSlack, developer collaboration, real-time coding, GitHub integration, and workspace usage.
2. If asked about unrelated topics, politely respond with: "I'm SkillSlack's assistant and I specialize in helping with developer collaboration features. Would you like to learn about GitHub PR sync or real-time channels?"
3. Maintain a helpful, tech-savvy, and concise tone.`;

const EXAMPLE_QUESTIONS = [
  'How do I create a new workspace?',
  'Can I share my terminal with others?',
  'How does GitHub PR sync work?',
  'Can I invite teammates to SkillSlack?',
  'What are voice rooms in SkillSlack?'
];

const initialBotMsg: ChatMessage = {
  content: "👋 Hi there! I'm SkillSlack's assistant. Ask me anything about workspaces, GitHub sync, voice rooms, or coding with your team in real-time.",
  isUser: false,
  timestamp: new Date(),
};

const ChatBot = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: 'session-1', messages: [initialBotMsg], createdAt: new Date() },
  ]);
  const [currentSessionId, setCurrentSessionId] = useState('session-1');
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generativeClient = useRef<GoogleGenerativeAI | null>(null);
  const modelRef = useRef<any>(null);
  const chatRef = useRef<any>(null);

  const currentSession = sessions.find((s) => s.id === currentSessionId)!;

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) return;
    generativeClient.current = new GoogleGenerativeAI(apiKey);
    modelRef.current = generativeClient.current.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });
    chatRef.current = modelRef.current.startChat({ history: [] });
  }, []);

  const sendMessage = async () => {
    const message = userInput.trim();
    if (!message) return;

    const newUserMsg: ChatMessage = {
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    updateSessionMessages([...currentSession.messages, newUserMsg]);
    setUserInput('');
    setIsTyping(true);

    try {
      const result = await chatRef.current.sendMessageStream(message);
      let fullResponse = '';
      for await (const chunk of result.stream) {
        const text = chunk.text ? chunk.text() : '';
        fullResponse += text;

        updateSessionMessages((prevMsgs) => {
          const last = prevMsgs[prevMsgs.length - 1];
          if (!last.isUser) {
            const updated = [...prevMsgs];
            updated[prevMsgs.length - 1] = {
              ...last,
              content: marked(fullResponse),
              timestamp: new Date(),
            };
            return updated;
          }
          return [...prevMsgs, {
            content: marked(fullResponse),
            isUser: false,
            timestamp: new Date(),
          }];
        });
      }
    } catch (err) {
      updateSessionMessages([
        ...currentSession.messages,
        { content: "⚠️ Something went wrong. Try again.", isUser: false, timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const updateSessionMessages = (newMessages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === currentSessionId
          ? { ...session, messages: typeof newMessages === 'function' ? newMessages(session.messages) : newMessages }
          : session
      )
    );
  };

  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      messages: [initialBotMsg],
      createdAt: new Date(),
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newId);
    setUserInput('');
    setIsTyping(false);
  };

return (
  <div className=" max-h-[90vh] flex flex-col border border-border bg-background rounded-xl shadow-xl overflow-hidden">

    {/* Top Bar */}
    <div className="p-3 border-b border-border flex items-center justify-between bg-background">
      <h2 className="text-sm font-semibold">SkillSlack Assistant</h2>
      <Button
        onClick={handleNewChat}
        variant="secondary"
        size="sm"
        className="rounded-full px-3 py-1 text-xs shadow hover:bg-muted"
      >
        <Plus className="w-4 h-4 mr-1" /> New Chat
      </Button>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
      {currentSession.messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[80%] px-4 py-2 rounded-xl text-sm leading-relaxed shadow ${
            msg.isUser
              ? 'bg-primary text-primary-foreground dark:bg-indigo-500 dark:text-white rounded-br-none'
              : 'bg-muted text-foreground dark:bg-zinc-800 dark:text-white rounded-bl-none'
          }`}
        >


            <div dangerouslySetInnerHTML={{ __html: marked(msg.content) }} />
          </div>
        </div>
      ))}
      {isTyping && <Skeleton className="w-16 h-4" />}
    </div>

    {/* Input and Quick Questions */}
    <div className="p-3 border-t border-border bg-background">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center gap-2"
      >
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about GitHub sync, terminal sharing, voice rooms..."
          className="flex-1 text-sm rounded-xl resize-none shadow 
                    text-white placeholder:text-gray-400 bg-zinc-900 dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-400"
        />


        <Button type="submit" disabled={isTyping || !userInput.trim()} size="icon" className="rounded-full">
          <SendIcon className="w-4 h-4" />
        </Button>
      </form>

      <div className="flex flex-wrap gap-2 mt-3">
        {EXAMPLE_QUESTIONS.map((q, i) => (
          <Button
            key={i}
            variant="outline"
            size="sm"
            className="text-xs rounded-full"
            onClick={() => {
              setUserInput(q);
              sendMessage();
            }}
          >
            {q}
          </Button>
        ))}
      </div>
    </div>

    {/* Session History */}
    {sessions.length > 1 && (
      <div className="p-2 bg-muted border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-1">
          <History className="w-3 h-3" />
          Previous Chats
        </div>
        <div className="flex flex-wrap gap-2">
          {sessions.map((session) => (
            <Button
              key={session.id}
              variant={session.id === currentSessionId ? 'default' : 'outline'}
              size="sm"
              className="text-xs rounded-full"
              onClick={() => setCurrentSessionId(session.id)}
            >
              {new Date(session.createdAt).toLocaleTimeString()}
            </Button>
          ))}
        </div>
      </div>
    )}
  </div>
);
}

export default ChatBot;
