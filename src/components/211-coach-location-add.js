import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

const CoachLocationAddPage = () => {
  // 表单状态
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [locationType, setLocationType] = useState('public'); // 'public' or 'private'
  const [amenities, setAmenities] = useState({
    indoor: false,
    outdoor: false,
    indoor_outdoor: false,
    cafe_shop: false,
    changing_room: false,
    showers: false,
    spectator_seating: false
  });
  const [isMainLocation, setIsMainLocation] = useState(false);
  const [hasCourtFee, setHasCourtFee] = useState(false);
  const [courtFeeAmount, setCourtFeeAmount] = useState('');
  const [courtFeeFrequency, setCourtFeeFrequency] = useState('hour'); // 'hour', 'session', 'day'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // 模拟搜索结果
  const mockSearchResults = [
    {
      id: 1,
      name: 'Wimbledon Tennis Club',
      address: 'Church Road, Wimbledon, London SW19 5AE',
      type: 'Tennis Club'
    },
    {
      id: 2,
      name: 'All England Lawn Tennis Club',
      address: 'Church Road, Wimbledon, London SW19 5AE',
      type: 'Tennis Club'
    },
    {
      id: 3,
      name: 'Queen\'s Club',
      address: 'Palliser Road, London W14 9EQ',
      type: 'Sports Club'
    }
  ];
  
  // 处理搜索
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setIsSearching(true);
      // 模拟API搜索
      setTimeout(() => {
        setSearchResults(mockSearchResults.filter(location => 
          location.name.toLowerCase().includes(query.toLowerCase()) ||
          location.address.toLowerCase().includes(query.toLowerCase())
        ));
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };
  
  // 选择位置
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSearchResults([]);
    setSearchQuery(location.name);
  };
  
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedLocation) {
      alert('Please select a location from search results');
      return;
    }
    
    if (hasCourtFee && (!courtFeeAmount || parseFloat(courtFeeAmount) <= 0)) {
      alert('Please enter a valid court fee amount');
      return;
    }
    
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // 在实际应用中，这里会导航回位置列表页面
      setTimeout(() => {
        console.log('Navigate to locations list');
      }, 1500);
    }, 1000);
  };
  
  // 处理复选框变化
  const handleAmenityChange = (amenity) => {
    setAmenities(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  // 设施选项配置
  const amenityOptions = [
    { key: 'indoor', label: 'Indoor', icon: 'home' },
    { key: 'outdoor', label: 'Outdoor', icon: 'wb_sunny' },
    { key: 'indoor_outdoor', label: 'Indoor & Outdoor', icon: 'compare_arrows' },
    { key: 'cafe_shop', label: 'Cafe / Shop', icon: 'local_cafe' },
    { key: 'changing_room', label: 'Changing Room', icon: 'meeting_room' },
    { key: 'showers', label: 'Showers', icon: 'shower' },
    { key: 'spectator_seating', label: 'Spectator Seating', icon: 'event_seat' }
  ];
  
  // 渲染成功状态
  if (showSuccess) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <i className="material-icons text-green-600" style={{fontSize: "32px"}}>check_circle</i>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Location Added!</h2>
          <p className="text-gray-600 text-center mb-6">
            Your new teaching location has been added successfully.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <PageHeader title="Add New Location" onBack={handleBack} />
      
      {/* 表单内容 */}
      <div className="flex-1 overflow-auto p-4">
        <form onSubmit={handleSubmit}>
          {/* 位置搜索部分 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Search Location</h2>
            
            {/* 搜索框 */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Search <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Enter location name, address, or postcode"
                  className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12 bg-gray-50 focus:bg-white transition-all duration-200"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-500"></div>
                  ) : (
                    <i className="material-icons-outlined text-gray-400" style={{fontSize: "20px"}}>search</i>
                  )}
                </div>
              </div>
              
              {/* 搜索结果 */}
              {searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {searchResults.map(result => (
                    <button
                      key={result.id}
                      type="button"
                      className="w-full text-left p-4 border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                      onClick={() => handleLocationSelect(result)}
                    >
                      <div className="font-medium text-gray-800 text-sm">{result.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{result.address}</div>
                      <div className="text-xs text-green-600 mt-1 font-medium">{result.type}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* 地图预览 */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl h-48 mb-4 flex items-center justify-center border border-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-blue-100/30"></div>
              <div className="text-center z-10">
                <div className="bg-white rounded-full p-3 mb-3 mx-auto w-fit shadow-sm">
                  <i className="material-icons-outlined text-green-600" style={{fontSize: "28px"}}>map</i>
                </div>
                <p className="text-sm text-gray-600 font-medium">Map Preview</p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedLocation ? 'Location selected' : 'Search for a location to view map'}
                </p>
              </div>
              {selectedLocation && (
                <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1">
                  <i className="material-icons" style={{fontSize: "16px"}}>place</i>
                </div>
              )}
            </div>
            
            {/* 选中的位置 */}
            {selectedLocation && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-sm">{selectedLocation.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{selectedLocation.address}</div>
                  </div>
                  <div className="bg-green-100 rounded-full p-1">
                    <i className="material-icons text-green-600" style={{fontSize: "20px"}}>check_circle</i>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* 场地类型与设施 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Facility Information</h2>
            
            {/* 场地类型 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Location Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                <label className={`relative cursor-pointer transition-all duration-200 ${
                  locationType === 'public' 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300' 
                    : 'bg-gray-50 border-2 border-gray-200'
                } rounded-xl p-4`}>
                  <input
                    type="radio"
                    name="locationType"
                    value="public"
                    checked={locationType === 'public'}
                    onChange={() => setLocationType('public')}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`rounded-full p-2 mr-3 ${
                        locationType === 'public' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <i className={`material-icons ${
                          locationType === 'public' ? 'text-green-600' : 'text-gray-500'
                        }`} style={{fontSize: "20px"}}>public</i>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Public</div>
                        <div className="text-xs text-gray-500 mt-1">Community courts and clubs</div>
                      </div>
                    </div>
                    {locationType === 'public' && (
                      <i className="material-icons text-green-600" style={{fontSize: "20px"}}>check_circle</i>
                    )}
                  </div>
                </label>
                
                <label className={`relative cursor-pointer transition-all duration-200 ${
                  locationType === 'private' 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300' 
                    : 'bg-gray-50 border-2 border-gray-200'
                } rounded-xl p-4`}>
                  <input
                    type="radio"
                    name="locationType"
                    value="private"
                    checked={locationType === 'private'}
                    onChange={() => setLocationType('private')}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`rounded-full p-2 mr-3 ${
                        locationType === 'private' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <i className={`material-icons ${
                          locationType === 'private' ? 'text-green-600' : 'text-gray-500'
                        }`} style={{fontSize: "20px"}}>business</i>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Private / Commercial</div>
                        <div className="text-xs text-gray-500 mt-1">Private clubs and facilities</div>
                      </div>
                    </div>
                    {locationType === 'private' && (
                      <i className="material-icons text-green-600" style={{fontSize: "20px"}}>check_circle</i>
                    )}
                  </div>
                </label>
              </div>
            </div>
            
            {/* 设施 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Location Features
              </label>
              <div className="grid grid-cols-1 gap-2">
                {amenityOptions.map(option => (
                  <label 
                    key={option.key}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      amenities[option.key] 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300' 
                        : 'bg-gray-50 border border-gray-200'
                    } rounded-lg p-3`}
                  >
                    <input
                      type="checkbox"
                      checked={amenities[option.key]}
                      onChange={() => handleAmenityChange(option.key)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`rounded-full p-1.5 mr-3 ${
                          amenities[option.key] ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          <i className={`material-icons ${
                            amenities[option.key] ? 'text-purple-600' : 'text-gray-500'
                          }`} style={{fontSize: "16px"}}>{option.icon}</i>
                        </div>
                        <span className={`text-sm font-medium ${
                          amenities[option.key] ? 'text-purple-700' : 'text-gray-700'
                        }`}>{option.label}</span>
                      </div>
                      {amenities[option.key] && (
                        <i className="material-icons text-green-600" style={{fontSize: "18px"}}>check_circle</i>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          {/* 主要位置设置 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Set as Main Location</h3>
                <p className="text-xs text-gray-500 mt-1">This will be your primary teaching location</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  id="mainLocation"
                  checked={isMainLocation}
                  onChange={(e) => setIsMainLocation(e.target.checked)}
                  className="sr-only"
                />
                <label
                  htmlFor="mainLocation"
                  className={`flex items-center cursor-pointer ${
                    isMainLocation ? 'bg-green-500' : 'bg-gray-300'
                  } relative inline-block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out shadow-inner`}
                >
                  <span
                    className={`${
                      isMainLocation ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-in-out`}
                  />
                </label>
              </div>
            </div>
          </div>
          
          {/* 场地费用设置 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Court Fees</h3>
            
            {/* 是否收费 */}
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl mb-4">
              <div>
                <p className="text-sm font-medium text-gray-800">Does this location charge court fees?</p>
                <p className="text-xs text-gray-500 mt-1">Additional cost for using the courts</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  id="hasCourtFee"
                  checked={hasCourtFee}
                  onChange={(e) => setHasCourtFee(e.target.checked)}
                  className="sr-only"
                />
                <label
                  htmlFor="hasCourtFee"
                  className={`flex items-center cursor-pointer ${
                    hasCourtFee ? 'bg-green-500' : 'bg-gray-300'
                  } relative inline-block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out shadow-inner`}
                >
                  <span
                    className={`${
                      hasCourtFee ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-in-out`}
                  />
                </label>
              </div>
            </div>
            
            {/* 费用详情 */}
            {hasCourtFee && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">£</span>
                      <input
                        type="number"
                        value={courtFeeAmount}
                        onChange={(e) => setCourtFeeAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-gray-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                        required={hasCourtFee}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Per <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={courtFeeFrequency}
                      onChange={(e) => setCourtFeeFrequency(e.target.value)}
                      className="w-full p-2.5 border border-gray-200 rounded-xl text-gray-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                      required={hasCourtFee}
                    >
                      <option value="hour">Hour</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                  <div className="flex items-start">
                    <i className="material-icons text-purple-600 mr-2 mt-0.5" style={{fontSize: "16px"}}>info</i>
                    <div>
                      <p className="text-sm text-purple-800 font-medium">Court Fee Information</p>
                      <p className="text-xs text-purple-700 mt-1">
                        This fee will be displayed to students when they book lessons at this location. 
                        You can update this information anytime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* 提交按钮 */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold flex items-center justify-center shadow-lg transition-all duration-200"
            disabled={isSubmitting || !selectedLocation}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Adding Location...
              </>
            ) : (
              'Add Location'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoachLocationAddPage; 