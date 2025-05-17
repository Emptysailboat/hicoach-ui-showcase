import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  ChevronLeft,
  Check,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
  Info,
  X,
  CheckCircle
} from 'lucide-react';

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
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 顶部标题栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex items-center">
          <button className="p-1 rounded-full hover:bg-gray-100 mr-2 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Sync Calendar</h1>
        </div>
      </div>
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto pb-6">
        {/* 功能介绍 */}
        <div className="bg-white p-4 mb-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Calendar Sync</h2>
              <p className="text-sm text-gray-600">Sync tennis lessons with your calendar app</p>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
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
              className="w-full flex items-center justify-center p-4 text-green-600 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
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
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <span className="text-gray-800 font-medium">System Calendar</span>
                  <p className="text-xs text-gray-500">Default calendar on your device</p>
                </div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={systemCalendarEnabled}
                  onChange={toggleSystemCalendar}
                />
                <div className="relative w-11 h-6 transition-all duration-200 ease-in-out rounded-full bg-gray-200">
                  <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${systemCalendarEnabled ? 'translate-x-5 bg-white' : 'translate-x-0'}`}></div>
                  <div className={`absolute inset-0 rounded-full ${systemCalendarEnabled ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                  <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${systemCalendarEnabled ? 'translate-x-5' : ''}`}></div>
                </div>
              </label>
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
                  <Calendar className="w-5 h-5" />
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
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedCalendar !== "none"}
                  onChange={() => {
                    if (selectedCalendar !== "none") {
                      selectCalendar("none");
                    } else {
                      selectCalendar("google"); // 默认选择Google
                    }
                  }}
                />
                <div className="relative w-11 h-6 transition-all duration-200 ease-in-out rounded-full bg-gray-200">
                  <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${selectedCalendar !== "none" ? 'translate-x-5 bg-white' : 'translate-x-0'}`}></div>
                  <div className={`absolute inset-0 rounded-full ${selectedCalendar !== "none" ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                  <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${selectedCalendar !== "none" ? 'translate-x-5' : ''}`}></div>
                </div>
              </label>
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
                    className="flex items-center px-3 py-1.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <span className="text-sm text-gray-700 mr-2">{getCalendarInfo().name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
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
              <AlertTriangle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
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
            className="w-full py-3 px-4 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors"
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
                className="p-1.5 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            
            <div className="p-2">
              <div 
                onClick={() => selectCalendar("google")}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800">Google Calendar</span>
                </div>
                {selectedCalendar === "google" && (
                  <Check className="w-5 h-5 text-green-600" />
                )}
              </div>
              
              <div 
                onClick={() => selectCalendar("outlook")}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800">Outlook Calendar</span>
                </div>
                {selectedCalendar === "outlook" && (
                  <Check className="w-5 h-5 text-green-600" />
                )}
              </div>
              
              <div 
                onClick={() => selectCalendar("apple")}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 mr-3">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800">Apple Calendar</span>
                </div>
                {selectedCalendar === "apple" && (
                  <Check className="w-5 h-5 text-green-600" />
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => setDropdownOpen(false)}
                className="w-full py-2.5 px-4 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors"
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
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center animate-fade-in">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
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
              className="ml-4 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}
      
      {/* 添加淡入动画的CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CalendarSyncPage; 