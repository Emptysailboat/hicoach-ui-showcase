import React from 'react';
import PageHeader from './common/PageHeader';

const PricingLandingPage = () => {
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <PageHeader title="Pricing" onBack={handleBack} />
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto p-4">
        {/* 费率设置标题 */}
        <h2 className="text-base font-medium text-gray-800 mb-3 px-1">Set Your Rates</h2>
        
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
          {/* 单次课程定价 */}
          <div className="p-4 border-b border-gray-100">
            <button className="w-full flex items-center justify-between focus:outline-none">
              <div className="flex">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="material-icons-round text-green-600" style={{ fontSize: '20px' }}>account_balance_wallet</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-medium text-gray-800">Single Lesson Pricing</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Set rates for individual lessons
                  </p>
                </div>
              </div>
              <span className="material-icons-round text-gray-400">chevron_right</span>
            </button>
          </div>
          
          {/* 课程包定价 */}
          <div className="p-4">
            <button className="w-full flex items-center justify-between focus:outline-none">
              <div className="flex">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="material-icons-round text-purple-600" style={{ fontSize: '20px' }}>calendar_month</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-medium text-gray-800">Lesson Package Pricing</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Create discounted packages for multiple lessons
                  </p>
                </div>
              </div>
              <span className="material-icons-round text-gray-400">chevron_right</span>
            </button>
          </div>
        </div>
        
        {/* 价格指南标题 */}
        <h2 className="text-base font-medium text-gray-800 mb-3 px-1">Pricing Guidelines</h2>
        
        {/* 价格指南卡片 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="space-y-4">
            <div className="flex">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-xs text-green-600 font-semibold">1</span>
              </div>
              <p className="text-sm text-gray-600">
                Research local market rates to ensure your pricing is competitive.
              </p>
            </div>
            <div className="flex">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-xs text-green-600 font-semibold">2</span>
              </div>
              <p className="text-sm text-gray-600">
                Consider offering package discounts to encourage student commitment.
              </p>
            </div>
            <div className="flex">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-xs text-green-600 font-semibold">3</span>
              </div>
              <p className="text-sm text-gray-600">
                HiCoach takes a 15% service fee from your lesson earnings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingLandingPage; 