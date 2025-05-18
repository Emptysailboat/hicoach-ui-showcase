import React, { useState } from 'react';
import PageHeader from './common/PageHeader';
import ToggleSwitch from './common/ToggleSwitch';

const CalendarSyncPage = () => {
  // 状态管理
  const [systemCalendarEnabled, setSystemCalendarEnabled] = useState(true);
  const [selectedCalendar, setSelectedCalendar] = useState("google"); // "none", "google", "outlook", "apple"
  const [lastSynced, setLastSynced] = useState('Today, 10:23 AM');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // 切换系统日历同步状态
  const toggleSystemCalendar = () => {
    setSystemCalendarEnabled(!systemCalendarEnabled);
  };
  
  // 选择第三方日历
  const selectCalendar = (calendar) => {
    setSelectedCalendar(calendar);
    setDropdownOpen(false);
  };
  
  // 模拟手动同步
  const handleSync = () => {
    // 实际应用中这里会调用同步API
    setLastSynced('Just now');
    
    // 显示成功通知
    setShowSuccessNotification(true);
    
    // 3秒后自动隐藏通知
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
  };
  
  // 关闭成功通知
  const handleCloseNotification = () => {
    setShowSuccessNotification(false);
  };
  
  // 获取当前选择的日历显示名称和状态信息
  const getCalendarInfo = () => {
    switch(selectedCalendar) {
      case "google": 
        return {
          name: "Google Calendar",
          status: "Connected"
        };
      case "outlook": 
        return {
          name: "Outlook Calendar",
          status: "Connected"
        };
      case "apple": 
        return {
          name: "Apple Calendar",
          status: "Connected"
        };
      default: 
        return {
          name: "Not connected",
          status: ""
        };
    }
  };
  
  // 处理返回按钮点击事件
  const handleBack = () => {
    console.log('Back button clicked');
    // 在实际应用中，这里应该是导航回上一页
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 使用PageHeader组件 */}
      <div className="sticky top-0 z-10 shadow-sm">
        <PageHeader
          title="Sync Calendar"
          onBack={handleBack}
          rightElement={null}
        />
      </div>
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto pb-6">
        {/* 功能介绍 */}
        <div className="bg-white p-4 mb-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
              <i className="material-icons-round" style={{ fontSize: 24 }}>calendar_today</i>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Calendar Sync</h2>
              <p className="text-sm text-gray-600">Sync tennis lessons with your calendar app</p>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-100 flex items-start">
            <i className="material-icons-round text-purple-600 mr-2 flex-shrink-0 mt-0.5" style={{ fontSize: 20 }}>info</i>
            <p className="text-sm text-purple-700">
              Keep your schedule updated across all your devices by syncing with your preferred calendar.
            </p>
          </div>
        </div>
        
        {/* 同步状态 */}
        <div className="px-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sync Status</h3>
            <span className="text-xs text-gray-500">Last synced: {lastSynced}</span>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 mb-3">
            <button 
              onClick={handleSync}
              className="w-full flex items-center justify-center p-4 text-green-600 font-medium"
            >
              <i className="material-icons-round mr-2" style={{ fontSize: 20 }}>refresh</i>
              <span>Sync Now</span>
            </button>
          </div>
        </div>
        
        {/* 系统日历 - 单独一个卡片 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">System Calendar</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <i className="material-icons-round" style={{ fontSize: 20 }}>calendar_today</i>
                </div>
                <div className="ml-3">
                  <span className="text-gray-800 font-medium">System Calendar</span>
                  <p className="text-xs text-gray-500">Default calendar on your device</p>
                </div>
              </div>
              <ToggleSwitch
                isOn={systemCalendarEnabled}
                onToggle={toggleSystemCalendar}
              />
            </div>
          </div>
        </div>
        
        {/* 第三方日历 - 单独一个卡片 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Third-party Calendar</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            {/* 第三方日历开关 */}
            <div className="w-full flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-500">
                  <i className="material-icons-round" style={{ fontSize: 20 }}>calendar_today</i>
                </div>
                <div className="ml-3">
                  <span className="text-gray-800 font-medium">Third-party Calendar</span>
                  {selectedCalendar !== "none" && (
                    <p className="text-xs text-green-600">{getCalendarInfo().name} - {getCalendarInfo().status}</p>
                  )}
                  {selectedCalendar === "none" && (
                    <p className="text-xs text-gray-500">Connect external calendar app</p>
                  )}
                </div>
              </div>
              <ToggleSwitch
                isOn={selectedCalendar !== "none"}
                onToggle={() => {
                  if (selectedCalendar !== "none") {
                    selectCalendar("none");
                  } else {
                    selectCalendar("google"); // 默认选择Google
                  }
                }}
              />
            </div>
            
            {/* Calendar Service */}
            {selectedCalendar !== "none" && (
              <div className="w-full p-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-800 font-medium">Calendar Service</span>
                  </div>
                  <div 
                    onClick={() => setDropdownOpen(true)} 
                    className="flex items-center px-3 py-1.5 border border-gray-200 rounded-lg cursor-pointer"
                  >
                    <span className="text-sm text-gray-700 mr-2">{getCalendarInfo().name}</span>
                    <i className="material-icons-round text-gray-400" style={{ fontSize: 18 }}>chevron_right</i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* 帮助提示 */}
        <div className="px-4 mb-5">
          <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-100">
            <div className="flex">
              <i className="material-icons-round text-purple-600 mr-3 flex-shrink-0 mt-0.5" style={{ fontSize: 20 }}>warning</i>
              <div>
                <h4 className="text-sm font-medium text-purple-700 mb-1">Sync Information</h4>
                <p className="text-xs text-purple-600">
                  Calendar sync settings apply to this device only. You can change these settings at any time.
                </p>
              </div>
            </div>
          </div>
          
          {/* 保存按钮 */}
          <button 
            onClick={handleSync}
            className="w-full py-3 px-4 rounded-lg font-medium text-white bg-green-600"
          >
            Save Settings
          </button>
        </div>
      </div>
      
      {/* 第三方日历选择弹窗 */}
      {dropdownOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm max-h-[80vh] overflow-auto shadow-lg">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Select Calendar</h2>
              <button 
                onClick={() => setDropdownOpen(false)}
                className="p-1.5 rounded-full"
              >
                <i className="material-icons-round text-gray-700" style={{ fontSize: 20 }}>close</i>
              </button>
            </div>
            
            <div className="p-2">
              <div 
                onClick={() => selectCalendar("google")}
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                    <i className="material-icons-round" style={{ fontSize: 18 }}>calendar_today</i>
                  </div>
                  <span className="text-gray-800">Google Calendar</span>
                </div>
                {selectedCalendar === "google" && (
                  <i className="material-icons-round text-green-600" style={{ fontSize: 20 }}>check</i>
                )}
              </div>
              
              <div 
                onClick={() => selectCalendar("outlook")}
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3">
                    <i className="material-icons-round" style={{ fontSize: 18 }}>calendar_today</i>
                  </div>
                  <span className="text-gray-800">Outlook Calendar</span>
                </div>
                {selectedCalendar === "outlook" && (
                  <i className="material-icons-round text-green-600" style={{ fontSize: 20 }}>check</i>
                )}
              </div>
              
              <div 
                onClick={() => selectCalendar("apple")}
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 mr-3">
                    <i className="material-icons-round" style={{ fontSize: 18 }}>calendar_today</i>
                  </div>
                  <span className="text-gray-800">Apple Calendar</span>
                </div>
                {selectedCalendar === "apple" && (
                  <i className="material-icons-round text-green-600" style={{ fontSize: 20 }}>check</i>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => setDropdownOpen(false)}
                className="w-full py-2.5 px-4 rounded-lg font-medium text-white bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 成功通知 */}
      {showSuccessNotification && (
        <div className="fixed top-4 left-0 right-0 mx-auto w-full max-w-sm z-50 flex justify-center">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
              <i className="material-icons-round text-green-600" style={{ fontSize: 20 }}>check_circle</i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                Calendar Synced
              </p>
              <p className="text-xs text-gray-500">
                Your calendar has been synced successfully.
              </p>
            </div>
            <button 
              onClick={handleCloseNotification}
              className="ml-4 p-1 rounded-full"
            >
              <i className="material-icons-round text-gray-500" style={{ fontSize: 18 }}>close</i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSyncPage; 