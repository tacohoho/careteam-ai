import { CheckCircle } from "lucide-react";

interface BenefitItem {
  name: string;
  status: 'Enrolled' | 'Eligible';
  date?: string;
  canApply: boolean;
}

export default function BenefitTracker() {
  const benefits: BenefitItem[] = [
    { name: 'Medicaid', status: 'Enrolled', date: '3/7/2024', canApply: false },
    { name: 'SNAP', status: 'Enrolled', date: '3/7/2024', canApply: false },
    { name: 'LIHEAP', status: 'Eligible', canApply: true },
    { name: 'NEMT', status: 'Eligible', canApply: true },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-3">Benefit Tracker</h2>
      <p className="text-sm text-[#6B7280] mb-5">Benefits you may be eligible for.</p>
      
      {/* Benefit Items */}
      <div className="space-y-4">
        {benefits.map((benefit) => (
          <div key={benefit.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <CheckCircle className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-sm">{benefit.name}</span>
            </div>
            <div className="flex items-center">
              <span className={`text-sm ${benefit.status === 'Enrolled' ? 'text-green-600' : 'text-green-600'} mr-8`}>{benefit.status}</span>
              {benefit.date ? (
                <span className="text-sm text-[#6B7280]">{benefit.date}</span>
              ) : benefit.canApply ? (
                <button className="text-sm font-medium text-green-600">Apply Now</button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
