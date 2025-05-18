import React from 'react';
import PageHeader from './common/PageHeader';

const CoachProfilePage = () => {
  React.useEffect(() => {
    // 确保Google Material Icons库加载
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 顶部标题栏 */}
      <PageHeader 
        title="Profile" 
      />
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto pb-16">
        {/* 个人信息区域 - 简约现代设计 */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-800 mr-3">Alex S</h2>
            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
              Coach
            </span>
          </div>
        </div>
        <div className="w-full h-px bg-gray-200 mb-4"></div>
        
        {/* 账户与安全部分 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Account & Security</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">person</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Account Details</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">lock</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Change Password</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
          </div>
        </div>
        
        {/* 教练设置部分 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Coaching Setup</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">account_circle</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Coach Profile</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">attach_money</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Bank Details</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">trending_up</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Promote Yourself</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">pause_circle</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Pause Account</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
          </div>
        </div>
        
        {/* 偏好设置部分 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Preferences</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">credit_card</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Payment Methods</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">notifications</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Notifications</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">calendar_today</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Sync Calendar</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">shield</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Privacy Settings</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
          </div>
        </div>
        
        {/* 应用信息部分 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">App</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">help</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Support</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">info</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">About</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span className="material-icons-outlined">autorenew</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Switch Role</span>
              </div>
              <span className="material-icons-outlined text-gray-400">chevron_right</span>
            </button>
          </div>
        </div>
        
        {/* 登出按钮 */}
        <div className="px-4 mb-5">
          <button className="w-full flex items-center justify-center p-3.5 rounded-xl border border-red-200 text-red-600 font-medium">
            <span className="material-icons-outlined mr-2">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* 底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 grid grid-cols-5 shadow-md max-w-md mx-auto">
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons-outlined text-gray-500">home</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-0.5">Home</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons-outlined text-gray-500">calendar_today</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-0.5">Lessons</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons-outlined text-gray-500">schedule</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-0.5">Availability</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons-outlined text-gray-500">bar_chart</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-0.5">Performance</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="material-icons-outlined text-green-600">person</span>
          </div>
          <span className="text-xs font-medium text-green-600 mt-0.5">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default CoachProfilePage; 