import React from 'react';

// Sample data - in a real app, this would come from API
const stats = [
  { name: 'Total Patients', stat: '12' },
  { name: 'Pending Benefit Applications', stat: '8' },
  { name: 'Benefits Approved', stat: '24' },
  { name: 'Average Patient Risk Score', stat: '42' },
];

const recentActivity = [
  { id: 1, patient: 'Jane Smith', activity: 'Benefit application submitted', time: '2 hours ago' },
  { id: 2, patient: 'John Doe', activity: 'Risk assessment completed', time: '3 hours ago' },
  { id: 3, patient: 'Maria Garcia', activity: 'New patient added', time: '5 hours ago' },
  { id: 4, patient: 'Robert Johnson', activity: 'Benefit approved', time: '1 day ago' },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900">Overview</h2>
      
      {/* Stats */}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md p-3 bg-primary-500">
                  <div className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {item.stat}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <h2 className="mt-8 text-lg font-medium text-gray-900">Recent Activity</h2>
      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <li key={activity.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary-600 truncate">
                    {activity.patient}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {activity.time}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {activity.activity}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <h2 className="mt-8 text-lg font-medium text-gray-900">Quick Actions</h2>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Add New Patient</h3>
          </div>
          <div className="px-4 py-4 sm:p-6">
            <p className="text-sm text-gray-500">Quickly register a new patient and perform initial assessment.</p>
            <button
              type="button"
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Patient
            </button>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Find Benefits</h3>
          </div>
          <div className="px-4 py-4 sm:p-6">
            <p className="text-sm text-gray-500">Search for benefits and match them to eligible patients.</p>
            <button
              type="button"
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Search Benefits
            </button>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Ask AI Copilot</h3>
          </div>
          <div className="px-4 py-4 sm:p-6">
            <p className="text-sm text-gray-500">Get AI assistance with patient care and benefit questions.</p>
            <button
              type="button"
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Open Copilot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 