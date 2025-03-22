import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { aiService } from "../services/api.ts";

interface ChatMessage {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant' as const,
      text: "Hello, I'm Bridget your healthcare and social services benefits co-pilot. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      // Convert messages to API format
      const apiMessages = messages.map(msg => ({
        role: msg.sender === 'assistant' ? 'assistant' : 'user',
        content: msg.text
      }));

      // Add the new message
      apiMessages.push({
        role: 'user',
        content: message
      });

      // Get AI response
      const response = await aiService.chatWithAI(apiMessages);

      // Add AI response
      const aiMessage: ChatMessage = {
        id: messages.length + 2,
        sender: 'assistant',
        text: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Handle error
      const errorMessage: ChatMessage = {
        id: messages.length + 2,
        sender: 'assistant',
        text: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'mb-6'}`}>
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center text-white mr-3 flex-shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
              )}
              <div className={`${msg.sender === 'user' ? 'flex items-end' : ''}`}>
                <div className={`p-4 rounded-[18px] max-w-lg ${
                  msg.sender === 'user' 
                    ? 'bg-gray-100 rounded-[18px_18px_4px_18px]' 
                    : 'bg-gray-100 rounded-[18px_18px_18px_4px]'
                }`}>
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 ml-3 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80" 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex mb-6">
              <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center text-white mr-3 flex-shrink-0">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="bg-gray-100 p-4 rounded-[18px_18px_18px_4px] max-w-lg">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-500"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSubmit} className="flex mt-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="bg-[#22C55E] text-white p-2 rounded-r-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
