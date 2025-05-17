import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Info, 
  ChevronRight, 
  X,
  CheckCircle
} from 'lucide-react';

const PrivacySettingsPage = () => {
  // 隐私设置状态
  const [privacySettings, setPrivacySettings] = useState({
    necessary: true, // 必要的cookies不可关闭
    performance: true,
    targeting: false,
    location: true,
    analytics: true
  });
  
  // 显示隐私政策弹窗状态
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  
  // 成功通知状态
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  
  // 处理设置切换
  const handleToggle = (setting) => {
    if (setting === 'necessary') return; // 必要cookies不可修改
    
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  // 处理全部允许
  const handleAllowAll = () => {
    setPrivacySettings({
      necessary: true,
      performance: true,
      targeting: true,
      location: true,
      analytics: true
    });
  };
  
  // 保存设置
  const handleSaveSettings = () => {
    console.log('保存隐私设置:', privacySettings);
    // 在实际应用中，这里会调用API保存设置
    
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
  
  // 用于模拟返回上一级页面的函数
  const handleBack = () => {
    console.log('Navigate back to profile page');
    // 在实际应用中，这里会导航回上一页
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 顶部标题栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex items-center">
          <button className="p-1 rounded-full hover:bg-gray-100 mr-2 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Privacy Settings</h1>
        </div>
      </div>
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto">
        {/* 主要内容区域 */}
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-gray-200">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-base font-medium text-gray-800">Privacy Preference Center</h2>
              <p className="text-sm text-gray-500 mt-2">
                Control how your data is used in HiCoach Tennis app. You can manage your consent preferences for different types of data processing.
              </p>
              
              <button
                onClick={() => setShowPrivacyInfo(true)}
                className="mt-2 text-green-600 text-sm font-medium flex items-center"
              >
                <Info className="w-4 h-4 mr-1" />
                More information
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Manage Consent Preferences</h3>
              
              {/* 必要的Cookies */}
              <div className="py-3 border-b border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-800">
                    Strictly Necessary Cookies
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-green-600 font-medium mr-2">Always Active</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  These cookies are essential for the app to function properly and cannot be disabled.
                </p>
              </div>
              
              {/* 性能Cookies */}
              <div className="py-3 border-b border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-800">
                    Performance Cookies
                  </div>
                  <div className="flex items-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={privacySettings.performance}
                        onChange={() => handleToggle('performance')}
                      />
                      <div className="relative w-11 h-6 transition-all duration-200 ease-in-out rounded-full bg-gray-200">
                        <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${privacySettings.performance ? 'translate-x-5 bg-white' : 'translate-x-0'}`}></div>
                        <div className={`absolute inset-0 rounded-full ${privacySettings.performance ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                        <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${privacySettings.performance ? 'translate-x-5' : ''}`}></div>
                      </div>
                    </label>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  These cookies allow us to analyze app usage so we can measure and improve performance.
                </p>
              </div>
              
              {/* 定位数据 */}
              <div className="py-3 border-b border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-800">
                    Location Data
                  </div>
                  <div className="flex items-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={privacySettings.location}
                        onChange={() => handleToggle('location')}
                      />
                      <div className="relative w-11 h-6 transition-all duration-200 ease-in-out rounded-full bg-gray-200">
                        <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${privacySettings.location ? 'translate-x-5 bg-white' : 'translate-x-0'}`}></div>
                        <div className={`absolute inset-0 rounded-full ${privacySettings.location ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                        <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${privacySettings.location ? 'translate-x-5' : ''}`}></div>
                      </div>
                    </label>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Allow access to your location to find nearby tennis courts and coaches.
                </p>
              </div>
              
              {/* 定向广告Cookies */}
              <div className="py-3 border-b border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-800">
                    Targeting Cookies
                  </div>
                  <div className="flex items-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={privacySettings.targeting}
                        onChange={() => handleToggle('targeting')}
                      />
                      <div className="relative w-11 h-6 transition-all duration-200 ease-in-out rounded-full bg-gray-200">
                        <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${privacySettings.targeting ? 'translate-x-5 bg-white' : 'translate-x-0'}`}></div>
                        <div className={`absolute inset-0 rounded-full ${privacySettings.targeting ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                        <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${privacySettings.targeting ? 'translate-x-5' : ''}`}></div>
                      </div>
                    </label>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  These cookies are used to make advertising messages more relevant to you.
                </p>
              </div>
              
              {/* 分析数据 */}
              <div className="py-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-800">
                    Analytics Data
                  </div>
                  <div className="flex items-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={privacySettings.analytics}
                        onChange={() => handleToggle('analytics')}
                      />
                      <div className="relative w-11 h-6 transition-all duration-200 ease-in-out rounded-full bg-gray-200">
                        <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${privacySettings.analytics ? 'translate-x-5 bg-white' : 'translate-x-0'}`}></div>
                        <div className={`absolute inset-0 rounded-full ${privacySettings.analytics ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                        <div className={`absolute left-1 top-1 w-4 h-4 transition-all duration-200 ease-in-out rounded-full bg-white shadow-md transform ${privacySettings.analytics ? 'translate-x-5' : ''}`}></div>
                      </div>
                    </label>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Share usage data to help us improve the app experience for all users.
                </p>
              </div>
            </div>
          </div>
          
          {/* 数据相关提示 */}
          <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-100">
            <h3 className="text-sm font-medium text-purple-700 mb-2">Privacy Information</h3>
            <p className="text-xs text-purple-600 mb-2">
              Your privacy choices apply to this device only. You can change these settings at any time.
            </p>
            <p className="text-xs text-purple-600">
              For more details about how we handle your data, please review our 
              <a href="#" className="text-purple-700 font-medium ml-1">Privacy Policy</a>.
            </p>
          </div>
          
          {/* 添加的保存和允许全部按钮 */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAllowAll}
              className="flex-1 py-3 px-4 rounded-lg font-medium border border-green-200 text-green-600 bg-green-50 hover:bg-green-100 active:bg-green-200 transition-colors"
            >
              Allow All
            </button>
            <button
              onClick={handleSaveSettings}
              className="flex-1 py-3 px-4 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
      
      {/* 成功通知 */}
      {showSuccessNotification && (
        <div className="fixed top-4 left-0 right-0 mx-auto w-full max-w-sm z-50 flex justify-center">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center animate-fade-in">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                Settings Saved
              </p>
              <p className="text-xs text-gray-500">
                Your privacy preferences have been updated successfully.
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
      
      {/* 隐私政策信息弹窗 */}
      {showPrivacyInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-auto border border-gray-200 shadow-lg">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Privacy Information</h2>
              <button 
                onClick={() => setShowPrivacyInfo(false)}
                className="p-1.5 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                When you open the HiCoach Tennis app, it may store or retrieve information on your device, usually in the form of cookies and SDKs. This information might be about you, your preferences or your device and is mostly used to make the app work as you expect it to.
              </p>
              
              <p className="text-sm text-gray-600 mb-4">
                The information does not usually directly identify you, but it can give you a more personalized app experience. Because we respect your right to privacy, you can choose not to allow some types of cookies and data collection.
              </p>
              
              <p className="text-sm text-gray-600 mb-4">
                Click on the different category headings to find out more and change our default settings. However, blocking some types of cookies and data collection may impact your experience of the app and the services we are able to offer.
              </p>
              
              <h3 className="text-base font-medium text-gray-800 mt-6 mb-2">Types of Data We Collect</h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Strictly Necessary</h4>
                <p className="text-xs text-gray-600">
                  These are required to enable basic app functionality and cannot be disabled. They include authentication cookies, security cookies, and other essential features.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Performance</h4>
                <p className="text-xs text-gray-600">
                  These help us understand how you interact with our app by collecting and reporting information anonymously. This allows us to improve the app based on usage patterns.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Location Data</h4>
                <p className="text-xs text-gray-600">
                  With your permission, we use location data to help you find tennis courts and coaches near you. This data is only collected when the app is in use and location services are enabled.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Targeting</h4>
                <p className="text-xs text-gray-600">
                  These are set through our advertising partners to build a profile of your interests and show you relevant adverts on other apps and websites. They do not store personal information directly, but are based on uniquely identifying your browser and device.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Analytics</h4>
                <p className="text-xs text-gray-600">
                  This helps us understand how users engage with our app, what features are most popular, and how we can improve the overall experience. This data is aggregated and does not personally identify you.
                </p>
              </div>
              
              <button
                onClick={() => setShowPrivacyInfo(false)}
                className="w-full py-3 mt-4 px-4 text-white font-medium rounded-lg shadow-sm bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 添加淡入动画的CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default PrivacySettingsPage; 