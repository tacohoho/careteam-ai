import React from 'react';

// Sample patient data
const patients = [
  {
    id: 1,
    name: 'Jane Smith',
    dateOfBirth: '1985-06-15',
    email: 'jane.smith@example.com',
    riskScore: 28,
    sdohFactors: ['Housing Unstable', 'Limited Transportation'],
  },
  {
    id: 2,
    name: 'John Doe',
    dateOfBirth: '1972-11-23',
    email: 'john.doe@example.com',
    riskScore: 42,
    sdohFactors: ['Low Income', 'Food Insecurity'],
  },
  {
    id: 3,
    name: 'Maria Garcia',
    dateOfBirth: '1990-03-08',
    email: 'maria.garcia@example.com',
    riskScore: 15,
    sdohFactors: ['Limited English Proficiency'],
  },
  {
    id: 4,
    name: 'Robert Johnson',
    dateOfBirth: '1965-09-17',
    email: 'robert.johnson@example.com',
    riskScore: 63,
    sdohFactors: ['Housing Unstable', 'Low Income', 'Limited Healthcare Access'],
  },
];

export default function Patients() {
  return (
    <div>
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Patients</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all patients in your care team with their basic information and risk scores.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            Add patient
          </button>
        </div>
      </div>
      
      {/* Search and filter controls */}
      <div className="mb-6">
        <label htmlFor="search" className="sr-only">
          Search patients
        </label>
        <div className="relative rounded-md shadow-sm max-w-lg">
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Search patients by name or email"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Patients table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date of Birth
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Risk Score
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      SDOH Factors
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {patient.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {patient.dateOfBirth}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {patient.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.riskScore > 50 ? 'bg-red-100 text-red-800' : 
                          patient.riskScore > 30 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {patient.riskScore}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {patient.sdohFactors.map((factor, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {factor}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-primary-600 hover:text-primary-900 mr-4">
                          Edit
                        </button>
                        <button className="text-primary-600 hover:text-primary-900">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 