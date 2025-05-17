import React from 'react';
import { MapPin } from 'lucide-react';

/**
 * 教练信息卡组件
 * @param {Object} props
 * @param {Object} props.coach - 教练信息对象
 * @param {boolean} props.isMiniCard - 是否为迷你版卡片
 * @param {boolean} props.showLocation - 是否显示位置信息
 * @param {boolean} props.showQualifications - 是否显示资质信息
 * @param {boolean} props.isFavorite - 是否被收藏
 * @param {Function} props.onToggleFavorite - 收藏切换回调函数
 * @param {Function} props.onClick - 卡片点击回调函数
 * @param {string} props.className - 额外的CSS类名
 */
const CoachInfoCard = ({ 
  coach, 
  isMiniCard = false, 
  showLocation = true,
  showQualifications = true,
  isFavorite = false, 
  onToggleFavorite,
  onClick,
  className = ''
}) => {
  // 确保必要的数据存在
  if (!coach) {
    return null;
  }

  // 处理教练对象中可能不存在的字段
  const {
    id,
    name = 'Unknown Coach',
    rating = 0,
    reviews = 0,
    price = 0,
    distance,
    lessonsCompleted = 0,
    location = '',
    qualifications = [],
  } = coach;

  // 处理收藏按钮点击，阻止事件冒泡
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  // 处理卡片点击
  const handleCardClick = () => {
    if (onClick) {
      onClick(coach);
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm overflow-hidden ${isMiniCard ? 'p-3' : 'p-4'} ${className} ${onClick ? 'active:bg-gray-50' : ''}`}
      onClick={handleCardClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start">
        {/* 头像 */}
        <div className={`${isMiniCard ? 'w-12 h-12' : 'w-16 h-16'} rounded-full bg-primary-100 flex items-center justify-center border-2 border-primary-50 flex-shrink-0`}>
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00B36F&color=fff`}
            alt={name} 
            className={`${isMiniCard ? 'w-12 h-12' : 'w-16 h-16'} object-cover rounded-full`} 
          />
        </div>
        
        {/* 教练信息 */}
        <div className={`${isMiniCard ? 'ml-3' : 'ml-4'} flex-1 min-w-0`}>
          <div className="flex justify-between items-center mb-1">
            <h2 className={`${isMiniCard ? 'text-sm' : 'text-base'} font-semibold text-gray-800 truncate`}>
              {name}
            </h2>
            
            {/* 收藏按钮 */}
            {onToggleFavorite && (
              <button 
                className={`p-1.5 rounded-full active:bg-gray-100 transition-colors`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                type="button"
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
            )}
          </div>
          
          {/* 评分和评价 */}
          {rating > 0 && (
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
                {rating.toFixed(1)}
              </span>
              {reviews > 0 && (
                <>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className={`${isMiniCard ? 'text-xs' : 'text-sm'} text-gray-500`}>
                    {reviews} {reviews === 1 ? 'review' : 'reviews'}
                  </span>
                </>
              )}
            </div>
          )}
          
          {/* 位置信息 */}
          {showLocation && distance !== undefined && (
            <div className="flex items-center">
              <MapPin className={`${isMiniCard ? 'w-3 h-3' : 'w-4 h-4'} text-primary-500 mr-1`} />
              <span className={`${isMiniCard ? 'text-xs' : 'text-sm'} text-gray-500 truncate`}>
                {distance} {distance === 1 ? 'mile' : 'miles'} away
              </span>
            </div>
          )}
          
          {/* 课程数和价格 */}
          <div className={`flex items-center justify-between ${isMiniCard ? 'mt-1.5' : 'mt-2'}`}>
            {lessonsCompleted > 0 && (
              <span className={`inline-block px-2 py-0.5 bg-purple-50 text-purple-600 ${isMiniCard ? 'text-xs' : 'text-sm'} font-medium rounded-full`}>
                {lessonsCompleted} {isMiniCard ? '' : 'lessons'}
              </span>
            )}
            
            {price > 0 && (
              <span className={`${isMiniCard ? 'text-xs' : 'text-sm'} font-medium text-primary-500`}>
                £{price}/hr
              </span>
            )}
          </div>
          
          {/* 资质标签 */}
          {showQualifications && qualifications.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {qualifications.map((qualification, index) => (
                <span 
                  key={`${qualification}-${index}`} 
                  className="inline-flex items-center px-2 py-0.5 bg-purple-50 text-purple-600 text-xs font-medium rounded-full"
                >
                  {qualification}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachInfoCard; 