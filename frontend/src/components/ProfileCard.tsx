export default function ProfileCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-5">Profile Information</h2>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
          <img 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80" 
            alt="Profile photo" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="font-medium">Katie Doe</h3>
            <span className="ml-3 text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Patient</span>
          </div>
          <p className="text-sm text-[#6B7280] mt-1">123 Lane Ave Cambridge, MA 02139</p>
        </div>
      </div>
    </div>
  );
}
