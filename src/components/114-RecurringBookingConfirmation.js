import React from 'react';
import CoachInfoCard from './common/CoachInfoCard';
import LessonDetailsCard from './common/LessonDetailsCard';

const RecurringBookingConfirmation = () => {
  // 模拟用户已选择的课程详情
  const selectedPackage = {
    type: 'Intermediate Package',
    coach: 'Sarah Johnson',
    sessions: 8,
    duration: 60,
    startDate: 'Mon, Apr 21',
    startTime: '14:00',
    schedule: 'Weekly on Mondays',
    people: 2,
    location: {
      name: 'Central Park Courts',
      address: '45 Park Ave',
      distance: '0.8 miles'
    },
    skills: ['Fore hand', 'Back hand', 'Serving', 'Game tactics'],
    needsEquipment: true,
    price: 350,
    regularPrice: 400
  };

  // 构建教练对象
  const coachData = {
    id: 'coach-1',
    name: selectedPackage.coach,
    rating: 4.9,
    reviews: 28,
    price: 50,
    lessonsCompleted: 352,
    qualifications: ['Tennis Level 2', 'First Aid']
  };

  // 生成课程日期列表
  const generateLessonDates = () => {
    const dates = [];
    // 模拟8个课程日期
    const months = ['Apr', 'May', 'Jun'];
    const days = [21, 28, 5, 12, 19, 26, 2, 9];
    
    for (let i = 0; i < 8; i++) {
      const monthIndex = i < 2 ? 0 : (i < 6 ? 1 : 2);
      dates.push(`Mon, ${months[monthIndex]} ${days[i]}`);
    }
    
    return dates;
  };

  const lessonDates = generateLessonDates();

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1">
          <i className="material-icons-round text-gray-700">arrow_back_ios_new</i>
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-semibold">Booking Confirmation</h1>
        </div>
        <div className="w-5"></div>
      </div>
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto px-4 py-5">
        {/* 成功消息 */}
        <div className="bg-primary-50 rounded-lg p-4 mb-6 text-center border border-primary-100">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="material-icons-round text-primary-600" style={{ fontSize: '28px' }}>check_circle</i>
          </div>
          <h3 className="text-lg font-semibold text-primary-800 mb-1">Package Booking Successful!</h3>
          <p className="text-sm text-primary-700">
            Your {selectedPackage.sessions}-lesson package has been confirmed. You'll receive a confirmation email shortly.
          </p>
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-4">Package Details</h3>
        
        {/* 教练信息 */}
        <div className="mb-4">
          <CoachInfoCard 
            coach={coachData}
            showLocation={false}
            className="shadow-sm"
          />
        </div>
        
        {/* 课程详情 */}
        <div className="mb-4">
          <LessonDetailsCard 
            lesson={selectedPackage}
            title="Package Details"
            className="shadow-sm"
            skillTagClassName="bg-purple-50 text-purple-600"
          />
        </div>
        
        {/* 课程日期列表 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h4 className="font-medium text-primary-600 mb-3">Lesson Schedule</h4>
          
          <div className="space-y-2">
            {lessonDates.map((date, index) => (
              <div key={index} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 text-xs font-medium flex items-center justify-center mr-2">
                    {index + 1}
                  </div>
                  <div className="text-gray-700">{date}</div>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm ${index === 0 ? 'text-primary-600 font-medium' : 'text-gray-600'}`}>
                    {selectedPackage.startTime} {index === 0 && <span className="text-xs ml-1">(First)</span>}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 位置详情 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h4 className="font-medium text-primary-600 mb-3">Location</h4>
          <div>
            <div className="flex justify-between mb-1">
              <h4 className="font-medium text-gray-800">{selectedPackage.location.name}</h4>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <i className="material-icons-round text-gray-500 mr-1 text-base">location_on</i>
              <span>{selectedPackage.location.address}</span>
              <span className="ml-2 text-xs text-gray-500">({selectedPackage.location.distance})</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full">
                Indoor courts
              </span>
              <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full">
                Changing rooms
              </span>
              <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full">
                Parking
              </span>
            </div>
          </div>
        </div>
        
        {/* 价格摘要 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h4 className="font-medium text-primary-600 mb-3">Payment Summary</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">{selectedPackage.type} ({selectedPackage.sessions} lessons)</span>
              <span className="text-gray-800">£{selectedPackage.price}</span>
            </div>
            
            {selectedPackage.regularPrice > selectedPackage.price && (
              <div className="flex justify-between">
                <span className="text-primary-600">Package discount</span>
                <span className="text-primary-600">-£{selectedPackage.regularPrice - selectedPackage.price}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">Booking fee</span>
              <span className="text-gray-800">£5</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Platform support fee</span>
              <span className="text-gray-800">£3</span>
            </div>
            
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-800">Total Paid</span>
                <span className="font-medium text-primary-600">£{selectedPackage.price + 8}</span>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-500">
                  (£{Math.round((selectedPackage.price + 8) / selectedPackage.sessions)} per lesson)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 预订申请提示 */}
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 mb-6">
          <div className="flex">
            <i className="material-icons-round text-purple-600 mr-2 flex-shrink-0">schedule</i>
            <p className="text-sm text-purple-700">
              Your booking request has been sent to the coach. The lessons will be confirmed once the coach has accepted all sessions. If the coach needs to reschedule any sessions, you will be notified and can discuss alternative times.
            </p>
          </div>
        </div>
        
        {/* 底部按钮 */}
        <div className="flex space-x-3">
          <button 
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-center flex items-center justify-center"
          >
            <i className="material-icons-round text-base mr-1">calendar_month</i>
            Add to Calendar
          </button>
          <button 
            className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium text-center"
          >
            View My Lessons
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecurringBookingConfirmation; 