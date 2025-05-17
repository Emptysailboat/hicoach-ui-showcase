import React, { useState } from 'react';
import BottomNavigation from './common/BottomNavigation';
import PageHeader from './common/PageHeader';

const LessonsPage = () => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const tabs = ['Pending', 'Confirmed', 'Completed', 'Declined'];
  const filterOptions = ['All', 'Today', 'This Week', 'This Month'];
  
  // 切换筛选面板
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // 选择筛选选项
  const selectFilter = (filter) => {
    setActiveFilter(filter);
    setIsFilterOpen(false);
  };
  
  // 底部导航栏标签改变处理
  const handleNavTabChange = (tabId) => {
    console.log(`Navigation tab changed: ${tabId}`);
    // 实际应用中这里会进行页面导航
  };
  
  // 根据当前标签选择要显示的课程
  const renderLessons = () => {
    switch(activeTab) {
      case 'Pending':
        return (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <PendingLessonCard key={i} />
            ))}
          </div>
        );
      case 'Confirmed':
        return (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <ConfirmedLessonCard key={i} />
            ))}
          </div>
        );
      case 'Completed':
        return (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <CompletedLessonCard key={i} />
            ))}
          </div>
        );
      case 'Declined':
        return (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <DeclinedLessonCard key={i} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* 顶部搜索区域 */}
      <PageHeader title="My Lessons" />
      
      <div className="bg-white px-4 py-3.5 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="material-icons-round text-gray-400" style={{ fontSize: '18px' }}>search</i>
            </div>
            <input
              type="text"
              placeholder="Search lesson..."
              className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <button 
            className={`flex items-center justify-center ${isFilterOpen ? 'bg-primary-50 border-primary-200 text-primary-600' : 'bg-white border-gray-200 text-gray-700'} border rounded-lg p-2`}
            onClick={toggleFilter}
          >
            <i className="material-icons-round" style={{ fontSize: '20px' }}>filter_list</i>
          </button>
        </div>
      </div>
      
      {/* 筛选面板 - 条件渲染 */}
      {isFilterOpen && (
        <div className="absolute top-16 right-4 z-10 bg-white rounded-lg shadow-lg border border-gray-200 w-48 py-2">
          <div className="flex justify-between items-center px-4 pb-2 border-b border-gray-100">
            <h3 className="font-medium text-gray-800">Filter by</h3>
            <button 
              className="text-gray-400" 
              onClick={toggleFilter}
            >
              <i className="material-icons-round" style={{ fontSize: '18px' }}>close</i>
            </button>
          </div>
          <div className="py-1">
            {filterOptions.map((option) => (
              <button
                key={option}
                className={`w-full text-left px-4 py-2 text-sm ${
                  activeFilter === option 
                    ? 'bg-primary-50 text-primary-600 font-medium' 
                    : 'text-gray-700'
                }`}
                onClick={() => selectFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* 当前筛选显示 - 如果有筛选条件 */}
      {activeFilter !== 'All' && (
        <div className="bg-white px-4 py-2 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Filter:</span>
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {activeFilter}
            </span>
          </div>
          <button 
            className="text-sm text-primary-600"
            onClick={() => setActiveFilter('All')}
          >
            Clear
          </button>
        </div>
      )}
      
      {/* 标签页导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex px-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 px-1 text-sm font-medium relative ${
                activeTab === tab 
                  ? 'text-primary-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* 课程列表区域 */}
      <div className="flex-1 overflow-auto p-4 pb-20">
        {renderLessons()}
      </div>
      
      {/* 使用底部导航栏组件 */}
      <BottomNavigation activeTab="lessons" onTabChange={handleNavTabChange} />
    </div>
  );
};

// Pending课程卡片
const PendingLessonCard = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden border-l-4 border-yellow-500">
    <div className="p-4">
      <div className="mb-2">
        <h3 className="font-medium text-gray-800 text-lg">Tennis</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
          Pending
        </span>
        <span className="inline-block px-4 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
          Unpaid
        </span>
      </div>
      
      <div className="flex items-center text-gray-700 mb-2">
        <i className="material-icons-round text-gray-500 mr-2">calendar_today</i>
        <span className="text-sm">Saturday, March 15 • 04:04 - 04:04 BST</span>
      </div>
      
      <div className="flex items-center text-gray-700 mb-3">
        <i className="material-icons-round text-gray-500 mr-2">location_on</i>
        <span className="text-sm">28 Wilton Grove, London SW19 3QX</span>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <span className="text-primary-700 text-base font-medium">£60/hr</span>
        <span className="text-gray-700 text-base">Coach: Alice</span>
      </div>
    </div>
  </div>
);

// Confirmed课程卡片
const ConfirmedLessonCard = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden border-l-4 border-primary-500">
    <div className="p-4">
      <div className="mb-2">
        <h3 className="font-medium text-gray-800 text-lg">Tennis</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-block px-4 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
          Confirmed
        </span>
        <span className="inline-block px-4 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#E8F5E9', color: '#388E3C' }}>
          Paid
        </span>
      </div>
      
      <div className="flex items-center text-gray-700 mb-2">
        <i className="material-icons-round text-gray-500 mr-2">calendar_today</i>
        <span className="text-sm">Saturday, March 15 • 04:04 - 04:04 BST</span>
      </div>
      
      <div className="flex items-center text-gray-700 mb-3">
        <i className="material-icons-round text-gray-500 mr-2">location_on</i>
        <span className="text-sm">28 Wilton Grove, London SW19 3QX</span>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <span className="text-primary-700 text-base font-medium">£60/hr</span>
        <span className="text-gray-700 text-base">Coach: Eve</span>
      </div>
    </div>
  </div>
);

// Completed课程卡片
const CompletedLessonCard = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ borderLeft: '4px solid #8B5CF6' }}>
    <div className="p-4">
      <div className="mb-2">
        <h3 className="font-medium text-gray-800 text-lg">Tennis</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-block px-4 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#EDE9FE', color: '#8B5CF6' }}>
          Completed
        </span>
        <span className="inline-block px-4 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#E8F5E9', color: '#388E3C' }}>
          Paid
        </span>
      </div>
      
      <div className="flex items-center text-gray-700 mb-2">
        <i className="material-icons-round text-gray-500 mr-2">calendar_today</i>
        <span className="text-sm">Saturday, March 8 • 10:00 - 11:00 BST</span>
      </div>
      
      <div className="flex items-center text-gray-700 mb-3">
        <i className="material-icons-round text-gray-500 mr-2">location_on</i>
        <span className="text-sm">28 Wilton Grove, London SW19 3QX</span>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <span className="text-primary-700 text-base font-medium">£60/hr</span>
        <span className="text-gray-700 text-base">Coach: Tom</span>
      </div>
    </div>
  </div>
);

// Declined课程卡片
const DeclinedLessonCard = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden border-l-4 border-gray-500">
    <div className="p-4">
      <div className="mb-2">
        <h3 className="font-medium text-gray-800 text-lg">Tennis</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-block px-4 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#FFEBEE', color: '#D32F2F' }}>
          Declined
        </span>
      </div>
      
      <div className="flex items-center text-gray-700 mb-2">
        <i className="material-icons-round text-gray-500 mr-2">calendar_today</i>
        <span className="text-sm">Monday, March 10 • 15:00 - 16:00 BST</span>
      </div>
      
      <div className="flex items-center text-gray-700 mb-3">
        <i className="material-icons-round text-gray-500 mr-2">location_on</i>
        <span className="text-sm">28 Wilton Grove, London SW19 3QX</span>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <span className="text-primary-700 text-base font-medium">£60/hr</span>
        <span className="text-gray-700 text-base">Coach: Alice</span>
      </div>
    </div>
  </div>
);

export default LessonsPage; 