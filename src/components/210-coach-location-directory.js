import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

const CoachLocationDirectory = () => {
  // 状态管理
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'public', 'private'
  const [showSearch, setShowSearch] = useState(false);
  
  // 模拟场地数据 - 添加isMainLocation字段
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: "Wimbledon Tennis Club",
      address: "30 Somerset Road, London, SW19 5JU",
      type: "public",
      isMainLocation: true,
      hasCourtFee: true,
      courtFeeAmount: "15.00",
      courtFeeFrequency: "hour",
      facilities: ["Indoor", "Showers", "Cafe", "Spectator Seating"]
    },
    {
      id: 2,
      name: "Home Court",
      address: "21 Wimbledon Park Road, London, SW18 5SJ",
      type: "private",
      isMainLocation: false,
      hasCourtFee: false,
      courtFeeAmount: "",
      courtFeeFrequency: "hour",
      facilities: ["Outdoor", "Changing Room"]
    },
    {
      id: 3,
      name: "St Mary's Tennis Club",
      address: "19 Grand Drive, London, SW20 0JD",
      type: "public",
      isMainLocation: false,
      hasCourtFee: true,
      courtFeeAmount: "12.50",
      courtFeeFrequency: "hour",
      facilities: ["Indoor & Outdoor", "Changing Room", "Cafe"]
    },
    {
      id: 4,
      name: "David Lloyd Club",
      address: "Bushey Road, London, SW20 8DE",
      type: "public",
      isMainLocation: false,
      hasCourtFee: true,
      courtFeeAmount: "25.00",
      courtFeeFrequency: "session",
      facilities: ["Indoor", "Cafe", "Showers", "Spectator Seating"]
    }
  ]);
  
  // 筛选场地
  const filteredLocations = locations.filter(location => {
    // 应用类型筛选
    if (filterType !== 'all' && location.type !== filterType) {
      return false;
    }
    
    // 应用搜索筛选
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return location.name.toLowerCase().includes(query) || 
             location.address.toLowerCase().includes(query);
    }
    
    return true;
  });
  
  // 按主要位置排序
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    if (a.isMainLocation && !b.isMainLocation) return -1;
    if (!a.isMainLocation && b.isMainLocation) return 1;
    return 0;
  });
  
  // 设置主要位置
  const setMainLocation = (id) => {
    setLocations(prevLocations => 
      prevLocations.map(location => ({
        ...location,
        isMainLocation: location.id === id
      }))
    );
  };
  
  // 删除位置
  const deleteLocation = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      setLocations(prevLocations => 
        prevLocations.filter(location => location.id !== id)
      );
    }
  };
  
  // 设施图标映射
  const facilityIcons = {
    'Indoor': 'home',
    'Outdoor': 'wb_sunny',
    'Indoor & Outdoor': 'compare_arrows',
    'Cafe': 'local_cafe',
    'Changing Room': 'meeting_room',
    'Showers': 'shower',
    'Spectator Seating': 'event_seat'
  };
  
  // 渲染类型标签
  const renderTypeTag = (type) => {
    return (
      <div className={`
        flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
        ${type === 'public' 
          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
          : 'bg-orange-50 text-orange-700 border border-orange-200'}
      `}>
        <i className={`material-icons mr-1 ${
          type === 'public' ? 'text-blue-600' : 'text-orange-600'
        }`} style={{fontSize: "14px"}}>
          {type === 'public' ? 'public' : 'business'}
        </i>
        {type === 'public' ? 'Public' : 'Private'}
      </div>
    );
  };
  
  // 清除搜索
  const clearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    console.log('Navigate back');
  };
  
  // 创建顶部导航栏右侧元素
  const rightElement = (
    <div className="flex items-center space-x-1">
      {!showSearch && (
        <button 
          className="p-2 rounded-full transition-colors duration-200"
          onClick={() => setShowSearch(true)}
        >
          <i className="material-icons-outlined text-gray-600" style={{fontSize: "20px"}}>search</i>
        </button>
      )}
      
      <button 
        className={`p-2 rounded-full transition-colors duration-200 ${
          showFilter ? 'bg-green-100' : ''
        }`}
        onClick={() => setShowFilter(!showFilter)}
      >
        <div className="relative">
          <i 
            className={showFilter ? "material-icons-outlined text-green-600" : "material-icons-outlined text-gray-600"}
            style={{fontSize: "20px"}}
          >
            filter_list
          </i>
          {showFilter && (
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-600 rounded-full"></div>
          )}
        </div>
      </button>
    </div>
  );
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      {showSearch ? (
        <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200 shadow-sm">
          <button 
            className="p-1.5 rounded-full transition-colors duration-200" 
            onClick={clearSearch}
          >
            <i className="material-icons-outlined text-gray-700" style={{fontSize: "20px"}}>close</i>
          </button>
          
          <div className="flex-1 flex items-center px-3">
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 text-gray-800 text-sm focus:outline-none bg-gray-50 rounded-lg focus:bg-white focus:ring-2 focus:ring-green-500 transition-all duration-200"
              autoFocus
            />
            {searchQuery && (
              <button 
                className="p-1.5 ml-2 rounded-full transition-colors duration-200" 
                onClick={() => setSearchQuery('')}
              >
                <i className="material-icons-outlined text-gray-500" style={{fontSize: "18px"}}>close</i>
              </button>
            )}
          </div>
        </div>
      ) : (
        <PageHeader 
          title="My Locations" 
          onBack={handleBack} 
          rightElement={rightElement}
        />
      )}
      
      {/* 过滤条件 */}
      {showFilter && (
        <div className="bg-white px-4 py-4 border-b border-gray-200 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">Location Type</p>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filterType === 'all' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setFilterType('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filterType === 'public' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setFilterType('public')}
            >
              Public
            </button>
            <button 
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filterType === 'private' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setFilterType('private')}
            >
              Private
            </button>
          </div>
        </div>
      )}
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto">
        {/* 搜索结果信息 */}
        {(searchQuery || filterType !== 'all') && (
          <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-green-800 font-medium">
                {filteredLocations.length} locations found
              </p>
              <button 
                className="text-xs text-green-600 font-semibold transition-colors duration-200"
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                  setShowFilter(false);
                  setShowSearch(false);
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
        
        {/* 场地列表 */}
        {sortedLocations.length > 0 ? (
          <div className="p-4 space-y-4">
            {sortedLocations.map(location => (
              <div 
                key={location.id} 
                className={`bg-white rounded-xl shadow-sm transition-all duration-200 ${
                  location.isMainLocation 
                    ? 'ring-2 ring-green-200 bg-gradient-to-br from-white to-green-50' 
                    : ''
                }`}
              >
                {/* 主要位置标识 */}
                {location.isMainLocation && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-t-xl">
                    <div className="flex items-center">
                      <i className="material-icons mr-2" style={{fontSize: "16px"}}>star</i>
                      <span className="text-sm font-semibold">Main Location</span>
                    </div>
                  </div>
                )}
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h2 className="text-lg font-semibold text-gray-800">{location.name}</h2>
                      </div>
                      
                      <div className="flex items-start mb-3">
                        <i className="material-icons-outlined text-gray-500 mr-2 mt-0.5" style={{fontSize: "16px"}}>place</i>
                        <p className="text-sm text-gray-600 flex-1">{location.address}</p>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        {renderTypeTag(location.type)}
                      </div>
                    </div>
                  </div>
                  
                  {/* 费用信息 */}
                  <div className="mb-4">
                    {location.hasCourtFee ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <i className="material-icons text-amber-600 mr-2" style={{fontSize: "16px"}}>payments</i>
                            <div>
                              <p className="text-sm font-semibold text-amber-800">Court Fee Required</p>
                              <p className="text-xs text-amber-700">Additional cost for court usage</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-amber-800">£{location.courtFeeAmount}</p>
                            <p className="text-xs text-amber-600">per {location.courtFeeFrequency}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                        <div className="flex items-center">
                          <i className="material-icons text-green-600 mr-2" style={{fontSize: "16px"}}>check_circle</i>
                          <div>
                            <p className="text-sm font-semibold text-green-800">No Court Fees</p>
                            <p className="text-xs text-green-700">Free court usage included</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* 设施标签 */}
                  {location.facilities && location.facilities.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {location.facilities.map((facility, index) => (
                          <div 
                            key={index}
                            className="flex items-center px-2.5 py-1 bg-purple-50 text-purple-700 text-xs rounded-lg border border-purple-200"
                          >
                            <i 
                              className="material-icons mr-1 text-purple-600" 
                              style={{fontSize: "12px"}}
                            >
                              {facilityIcons[facility] || 'check_circle'}
                            </i>
                            {facility}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* 主要位置设置 */}
                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Set as Main Location</p>
                      <p className="text-xs text-gray-500">Primary teaching location</p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={`mainLocation-${location.id}`}
                        checked={location.isMainLocation}
                        onChange={() => setMainLocation(location.id)}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`mainLocation-${location.id}`}
                        className={`flex items-center cursor-pointer ${
                          location.isMainLocation ? 'bg-green-500' : 'bg-gray-300'
                        } relative inline-block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out shadow-inner`}
                      >
                        <span
                          className={`${
                            location.isMainLocation ? 'translate-x-6' : 'translate-x-1'
                          } inline-block w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-in-out`}
                        />
                      </label>
                    </div>
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="flex space-x-3">
                    <button className="py-2.5 px-4 bg-green-100 border border-green-200 rounded-xl text-sm font-medium text-green-700 transition-all duration-200">
                      <i className="material-icons" style={{fontSize: "16px"}}>edit</i>
                    </button>
                    
                    <button 
                      className="py-2.5 px-4 bg-red-100 border border-red-200 rounded-xl text-sm font-medium text-red-700 transition-all duration-200"
                      onClick={() => deleteLocation(location.id)}
                    >
                      <i className="material-icons" style={{fontSize: "16px"}}>delete</i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
              <i className="material-icons-outlined text-gray-400" style={{fontSize: "32px"}}>location_off</i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No locations found</h3>
            <p className="text-gray-500 text-center mb-6 max-w-sm">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
              className="px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg"
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                setShowFilter(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      {/* 底部添加按钮 */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <button className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold flex items-center justify-center transition-all duration-200 shadow-lg">
          <i className="material-icons mr-2" style={{fontSize: "20px"}}>add</i>
          Add New Location
        </button>
      </div>
    </div>
  );
};

export default CoachLocationDirectory; 