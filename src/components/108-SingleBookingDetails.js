import React, { useState } from 'react';
import LocationCard from './common/LocationCard';

const SingleBookingDetails = () => {
  // 模拟状态
  const [selectedLocation, setSelectedLocation] = useState('westside'); // 默认选择Westside Tennis Club
  const [customValue, setCustomValue] = useState('4');
  const [personCount, setPersonCount] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState('30'); // 默认选择30分钟
  const [needsEquipment, setNeedsEquipment] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(['Fore hand']);
  const [selectedOption, setSelectedOption] = useState('4'); // 预设课程数量选项
  
  // 处理人数增减
  const handlePersonChange = (increment) => {
    const newCount = personCount + increment;
    if (newCount >= 1 && newCount <= 2) {
      setPersonCount(newCount);
    }
  };
  
  // 价格选项
  const priceOptions = [
    { duration: 30, price: 25 },
    { duration: 60, price: 50 },
    { duration: 90, price: 75 }
  ];
  
  // 技能选项
  const skillOptions = [
    'Fore hand', 'Back hand', 'Volley', 'Smash', 
    'Serving', 'Returning', 'Foot work', 'Tactics'
  ];
  
  // 切换技能选择
  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // 位置数据
  const locationOptions = [
    {
      id: 'city',
      name: 'City Tennis Centre',
      address: '123 Main St',
      distance: '1.5 miles',
      facilities: ['Indoor courts', 'Parking']
    },
    {
      id: 'central',
      name: 'Central Park Courts',
      address: '45 Park Ave',
      distance: '0.8 miles',
      facilities: ['Outdoor courts', 'Changing rooms']
    },
    {
      id: 'westside',
      name: 'Westside Tennis Club',
      address: '789 West Blvd',
      distance: '3.2 miles',
      facilities: ['Indoor/Outdoor']
    }
  ];

  // 处理位置选择
  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1.5 rounded-full active:bg-gray-100">
          <span className="material-icons-round text-gray-700" style={{ fontSize: '24px' }}>
            arrow_back_ios_new
          </span>
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-gray-800">Select Location</h1>
        </div>
        <div className="w-5"></div>
      </div>
      
      {/* 进度指示器 */}
      <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-primary-600 text-white">
            1
          </div>
          <div className="h-0.5 w-6 bg-primary-600"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-primary-600 text-white">
            2
          </div>
          <div className="h-0.5 w-6 bg-primary-600"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-primary-600 text-white">
            3
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-600">
            4
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Step 3/4
        </div>
      </div>
      
      {/* 主要内容区 */}
      <div className="flex-1 overflow-auto px-4 py-5">
        {/* Select Location 卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h3 className="text-base font-medium text-primary-600 mb-3">Select location</h3>
          
          <div className="space-y-3">
            {locationOptions.map(location => (
              <LocationCard
                key={location.id}
                location={location}
                isSelected={selectedLocation === location.id}
                isSelectable={true}
                onSelect={handleLocationSelect}
                facilitiesClassName="inline-block px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full mr-1.5 mb-1"
              />
            ))}
          </div>
        </div>
        
        {/* Person 卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-medium text-primary-600 mb-1">Person</h3>
              <p className="text-sm text-gray-600">How many people will attend?</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                className={`w-9 h-9 rounded-full ${personCount <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700'} flex items-center justify-center active:bg-gray-200`}
                onClick={() => handlePersonChange(-1)}
                disabled={personCount <= 1}
              >
                <span className="text-lg font-medium">-</span>
              </button>
              <span className="font-semibold text-lg">{personCount}</span>
              <button 
                className={`w-9 h-9 rounded-full ${personCount >= 2 ? 'bg-gray-100 text-gray-400' : 'bg-primary-600 text-white'} flex items-center justify-center active:bg-primary-700`}
                onClick={() => handlePersonChange(1)}
                disabled={personCount >= 2}
              >
                <span className="text-lg font-medium">+</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Price 卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h3 className="text-base font-medium text-primary-600 mb-3">Price</h3>
          <p className="text-sm text-gray-600 mb-3">The duration options provided by the coach</p>
          
          <div className="space-y-3">
            {priceOptions.map((option) => (
              <div 
                key={option.duration}
                className={`border ${selectedPrice === String(option.duration) ? 'border-primary-600 bg-primary-50' : 'border-gray-200'} rounded-lg p-3 relative cursor-pointer`}
                onClick={() => setSelectedPrice(String(option.duration))}
              >
                {selectedPrice === String(option.duration) && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    <span className="material-icons-round" style={{ fontSize: '16px' }}>
                      check
                    </span>
                  </div>
                )}
                <div className={selectedPrice === String(option.duration) ? 'pr-8' : ''}>
                  <p className="font-medium text-sm">{option.duration} minutes - {personCount} {personCount > 1 ? 'People' : 'Person'}</p>
                  <p className={`${selectedPrice === String(option.duration) ? 'text-primary-700' : 'text-gray-700'} font-semibold text-sm mt-1`}>
                    Price: £{option.price * personCount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Need Equipment 卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-medium text-primary-600 mb-1">Need Equipment</h3>
              <p className="text-sm text-gray-600">I need my coach to provide equipment</p>
            </div>
            <div 
              className={`w-12 h-6 ${needsEquipment ? 'bg-primary-600' : 'bg-gray-200'} rounded-full p-1 cursor-pointer transition-colors duration-200`}
              onClick={() => setNeedsEquipment(!needsEquipment)}
            >
              <div 
                className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${needsEquipment ? 'translate-x-6' : 'translate-x-0'}`}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Lesson Content 卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <h3 className="text-base font-medium text-primary-600 mb-3">Lesson Content</h3>
          <p className="text-sm text-gray-600 mb-3">Select the tennis skills you want to focus on (optional)</p>
          
          <div className="grid grid-cols-2 gap-2.5">
            {skillOptions.map((skill) => (
              <div 
                key={skill}
                className={`border ${selectedSkills.includes(skill) ? 'border-primary-600 bg-primary-50' : 'border-gray-200'} rounded-lg p-2.5 flex items-center cursor-pointer`}
                onClick={() => toggleSkill(skill)}
              >
                <div className={`${selectedSkills.includes(skill) ? 'bg-primary-600 text-white' : 'border border-gray-300 bg-white'} rounded-full w-4 h-4 flex items-center justify-center mr-2`}>
                  {selectedSkills.includes(skill) && 
                    <span className="material-icons-round" style={{ fontSize: '12px' }}>
                      check
                    </span>
                  }
                </div>
                <span className="text-sm font-medium">{skill}</span>
              </div>
            ))}
          </div>
          
          <div 
            className="mt-3 border border-gray-200 rounded-lg p-2.5 flex items-center cursor-pointer"
            onClick={() => setSelectedSkills([])}
          >
            <div className={`${selectedSkills.length === 0 ? 'bg-primary-600 text-white' : 'border border-gray-300 bg-white'} rounded-full w-4 h-4 flex items-center justify-center mr-2`}>
              {selectedSkills.length === 0 && 
                <span className="material-icons-round" style={{ fontSize: '12px' }}>
                  check
                </span>
              }
            </div>
            <span className="text-sm font-medium">Let coach decide</span>
          </div>
        </div>
      </div>
      
      {/* 底部按钮 */}
      <div className="bg-white px-4 py-4 border-t border-gray-200">
        <button className="w-full bg-primary-600 text-white font-medium py-3 rounded-lg shadow-sm flex items-center justify-center text-base active:bg-primary-700">
          Continue
        </button>
      </div>
    </div>
  );
};

export default SingleBookingDetails; 