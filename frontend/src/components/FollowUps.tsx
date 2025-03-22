import { CheckCircle } from "lucide-react";

interface FollowUpItem {
  task: string;
  date: string;
}

export default function FollowUps() {
  const followUps: FollowUpItem[] = [
    { task: 'Follow-up for EBT Card', date: '9/30/2024' },
    { task: 'Send information on food drive', date: '10/15/2024' },
    { task: 'Renew Medicaid', date: '1/15/2025' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-5">Follow-Ups</h2>
      
      {/* Follow-Up Items */}
      <div className="space-y-5">
        {followUps.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm">{item.task}</span>
            </div>
            <span className="text-sm text-[#6B7280]">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
