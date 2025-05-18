import React, { useState } from 'react';
// 移除lucide-react引入，使用Google图标库

const CoachOnboardingPage = () => {
  // 定义任务完成状态 - 初始都是未完成
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Verify Your Identity', icon: <span className="material-icons">person</span>, completed: false, required: true },
    { id: 2, title: 'DBS Certificate Upload', icon: <span className="material-icons">description</span>, completed: false, required: true },
    { id: 3, title: 'Professional Certification', icon: <span className="material-icons">workspace_premium</span>, completed: false, required: true },
    { id: 4, title: 'Bank Details', icon: <span className="material-icons">credit_card</span>, completed: false, required: true },
    { id: 5, title: 'Availability', icon: <span className="material-icons">schedule</span>, completed: false, required: true },
    { id: 6, title: 'Location', icon: <span className="material-icons">location_on</span>, completed: false, required: true },
    { id: 7, title: 'Price Setting', icon: <span className="material-icons">currency_pound</span>, completed: false, required: true },
    { id: 8, title: 'Introduction', icon: <span className="material-icons">article</span>, completed: false, required: false }
  ]);
  
  // 计算完成任务百分比
  const requiredTasks = tasks.filter(task => task.required);
  const completedRequiredTasks = requiredTasks.filter(task => task.completed);
  const completionPercentage = requiredTasks.length > 0 
    ? Math.round((completedRequiredTasks.length / requiredTasks.length) * 100) 
    : 0;
  
  // 模拟任务点击处理
  const handleTaskClick = (taskId) => {
    console.log(`Clicked on task ${taskId}`);
    // 实际应用中这里会导航到相应的任务编辑页面
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">Coach Center</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-1 rounded-full relative">
            <span className="material-icons text-gray-700">chat</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </button>
        </div>
      </div>
      
      {/* 主要内容区 - 确保可滚动 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* 欢迎区域 */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-6 text-white rounded-b-xl shadow-sm">
          <h2 className="text-xl font-bold">Welcome to Hi Coach!</h2>
          <p className="text-sm mt-1 text-green-50">Complete your profile to start receiving lesson requests</p>
          
          {/* 进度指示器 */}
          <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-white h-2.5 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs font-medium">{completedRequiredTasks.length}/{requiredTasks.length} Required Tasks</span>
            <span className="text-xs font-medium">{completionPercentage}% Complete</span>
          </div>
        </div>
        
        {/* 通知栏 */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-4 mb-2 rounded-r-lg shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="material-icons text-yellow-600">error</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You need to complete all required tasks before you can receive bookings.
              </p>
            </div>
          </div>
        </div>
        
        {/* 任务列表 */}
        <div className="px-4 mt-2">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Setup Tasks</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between cursor-pointer active:bg-gray-50"
                onClick={() => handleTaskClick(task.id)}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${task.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                    {task.completed ? <span className="material-icons">check</span> : task.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">{task.title}</h4>
                    <p className="text-xs text-gray-500">
                      {task.completed ? 'Completed' : task.required ? 'Required' : 'Optional'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {!task.completed && (
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-1">
                      <span className="material-icons text-green-600" style={{fontSize: '16px'}}>edit</span>
                    </div>
                  )}
                  <span className="material-icons text-gray-400">chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 提示卡片 */}
        <div className="px-4 mt-6 mb-8">
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 shadow-sm">
            <h3 className="text-sm font-semibold text-purple-800 flex items-center">
              <span className="material-icons text-purple-800 mr-1.5" style={{fontSize: '16px'}}>workspace_premium</span>
              Pro Tips
            </h3>
            <ul className="mt-2 text-xs text-purple-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-1.5 text-purple-600">•</span>
                <span>Complete your profile to increase visibility to students</span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 text-purple-600">•</span>
                <span>Add professional photos to make your profile more attractive</span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 text-purple-600">•</span>
                <span>Set your availability regularly to receive more booking requests</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 底部导航栏 */}
      <div className="bg-white border-t border-gray-200 py-2 grid grid-cols-5 shadow-md fixed bottom-0 max-w-md w-full z-10">
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="material-icons text-green-600">home</span>
          </div>
          <span className="text-xs font-medium text-green-600 mt-1">Home</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons text-gray-500">calendar_month</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Lessons</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons text-gray-500">schedule</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Availability</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons text-gray-500">bar_chart</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Performance</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons text-gray-500">person</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default CoachOnboardingPage; 