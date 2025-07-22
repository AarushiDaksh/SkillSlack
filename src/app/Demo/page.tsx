"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import {
  Home,
  Users,
  MessageCircle,
  Settings,
  Hash,
  User,
  Send,
} from "lucide-react";

const channels = ["general", "design", "development"];

export default function DemoWorkspacePage() {
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [messages, setMessages] = useState([
    { user: "Alice", content: "Hey team!" },
    { user: "Bob", content: "Let’s push the new build." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { user: "You", content: input }]);
    setInput("");
  };
  const router = useRouter();
    const handleBack = () => {
    router.push("/onboarding");
  };


  return (
    <div className="flex h-screen bg-[#1e1f22] text-white">

      {/* Sidebar */}
      
      <div className="w-16 bg-[#2b2d31] flex flex-col items-center py-4 space-y-6">
          
        
        <Home className="hover:text-indigo-400 cursor-pointer" 
        onClick={() => router.push("/onboarding")} />
        <MessageCircle className="text-indigo-400" />
        <Users className="hover:text-indigo-400 cursor-pointer" />
        <Settings className="hover:text-indigo-400 cursor-pointer mt-auto" />
     

      </div>

      {/* Channel List */}
      <div className="w-64 bg-[#2b2d31] p-4 border-r border-[#3c3e43]">
        <h2 className="text-sm font-bold uppercase text-gray-400 mb-3">Channels</h2>
        <ul className="space-y-2">
          {channels.map((channel) => (
            <li
              key={channel}
              onClick={() => setSelectedChannel(channel)}
              className={`flex items-center px-2 py-1 rounded-md cursor-pointer hover:bg-[#404249] ${
                selectedChannel === channel ? "bg-[#404249]" : ""
              }`}
            >
              <Hash className="mr-2 w-4 h-4 text-gray-400" />
              {channel}
            </li>
          ))}
        </ul>

      </div>

      {/* Main Chat Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-[#3c3e43] bg-[#313338]">
          <h3 className="font-semibold text-white flex items-center">
            <Hash className="mr-2 w-4 h-4" />
            {selectedChannel}
          </h3>
          <User className="text-gray-300" />
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#313338]">
          {messages.map((msg, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                {msg.user[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{msg.user}</p>
                <p className="text-sm text-gray-300">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#3c3e43] bg-[#313338]">
          <div className="flex items-center bg-[#404249] rounded px-3 py-2">
            <input
              className="bg-transparent flex-1 outline-none text-sm text-white placeholder:text-gray-400"
              placeholder={`Message #${selectedChannel}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Send
              className="ml-3 w-5 h-5 text-indigo-400 cursor-pointer"
              onClick={handleSend}
            />
          </div>
        </div>
 
      </div>
    </div>
  );
}
