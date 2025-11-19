import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DealerLocator = () => {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [filteredDealers, setFilteredDealers] = useState([]);

  // Demo dealer data
  const dealers = [
    {
      id: 1,
      name: 'Symphony Hub Mumbai',
      address: 'Shop No. 45, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
      phone: '+91 98765 43210',
      email: 'mumbai@symphonyhub.com',
      timing: 'Mon-Sat: 10 AM - 8 PM',
      services: ['Sales', 'Service', 'Spare Parts']
    },
    {
      id: 2,
      name: 'Cool Breeze Dealers',
      address: 'Plot 12, Sector 21',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      phone: '+91 98765 43211',
      email: 'delhi@coolbreeze.com',
      timing: 'Mon-Sat: 9 AM - 7 PM',
      services: ['Sales', 'Service']
    },
    {
      id: 3,
      name: 'Symphony Authorized Dealer',
      address: 'MG Road, Near City Center',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 98765 43212',
      email: 'bangalore@symphony.com',
      timing: 'Mon-Sun: 10 AM - 9 PM',
      services: ['Sales', 'Service', 'Spare Parts', 'Installation']
    },
    {
      id: 4,
      name: 'Air Cool Solutions',
      address: 'Station Road, Vastrapur',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015',
      phone: '+91 98765 43213',
      email: 'ahmedabad@aircool.com',
      timing: 'Mon-Sat: 10 AM - 8 PM',
      services: ['Sales', 'Service', 'Spare Parts']
    },
    {
      id: 5,
      name: 'Symphony Service Center',
      address: 'Park Street, Central',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700016',
      phone: '+91 98765 43214',
      email: 'kolkata@symphony.com',
      timing: 'Mon-Sat: 9 AM - 7 PM',
      services: ['Service', 'Spare Parts']
    },
    {
      id: 6,
      name: 'Cool Point Dealers',
      address: 'Banjara Hills Road No. 3',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034',
      phone: '+91 98765 43215',
      email: 'hyderabad@coolpoint.com',
      timing: 'Mon-Sun: 10 AM - 8 PM',
      services: ['Sales', 'Service', 'Installation']
    }
  ];

  const states = ['All', ...new Set(dealers.map(d => d.state))];

  const handleSearch = () => {
    let results = dealers;

    if (selectedState !== 'All') {
      results = results.filter(d => d.state === selectedState);
    }

    if (searchCity.trim()) {
      results = results.filter(d => 
        d.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    }

    setFilteredDealers(results);
  };

  const displayDealers = filteredDealers.length > 0 ? filteredDealers : dealers;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dealer Locator</h1>
          <p className="text-xl text-blue-100">Find authorized Symphony dealers near you</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <span onClick={() => navigate('/')} className="cursor-pointer hover:text-blue-600">Home</span>
            {' › '}
            <span className="font-medium text-gray-800">Dealer Locator</span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Search for Dealers</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {states.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Enter city name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Search Dealers
              </button>
            </div>
          </div>
        </div>

        {/* Dealers Grid */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {filteredDealers.length > 0 ? `Found ${displayDealers.length} Dealers` : 'All Dealers'}
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayDealers.map((dealer) => (
            <div key={dealer.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                <h3 className="text-xl font-bold">{dealer.name}</h3>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-gray-700">{dealer.address}</p>
                    <p className="text-gray-700">{dealer.city}, {dealer.state} - {dealer.pincode}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${dealer.phone}`} className="text-blue-600 hover:underline">{dealer.phone}</a>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${dealer.email}`} className="text-blue-600 hover:underline text-sm">{dealer.email}</a>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 text-sm">{dealer.timing}</span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Services Available:</p>
                  <div className="flex flex-wrap gap-2">
                    {dealer.services.map((service, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't Find a Dealer?</h2>
          <p className="text-gray-600 mb-6">Contact our customer support team for assistance</p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealerLocator;