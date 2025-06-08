'use client'
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { marked } from 'marked';
import { SendIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are SkillSwap's virtual assistant. Your goal is to provide helpful, accurate, and comprehensive information ONLY about SkillSwap's services.

ABOUT SKILLSWAP:
- SkillSwap is a peer-to-peer platform for skill exchange, connecting learners and experts across domains.
- Users can create skill listings, book sessions, and trade knowledge either for free or credits.

KEY FEATURES:
1. Skill Listings: Create detailed posts about skills you want to offer or learn.
2. Book Sessions: Schedule 1-on-1 virtual sessions with verified mentors or peers.
3. Earn Credits: Share your skills to earn platform credits that you can use to learn from others.

INSTRUCTIONS:
1. ONLY answer questions related to SkillSwap, skill exchange, credits, bookings, and community guidelines.
2. If asked unrelated questions, politely respond: "I'm SkillSwap's assistant and only help with queries about skill sharing and our services. Want to explore how to earn credits or book a session?"
3. Maintain friendly, clear, and platform-aligned communication.`;

const EXAMPLE_QUESTIONS = [
  'How do I book a session?',
  'How can I earn credits on SkillSwap?',
  'What skills can I list?',
  'Is SkillSwap free to use?',
  'How are mentors verified?'
];

const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      content: "👋 Hello! I'm SkillSwap's assistant here to help you learn or share skills. I can answer your questions about how to earn credits, list your expertise, book a session, or use the SkillSwap platform. Ready to swap some skills?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const userInputRef = useRef<HTMLTextAreaElement>(null);
  const generativeClient = useRef<GoogleGenerativeAI | null>(null);
  const modelRef = useRef<any>(null);
  const chatRef = useRef<any>(null);

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
    const newUserMsg: ChatMessage = { content: message, isUser: true, timestamp: new Date() };
    setChatHistory(prev => [...prev, newUserMsg]);
    setUserInput('');
    setIsTyping(true);

    try {
      const result = await chatRef.current.sendMessageStream(message);
      let fullResponse = "";
      for await (const chunk of result.stream) {
        const text = chunk.text ? chunk.text() : "";
        fullResponse += text;
        setChatHistory(prev => {
          const lastMsg = prev[prev.length - 1];
          if (!lastMsg.isUser) {
            const updated = [...prev];
            updated[prev.length - 1] = { ...lastMsg, content: marked(fullResponse) };
            return updated;
          }
          return [...prev, { content: marked(fullResponse), isUser: false, timestamp: new Date() }];
        });
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { content: "Oops! Something went wrong. Please try again.", isUser: false, timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${msg.isUser ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
              <div dangerouslySetInnerHTML={{ __html: marked(msg.content) }} />
            </div>
          </div>
        ))}
        {isTyping && <Skeleton className="w-16 h-4" />}
      </div>

      <div className="p-3 bg-background border-t border-border">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
          <Textarea
            ref={userInputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask something about SkillSwap..."
            className="flex-1 text-sm"
          />
          <Button type="submit" disabled={isTyping || !userInput.trim()} size="icon">
            <SendIcon className="w-4 h-4" />
          </Button>
        </form>
        <div className="flex flex-wrap gap-2 mt-2">
          {EXAMPLE_QUESTIONS.map((q, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => { setUserInput(q); sendMessage(); }}
            >
              {q}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
