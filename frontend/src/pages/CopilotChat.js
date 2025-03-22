import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

// Mock data for initial messages
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    text: 'Hello! I\'m your Care Team AI assistant. How can I help you today?',
    timestamp: new Date(),
  },
];

export default function CopilotChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock AI response
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: mockAIResponse(newMessage),
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  // Mock AI response generator - in a real app, this would be an API call
  const mockAIResponse = (query) => {
    // Simple keyword-based responses
    if (query.toLowerCase().includes('benefit')) {
      return 'To find benefits for a patient, you can check their eligibility based on various factors like income, age, and medical condition. Would you like me to help you search for specific benefits?';
    } else if (query.toLowerCase().includes('patient') || query.toLowerCase().includes('profile')) {
      return 'Patient profiles contain demographic information, medical history, and eligibility data. You can access patient details through the Patients section. Is there a specific patient you need information about?';
    } else if (query.toLowerCase().includes('eligibility')) {
      return 'Eligibility for benefits depends on multiple factors including income level, age, disability status, and specific medical conditions. Our system can automatically match patients to benefits they qualify for. Would you like me to explain the matching process?';
    } else {
      return 'I understand you need assistance. Could you provide more details about what you\'re looking for? I can help with patient information, benefit eligibility, or application processes.';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)]">
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Chat header */}
          <div className="py-4 border-b border-gray-200">
            <div className="flex px-6 align-middle">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AI</span>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">AI Copilot</p>
                  <p className="text-sm text-gray-500">Always here to help</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg py-2 px-4 max-w-[70%] ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-primary-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg py-2 px-4 bg-gray-200 text-gray-800">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-500"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Message input */}
          <div className="border-t border-gray-200 px-6 py-4 bg-white">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask me anything about patient benefits..."
                className="flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full rounded-md sm:text-sm border-gray-300"
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 