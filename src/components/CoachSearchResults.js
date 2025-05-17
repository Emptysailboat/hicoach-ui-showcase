import React, { useState } from 'react';
import { MapPin, Search, MessageCircle, ChevronRight, ChevronLeft, Calendar, ListFilter, Map, ArrowDownUp } from 'lucide-react';

const CoachSearchResults104 = () => {
  // 视图状态：list 或 map
  const [viewMode, setViewMode] = useState('list');
  
  // 搜索状态
  const [searchTerm, setSearchTerm] = useState('');
  
  // 排序状态
  const [sortBy, setSortBy] = useState('recommended');
  const [showSortOptions, setShowSortOptions] = useState(false);
  
  // 地图标记选中状态
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // 收藏状态
  const [favorites, setFavorites] = useState({});

  // 显示筛选器状态
  const [showFilters, setShowFilters] = useState(false);
  
  // 添加筛选条件状态
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100,
    minRating: 0,
    qualifications: []
  });
  
  // 模拟教练数据
  const coaches = [
    {
      id: 1,
      name: 'Sarah Parker',
      rating: 4.9,
      reviews: 41,
      price: 30,
      distance: 0.3,
      lessonsCompleted: 456,
      location: 'Wilton tennis club',
      qualifications: ['LTA-5', 'PTR-PRO'],
      lat: 51.423,
      lng: -0.217
    },
    {
      id: 2,
      name: 'James Wilson',
      rating: 4.8,
      reviews: 35,
      price: 25,
      distance: 0.8,
      lessonsCompleted: 312,
      location: 'Dundonald playground',
      qualifications: ['LTA-4'],
      lat: 51.419,
      lng: -0.219
    },
    {
      id: 3,
      name: 'Michael Brown',
      rating: 4.7,
      reviews: 28,
      price: 35,
      distance: 1.2,
      lessonsCompleted: 284,
      location: 'Joseph Hood recreational playground',
      qualifications: ['LTA-3', 'ITF-2'],
      lat: 51.415,
      lng: -0.226
    },
    {
      id: 4,
      name: 'Emma Thompson',
      rating: 5.0,
      reviews: 19,
      price: 40,
      distance: 1.5,
      lessonsCompleted: 189,
      location: 'Wilton tennis club',
      qualifications: ['LTA-5'],
      lat: 51.423,
      lng: -0.217
    }
  ];
  
  // 收藏教练功能
  const toggleFavorite = (coachId) => {
    setFavorites(prev => ({
      ...prev,
      [coachId]: !prev[coachId]
    }));
  };
  
  // 搜索和排序功能
  const getSortedCoaches = () => {
    let result = [...coaches];
    
    // 应用搜索过滤
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(coach => 
        coach.name.toLowerCase().includes(term) ||
        coach.location.toLowerCase().includes(term)
      );
    }
    
    // 应用筛选条件
    result = result.filter(coach => 
      coach.price >= filters.minPrice && 
      coach.price <= filters.maxPrice &&
      coach.rating >= filters.minRating &&
      (filters.qualifications.length === 0 || 
        filters.qualifications.some(q => coach.qualifications.includes(q)))
    );
    
    // 应用排序
    switch(sortBy) {
      case 'priceAsc':
        return result.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return result.sort((a, b) => b.price - a.price);
      case 'distance':
        return result.sort((a, b) => a.distance - b.distance);
      case 'rating':
        return result.sort((a, b) => b.rating - a.rating);
      case 'lessonsCompleted':
        return result.sort((a, b) => b.lessonsCompleted - a.lessonsCompleted);
      default:
        return result;
    }
  };
  
  const sortedCoaches = getSortedCoaches();
  
  // 地图标记位置计算
  const calculateMapPosition = (lat, lng) => {
    return { 
      top: `${(1 - (lat - 51.41) / 0.02) * 70}%`, 
      left: `${((lng + 0.23) / 0.02) * 70}%` 
    };
  };
  
  // 聚合相同位置的教练
  const getLocationClusters = () => {
    const locations = {};
    sortedCoaches.forEach(coach => {
      const key = `${coach.lat}-${coach.lng}`;
      if (!locations[key]) {
        locations[key] = {
          lat: coach.lat,
          lng: coach.lng,
          coaches: [],
          count: 0,
          position: calculateMapPosition(coach.lat, coach.lng)
        };
      }
      locations[key].coaches.push(coach);
      locations[key].count += 1;
    });
    return Object.values(locations);
  };
  
  const locationClusters = getLocationClusters();
  
  // 处理排序选项点击
  const handleSortChange = (option) => {
    setSortBy(option);
    setShowSortOptions(false);
  };
  
  // 刷新当前地图区域
  const refreshMapArea = () => {
    // 实际应用中，这里会重新获取当前显示区域内的教练数据
    // 模拟刷新操作
    const refreshAnimation = document.getElementById('map-refresh-animation');
    if (refreshAnimation) {
      refreshAnimation.classList.add('animate-spin');
      setTimeout(() => {
        refreshAnimation.classList.remove('animate-spin');
      }, 1000);
    }
  };
  
  // 排序选项文本映射
  const sortOptions = {
    recommended: 'Recommended',
    priceAsc: 'Price: Low to High',
    priceDesc: 'Price: High to Low',
    distance: 'Distance',
    rating: 'Rating',
    lessonsCompleted: 'Experience'
  };
  
  // 教练卡片组件 - 可复用于其他页面
  const CoachCard = ({ coach, isMiniCard = false }) => {
    const isFavorite = favorites[coach.id] || false;
    
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${isMiniCard ? 'p-3' : 'p-4'}`}>
        <div className="flex items-start">
          {/* 头像 */}
          <div className={`${isMiniCard ? 'w-12 h-12' : 'w-16 h-16'} rounded-full bg-primary-100 flex items-center justify-center border-2 border-primary-50 flex-shrink-0`}>
            <img 
              src={`https://ui-avatars.com/api/?name=${coach.name}&background=00B36F&color=fff`}
              alt={coach.name} 
              className={`${isMiniCard ? 'w-12 h-12' : 'w-16 h-16'} object-cover rounded-full`} 
            />
          </div>
          
          {/* 教练信息 */}
          <div className={`${isMiniCard ? 'ml-3' : 'ml-4'} flex-1 min-w-0`}>
            <div className="flex justify-between items-center mb-1">
              <h2 className={`${isMiniCard ? 'text-sm' : 'text-base'} font-semibold text-gray-800 truncate`}>
                {coach.name}
              </h2>
              
              {/* 收藏按钮 */}
              <button 
                className={`p-1.5 rounded-full active:bg-gray-100 transition-colors`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(coach.id);
                }}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={isFavorite ? "text-primary-500" : "text-gray-400"}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex items-center mb-1">
              <svg 
                width={isMiniCard ? "12" : "16"} 
                height={isMiniCard ? "12" : "16"} 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="text-primary-500"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span className={`ml-1 ${isMiniCard ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
                {coach.rating}
              </span>
              <span className="mx-1 text-gray-400">•</span>
              <span className={`${isMiniCard ? 'text-xs' : 'text-sm'} text-gray-500`}>
                {coach.reviews} reviews
              </span>
            </div>
            
            <div className="flex items-center">
              <MapPin className={`${isMiniCard ? 'w-3 h-3' : 'w-4 h-4'} text-primary-500 mr-1`} />
              <span className={`${isMiniCard ? 'text-xs' : 'text-sm'} text-gray-500 truncate`}>
                {coach.distance} miles away
              </span>
            </div>
            
            {/* 价格展示 */}
            <div className={`flex items-center justify-between ${isMiniCard ? 'mt-1.5' : 'mt-2'}`}>
              {/* 授课总数 */}
              <span className={`inline-block px-2 py-0.5 bg-purple-50 text-purple-600 ${isMiniCard ? 'text-xs' : 'text-sm'} font-medium rounded-full`}>
                {coach.lessonsCompleted} lessons
              </span>
              
              <span className={`${isMiniCard ? 'text-xs' : 'text-sm'} font-medium text-primary-500`}>
                £{coach.price}/hr
              </span>
            </div>
            
            {/* 资质标签 */}
            <div className="flex flex-wrap gap-1 mt-2">
              {coach.qualifications.map((qual, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-0.5 bg-primary-50 text-primary-600 text-xs font-medium rounded-full"
                >
                  {qual}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center justify-between border-b border-gray-200 shadow-sm">
        <button 
          className="p-1.5 rounded-full active:bg-gray-100 transition-colors"
          aria-label="Go back"
          style={{minHeight: "44px", minWidth: "44px"}}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 leading-7">Tennis Coaches</h1>
        <div className="w-10"></div>
      </div>
      
      {/* 搜索栏 */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Search by name or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{minHeight: "44px"}}
            />
          </div>
          
          {/* 筛选按钮 */}
          <button 
            className="p-2.5 rounded-xl border border-gray-300 active:bg-gray-50 transition-colors flex items-center justify-center"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Filter options"
            aria-expanded={showFilters}
            style={{minHeight: "44px", minWidth: "44px"}}
          >
            <ListFilter className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        
        {/* 筛选面板 */}
        {showFilters && (
          <div className="mt-3 p-4 bg-white rounded-xl border border-gray-200 shadow-md">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Filter Options</h3>
            
            {/* 价格筛选 */}
            <div className="mb-4">
              <label className="text-xs text-gray-600 block mb-2">Price Range (£/hr)</label>
              <div className="flex items-center justify-between">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.minPrice} 
                  onChange={(e) => setFilters({...filters, minPrice: Number(e.target.value)})}
                  className="w-full accent-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 min-w-[45px] text-right">
                  £{filters.minPrice} - £{filters.maxPrice}
                </span>
              </div>
            </div>
            
            {/* 评分筛选 */}
            <div className="mb-4">
              <label className="text-xs text-gray-600 block mb-2">Minimum Rating</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button 
                    key={rating}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${filters.minRating >= rating ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilters({...filters, minRating: rating})}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 认证筛选 */}
            <div className="mb-4">
              <label className="text-xs text-gray-600 block mb-2">Qualifications</label>
              <div className="flex flex-wrap gap-2">
                {['LTA-5', 'LTA-4', 'LTA-3', 'PTR-PRO', 'ITF-2'].map(qual => (
                  <button
                    key={qual}
                    className={`px-2 py-1 text-xs rounded-full ${filters.qualifications.includes(qual) ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => {
                      const newQuals = filters.qualifications.includes(qual) 
                        ? filters.qualifications.filter(q => q !== qual)
                        : [...filters.qualifications, qual];
                      setFilters({...filters, qualifications: newQuals});
                    }}
                  >
                    {qual}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 筛选按钮 */}
            <div className="flex space-x-2">
              <button 
                className="flex-1 py-2 rounded-lg text-sm bg-gray-100 text-gray-700 active:bg-gray-200"
                onClick={() => setFilters({minPrice: 0, maxPrice: 100, minRating: 0, qualifications: []})}
              >
                Reset
              </button>
              <button 
                className="flex-1 py-2 rounded-lg text-sm bg-primary-500 text-white active:bg-primary-600"
                onClick={() => setShowFilters(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* 视图切换和排序栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        {/* 视图切换 */}
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button 
            className={`px-3 py-1.5 rounded-md flex items-center ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
            style={{minHeight: "36px"}}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={`mr-1.5 ${viewMode === 'list' ? 'text-primary-500' : 'text-gray-500'}`}
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span className={`text-sm font-medium ${viewMode === 'list' ? 'text-gray-800' : 'text-gray-600'}`}>
              List
            </span>
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md flex items-center ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setViewMode('map')}
            aria-pressed={viewMode === 'map'}
            style={{minHeight: "36px"}}
          >
            <Map className={`w-4 h-4 mr-1.5 ${viewMode === 'map' ? 'text-primary-500' : 'text-gray-500'}`} />
            <span className={`text-sm font-medium ${viewMode === 'map' ? 'text-gray-800' : 'text-gray-600'}`}>
              Map
            </span>
          </button>
        </div>
        
        {/* 排序下拉菜单 */}
        <div className="relative">
          <button 
            className="flex items-center text-sm font-medium text-gray-700 px-3 py-1.5 border border-gray-300 rounded-lg active:bg-gray-50 transition-colors"
            onClick={() => setShowSortOptions(!showSortOptions)}
            aria-expanded={showSortOptions}
            aria-haspopup="true"
            style={{minHeight: "36px"}}
          >
            <ArrowDownUp className="w-4 h-4 mr-1.5 text-primary-500" />
            Sort: {sortOptions[sortBy]}
            <ChevronRight className="ml-1 w-4 h-4 text-gray-500 rotate-90" />
          </button>
          
          {/* 排序选项下拉菜单 */}
          {showSortOptions && (
            <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-200 z-10 py-1">
              {Object.entries(sortOptions).map(([key, label]) => (
                <button
                  key={key}
                  className={`block w-full text-left px-4 py-2.5 text-sm ${sortBy === key ? 'bg-primary-50 text-primary-600' : 'text-gray-700 active:bg-gray-50'}`}
                  onClick={() => handleSortChange(key)}
                  aria-selected={sortBy === key}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* 内容区域 - 根据视图模式切换 */}
      <div className="flex-1 overflow-auto">
        {viewMode === 'list' ? (
          // 列表视图
          <div className="p-4 space-y-4">
            <p className="text-sm text-gray-500">{sortedCoaches.length} coaches found</p>
            
            {sortedCoaches.length > 0 ? (
              sortedCoaches.map(coach => (
                <div key={coach.id} className="cursor-pointer active:opacity-90 transition-opacity">
                  <CoachCard coach={coach} />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700">No coaches found</p>
                  <p className="text-sm text-gray-500 mt-1">Try adjusting your search or location</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // 地图视图
          <div className="relative h-full">
            {/* 地图部分 */}
            <div className="h-full bg-blue-50 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* 简单模拟地图，实际应用中会使用真实地图组件 */}
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Map View</p>
                </div>
                
                {/* 地图标记 */}
                {locationClusters.map((loc, index) => (
                  <button
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={loc.position}
                    onClick={() => setSelectedLocation(loc)}
                    aria-label={`${loc.count} coaches at this location`}
                  >
                    <div className={`flex items-center justify-center rounded-full ${loc.count > 1 ? 'bg-primary-600' : 'bg-primary-500'} text-white w-8 h-8 shadow-md ${selectedLocation === loc ? 'ring-2 ring-offset-2 ring-primary-600' : ''}`}>
                      {loc.count}
                    </div>
                  </button>
                ))}
                
                {/* 刷新按钮 */}
                <button
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center active:bg-gray-50 transition-colors"
                  onClick={refreshMapArea}
                  aria-label="Refresh map area"
                >
                  <svg 
                    id="map-refresh-animation"
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-primary-500 transition-transform duration-1000"
                  >
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* 地图底部的卡片滑动区域 */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {selectedLocation ? (
                <div className={`overflow-x-auto pb-4 flex ${selectedLocation.coaches.length === 1 ? 'justify-center' : 'space-x-4'}`}>
                  {selectedLocation.coaches.map(coach => (
                    <div 
                      key={coach.id}
                      className="flex-shrink-0 w-64 cursor-pointer active:opacity-90 transition-opacity"
                    >
                      <CoachCard coach={coach} isMiniCard={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-3 text-center">
                  <p className="text-sm text-gray-600">Select a location on the map to view coaches</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachSearchResults104; 