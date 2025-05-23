import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

const PricingLandingPage = () => {
  // 模拟当前定价状态
  const [currentPricing, setCurrentPricing] = useState({
    singleLesson: {
      isSet: true,
      price: 45,
      duration: 60
    },
    packages: {
      isSet: false,
      count: 0
    }
  });

  // 模拟收入统计
  const [incomeStats] = useState({
    thisMonth: 1250,
    lastMonth: 980,
    averagePerLesson: 42
  });

  // 计算器状态
  const [showCalculator, setShowCalculator] = useState(false);
  const [lessonPrice, setLessonPrice] = useState('');

  // 计算费用
  const calculateFees = (price) => {
    if (!price || isNaN(price)) return null;
    
    const lessonFee = parseFloat(price);
    const platformFee = lessonFee * 0.04; // 4% platform fee
    const bookingFee = 0.99; // 固定预订费
    const processingFee = lessonFee * 0.03; // 3% 手续费
    
    const studentPayment = lessonFee + platformFee + bookingFee;
    const coachEarning = lessonFee - processingFee;
    
    return {
      lessonFee,
      platformFee,
      bookingFee,
      processingFee,
      studentPayment,
      coachEarning
    };
  };

  const calculation = calculateFees(lessonPrice);

  // 处理返回按钮点击
  const handleBack = () => {
    console.log('Navigate back');
  };
  
  // 处理单节课程定价点击
  const handleSingleLessonClick = () => {
    console.log('Navigate to single lesson pricing');
  };
  
  // 处理课程包定价点击
  const handlePackageClick = () => {
    console.log('Navigate to package pricing');
  };

  // 处理收入计算器点击
  const handleIncomeCalculator = () => {
    setShowCalculator(true);
  };

  // 关闭计算器
  const handleCloseCalculator = () => {
    setShowCalculator(false);
    setLessonPrice('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <PageHeader title="Pricing" onBack={handleBack} />
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto">
        {/* 当前定价状态概览 */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Your Pricing Overview</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white bg-opacity-25 rounded-lg p-3">
              <div className="text-xs text-white mb-2 font-medium opacity-90">Single Lesson Rate</div>
              {currentPricing.singleLesson.isSet ? (
                <div>
                  <div className="text-2xl font-bold mb-1 text-white">£{currentPricing.singleLesson.price}</div>
                  <div className="text-xs text-white opacity-80">per hour</div>
                </div>
              ) : (
                <div>
                  <div className="text-lg font-medium mb-1 text-white">Not Set</div>
                  <div className="text-xs text-white opacity-80">Set your rates</div>
                </div>
              )}
            </div>
            
            <div className="bg-white bg-opacity-25 rounded-lg p-3">
              <div className="text-xs text-white mb-2 font-medium opacity-90">Lesson Packages</div>
              {currentPricing.packages.isSet ? (
                <div>
                  <div className="text-2xl font-bold mb-1 text-white">{currentPricing.packages.count}</div>
                  <div className="text-xs text-white opacity-80">packages active</div>
                </div>
              ) : (
                <div>
                  <div className="text-lg font-medium mb-1 text-white">Not Set</div>
                  <div className="text-xs text-white opacity-80">Create packages</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 收入洞察 */}
        <div className="p-4 bg-white border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3">Income Insights</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">£{incomeStats.thisMonth}</div>
              <div className="text-xs text-gray-500">This Month</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-700">£{incomeStats.lastMonth}</div>
              <div className="text-xs text-gray-500">Last Month</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">£{incomeStats.averagePerLesson}</div>
              <div className="text-xs text-gray-500">Avg/Lesson</div>
            </div>
          </div>
          
          <button 
            className="w-full mt-3 bg-purple-50 text-purple-700 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center"
            onClick={handleIncomeCalculator}
          >
            <i className="material-icons-round text-base mr-2">calculate</i>
            Income Calculator
          </button>
        </div>

        <div className="p-4">
          {/* 定价设置选项 */}
          <h2 className="text-base font-semibold text-gray-800 mb-4">Pricing Settings</h2>
          
          <div className="space-y-3 mb-6">
            {/* 单次课程定价 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <button 
                className="w-full p-4 flex items-center justify-between focus:outline-none"
                onClick={handleSingleLessonClick}
              >
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <i className="material-icons-round text-green-600" style={{ fontSize: "22px" }}>payments</i>
                  </div>
                  <div className="ml-4 text-left">
                    <h3 className="text-base font-semibold text-gray-800">Single Lesson Rates</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {currentPricing.singleLesson.isSet 
                        ? `Currently £${currentPricing.singleLesson.price}/hour`
                        : 'Set your hourly rates'
                      }
                    </p>
                  </div>
                </div>
                <i className="material-icons-round text-gray-400" style={{ fontSize: "24px" }}>chevron_right</i>
              </button>
            </div>
            
            {/* 课程包定价 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <button 
                className="w-full p-4 flex items-center justify-between focus:outline-none"
                onClick={handlePackageClick}
              >
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <i className="material-icons-round text-purple-600" style={{ fontSize: "22px" }}>inventory_2</i>
                  </div>
                  <div className="ml-4 text-left">
                    <h3 className="text-base font-semibold text-gray-800">Lesson Packages</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {currentPricing.packages.isSet 
                        ? `${currentPricing.packages.count} packages available`
                        : 'Create bulk lesson discounts'
                      }
                    </p>
                  </div>
                </div>
                <i className="material-icons-round text-gray-400" style={{ fontSize: "24px" }}>chevron_right</i>
              </button>
            </div>
          </div>

          {/* 定价指南 */}
          <h2 className="text-base font-semibold text-gray-800 mb-4">Pricing Guidelines</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-sm text-green-600 font-bold">1</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-sm mb-1">Research Market Rates</div>
                  <p className="text-sm text-gray-600">
                    Check local competitors and adjust based on your experience level and qualifications.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-sm text-green-600 font-bold">2</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-sm mb-1">Package Incentives</div>
                  <p className="text-sm text-gray-600">
                    Offer 5-15% discounts for lesson packages to encourage student commitment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-sm text-green-600 font-bold">3</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-sm mb-1">Service Fee</div>
                  <p className="text-sm text-gray-600">
                    HiCoach takes a 15% service fee. Price accordingly to meet your income goals.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-sm text-green-600 font-bold">4</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-sm mb-1">Seasonal Adjustments</div>
                  <p className="text-sm text-gray-600">
                    Consider peak season rates (spring/summer) and off-season promotions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 收入计算器弹窗 */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm max-h-full overflow-auto shadow-2xl">
            {/* 计算器头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-white bg-opacity-20 flex items-center justify-center mr-3">
                  <i className="material-icons-round text-white text-lg">calculate</i>
                </div>
                <h3 className="text-lg font-semibold text-white">Income Calculator</h3>
              </div>
              <button 
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                onClick={handleCloseCalculator}
              >
                <i className="material-icons-round text-white text-lg">close</i>
              </button>
            </div>

            {/* 计算器内容 */}
            <div className="p-6 space-y-5">
              {/* 输入区域 */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  <i className="material-icons-round text-purple-500 text-sm mr-2 align-middle">monetization_on</i>
                  Lesson Price (£)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">£</span>
                  <input
                    type="number"
                    value={lessonPrice}
                    onChange={(e) => setLessonPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* 计算结果 - 始终显示 */}
              <div className="space-y-4">
                {/* 学员支付总额 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="h-6 w-6 rounded-lg bg-purple-500 flex items-center justify-center mr-2">
                      <i className="material-icons-round text-white text-sm">person</i>
                    </div>
                    <h4 className="font-bold text-purple-900">Student Payment</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-800">Lesson fee:</span>
                      <span className="text-purple-900 font-semibold">
                        £{calculation ? calculation.lessonFee.toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-800">Platform fee (4%):</span>
                      <span className="text-purple-900 font-semibold">
                        £{calculation ? calculation.platformFee.toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-800">Booking fee:</span>
                      <span className="text-purple-900 font-semibold">
                        £{calculation ? calculation.bookingFee.toFixed(2) : '0.99'}
                      </span>
                    </div>
                    <div className="border-t border-purple-300 pt-2 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-900 font-bold">Total payment:</span>
                        <div className="bg-purple-600 text-white px-3 py-1 rounded-lg">
                          <span className="font-bold text-lg">
                            £{calculation ? calculation.studentPayment.toFixed(2) : '0.99'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 教练收入 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="h-6 w-6 rounded-lg bg-green-500 flex items-center justify-center mr-2">
                      <i className="material-icons-round text-white text-sm">account_circle</i>
                    </div>
                    <h4 className="font-bold text-green-900">Your Earnings</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-green-800">Lesson fee:</span>
                      <span className="text-green-900 font-semibold">
                        £{calculation ? calculation.lessonFee.toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-800">Processing fee (3%):</span>
                      <span className="text-red-600 font-semibold">
                        -£{calculation ? calculation.processingFee.toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <div className="border-t border-green-300 pt-2 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-green-900 font-bold">You receive:</span>
                        <div className="bg-green-600 text-white px-3 py-1 rounded-lg">
                          <span className="font-bold text-lg">
                            £{calculation ? calculation.coachEarning.toFixed(2) : '0.00'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 费用说明 */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="h-6 w-6 rounded-lg bg-gray-500 flex items-center justify-center mr-2">
                      <i className="material-icons-round text-white text-sm">info</i>
                    </div>
                    <h4 className="font-bold text-gray-800">Fee Breakdown</h4>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>Platform fee covers payment processing and platform maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>Booking fee covers booking system and customer support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>Processing fee is deducted from your earnings</span>
                    </li>
                  </ul>
                </div>

                {/* 快捷金额按钮 */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Quick amounts:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[30, 40, 50, 60].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setLessonPrice(amount.toString())}
                        className="py-2 px-3 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        £{amount}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingLandingPage; 