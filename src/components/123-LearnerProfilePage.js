import React from 'react';
import BottomNavigation from './common/BottomNavigation';
import PageHeader from './common/PageHeader';

const LearnerProfilePage = () => {
  // 处理底部导航栏标签改变
  const handleNavTabChange = (tabId) => {
    console.log(`Navigation tab changed: ${tabId}`);
    // 实际应用中这里会进行页面导航
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* 顶部标题栏 */}
      <PageHeader title="Profile" />
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto pb-16">
        {/* 个人信息区域 - 简约现代设计 */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-800 mr-3">Tom T</h2>
            <span className="bg-primary-100 text-primary-600 px-2 py-1 rounded-full text-xs font-medium">
              Learner
            </span>
          </div>
        </div>
        <div className="w-full h-px bg-gray-200 mb-4"></div>
        
        {/* 账户与安全部分 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Account & Security</h3>
          
          <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <i className="material-icons-round" style={{ fontSize: '20px' }}>person</i>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Account Details</span>
              </div>
              <i className="material-icons-round text-gray-400" style={{ fontSize: '20px' }}>chevron_right</i>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <i className="material-icons-round" style={{ fontSize: '20px' }}>lock</i>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Change Password</span>
              </div>
              <i className="material-icons-round text-gray-400" style={{ fontSize: '20px' }}>chevron_right</i>
            </button>
          </div>
        </div>
        
        {/* 偏好设置部分 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Preferences</h3>
          
          <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <i className="material-icons-round" style={{ fontSize: '20px' }}>credit_card</i>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Payment Methods</span>
              </div>
              <i className="material-icons-round text-gray-400" style={{ fontSize: '20px' }}>chevron_right</i>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <i className="material-icons-round" style={{ fontSize: '20px' }}>notifications</i>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Notifications</span>
              </div>
              <i className="material-icons-round text-gray-400" style={{ fontSize: '20px' }}>chevron_right</i>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <i className="material-icons-round" style={{ fontSize: '20px' }}>calendar_today</i>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Sync Calendar</span>
              </div>
              <i className="material-icons-round text-gray-400" style={{ fontSize: '20px' }}>chevron_right</i>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <i className="material-icons-round" style={{ fontSize: '20px' }}>privacy_tip</i>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Privacy Settings</span>
              </div>
              <i className="material-icons-round text-gray-400" style={{ fontSize: '20px' }}>chevron_right</i>
            </button>
          </div>
        </div>
        
        {/* 应用信息部分 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">App</h3>
          
          <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <i className="material-icons-round" style={{ fontSize: '20px' }}>help</i>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Support</span>
              </div>
              <i className="material-icons-round text-gray-400" style={{ fontSize: '20px' }}>chevron_right</i>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <i className="material-icons-round" style={{ fontSize: '20px' }}>info</i>
                </div>
                <span className="ml-3 text-gray-800 font-medium">About</span>
              </div>
              <i className="material-icons-round text-gray-400" style={{ fontSize: '20px' }}>chevron_right</i>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <i className="material-icons-round" style={{ fontSize: '20px' }}>swap_horiz</i>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Switch Role</span>
              </div>
              <i className="material-icons-round text-gray-400" style={{ fontSize: '20px' }}>chevron_right</i>
            </button>
          </div>
        </div>
        
        {/* 登出按钮 */}
        <div className="px-4 mb-5">
          <button className="w-full flex items-center justify-center p-3.5 rounded-xl border border-red-200 text-red-600 font-medium">
            <i className="material-icons-round mr-2" style={{ fontSize: '20px' }}>logout</i>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* 底部导航栏 */}
      <BottomNavigation activeTab="profile" onTabChange={handleNavTabChange} />
    </div>
  );
};

export default LearnerProfilePage; 