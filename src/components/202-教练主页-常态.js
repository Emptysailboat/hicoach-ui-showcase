import React from 'react';

const CoachHomePage = () => {
  // 今日课程数据
  const todayLessons = [
    {
      id: 1,
      type: 'Tennis',
      status: 'pending',
      paymentStatus: '2/10 Paid',
      date: 'Saturday, April 5, 2025',
      time: '07:04 - 08:04 BST',
      location: '28 Wilton Grove, London SW19 3QX',
      price: '£60/hr',
      student: 'Alice',
      colorStatus: 'yellow'
    },
    {
      id: 2,
      type: 'Tennis',
      status: 'confirmed',
      paymentStatus: 'Paid',
      date: 'Saturday, April 5, 2025',
      time: '09:30 - 10:30 BST',
      location: '28 Wilton Grove, London SW19 3QX',
      price: '£60/hr',
      student: 'Bob',
      colorStatus: 'green'
    },
    {
      id: 3,
      type: 'Tennis',
      status: 'cancelled',
      paymentStatus: 'Cancelled',
      date: 'Saturday, April 5, 2025',
      time: '12:00 - 13:00 BST',
      location: '28 Wilton Grove, London SW19 3QX',
      price: '£60/hr',
      student: 'Charlie',
      colorStatus: 'red'
    }
  ];
  
  // 任务提醒
  const tasks = [
    {
      id: 1,
      title: '2 new lessons enquiry',
      count: 2
    }
  ];
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">Coach Center</h1>
        </div>
        <div className="flex items-center">
          <button className="p-1 rounded-full relative">
            <span className="material-icons text-gray-700" style={{ fontSize: '20px' }}>chat</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">10</span>
          </button>
        </div>
      </div>
      
      {/* 主要内容区 - 确保可滚动 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* 欢迎区域 */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-5 text-white rounded-b-xl shadow-sm">
          <h2 className="text-xl font-bold">Hi coach Tom T!</h2>
          <p className="text-sm mt-0.5 text-green-50">
            Today is Saturday, April 5, 2025
          </p>
        </div>
        
        {/* 待办任务区域 */}
        <div className="px-4 mt-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3">To do</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between cursor-pointer active:bg-gray-50"
                onClick={() => console.log(`Opening task ${task.id}`)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3 shadow-sm">
                    <span className="material-icons text-white" style={{ fontSize: '20px' }}>chat</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">{task.title}</h4>
                    <p className="text-xs text-gray-500">Tap to view</p>
                  </div>
                </div>
                <span className="material-icons text-gray-400" style={{ fontSize: '20px' }}>chevron_right</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 今日课程区域 */}
        <div className="px-4 mt-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-green-600">Today's Lessons</h3>
            <button className="text-sm text-green-600 font-medium">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {todayLessons.map((lesson) => (
              <div 
                key={lesson.id} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 cursor-pointer
                  ${lesson.status === 'confirmed' ? 'border-green-500' : 
                    lesson.status === 'pending' ? 'border-yellow-500' : 
                    lesson.status === 'cancelled' ? 'border-red-500' : 'border-gray-300'}`}
                onClick={() => console.log(`Opening lesson details for ${lesson.id}`)}
              >
                <div className="p-3">
                  <div className="mb-1">
                    <h3 className="font-medium text-sm text-gray-800">{lesson.type}</h3>
                  </div>
                  
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={`inline-block px-2 py-0.5 ${lesson.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        lesson.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        lesson.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'} text-xs font-medium rounded-full`}>
                      {lesson.status === 'cancelled' ? 'Cancelled' : lesson.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                    <span className={`inline-block px-2 py-0.5 ${lesson.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      lesson.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} text-xs font-medium rounded-full`}>
                      {lesson.paymentStatus}
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <span className="material-icons text-gray-500" style={{ fontSize: '14px' }}>calendar_today</span>
                    <span className="ml-1.5 text-xs text-gray-700">{lesson.date}</span>
                    <span className="mx-1 text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-700">{lesson.time.split(' - ')[0]}</span>
                  </div>
                  
                  <div className="flex items-center mt-1.5">
                    <span className="material-icons text-gray-500" style={{ fontSize: '14px' }}>location_on</span>
                    <span className="ml-1.5 text-xs text-gray-700">{lesson.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1.5 pt-1.5 border-t border-gray-100">
                    <span className="text-green-600 text-xs font-medium">{lesson.price}</span>
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs font-bold mr-1">{lesson.student.charAt(0)}</div>
                      <span className="text-gray-700 text-xs font-medium">Student: {lesson.student}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 底部间距 */}
        <div className="h-8"></div>
      </div>
      
      {/* 底部导航栏 */}
      <div className="bg-white border-t border-gray-200 py-2 grid grid-cols-5 shadow-md fixed bottom-0 max-w-md w-full z-10">
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="material-icons text-green-600" style={{ fontSize: '20px' }}>home</span>
          </div>
          <span className="text-xs font-medium text-green-600 mt-1">Home</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons text-gray-500" style={{ fontSize: '20px' }}>calendar_today</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Lessons</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons text-gray-500" style={{ fontSize: '20px' }}>schedule</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Availability</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons text-gray-500" style={{ fontSize: '20px' }}>bar_chart</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Performance</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons text-gray-500" style={{ fontSize: '20px' }}>person</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default CoachHomePage; 