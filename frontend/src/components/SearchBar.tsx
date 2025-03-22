import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="bg-white rounded-full mb-6 py-3 px-5 flex items-center shadow-sm">
      <Search className="h-5 w-5 text-gray-400 mr-3" />
      <input 
        type="text" 
        placeholder="Find me food banks near Cambridge, MA 02139" 
        className="w-full outline-none text-sm"
      />
      <button className="ml-auto bg-green-50 rounded-full p-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>
  );
}
