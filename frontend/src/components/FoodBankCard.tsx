import { MapPin, Phone, Globe, Share, FileText } from "lucide-react";

export default function FoodBankCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm mb-6 p-5">
      <h2 className="text-xl font-semibold mb-2">Cambridge City Food Bank</h2>
      
      {/* Rating */}
      <div className="flex items-center mb-4">
        <span className="font-semibold mr-2">5</span>
        <div className="flex mr-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[#FBBF24]">★</span>
          ))}
        </div>
        <span className="text-[#6B7280] text-sm">(200)</span>
        
        {/* Icons */}
        <div className="ml-auto flex space-x-4">
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <Globe className="h-5 w-5 text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <Share className="h-5 w-5 text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <FileText className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Info */}
      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <span className="mr-2 text-[#6B7280]">Food bank</span>
          <MapPin className="h-4 w-4 text-[#6B7280] mr-2" />
          <span className="text-[#6B7280]">2, Orwell House, Cowley Rd, Cambridge CB4 0PP, UK</span>
        </div>
        <div className="flex space-x-4 text-sm">
          <span className="text-[#22C55E] font-medium">Open</span>
          <span className="text-[#6B7280]">Closes 4PM</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-[#6B7280]">+447772538628</span>
          <span className="mx-3 text-[#6B7280]">•</span>
          <span className="text-[#6B7280]">info@ccfoodbank.org</span>
        </div>
      </div>
      
      {/* Contact Buttons */}
      <div className="flex space-x-3">
        <button className="flex items-center justify-center bg-[#22C55E] text-white rounded-full p-2 w-10 h-10">
          <Phone className="h-5 w-5" />
        </button>
        <div className="flex-1 rounded-full bg-gray-100 flex items-center justify-center h-10">
          <div className="flex space-x-2 items-center">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-1 w-1 rounded-full"></div>
            ))}
            <span className="ml-2 text-xs text-[#6B7280]">0:08</span>
          </div>
        </div>
        <button className="flex items-center justify-center bg-red-500 text-white rounded-full p-2 w-10 h-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
