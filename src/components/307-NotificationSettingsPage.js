import React, { useState } from 'react';
import PageHeader from './common/PageHeader';
import ToggleSwitch from './common/ToggleSwitch';

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

  // 处理返回按钮点击事件
  const handleBack = () => {
    console.log('Back button clicked');
    // 在实际应用中，这里应该是导航回上一页
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 使用PageHeader组件替换原有顶部标题栏 */}
      <div className="sticky top-0 z-10 shadow-sm">
        <PageHeader
          title="Notifications"
          onBack={handleBack}
          rightElement={null}
        />
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
              className="w-full py-3 px-4 bg-white text-green-600 font-medium text-sm rounded-xl shadow-sm border border-green-100"
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