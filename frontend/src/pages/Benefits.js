import React, { useState } from 'react';

// Sample benefits data
const benefitsData = [
  {
    id: 1,
    name: 'Medicare Savings Program',
    provider: 'Centers for Medicare & Medicaid Services',
    category: 'Healthcare',
    description: 'Helps with Medicare premiums, deductibles, and copayments for eligible individuals.',
    eligibility: ['Income below 135% FPL', 'Medicare Part A eligible', 'Limited resources']
  },
  {
    id: 2,
    name: 'Supplemental Nutrition Assistance Program (SNAP)',
    provider: 'Department of Agriculture',
    category: 'Food',
    description: 'Provides food-purchasing assistance for low-income individuals and families.',
    eligibility: ['Income below 130% FPL', 'Limited assets', 'U.S. citizen or eligible non-citizen']
  },
  {
    id: 3,
    name: 'Housing Choice Voucher Program',
    provider: 'Department of Housing and Urban Development',
    category: 'Housing',
    description: 'Assists very low-income families, the elderly, and the disabled to afford housing in the private market.',
    eligibility: ['Income below 50% of area median', 'U.S. citizen or eligible immigration status', 'Good rental history']
  },
  {
    id: 4,
    name: 'Low Income Home Energy Assistance Program (LIHEAP)',
    provider: 'Department of Health and Human Services',
    category: 'Utilities',
    description: 'Assists eligible low-income households with their heating and cooling energy costs.',
    eligibility: ['Income below 150% FPL', 'Responsible for home energy costs', 'Resident of the state']
  },
  {
    id: 5,
    name: 'Medicaid',
    provider: 'Centers for Medicare & Medicaid Services',
    category: 'Healthcare',
    description: 'Provides health coverage to eligible low-income adults, children, pregnant women, elderly adults and people with disabilities.',
    eligibility: ['Income-based eligibility varies by state', 'U.S. citizen or qualified non-citizen', 'Resident of the state']
  },
];

export default function Benefits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter benefits based on search term and category
  const filteredBenefits = benefitsData.filter(benefit => {
    const matchesSearch = benefit.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         benefit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || benefit.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for filter
  const categories = ['All', ...new Set(benefitsData.map(benefit => benefit.category))];

  return (
    <div>
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Benefits Directory</h1>
          <p className="mt-2 text-sm text-gray-700">
            Browse available benefits and match them to eligible patients.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            Add benefit
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <div>
          <label htmlFor="search" className="sr-only">
            Search benefits
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Search benefits..."
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* AI search placeholder */}
        <div>
          <button
            type="button"
            className="inline-flex items-center w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <svg className="-ml-1 mr-2 h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a2 2 0 00-2 2v1H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-3V4a2 2 0 00-2-2z" />
            </svg>
            Ask AI to find benefits
          </button>
        </div>
      </div>

      {/* Benefits cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBenefits.map((benefit) => (
          <div
            key={benefit.id}
            className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="p-6 flex-1 flex flex-col">
              <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                benefit.category === 'Healthcare' ? 'bg-blue-100 text-blue-800' :
                benefit.category === 'Food' ? 'bg-green-100 text-green-800' :
                benefit.category === 'Housing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {benefit.category}
              </span>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">{benefit.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{benefit.provider}</p>
              <p className="mt-3 text-base text-gray-500 flex-grow">{benefit.description}</p>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Eligibility:</h4>
                <ul className="mt-2 space-y-1">
                  {benefit.eligibility.map((criterion, index) => (
                    <li key={index} className="text-sm text-gray-500 flex items-start">
                      <svg className="h-5 w-5 text-green-500 flex-shrink-0 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Match Patients
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {filteredBenefits.length === 0 && (
        <div className="mt-12 text-center">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No benefits found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
} 