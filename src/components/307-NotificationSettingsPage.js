import React, { useState } from 'react';
import { ChevronLeft, Bell, MessageCircle, Mail, RefreshCw } from 'lucide-react';

const NotificationSettingsPage = () => {
  // 通知设置状态
  const [settings, setSettings] = useState({
    // 推送通知
    pushPromotions: false,
    
    // 短信通知
    smsLessonReminders: true,
    smsPromotions: false,
    
    // 邮件通知
    emailPromotions: false
  });
  
  // 处理开关切换
  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // 优化的滑动式开关组件
  const ToggleSwitch = ({ isOn, onToggle }) => (
    <label className="relative inline-flex items-center cursor-pointer touch-manipulation">
      <input 
        type="checkbox" 
        className="sr-only"
        checked={isOn}
        onChange={onToggle}
      />
      <div 
        className="w-12 h-6 rounded-full flex items-center px-0.5 transition-colors duration-300"
        style={{ backgroundColor: isOn ? 'var(--green-600, #059669)' : '#d1d5db' }}
      >
        <div 
          className="w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300"
          style={{ transform: isOn ? 'translateX(24px)' : 'translateX(0)' }}
        ></div>
      </div>
    </label>
  );

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 顶部标题栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex items-center">
          <button className="p-1 rounded-full hover:bg-gray-100 mr-2 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Notifications</h1>
        </div>
      </div>
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* 推送通知设置 */}
          <div className="mb-6">
            <h2 className="text-xs font-medium text-green-600 uppercase tracking-wider px-1 mb-2">
              Push Notifications
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              {/* 促销信息 */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">Promotions & Offers</h3>
                    <p className="text-xs text-gray-500 mt-1">Special deals and promotional offers</p>
                  </div>
                  <ToggleSwitch 
                    isOn={settings.pushPromotions}
                    onToggle={() => handleToggle('pushPromotions')}
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xs bg-purple-50 text-purple-600 mt-2 px-3 py-2 rounded-xl border border-purple-100">
              You'll always receive push notification for your lesson updates and Coach messages
            </p>
          </div>
          
          {/* 短信通知设置 */}
          <div className="mb-6">
            <h2 className="text-xs font-medium text-green-600 uppercase tracking-wider px-1 mb-2">
              Text Messages
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              {/* 课程提醒 */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">Lesson Updates</h3>
                    <p className="text-xs text-gray-500 mt-1">Confirmations, changes, and cancellations</p>
                  </div>
                  <ToggleSwitch 
                    isOn={settings.smsLessonReminders}
                    onToggle={() => handleToggle('smsLessonReminders')}
                  />
                </div>
              </div>
              
              {/* 促销信息 */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">Promotions & Offers</h3>
                    <p className="text-xs text-gray-500 mt-1">Special deals and promotional offers</p>
                  </div>
                  <ToggleSwitch 
                    isOn={settings.smsPromotions}
                    onToggle={() => handleToggle('smsPromotions')}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* 邮件通知设置 */}
          <div className="mb-6">
            <h2 className="text-xs font-medium text-green-600 uppercase tracking-wider px-1 mb-2">
              Email Notifications
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              {/* 促销信息 */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">Promotions & Offers</h3>
                    <p className="text-xs text-gray-500 mt-1">Special deals and promotional offers</p>
                  </div>
                  <ToggleSwitch 
                    isOn={settings.emailPromotions}
                    onToggle={() => handleToggle('emailPromotions')}
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xs bg-purple-50 text-purple-600 mt-2 px-3 py-2 rounded-xl border border-purple-100">
              You'll always receive email updates for your lesson updates and Coach messages
            </p>
          </div>
          
          {/* 测试通知 */}
          <div className="mb-8">
            <h2 className="text-xs font-medium text-green-600 uppercase tracking-wider px-1 mb-2">
              Test Notifications
            </h2>
            
            <button 
              className="w-full py-3 px-4 bg-white text-green-600 font-medium text-sm rounded-xl shadow-sm hover:bg-green-50 active:bg-green-100 transition-colors border border-green-100"
              onClick={() => {
                alert('Test notification sent successfully!');
              }}
            >
              Send Test Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsPage; 