import React from 'react';
import { 
  BarChart2, 
  Home, 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  DollarSign,
  Star,
  ArrowUp,
  ArrowDown,
  Settings
} from 'lucide-react';

const CoachRatingsPage = () => {
  // 模拟数据 - 收入信息
  const incomeData = {
    currentMonth: 'April 2025',
    totalIncome: '£1,280',
    comparedToLastMonth: '+15%',
    isIncreased: true,
    pendingPayment: '£320',
    lessonsCompleted: 18,
    currency: '£'
  };
  
  // 模拟数据 - 评分信息
  const ratingData = {
    averageRating: 4.8,
    totalReviews: 47,
    latestReviews: [
      {
        id: 1,
        studentName: 'Alice L.',
        rating: 5,
        comment: 'Great coach! Really improved my backhand.',
        date: '2 days ago'
      },
      {
        id: 2,
        studentName: 'Robert K.',
        rating: 4,
        comment: 'Very professional and patient with beginners.',
        date: '1 week ago'
      }
    ]
  };
  
  // 生成星星评分显示
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // 填充星星
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        // 半星实现 (简化版)
        stars.push(
          <div key={i} className="relative">
            <Star className="w-4 h-4 text-gray-300 fill-gray-300" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300 fill-gray-300" />
        );
      }
    }
    
    return stars;
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex items-center">
          <button className="p-1 rounded-full hover:bg-gray-100 mr-2 transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-700 rotate-180" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Performance</h1>
        </div>
      </div>
      
      {/* 主要内容区 - 确保可滚动 */}
      <div className="flex-1 overflow-y-auto pb-20 pt-4">
        
        {/* 收入摘要卡片 */}
        <div className="px-4 mt-4">
          <div 
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">Income Summary</h3>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-bold text-gray-800">{incomeData.totalIncome}</span>
              <span className="ml-2 text-sm text-gray-500">this month</span>
              <div className={`ml-3 flex items-center ${incomeData.isIncreased ? 'text-green-600' : 'text-red-600'}`}>
                {incomeData.isIncreased ? 
                  <ArrowUp className="w-3 h-3 mr-0.5" /> : 
                  <ArrowDown className="w-3 h-3 mr-0.5" />
                }
                <span className="text-xs font-medium">{incomeData.comparedToLastMonth}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">Lessons Completed</p>
                <p className="text-sm font-medium text-gray-800">{incomeData.lessonsCompleted}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500">Pending Payment</p>
                <p className="text-sm font-medium text-gray-800">{incomeData.pendingPayment}</p>
              </div>
            </div>
            
            <div className="mt-3 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-right">Tap for detailed analysis</p>
            </div>
          </div>
        </div>
        
        {/* 评分评价卡片 */}
        <div className="px-4 mt-4">
          <div 
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">Ratings & Reviews</h3>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold text-gray-800">{ratingData.averageRating.toFixed(1)}</span>
              <span className="mx-2 text-lg text-gray-500">/</span>
              <span className="text-lg text-gray-500">5</span>
              <div className="ml-3 flex items-center">
                {/* 紫色星星替换 */}
                <div className="flex items-center">
                  {Array(Math.floor(ratingData.averageRating)).fill().map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-purple-500 fill-purple-500" />
                  ))}
                  {ratingData.averageRating % 1 >= 0.5 && (
                    <div className="relative">
                      <Star className="w-4 h-4 text-gray-300 fill-gray-300" />
                      <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                        <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
                      </div>
                    </div>
                  )}
                  {Array(5 - Math.ceil(ratingData.averageRating)).fill().map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-300 fill-gray-300" />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-3">Based on {ratingData.totalReviews} reviews</p>
            
            {/* 最新评价预览 */}
            <div className="border-t border-gray-100 pt-3 space-y-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-gray-800">{ratingData.latestReviews[0].studentName}</span>
                  <div className="flex">
                    {Array(ratingData.latestReviews[0].rating).fill().map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-purple-500 fill-purple-500" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-700 mt-1 line-clamp-1">{ratingData.latestReviews[0].comment}</p>
                <p className="text-xs text-gray-500 mt-0.5">{ratingData.latestReviews[0].date}</p>
              </div>
            </div>
            
            <div className="mt-2 pt-2">
              <p className="text-xs text-gray-500 text-right">Tap to see all reviews</p>
            </div>
          </div>
        </div>
        


        {/* 统计图表卡片 */}
        <div className="px-4 mt-4 mb-8">
          <div 
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Lesson Statistics</h3>
                  <div className="flex items-center">
                    <p className="text-xs text-gray-500 mr-2">Cancellation rates, booking patterns</p>
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">Coming Soon</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部导航栏 */}
      <div className="bg-white border-t border-gray-200 py-2 grid grid-cols-5 shadow-md fixed bottom-0 max-w-md w-full z-10">
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Home className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Home</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Lessons</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Clock className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Availability</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-xs font-medium text-green-600 mt-1">Performance</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default CoachRatingsPage; 