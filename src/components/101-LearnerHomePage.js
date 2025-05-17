import React, { useState } from 'react';
import BottomNavigation from './common/BottomNavigation';

const LearnerHomePage = () => {
  // Basic states
  const [selectedSport, setSelectedSport] = useState('Tennis');
  const [showSportDropdown, setShowSportDropdown] = useState(false);
  
  // Sport options
  const sportOptions = ['Tennis', 'Padel', 'Squash', 'Pickleball', 'Badminton', 'Table Tennis', 'Golf'];
  
  // Lesson data
  const lessons = [
    {
      id: 1,
      sport: 'Tennis',
      status: 'Pending',
      paymentStatus: 'Unpaid',
      date: 'Saturday, March 15',
      time: '14:00 - 15:00 BST',
      location: '28 Wilton Grove, London SW19 3QX',
      price: '£60/hr',
      coach: 'Alice',
      coachImage: null
    },
    {
      id: 2,
      sport: 'Tennis',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      date: 'Saturday, March 15',
      time: '16:00 - 17:00 BST',
      location: '28 Wilton Grove, London SW19 3QX',
      price: '£60/hr',
      coach: 'Bob',
      coachImage: null
    },
    {
      id: 3,
      sport: 'Tennis',
      status: 'Confirmed',
      paymentStatus: 'Unpaid',
      date: 'Sunday, March 16',
      time: '18:00 - 19:00 BST',
      location: '28 Wilton Grove, London SW19 3QX',
      price: '£60/hr',
      coach: 'Charlie',
      coachImage: null
    }
  ];
  
  // App guides data
  const appGuides = [
    { 
      id: 1, 
      title: 'How to Book a Lesson', 
      description: 'Learn how to find and book lessons with your favorite coaches.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              <polyline points="10 2 10 10 13 7 16 10 16 2"></polyline>
            </svg>
    },
    { 
      id: 2, 
      title: 'Payment Methods', 
      description: 'Discover all the available payment options for your lessons.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
    }
  ];
  
  // Handle sport selection
  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
    setShowSportDropdown(false);
  };

  // 底部导航栏标签改变处理
  const handleNavTabChange = (tabId) => {
    console.log(`Navigation tab changed: ${tabId}`);
    // 实际应用中这里会进行页面导航
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Top location bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 shadow-sm">
        <div className="flex items-center flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary-500 mr-1.5">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="text-gray-800 text-sm font-medium truncate">23 Quintin Ave, London</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-gray-400 ml-1">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </div>
        <div className="flex items-center">
          <button className="p-2 rounded-full active:bg-gray-100 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"></path>
            </svg>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto pt-4 px-4 pb-20">
        {/* Welcome message */}
        <div className="pt-2 pb-4">
          <h1 className="text-2xl leading-8 font-bold text-gray-800">Hi, Tom! 👋</h1>
          <p className="text-sm leading-5 text-gray-600 mt-1">Ready for your upcoming lessons?</p>
        </div>
        
        {/* Search area with sport selection */}
        <div className="pt-2 pb-4">
          <div className="flex items-center space-x-3">
            {/* Sport dropdown menu */}
            <div className="relative">
              <button 
                className="flex items-center bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 active:bg-gray-100 shadow-sm"
                onClick={() => setShowSportDropdown(!showSportDropdown)}
                aria-label="Select sport"
                aria-expanded={showSportDropdown}
                style={{ minHeight: '44px' }}
              >
                <span>{selectedSport}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5 h-4 w-4 text-gray-500">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              
              {/* Dropdown menu */}
              {showSportDropdown && (
                <div className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-200 py-1 max-h-48 overflow-y-auto">
                  {sportOptions.map((sport) => (
                    <div 
                      key={sport}
                      className={`px-4 py-3 text-sm cursor-pointer active:bg-gray-100 ${
                        selectedSport === sport 
                          ? 'bg-primary-50 text-primary-500 font-medium' 
                          : 'text-gray-700'
                      }`}
                      onClick={() => handleSportSelect(sport)}
                      role="option"
                      aria-selected={selectedSport === sport}
                    >
                      {sport}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Search box */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search coaches or locations"
                className="block w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl bg-white text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
                aria-label="Search coaches or locations"
                style={{ minHeight: '44px' }}
              />
            </div>
          </div>
        </div>
        
        {/* Next lessons header */}
        <div className="pt-4 pb-3 flex justify-between items-center">
          <h2 className="text-lg leading-7 font-semibold text-primary-500">Upcoming Lessons</h2>
          <button className="text-sm font-medium text-primary-500">View all</button>
        </div>
        
        {/* Lesson cards area */}
        <div className="space-y-4 pb-6">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${
                lesson.status === 'Pending' 
                  ? 'border-yellow-500' 
                  : 'border-primary-500'
              }`}
            >
              <div className="p-4">
                <div className="mb-2 flex justify-between items-center">
                  <h3 className="font-medium text-sm text-gray-800">{lesson.sport}</h3>
                  <div className="flex space-x-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      lesson.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-600' 
                        : 'bg-primary-100 text-primary-600'
                    }`}>
                      {lesson.status}
                    </span>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      lesson.paymentStatus === 'Unpaid' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-primary-100 text-primary-600'
                    }`}>
                      {lesson.paymentStatus}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 flex-shrink-0">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                  <span className="ml-2 text-xs text-gray-700">{lesson.date}</span>
                </div>
                
                <div className="flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 flex-shrink-0">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className="ml-2 text-xs text-gray-700">{lesson.time}</span>
                </div>
                
                <div className="flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 flex-shrink-0">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="ml-2 text-xs text-gray-700 truncate">{lesson.location}</span>
                </div>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <span className="text-primary-500 text-sm font-medium">{lesson.price}</span>
                  <div className="flex items-center">
                    {lesson.coachImage ? (
                      <img 
                        src={lesson.coachImage} 
                        alt={`Coach ${lesson.coach}`}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs font-bold mr-2">
                        {lesson.coach.charAt(0)}
                      </div>
                    )}
                    <span className="text-gray-700 text-xs font-medium">Coach {lesson.coach}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* App guides area */}
        <div className="pt-3 pb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg leading-7 font-semibold text-primary-500">App Guide</h2>
            <button className="text-sm font-medium text-primary-500">
              View all
            </button>
          </div>
          
          <div className="flex gap-4">
            {appGuides.map((guide, index) => (
              <div 
                key={guide.id} 
                className="w-1/2 bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
              >
                <div className={`h-24 flex items-center justify-center ${
                  index % 2 === 0 
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500' 
                    : 'bg-gradient-to-r from-secondary-600 to-secondary-500'
                }`}>
                  {guide.icon}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm text-gray-800 line-clamp-1">{guide.title}</h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 使用BottomNavigation组件 */}
      <BottomNavigation activeTab="home" onTabChange={handleNavTabChange} />
    </div>
  );
};

export default LearnerHomePage; 