import React from 'react';

/**
 * 底部导航栏通用组件
 * @param {Object} props
 * @param {string} props.activeTab - 当前活跃的标签 ('home', 'lessons', 'coaches', 'profile')
 * @param {Function} props.onTabChange - 切换标签时的回调函数
 */
const BottomNavigation = ({ activeTab = 'home', onTabChange }) => {
  // 导航项配置
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'lessons', label: 'Lessons', icon: 'menu_book' },
    { id: 'coaches', label: 'Coaches', icon: 'people' },
    { id: 'profile', label: 'Profile', icon: 'person' }
  ];

  // 处理标签点击
  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-10 max-w-md mx-auto">
      <div className="flex-1 flex items-center justify-around">
        {navItems.map(item => (
          <div 
            key={item.id}
            className="flex flex-col items-center justify-center h-16 flex-1 cursor-pointer"
            onClick={() => handleTabClick(item.id)}
          >
            <div className={activeTab === item.id ? "text-primary-600" : "text-gray-600"}>
              <i className="material-icons-round" style={{ fontSize: '24px' }}>{item.icon}</i>
            </div>
            <span className={`text-xs font-medium mt-0.5 ${activeTab === item.id ? "text-primary-600" : "text-gray-600"}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation; 