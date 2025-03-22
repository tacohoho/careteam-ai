import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function ChatInterface() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle sending the message
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4">
          {/* First Assistant Message */}
          <div className="flex mb-6">
            <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center text-white mr-3 flex-shrink-0">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="bg-gray-100 p-4 rounded-[18px_18px_18px_4px] max-w-lg">
              <p className="text-sm">Hello, I'm Bridget your healthcare and social services benefits co-pilot. How can I help you today?</p>
            </div>
          </div>
          
          {/* First User Message */}
          <div className="flex justify-end mb-6">
            <div className="bg-gray-100 p-4 rounded-[18px_18px_4px_18px] max-w-lg">
              <p className="text-sm">Which benefits is my patient Katie eligible for?</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 ml-3 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80" 
                alt="User avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Second Assistant Message */}
          <div className="flex mb-6">
            <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center text-white mr-3 flex-shrink-0">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="bg-gray-100 p-4 rounded-[18px_18px_18px_4px] max-w-lg">
              <p className="text-sm">Happy to help!</p>
              <p className="text-sm mt-2">Can you provide me her</p>
              <ul className="text-sm list-none pl-0 mt-1">
                <li>age</li>
                <li>income</li>
                <li>Zip code of address</li>
                <li>Citizenship status</li>
                <li>Household size</li>
                <li>Does she have a disability?</li>
              </ul>
              <p className="text-sm mt-2">These questions will get us started.</p>
            </div>
          </div>
          
          {/* Second User Message */}
          <div className="flex justify-end mb-4">
            <div className="bg-gray-100 p-4 rounded-[18px_18px_4px_18px] max-w-lg">
              <p className="text-sm">She is 35, lives in 02139, is a US citizen, and has 2 dependents under 18, and does not have a disability.</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 ml-3 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80" 
                alt="User avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSubmit} className="flex mt-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-[#22C55E] text-white p-2 rounded-r-md hover:bg-green-600 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
