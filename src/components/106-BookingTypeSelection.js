import React, { useState } from 'react';
import { Calendar, Package, Info } from 'lucide-react';
import PageHeader from './common/PageHeader';

const BookingTypeSelection = () => {
  const [selectedType, setSelectedType] = useState(null);
  
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    // 实际项目中这里会进行导航
    // history.push(type === 'single' ? '/single-booking-time' : '/recurring-booking-package');
  };
  
  const handleContinue = () => {
    if (selectedType) {
      // 实际项目中这里会进行导航
      // history.push(selectedType === 'single' ? '/single-booking-time' : '/recurring-booking-package');
      console.log('Continue with:', selectedType);
    }
  };
  
  const handleBack = () => {
    // 实际项目中这里会返回上一页
    console.log('Back button clicked');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden">
      {/* 这里已经使用了PageHeader组件，保持不变 */}
      <PageHeader 
        title="Choose Booking Type" 
        onBack={handleBack}
      />
      
      {/* 进度指示器 */}
      <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-primary-600 text-white">
            1
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            2
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            3
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            4
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Step 1/4
        </div>
      </div>
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 py-5">
          <div className="space-y-4 mb-6">
            <button 
              className={`w-full bg-white rounded-xl border-2 ${selectedType === 'single' ? 'border-primary-600' : 'border-gray-200'} active:bg-gray-50 overflow-hidden relative`}
              onClick={() => handleTypeSelect('single')}
              aria-pressed={selectedType === 'single'}
            >
              <div className="p-4 space-y-3">
                {/* 第1行：图标和标题 */}
                <div className="flex items-center pb-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2.5 flex-shrink-0">
                    <Calendar className="w-4 h-4 text-primary-600" />
                  </div>
                  <h3 className="text-base font-medium text-gray-800">Single Lesson</h3>
                </div>
                
                {/* 分割线 */}
                <div className="border-t border-gray-100 -mt-1"></div>
                
                {/* 第2行：详细内容 */}
                <p className="text-sm text-gray-600 text-left pt-1">
                  Book a one-time lesson with your coach at your preferred time
                </p>
                
                {/* 第3行：费率信息 */}
                <div className="flex items-center text-sm pt-1">
                  <span className="text-gray-700">Standard rate:</span>
                  <span className="ml-1.5 font-medium text-primary-600">£30/hour</span>
                </div>
              </div>
            </button>
            
            <button 
              className={`w-full bg-white rounded-xl border-2 ${selectedType === 'package' ? 'border-primary-600' : 'border-gray-200'} active:bg-gray-50 overflow-hidden relative`}
              onClick={() => handleTypeSelect('package')}
              aria-pressed={selectedType === 'package'}
            >
              <div className="p-4 space-y-3">
                {/* 第1行：图标和标题 */}
                <div className="flex items-center pb-2">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center mr-2.5 flex-shrink-0">
                    <Package className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="text-base font-medium text-gray-800">Lesson Package</h3>
                  <div className="ml-auto">
                    <div className="inline-block px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full">
                      Save up to 15%
                    </div>
                  </div>
                </div>
                
                {/* 分割线 */}
                <div className="border-t border-gray-100 -mt-1"></div>
                
                {/* 第2行：详细内容 */}
                <div className="text-left pt-1">
                  <p className="text-sm text-gray-600">
                    Book a series of lessons at a discounted rate with structured learning plan
                  </p>
                </div>
                
                {/* 第3行：费率信息 */}
                <div className="flex items-center text-sm pt-1">
                  <span className="text-gray-700">Discounted rate:</span>
                  <span className="ml-1.5 font-medium text-primary-600">£25.50/hour</span>
                </div>
              </div>
            </button>
          </div>
          
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 mb-6">
            <div className="flex">
              <Info className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-purple-700">
                  Packages include a structured learning plan and progress tracking to help you improve faster.
                </p>
                <p className="text-sm text-purple-700 mt-1">
                  Schedule is flexible and can be adjusted after booking if needed.
                </p>
              </div>
            </div>
          </div>
          
          {/* Continue按钮 */}
          <button 
            className={`w-full py-3.5 px-4 rounded-lg font-medium text-white ${selectedType ? 'bg-primary-600 active:bg-primary-700' : 'bg-gray-300 cursor-not-allowed'}`}
            onClick={handleContinue}
            disabled={!selectedType}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingTypeSelection; 