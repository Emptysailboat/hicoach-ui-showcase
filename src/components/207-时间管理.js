import React from 'react';
import PageHeader from './common/PageHeader';

const CoachAvailabilityEntryPage = () => {
  // 模拟导航到其他页面的函数
  const navigateTo = (page) => {
    console.log(`Navigate to ${page}`);
    // 实际应用中这里会使用路由导航
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <PageHeader title="Availability Management" onBack={handleBack} />
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto p-4">
        {/* 页面说明 */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 mb-2">Manage Your Teaching Schedule</h2>
          <p className="text-sm text-gray-600">
            Set when you're available to teach and manage your time off to help students book lessons with you.
          </p>
        </div>
        
        {/* 选项卡片 */}
        <div className="space-y-4">
          {/* 查看和编辑Availability */}
          <div 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer shadow-sm active:bg-gray-50"
            onClick={() => navigateTo('edit-availability')}
          >
            <div className="flex items-center p-5">
              <div className="w-12 h-12 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-4">
                <span className="material-icons text-green-600" style={{fontSize: "24px"}}>event_available</span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800">View & Edit Availability</h3>
                <p className="text-sm text-gray-600 mt-0.5">
                  Set your weekly teaching hours and view your schedule
                </p>
              </div>
              
              <span className="material-icons text-gray-400">chevron_right</span>
            </div>
          </div>
          
          {/* 设置Time Off */}
          <div 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer shadow-sm active:bg-gray-50"
            onClick={() => navigateTo('time-off')}
          >
            <div className="flex items-center p-5">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-4">
                <span className="material-icons text-purple-600" style={{fontSize: "24px"}}>event_busy</span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800">Set Time Off</h3>
                <p className="text-sm text-gray-600 mt-0.5">
                  Block specific dates and times when you're unavailable
                </p>
              </div>
              
              <span className="material-icons text-gray-400">chevron_right</span>
            </div>
          </div>
        </div>
        
        {/* 可用性状态摘要 */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center mb-3">
            <span className="material-icons text-gray-700 mr-2" style={{fontSize: "20px"}}>schedule</span>
            <h3 className="text-sm font-medium text-gray-700">Current Availability</h3>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">Weekly available hours</span>
            <div className="flex items-center">
              <span className="material-icons text-green-600 mr-1" style={{fontSize: "16px"}}>access_time</span>
              <span className="text-sm font-medium text-green-600">18 hours</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <span className="text-sm text-gray-600">Next time off</span>
            <div className="flex items-center">
              <span className="material-icons text-purple-600 mr-1" style={{fontSize: "16px"}}>event_busy</span>
              <span className="text-sm font-medium text-purple-600">Dec 24-26</span>
            </div>
          </div>
        </div>
        
        {/* 帮助提示 */}
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-start">
            <span className="material-icons text-purple-600 mr-2 mt-0.5">tips_and_updates</span>
            <p className="text-xs text-purple-700">
              Keep your availability updated to increase your booking rate.
              <br />Students can only book lessons during your available time slots.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachAvailabilityEntryPage; 