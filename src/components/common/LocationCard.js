import React from 'react';

/**
 * 场地信息卡组件
 * @param {Object} props
 * @param {Object} props.location - 场地信息对象
 * @param {string} props.location.id - 场地唯一ID
 * @param {string} props.location.name - 场地名称
 * @param {string} props.location.address - 场地地址
 * @param {string} props.location.distance - 距离用户的距离
 * @param {Array} props.location.facilities - 场地设施列表
 * @param {boolean} props.isSelected - 是否被选中
 * @param {boolean} props.isSelectable - 是否可选择
 * @param {Function} props.onSelect - 选择回调函数
 * @param {string} props.className - 额外的CSS类名
 * @param {string} props.facilitiesClassName - 设施标签的CSS类名
 */
const LocationCard = ({
  location,
  isSelected = false,
  isSelectable = false,
  onSelect,
  className = '',
  facilitiesClassName = 'px-2 py-0.5 bg-secondary-100 text-secondary-500 text-xs rounded-full'
}) => {
  // 确保必要的数据存在
  if (!location) {
    return null;
  }

  // 处理场地对象中可能不存在的字段
  const {
    id,
    name = 'Unknown Location',
    address = '',
    distance = '',
    facilities = [],
  } = location;

  // 处理卡片点击
  const handleCardClick = () => {
    if (isSelectable && onSelect) {
      onSelect(id);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm overflow-hidden p-4 ${className} 
        ${isSelectable ? 'cursor-pointer' : ''} 
        ${isSelected && isSelectable ? 'border border-primary-600 bg-primary-50' : 'border border-grey-200'}`}
      onClick={isSelectable ? handleCardClick : undefined}
      role={isSelectable ? "button" : undefined}
      tabIndex={isSelectable ? 0 : undefined}
    >
      {/* 选中状态指示器 */}
      {isSelected && isSelectable && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
          <span className="material-icons-round" style={{ fontSize: '16px' }}>
            check
          </span>
        </div>
      )}
      
      <div className={isSelected && isSelectable ? 'pr-8' : ''}>
        {/* 场地名称 */}
        <h4 className="font-medium text-base text-grey-800">{name}</h4>
        
        {/* 地址和距离 */}
        {address && (
          <div className="flex items-center text-sm text-grey-600 mt-1 mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-4 h-4 mr-1 text-grey-500"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{address}</span>
            {distance && <span className="ml-2 text-xs text-grey-500">({distance})</span>}
          </div>
        )}
        
        {/* 设施标签 */}
        {facilities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {facilities.map((facility, index) => (
              <span 
                key={`${facility}-${index}`} 
                className={facilitiesClassName}
              >
                {facility}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationCard; 