import React from "react";
import SearchBar from "../components/SearchBar.tsx";
import FoodBankCard from "../components/FoodBankCard.tsx";
import ChatInterface from "../components/ChatInterface.tsx";
import ProfileCard from "../components/ProfileCard.tsx";
import BenefitTracker from "../components/BenefitTracker.tsx";
import FollowUps from "../components/FollowUps.tsx";

export default function BenefitFinder() {
  return (
    <div className="bg-[#F9FAFB] font-sans text-[#111827] min-h-screen">
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-7">
            <SearchBar />
            <FoodBankCard />
            <ChatInterface />
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-5">
            <ProfileCard />
            <BenefitTracker />
            <FollowUps />
          </div>
        </div>
      </div>
    </div>
  );
}
