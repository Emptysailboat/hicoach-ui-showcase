import React, { useState } from 'react';
import { Info, CheckCircle, X, AlertTriangle } from 'lucide-react';
import PageHeader from './common/PageHeader';

const CoachEditAvailabilityPage = () => {
  // 初始可用时间数据（全部为不可用）
  const initialAvailableSlots = {};
  
  // 状态管理
  const [availableSlots, setAvailableSlots] = useState(initialAvailableSlots);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  
  // 生成星期标签
  const days = [
    { name: "Monday", shortName: "MON" },
    { name: "Tuesday", shortName: "TUE" },
    { name: "Wednesday", shortName: "WED" },
    { name: "Thursday", shortName: "THU" },
    { name: "Friday", shortName: "FRI" },
    { name: "Saturday", shortName: "SAT" },
    { name: "Sunday", shortName: "SUN" }
  ];
  
  // 生成时间段 (6:00 - 22:00)
  const hours = Array.from({ length: 17 }, (_, i) => i + 6);
  
  // 检查时间段是否可用
  const isSlotAvailable = (day, hour) => {
    const key = `${day}-${hour}`;
    return availableSlots[key] || false;
  };
  
  // 格式化小时为时间字符串
  const formatHour = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };
  
  // 处理时间格子点击
  const handleSlotClick = (day, hour) => {
    const key = `${day}-${hour}`;
    setAvailableSlots(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // 处理重置按钮点击 - 现在只显示确认对话框
  const handleResetClick = () => {
    setShowResetConfirmation(true);
  };
  
  // 确认重置操作
  const confirmReset = () => {
    // 重置为空对象，所有时间段都是不可用的
    setAvailableSlots({});
    setShowResetConfirmation(false);
  };
  
  // 取消重置操作
  const cancelReset = () => {
    setShowResetConfirmation(false);
  };
  
  // 处理更新按钮点击
  const handleUpdate = () => {
    setIsUpdating(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsUpdating(false);
      setShowSuccess(true);
      
      // 2秒后隐藏成功消息
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 1000);
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  // 创建信息按钮作为右侧元素
  const rightElement = (
    <button 
      className="p-1.5 rounded-full hover:bg-gray-100"
      onClick={() => setShowInfoModal(true)}
    >
      <Info className="h-5 w-5 text-gray-600" />
    </button>
  );
  
  // 检查是否有变更
  const hasChanges = JSON.stringify(initialAvailableSlots) !== JSON.stringify(availableSlots);
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <PageHeader title="My Availability" onBack={handleBack} rightElement={rightElement} />
      
      {/* 成功提示消息 - 弹出式 */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-5 mx-4 max-w-xs w-full shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Success!</h3>
              <p className="text-gray-600 text-center mb-1">Your availability has been updated successfully.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* 信息模态框 */}
      {showInfoModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-5 mx-4 max-w-sm w-full shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <Info className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">About Availability</h3>
              </div>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowInfoModal(false)}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-purple-800 font-medium mb-2">Weekly Availability Schedule</p>
              <p className="text-sm text-purple-800">
                Tap on time slots to mark them as available or unavailable. 
                This schedule will repeat every week. Time-off exceptions can be set separately.
              </p>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Students will only be able to book lessons during your available time slots.
              Remember to update your schedule regularly to ensure accurate availability.
            </p>
            
            <button
              className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-medium"
              onClick={() => setShowInfoModal(false)}
            >
              Got It
            </button>
          </div>
        </div>
      )}
      
      {/* 重置确认模态框 */}
      {showResetConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-5 mx-4 max-w-sm w-full shadow-lg">
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Reset Availability</h3>
              <p className="text-gray-600 text-center mb-1">
                This will clear all your available time slots. Are you sure you want to continue?
              </p>
            </div>
            
            <div className="flex space-x-3 mt-4">
              <button
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium"
                onClick={cancelReset}
              >
                Cancel
              </button>
              
              <button
                className="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-medium"
                onClick={confirmReset}
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 可用性表格 */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          {/* 星期头部 */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="flex">
              {/* 左侧时间列的空白头部 */}
              <div className="w-16 flex-shrink-0 bg-white"></div>
              
              {/* 星期 */}
              <div className="flex-1 grid grid-cols-7">
                {days.map((day, index) => (
                  <div key={index} className="py-3 text-center border-l border-gray-200 bg-white">
                    <p className="text-xs font-medium text-gray-500">{day.shortName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 时间格子 */}
          <div className="flex">
            {/* 左侧时间列 */}
            <div className="w-16 flex-shrink-0 bg-white">
              {hours.map((hour, index) => (
                <div 
                  key={index} 
                  className="h-12 flex items-center justify-end pr-2 text-xs text-gray-500 font-medium border-b border-gray-100"
                >
                  {formatHour(hour)}
                </div>
              ))}
            </div>
            
            {/* 可用性网格 */}
            <div className="flex-1 grid grid-cols-7">
              {/* 遍历每一天 */}
              {Array.from({ length: 7 }, (_, dayIndex) => (
                <div key={dayIndex} className="border-l border-gray-200">
                  {/* 遍历每个小时 */}
                  {hours.map((hour, hourIndex) => {
                    const isAvailable = isSlotAvailable(dayIndex, hour);
                    
                    return (
                      <div 
                        key={hourIndex} 
                        className={`h-12 border-b border-gray-100 transition-colors duration-200 ${
                          isAvailable 
                            ? 'bg-green-100 border border-green-200 hover:bg-green-200 active:bg-green-300' 
                            : 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200'
                        } cursor-pointer`}
                        onClick={() => handleSlotClick(dayIndex, hour)}
                        aria-label={`${days[dayIndex].name} at ${formatHour(hour)}: ${isAvailable ? 'Available' : 'Not available'}. Click to toggle.`}
                      >
                        {isAvailable && (
                          <div className="h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 每周可用小时统计 */}
      <div className="bg-white px-4 py-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Weekly Availability Summary</h3>
        <div className="grid grid-cols-7 gap-1 mb-3">
          {days.map((day, index) => {
            // 计算当天可用小时数
            const availableHoursCount = hours.filter(hour => isSlotAvailable(index, hour)).length;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs font-medium text-gray-500 mb-1">{day.shortName}</div>
                <div className={`w-full py-1 rounded-lg text-center text-xs font-medium ${
                  availableHoursCount > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {availableHoursCount} hrs
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-700 font-medium">Total Available Hours:</span>
          <span className="text-lg font-semibold text-green-600">
            {Object.values(availableSlots).filter(Boolean).length} hrs
          </span>
        </div>
      </div>
      
      {/* 图例说明和更新按钮 */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded-sm mr-2 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <span className="text-xs text-gray-600">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded-sm mr-2"></div>
            <span className="text-xs text-gray-600">Not Available</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            className={`flex-1 py-2.5 rounded-lg font-medium ${
              hasChanges
                ? 'border border-gray-300 text-gray-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!hasChanges}
            onClick={handleResetClick}
          >
            Reset
          </button>
          
          <button 
            className={`flex-1 py-2.5 rounded-lg font-medium ${
              hasChanges
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!hasChanges || isUpdating}
            onClick={handleUpdate}
          >
            {isUpdating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                <span>Updating...</span>
              </div>
            ) : 'Update Availability'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachEditAvailabilityPage; 