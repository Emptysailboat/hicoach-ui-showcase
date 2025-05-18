import React, { useState } from 'react';
import BottomNavigation from './common/BottomNavigation';
import CoachInfoCard from './common/CoachInfoCard';
import PageHeader from './common/PageHeader';

const FavoriteCoachesPage = () => {
  // 状态管理
  const [searchTerm, setSearchTerm] = useState('');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [coachToRemove, setCoachToRemove] = useState(null);

  // 模拟收藏教练数据
  const [favoriteCoaches, setFavoriteCoaches] = useState([
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
      lastBooked: '2 days ago',
      specialty: 'Technique Improvement'
    },
    {
      id: 3,
      name: 'Michael Brown',
      rating: 4.7,
      reviews: 28,
      price: 35,
      distance: 1.2,
      lessonsCompleted: 284,
      location: 'Joseph Hood playground',
      qualifications: ['LTA-3', 'ITF-2'],
      lastBooked: '1 week ago',
      specialty: 'Junior Training'
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
      lastBooked: '2 weeks ago',
      specialty: 'Advanced Strategy'
    }
  ]);

  // 处理取消收藏
  const handleToggleFavorite = (coachId) => {
    const coachToRemove = favoriteCoaches.find(coach => coach.id === coachId);
    if (coachToRemove) {
      setCoachToRemove(coachToRemove);
      setConfirmDialogOpen(true);
    }
  };

  // 确认取消收藏
  const confirmUnfavorite = () => {
    if (coachToRemove) {
      // 从收藏列表中移除
      setFavoriteCoaches(favoriteCoaches.filter(coach => coach.id !== coachToRemove.id));
    }
    // 关闭确认对话框
    setConfirmDialogOpen(false);
    setCoachToRemove(null);
  };

  // 取消操作
  const cancelUnfavorite = () => {
    setConfirmDialogOpen(false);
    setCoachToRemove(null);
  };

  // 处理教练卡片点击
  const handleCoachClick = (coach) => {
    console.log('Coach clicked:', coach);
    // 实际应用中这里会导航到教练详情页
  };

  // 排序选项
  const sortOptions = {
    recent: 'Recently Booked',
    priceAsc: 'Price: Low to High',
    priceDesc: 'Price: High to Low',
    rating: 'Rating',
    distance: 'Distance'
  };

  // 排序功能
  const getSortedCoaches = () => {
    let result = [...favoriteCoaches];
    
    // 应用搜索过滤
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(coach => 
        coach.name.toLowerCase().includes(term) ||
        coach.location.toLowerCase().includes(term) ||
        coach.specialty.toLowerCase().includes(term)
      );
    }
    
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
      default: // recent
        return result; // 假设数据已按最近预约排序
    }
  };

  // 处理排序选项点击
  const handleSortChange = (option) => {
    setSortBy(option);
    setShowSortOptions(false);
  };

  // 底部导航栏标签改变处理
  const handleNavTabChange = (tabId) => {
    console.log(`Navigation tab changed: ${tabId}`);
    // 实际应用中这里会进行页面导航
  };

  const sortedCoaches = getSortedCoaches();

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* 顶部导航栏 */}
      <PageHeader title="Favorite Coaches" />
      
      {/* 搜索栏 */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="material-icons-round text-gray-400" style={{ fontSize: '20px' }}>search</i>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md text-sm"
            placeholder="Search your favorite coaches"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 排序栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <p className="text-sm text-gray-500">{sortedCoaches.length} coaches</p>
        
        {/* 排序下拉菜单 */}
        <div className="relative">
          <button 
            className="flex items-center text-sm font-medium text-gray-700 px-3 py-1.5 border border-gray-200 rounded-md"
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            <i className="material-icons-round text-primary-600 mr-1.5" style={{ fontSize: '18px' }}>filter_list</i>
            Sort: {sortOptions[sortBy]}
            <i className="material-icons-round ml-1" style={{ fontSize: '18px' }}>expand_more</i>
          </button>
          
          {/* 排序选项下拉菜单 */}
          {showSortOptions && (
            <div className="absolute right-0 mt-1 w-52 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              {Object.entries(sortOptions).map(([key, label]) => (
                <button
                  key={key}
                  className={`block w-full text-left px-4 py-2.5 text-sm ${sortBy === key ? 'bg-primary-50 text-primary-600' : 'text-gray-700'}`}
                  onClick={() => handleSortChange(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 教练列表区域 */}
      <div className="flex-1 overflow-auto pb-16">
        <div className="p-4 space-y-4">
          {sortedCoaches.length > 0 ? (
            sortedCoaches.map(coach => (
              <div key={coach.id} className="relative">
                <CoachInfoCard
                  coach={coach}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                  onClick={handleCoachClick}
                  showLocation={true}
                  showQualifications={true}
                />
                {/* 额外信息 - 最近预约 */}
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 rounded-b-xl flex items-center">
                  <i className="material-icons-round text-gray-400 mr-1.5" style={{ fontSize: '16px' }}>calendar_today</i>
                  <span className="text-xs text-gray-500">Last booked {coach.lastBooked}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i className="material-icons-round text-gray-400" style={{ fontSize: '24px' }}>favorite_border</i>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">No favorite coaches</h3>
              <p className="text-sm text-gray-500 max-w-xs">
                {searchTerm ? `No coaches matching "${searchTerm}"` : "You haven't added any coaches to your favorites yet."}
              </p>
              {searchTerm && (
                <button 
                  className="mt-4 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* 确认对话框 */}
      {confirmDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Remove from favorites?</h3>
            <p className="text-gray-600 mb-5">
              Are you sure you want to remove {coachToRemove?.name} from your favorites?
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md text-sm font-medium"
                onClick={cancelUnfavorite}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-error-500 text-white rounded-md text-sm font-medium"
                onClick={confirmUnfavorite}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 底部导航栏 */}
      <BottomNavigation activeTab="coaches" onTabChange={handleNavTabChange} />
    </div>
  );
};

export default FavoriteCoachesPage; 