import React, { useState, useEffect, memo } from 'react';
import PageHeader from './common/PageHeader';

// 骨架屏组件
const CardSkeleton = () => (
  <div className="bg-white p-[var(--spacing-lg)] rounded-[var(--radius-lg)] shadow-sm border border-[var(--grey-200)]">
    <div className="animate-pulse">
      <div className="flex items-center mb-[var(--spacing-md)]">
        <div className="w-10 h-10 bg-[var(--grey-200)] rounded-full mr-[var(--spacing-md)]"></div>
        <div className="h-4 bg-[var(--grey-200)] rounded w-1/3"></div>
      </div>
      <div className="h-6 bg-[var(--grey-200)] rounded w-1/2 mb-[var(--spacing-sm)]"></div>
      <div className="grid grid-cols-2 gap-[var(--spacing-sm)] mt-[var(--spacing-md)]">
        <div className="h-12 bg-[var(--grey-200)] rounded"></div>
        <div className="h-12 bg-[var(--grey-200)] rounded"></div>
      </div>
    </div>
  </div>
);

// 错误卡片组件
const ErrorCard = ({ message, onRetry }) => (
  <div className="bg-white p-[var(--spacing-lg)] rounded-[var(--radius-lg)] shadow-sm border border-[var(--error-100)]">
    <div className="flex items-center text-[var(--error-500)] mb-[var(--spacing-sm)]">
      <span className="material-icons mr-[var(--spacing-sm)]">error</span>
      <span className="font-medium">Error</span>
    </div>
    <p className="text-[var(--font-size-sm)] text-[var(--grey-600)] mb-[var(--spacing-md)]">{message}</p>
    <button 
      onClick={onRetry}
      className="text-[var(--font-size-sm)] text-[var(--primary-600)] font-medium flex items-center"
    >
      <span className="material-icons mr-[var(--spacing-xs)] text-[var(--font-size-sm)]">refresh</span>
      Try again
    </button>
  </div>
);

