import React, { useState, useEffect, memo } from 'react';
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
  RefreshCw,
  AlertCircle
} from 'lucide-react';

// 骨架屏组件
const CardSkeleton = () => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
    <div className="animate-pulse">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

// 错误卡片组件
const ErrorCard = ({ message, onRetry }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-red-200">
    <div className="flex items-center text-red-600 mb-2">
      <AlertCircle className="w-5 h-5 mr-2" />
      <span className="font-medium">Error</span>
    </div>
    <p className="text-sm text-gray-600 mb-3">{message}</p>
    <button 
      onClick={onRetry}
      className="text-sm text-blue-600 font-medium flex items-center"
    >
      <RefreshCw className="w-4 h-4 mr-1" />
      Try again
    </button>
  </div>
);

// 收入卡片组件
const IncomeCard = memo(({ data, loading, error, onRetry }) => {
  if (loading) return <CardSkeleton />;
  if (error) return <ErrorCard message="Failed to load income data" onRetry={onRetry} />;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-pointer active:scale-[0.98] transition-transform duration-150">
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
        <span className="text-2xl font-bold text-gray-800">{data.totalIncome}</span>
        <span className="ml-2 text-sm text-gray-500">this month</span>
        <div className={`ml-3 flex items-center ${data.isIncreased ? 'text-green-600' : 'text-red-600'}`}>
          {data.isIncreased ? 
            <ArrowUp className="w-3 h-3 mr-0.5" /> : 
            <ArrowDown className="w-3 h-3 mr-0.5" />
          }
          <span className="text-xs font-medium">{data.comparedToLastMonth}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-xs text-gray-500">Lessons Completed</p>
          <p className="text-sm font-medium text-gray-800">{data.lessonsCompleted}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-xs text-gray-500">Pending Payment</p>
          <p className="text-sm font-medium text-gray-800">{data.pendingPayment}</p>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-right">Tap for detailed analysis</p>
      </div>
    </div>
  );
});

// 评分卡片组件
const RatingCard = memo(({ data, loading, error, onRetry }) => {
  if (loading) return <CardSkeleton />;
  if (error) return <ErrorCard message="Failed to load rating data" onRetry={onRetry} />;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-pointer active:scale-[0.98] transition-transform duration-150">
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
        <span className="text-2xl font-bold text-gray-800">{data.averageRating.toFixed(1)}</span>
        <span className="mx-2 text-lg text-gray-500">/</span>
        <span className="text-lg text-gray-500">5</span>
        <div className="ml-3 flex items-center">
          <div className="flex items-center">
            {Array(Math.floor(data.averageRating)).fill().map((_, i) => (
              <Star key={i} className="w-4 h-4 text-purple-500 fill-purple-500" />
            ))}
            {data.averageRating % 1 >= 0.5 && (
              <div className="relative">
                <Star className="w-4 h-4 text-gray-300 fill-gray-300" />
                <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                  <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
                </div>
              </div>
            )}
            {Array(5 - Math.ceil(data.averageRating)).fill().map((_, i) => (
              <Star key={i + Math.ceil(data.averageRating)} className="w-4 h-4 text-gray-300 fill-gray-300" />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mb-3">Based on {data.totalReviews} reviews</p>
      
      <div className="border-t border-gray-100 pt-3 space-y-3">
        {data.latestReviews.length > 0 ? (
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex justify-between">
              <span className="text-xs font-medium text-gray-800">{data.latestReviews[0].studentName}</span>
              <div className="flex">
                {Array(data.latestReviews[0].rating).fill().map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-purple-500 fill-purple-500" />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-700 mt-1 line-clamp-1">{data.latestReviews[0].comment}</p>
            <p className="text-xs text-gray-500 mt-0.5">{data.latestReviews[0].date}</p>
          </div>
        ) : (
          <p className="text-xs text-gray-500 text-center py-2">No reviews yet</p>
        )}
      </div>
      
      <div className="mt-2 pt-2">
        <p className="text-xs text-gray-500 text-right">Tap to see all reviews</p>
      </div>
    </div>
  );
});

// 统计卡片组件
const StatisticsCard = memo(() => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-pointer active:scale-[0.98] transition-transform duration-150">
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
));

// 底部导航组件
const BottomNavigation = memo(() => {
  const navItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: Calendar, label: 'Lessons', active: false, badge: true },
    { icon: Clock, label: 'Availability', active: false },
    { icon: BarChart2, label: 'Performance', active: true },
    { icon: User, label: 'Profile', active: false }
  ];

  return (
    <div className="bg-white border-t border-gray-200 py-2 grid grid-cols-5 shadow-md pb-safe">
      {navItems.map((item, index) => (
        <button key={index} className="flex flex-col items-center justify-center">
          <div className={`w-10 h-10 rounded-full ${item.active ? 'bg-green-100' : 'bg-white'} flex items-center justify-center relative`}>
            <item.icon className={`w-5 h-5 ${item.active ? 'text-green-600' : 'text-gray-500'}`} />
            {item.badge && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </div>
          <span className={`text-xs font-medium ${item.active ? 'text-green-600' : 'text-gray-500'} mt-1`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
});

const CoachPerformanceOptimized = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  // 模拟数据
  const [incomeData] = useState({
    currentMonth: 'May 2025',
    totalIncome: '£1,280',
    comparedToLastMonth: '+15%',
    isIncreased: true,
    pendingPayment: '£320',
    lessonsCompleted: 18,
    currency: '£'
  });
  
  const [ratingData] = useState({
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
  });

  // 模拟数据加载
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(false);
    
    // 模拟刷新
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date());
    }, 1000);
  };

  const handleRetry = () => {
    setError(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex items-center">
          <button className="p-1 rounded-full mr-2 active:bg-gray-100 transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-700 rotate-180" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Performance</h1>
        </div>
        <button 
          onClick={handleRefresh}
          className={`p-2 rounded-full active:bg-gray-100 transition-colors ${refreshing ? 'animate-spin' : ''}`}
        >
          <RefreshCw className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      {/* 主要内容区 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* 最后更新时间 */}
        <div className="text-center py-2 text-xs text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
        
        {/* 收入摘要卡片 */}
        <div className="px-4 mt-2">
          <IncomeCard 
            data={incomeData} 
            loading={loading} 
            error={error}
            onRetry={handleRetry}
          />
        </div>
        
        {/* 评分评价卡片 */}
        <div className="px-4 mt-4">
          <RatingCard 
            data={ratingData} 
            loading={loading} 
            error={error}
            onRetry={handleRetry}
          />
        </div>

        {/* 统计图表卡片 */}
        <div className="px-4 mt-4 mb-8">
          <StatisticsCard />
        </div>
      </div>
      
      {/* 底部导航栏 */}
      <BottomNavigation />
    </div>
  );
};

export default CoachPerformanceOptimized; 