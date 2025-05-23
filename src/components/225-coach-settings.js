import React from 'react';
import PageHeader from './common/PageHeader';

const CoachProfileSettingsPage = () => {
  // 模拟已完成的项目状态
  const completedItems = ['verify-identity', 'location'];

  const isCompleted = (id) => completedItems.includes(id);
  
  // 统一的状态标签样式组件
  const StatusTag = ({ completed }) => {
    return completed ? (
      <span className="text-xs py-1 px-2 bg-green-100 text-green-600 rounded-full flex items-center whitespace-nowrap">
        <span className="material-icons text-xs mr-1">check_circle</span>
        Completed
      </span>
    ) : (
      <span className="text-xs py-1 px-2 bg-yellow-100 text-yellow-600 rounded-full flex items-center whitespace-nowrap">
        <span className="material-icons text-xs mr-1">priority_high</span>
        Required
      </span>
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 顶部标题栏 */}
      <PageHeader 
        title="Coach Profile" 
        onBack={() => console.log('Navigate back')}
      />
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto pb-6 pt-4">
        {/* 资料完善度指示器 */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-800">Profile Completion</h3>
              <span className="text-sm font-medium text-green-600">33%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '33%' }}></div>
            </div>
          </div>
        </div>

        {/* 警告提示 - 紫色主题 */}
        <div className="px-4 mb-6">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 mt-0.5">
              <span className="material-icons text-lg">warning</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Profile Requirement Notice</h3>
              <p className="text-sm text-gray-600">
                You must complete all required profile items before you can start accepting bookings from students.
              </p>
            </div>
          </div>
        </div>
        
        {/* 菜单选项 */}
        <div className="px-4 mb-6">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Account Verification</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 mb-6">
            {/* Verify Your Identity */}
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-start w-full">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                  <span className="material-icons text-lg">person</span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-gray-800 font-medium block text-left">Verify Your Identity</span>
                    <div className="flex items-center flex-shrink-0 ml-2">
                      <StatusTag completed={isCompleted('verify-identity')} />
                      <span className="material-icons text-gray-400 ml-2 flex-shrink-0">chevron_right</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 text-left">Submit ID verification to build trust</p>
                </div>
              </div>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            {/* DBS Certificate Upload */}
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-start w-full">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                  <span className="material-icons text-lg">security</span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-gray-800 font-medium block text-left">DBS Certificate Upload</span>
                    <div className="flex items-center flex-shrink-0 ml-2">
                      <StatusTag completed={isCompleted('dbs-certificate')} />
                      <span className="material-icons text-gray-400 ml-2 flex-shrink-0">chevron_right</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 text-left">Background check documentation</p>
                </div>
              </div>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            {/* Professional Certification */}
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-start w-full">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                  <span className="material-icons text-lg">emoji_events</span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-gray-800 font-medium block text-left">Professional Certification</span>
                    <div className="flex items-center flex-shrink-0 ml-2">
                      <StatusTag completed={isCompleted('professional-cert')} />
                      <span className="material-icons text-gray-400 ml-2 flex-shrink-0">chevron_right</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 text-left">Add your tennis coaching qualifications</p>
                </div>
              </div>
            </button>
          </div>
          
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Profile Settings</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            {/* Location */}
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-start w-full">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                  <span className="material-icons text-lg">location_on</span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-gray-800 font-medium block text-left">Location</span>
                    <div className="flex items-center flex-shrink-0 ml-2">
                      <StatusTag completed={isCompleted('location')} />
                      <span className="material-icons text-gray-400 ml-2 flex-shrink-0">chevron_right</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 text-left">Set your coaching locations</p>
                </div>
              </div>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            {/* Pricing Setting */}
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-start w-full">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                  <span className="material-icons text-lg">attach_money</span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-gray-800 font-medium block text-left">Pricing Setting</span>
                    <div className="flex items-center flex-shrink-0 ml-2">
                      <StatusTag completed={isCompleted('pricing')} />
                      <span className="material-icons text-gray-400 ml-2 flex-shrink-0">chevron_right</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 text-left">Manage your lesson rates</p>
                </div>
              </div>
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            {/* Introduction */}
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-start w-full">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                  <span className="material-icons text-lg">description</span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-gray-800 font-medium block text-left">Introduction</span>
                    <div className="flex items-center flex-shrink-0 ml-2">
                      <StatusTag completed={isCompleted('introduction')} />
                      <span className="material-icons text-gray-400 ml-2 flex-shrink-0">chevron_right</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 text-left">Write about your experience and teaching style</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachProfileSettingsPage; 