// 收入卡片组件
const IncomeCard = ({ data }) => (
  <div style={{
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    padding: 20,
    marginBottom: 20,
    border: '1px solid #E0E0E0'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <span className="material-icons" style={{
        color: '#00B36F',
        background: '#E5F7EC',
        borderRadius: '50%',
        padding: 6,
        marginRight: 8
      }}>payments</span>
      <span style={{ fontWeight: 600, fontSize: 18, color: '#212121' }}>Income Summary</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
      <span style={{ fontWeight: 700, fontSize: 24, color: '#00B36F' }}>{data.totalIncome}</span>
      <span style={{ marginLeft: 8, color: '#757575', fontSize: 14 }}>this month</span>
      <span style={{
        marginLeft: 16,
        color: data.isIncreased ? '#4CAF50' : '#F44336',
        fontSize: 14,
        display: 'flex',
        alignItems: 'center'
      }}>
        <span className="material-icons" style={{ fontSize: 16, verticalAlign: 'middle' }}>
          {data.isIncreased ? 'arrow_upward' : 'arrow_downward'}
        </span>
        {data.comparedToLastMonth}
      </span>
    </div>
    <div style={{ display: 'flex', marginTop: 12, gap: 24 }}>
      <div>
        <div style={{ color: '#757575', fontSize: 12 }}>Lessons Completed</div>
        <div style={{ color: '#00B36F', fontWeight: 600, fontSize: 16 }}>{data.lessonsCompleted}</div>
      </div>
      <div>
        <div style={{ color: '#757575', fontSize: 12 }}>Pending Payment</div>
        <div style={{ color: '#212121', fontWeight: 600, fontSize: 16 }}>{data.pendingPayment}</div>
      </div>
    </div>
    <div style={{ color: '#212121', fontSize: 12, textAlign: 'right', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      Tap for detailed analysis
      <span className="material-icons" style={{ fontSize: 16, marginLeft: 2, verticalAlign: 'middle' }}>chevron_right</span>
    </div>
  </div>
);

// 评分卡片组件
const RatingCard = ({ data }) => (
  <div style={{
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    padding: 20,
    marginBottom: 20,
    border: '1px solid #E0E0E0'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <span className="material-icons" style={{ color: '#00B36F', marginRight: 8 }}>star</span>
      <span style={{ fontWeight: 600, fontSize: 18 }}>Ratings & Reviews</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
      <span style={{ fontWeight: 700, fontSize: 24, color: '#00B36F' }}>{data.averageRating.toFixed(1)}</span>
      <span style={{ margin: '0 4px', color: '#757575', fontSize: 18 }}>/</span>
      <span style={{ color: '#757575', fontSize: 18 }}>5</span>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
        {Array(Math.floor(data.averageRating)).fill().map((_, i) => (
          <span key={i} className="material-icons" style={{ color: '#00B36F', fontSize: 20 }}>star</span>
        ))}
        {data.averageRating % 1 >= 0.5 && (
          <span className="material-icons" style={{ color: '#00B36F', fontSize: 20 }}>star_half</span>
        )}
        {Array(5 - Math.ceil(data.averageRating)).fill().map((_, i) => (
          <span key={i + Math.ceil(data.averageRating)} className="material-icons" style={{ color: '#E0E0E0', fontSize: 20 }}>star</span>
        ))}
      </div>
    </div>
    <div style={{ color: '#757575', fontSize: 12, marginBottom: 8 }}>Based on {data.totalReviews} reviews</div>
    {data.latestReviews.length > 0 && (
      <div style={{
        background: '#F5F5F5',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <span style={{ fontWeight: 600, fontSize: 13, color: '#212121' }}>{data.latestReviews[0].studentName}</span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {Array(data.latestReviews[0].rating).fill().map((_, i) => (
              <span key={i} className="material-icons" style={{ color: '#00B36F', fontSize: 16 }}>star</span>
            ))}
          </div>
        </div>
        <div style={{ color: '#424242', fontSize: 13, marginBottom: 2 }}>{data.latestReviews[0].comment}</div>
        <div style={{ color: '#BDBDBD', fontSize: 12 }}>{data.latestReviews[0].date}</div>
      </div>
    )}
    <div style={{ color: '#212121', fontSize: 12, textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      Tap to see all reviews
      <span className="material-icons" style={{ fontSize: 16, marginLeft: 2, verticalAlign: 'middle' }}>chevron_right</span>
    </div>
  </div>
);

// 底部导航组件
const BottomNavigation = memo(() => {
  const navItems = [
    { icon: 'home', label: 'Home', active: false },
    { icon: 'calendar_today', label: 'Lessons', active: false, badge: true },
    { icon: 'schedule', label: 'Availability', active: false },
    { icon: 'bar_chart', label: 'Performance', active: true },
    { icon: 'person', label: 'Profile', active: false }
  ];

  return (
    <div className="bg-white border-t border-gray-200 py-2 grid grid-cols-5 shadow-md pb-safe">
      {navItems.map((item, index) => (
        <button key={index} className="flex flex-col items-center justify-center">
          <div className={`w-10 h-10 rounded-full ${item.active ? 'bg-[#E5F7EC]' : 'bg-white'} flex items-center justify-center relative`}>
            <span className={`material-icons ${item.active ? '' : 'text-gray-500'}`} style={item.active ? { color: '#00B36F' } : {}}>{item.icon}</span>
            {item.badge && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#F44336] rounded-full"></span>
            )}
          </div>
          <span className={`text-xs font-medium ${item.active ? '' : 'text-gray-500'} mt-1`} style={item.active ? { color: '#00B36F' } : {}}>
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

  // 右侧刷新按钮
  const refreshButton = (
    <button 
      onClick={handleRefresh}
      className={`p-2 rounded-full ${refreshing ? 'animate-spin' : ''}`}
    >
      <span className="material-icons text-gray-600">refresh</span>
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5] max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <PageHeader 
        title="Performance" 
        onBack={() => console.log('Navigate back')}
        rightElement={refreshButton}
      />
      
      {/* 主要内容区 */}
      <div className="flex-1 overflow-y-auto pb-20 px-2 pt-2">
        {/* 最后更新时间 */}
        <div className="text-center py-1 text-xs text-gray-400">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
        
        {!loading && !error && <>
          <IncomeCard data={incomeData} />
          <RatingCard data={ratingData} />
        </>}
        {loading && <div className="text-center text-gray-400 mt-10">Loading...</div>}
        {error && <div className="text-center text-red-500 mt-10">Failed to load data. <button onClick={handleRetry} className="underline">Retry</button></div>}
      </div>
      
      {/* 底部导航栏 */}
      <BottomNavigation />
    </div>
  );
};

export default CoachPerformanceOptimized; 