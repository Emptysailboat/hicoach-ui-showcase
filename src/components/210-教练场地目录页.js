import React, { useState } from 'react';
import { Plus, MapPin, Navigation, Home, Star, MoreVertical, Search, X, AlertTriangle, Filter } from 'lucide-react';
import PageHeader from './common/PageHeader';

const CoachLocationDirectory = () => {
  // 状态管理
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'public', 'private'
  const [showSearch, setShowSearch] = useState(false);
  
  // 模拟场地数据
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: "Wimbledon Tennis Club",
      address: "30 Somerset Road, London, SW19 5JU",
      type: "public",
      distance: 2.3,
      favorite: true,
      amenities: ["Showers", "Pro Shop", "Cafe"]
    },
    {
      id: 2,
      name: "Home Court",
      address: "21 Wimbledon Park Road, London, SW18 5SJ",
      type: "private",
      distance: 0.5,
      favorite: true,
      amenities: ["Private Parking"]
    },
    {
      id: 3,
      name: "St Mary's Tennis Club",
      address: "19 Grand Drive, London, SW20 0JD",
      type: "public",
      distance: 3.8,
      favorite: false,
      amenities: ["Changing Rooms", "Cafe"]
    },
    {
      id: 4,
      name: "David Lloyd Club",
      address: "Bushey Road, London, SW20 8DE",
      type: "public",
      distance: 4.1,
      favorite: false,
      amenities: ["Indoor Courts", "Swimming Pool", "Gym", "Cafe"]
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
  
  // 按距离排序结果
  const sortedLocations = [...filteredLocations].sort((a, b) => a.distance - b.distance);
  
  // 设置场地为收藏
  const toggleFavorite = (id) => {
    setLocations(prevLocations => 
      prevLocations.map(location => 
        location.id === id 
          ? { ...location, favorite: !location.favorite } 
          : location
      )
    );
  };
  
  // 渲染类型标签
  const renderTypeTag = (type) => {
    return (
      <span 
        className={`
          px-2 py-0.5 rounded-full text-xs font-medium 
          ${type === 'public' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-primary-100 text-primary-800'}
        `}
      >
        {type === 'public' ? 'Public' : 'Private'}
      </span>
    );
  };
  
  // 清除搜索
  const clearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  // 创建顶部导航栏右侧元素
  const rightElement = (
    <div className="flex items-center">
      {!showSearch && (
        <button 
          className="p-1.5 rounded-full"
          onClick={() => setShowSearch(true)}
        >
          <Search className="h-5 w-5 text-gray-600" />
        </button>
      )}
      
      <button 
        className={`p-1.5 rounded-full ${showFilter ? 'bg-primary-100' : ''}`}
        onClick={() => setShowFilter(!showFilter)}
      >
        <div className="relative">
          <Filter 
            className={showFilter ? "h-5 w-5 text-primary-600" : "h-5 w-5 text-gray-600"}
          />
          {showFilter && (
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary-600 rounded-full"></div>
          )}
        </div>
      </button>
    </div>
  );
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      {showSearch ? (
        <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
          <button className="p-1" onClick={clearSearch}>
            <X className="h-5 w-5 text-gray-700" />
          </button>
          
          <div className="flex-1 flex items-center px-2">
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-1.5 text-gray-800 text-sm focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button className="p-1" onClick={() => setSearchQuery('')}>
                <X className="h-4 w-4 text-gray-500" />
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
        <div className="bg-white px-4 py-3 border-b border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-2">Location Type</p>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filterType === 'all' 
                  ? 'bg-primary-100 text-primary-800' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setFilterType('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filterType === 'public' 
                  ? 'bg-primary-100 text-primary-800' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setFilterType('public')}
            >
              Public
            </button>
            <button 
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filterType === 'private' 
                  ? 'bg-primary-100 text-primary-800' 
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
          <div className="px-4 py-2 border-b border-gray-200 bg-blue-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-800">
                {filteredLocations.length} locations found
              </p>
              <button 
                className="text-xs text-blue-600 font-medium"
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
          <div className="divide-y divide-gray-200">
            {sortedLocations.map(location => (
              <div key={location.id} className="bg-white p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h2 className="text-base font-medium text-gray-800">{location.name}</h2>
                      {location.favorite && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current ml-1" />
                      )}
                    </div>
                    
                    <div className="flex items-start mt-1">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-1 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{location.address}</p>
                    </div>
                    
                    <div className="flex items-center mt-2 space-x-2">
                      {renderTypeTag(location.type)}
                      <span className="flex items-center text-xs text-gray-500">
                        <Navigation className="h-3 w-3 mr-0.5" />
                        {location.distance} mi
                      </span>
                    </div>
                    
                    {location.amenities && location.amenities.length > 0 && (
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1.5">
                          {location.amenities.map((amenity, index) => (
                            <span 
                              key={index}
                              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button className="p-1.5 rounded-full">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="flex mt-3 space-x-2">
                  <button 
                    className="flex-1 py-1.5 px-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-center"
                    onClick={() => toggleFavorite(location.id)}
                  >
                    {location.favorite ? (
                      <>
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1.5" />
                        Favorited
                      </>
                    ) : (
                      <>
                        <Star className="h-4 w-4 text-gray-500 mr-1.5" />
                        Add to Favorites
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No locations found</h3>
            <p className="text-gray-500 text-center mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
              className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium"
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
      <div className="bg-white border-t border-gray-200 p-4">
        <button className="w-full py-2.5 bg-secondary-600 text-white rounded-lg font-medium flex items-center justify-center">
          <Plus className="h-5 w-5 mr-1.5" />
          Add New Location
        </button>
      </div>
    </div>
  );
};

export default CoachLocationDirectory; 