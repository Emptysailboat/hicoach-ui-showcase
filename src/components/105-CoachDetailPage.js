import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import CoachInfoCard from './common/CoachInfoCard';
import PageHeader from './common/PageHeader';
import ReviewsCard from './common/ReviewsCard';

const CoachDetailPage = () => {
  const [isStarred, setIsStarred] = useState(false);
  
  // 模拟教练数据
  const coachData = {
    id: 1,
    name: 'Coach Name',
    rating: 4.9,
    reviews: 235,
    price: 30,
    distance: 0.3,
    lessonsCompleted: 456,
    location: 'Wilton tennis club',
    qualifications: ['LTA-5', 'PTR-PRO'],
    about: "I'm a certified tennis coach with over 10 years of experience teaching players of all levels. My coaching philosophy focuses on technical development while keeping sessions fun and engaging. I specialize in helping beginners build a solid foundation and intermediate players refine their skills."
  };
  
  // 模拟评论数据
  const reviewsData = {
    rating: 5.0,
    totalRatings: 41,
    ratingDistribution: {
      5: 100,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    },
    reviews: [
      {
        name: "Sarah M.",
        rating: 5,
        comment: "Great coach! Very patient and knowledgeable. I've improved my backhand significantly after just a few lessons.",
        timeAgo: "2 weeks ago"
      },
      {
        name: "John D.",
        rating: 5,
        comment: "My son loves his lessons. The coach makes learning fun while still focusing on proper technique.",
        timeAgo: "1 month ago"
      }
    ]
  };
  
  // 处理收藏状态变更
  const handleToggleFavorite = () => {
    setIsStarred(!isStarred);
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    console.log("Back button clicked");
    // 实际项目中这里会返回上一页
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <PageHeader 
        title="Coach Profile" 
        onBack={handleBack}
      />
      
      {/* 内容区域 */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          {/* 使用CoachInfoCard组件展示教练基本信息 */}
          <CoachInfoCard 
            coach={coachData}
            isFavorite={isStarred}
            onToggleFavorite={handleToggleFavorite}
          />
          
          {/* 关于教练 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-primary-600 mb-2">About</h3>
              <p className="text-gray-700 text-sm">{coachData.about}</p>
            </div>
          </div>
          
          {/* 教学地点 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-primary-600 mb-2">Locations</h3>
              
              {/* 主要地点 */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Main Location</h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary-600 mr-2 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-gray-800">Wilton tennis club</h5>
                      <p className="text-sm text-gray-600 mt-0.5">28 Wilton Grove, London SW19 3QX</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 其他地点 */}
              <h4 className="text-sm font-medium text-gray-700 mb-1">Other Locations</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary-600 mr-2 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-gray-800">Dundonald playground</h5>
                      <p className="text-sm text-gray-600 mt-0.5">Dundonald Road, London SW19 3QH</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary-600 mr-2 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-gray-800">Joseph Hood recreational playground</h5>
                      <p className="text-sm text-gray-600 mt-0.5">Marina Avenue, London SW20 0YD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 评价 - 使用新的ReviewsCard组件 */}
          <ReviewsCard 
            rating={reviewsData.rating}
            totalRatings={reviewsData.totalRatings}
            ratingDistribution={reviewsData.ratingDistribution}
            reviews={reviewsData.reviews}
          />
        </div>
      </div>
      
      {/* 底部操作栏 */}
      <div className="bg-white p-4 flex items-center justify-between gap-3 border-t border-gray-200 shadow-lg">
        <button className="flex items-center justify-center py-3 px-4 rounded-lg border border-gray-200 active:bg-gray-100 flex-1">
          <MessageCircle className="h-5 w-5 text-primary-600 mr-2" />
          <span className="text-primary-600 font-medium">Message</span>
        </button>
        
        <button className="flex items-center justify-center py-3 px-4 bg-primary-600 text-white font-medium rounded-lg text-center active:bg-primary-700 active:scale-99 transition-transform flex-1">
          Book Lessons
        </button>
      </div>
    </div>
  );
};

export default CoachDetailPage; 