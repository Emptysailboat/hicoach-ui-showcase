import React from 'react';
import { Wallet, CalendarDays, ChevronRight } from 'lucide-react';
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
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-base font-medium text-gray-800">Set Your Rates</h2>
            <p className="text-sm text-gray-600 mt-1">
              Configure your pricing for individual and package lessons.
            </p>
          </div>
          
          {/* 单次课程定价 */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Wallet className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Single Lesson Pricing</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Set rates for individual lessons
                  </p>
                </div>
              </div>
              <button className="p-1">
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          {/* 课程包定价 */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <CalendarDays className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Lesson Package Pricing</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Create discounted packages for multiple lessons
                  </p>
                </div>
              </div>
              <button className="p-1">
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        {/* 价格指南 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-base font-medium text-gray-800 mb-3">Pricing Guidelines</h2>
          <div className="space-y-3">
            <div className="flex">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-xs text-green-600 font-semibold">1</span>
              </div>
              <p className="text-sm text-gray-600">
                Research local market rates to ensure your pricing is competitive.
              </p>
            </div>
            <div className="flex">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-xs text-green-600 font-semibold">2</span>
              </div>
              <p className="text-sm text-gray-600">
                Consider offering package discounts to encourage student commitment.
              </p>
            </div>
            <div className="flex">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-xs text-green-600 font-semibold">3</span>
              </div>
              <p className="text-sm text-gray-600">
                HiCoach takes a 15% service fee from your lesson earnings.
              </p>
            </div>
          </div>
        </div>
        
        {/* 收入计算 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-base font-medium text-gray-800 mb-3">Income Calculator</h2>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Your rate:</span>
              <span className="text-sm font-medium text-gray-800">£40.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Service fee (15%):</span>
              <span className="text-sm text-red-600">-£6.00</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">You receive:</span>
              <span className="text-sm font-medium text-green-600">£34.00</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is an example calculation. Your actual earnings will depend on your set rates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingLandingPage; 