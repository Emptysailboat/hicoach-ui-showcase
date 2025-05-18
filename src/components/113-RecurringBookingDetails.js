import React from 'react';
import LessonDetailsCard from './common/LessonDetailsCard';
import CoachInfoCard from './common/CoachInfoCard';
import PageHeader from './common/PageHeader';

const RecurringBookingDetails = () => {
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

  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
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
      <PageHeader title="Review & Pay" onBack={handleBack} />
      
      {/* 进度指示器 */}
      <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-primary-600 text-white">
            1
          </div>
          <div className="h-0.5 w-6 bg-primary-600"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-primary-600 text-white">
            2
          </div>
          <div className="h-0.5 w-6 bg-primary-600"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-primary-600 text-white">
            3
          </div>
          <div className="h-0.5 w-6 bg-primary-600"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-primary-600 text-white">
            4
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            5
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Step 4/5
        </div>
      </div>
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto px-4 py-5">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Booking Summary</h3>
        
        {/* 教练信息 - 使用CoachInfoCard组件 */}
        <div className="mb-4">
          <CoachInfoCard 
            coach={coachData}
            showLocation={false}
            className="shadow-sm"
          />
        </div>
        
        {/* 课程详情 - 使用LessonDetailsCard组件 */}
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
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h4 className="font-medium text-primary-600 mb-3">Price Details</h4>
          
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
                <span className="font-medium text-gray-800">Total</span>
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
        
        {/* 整合后的提示信息 */}
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 mb-6">
          <div className="flex">
            <i className="material-icons-round text-purple-600 mr-2 flex-shrink-0">info</i>
            <div className="text-sm text-purple-700">
              <p className="mb-2">This booking request will be sent to the coach. The coach will choose whether to confirm all lesson appointments based on their availability. Lessons will only be successfully booked after the coach confirms. If the coach wishes to reschedule, you will receive a notification and can discuss with the coach.</p>
              <p>Payment will be processed securely. You can cancel or reschedule individual lessons up to 24 hours before the scheduled time without any fees.</p>
            </div>
          </div>
        </div>
        
        {/* 底部导航 */}
        <div className="flex justify-center">
          <button 
            className="w-full px-5 py-2.5 bg-primary-600 text-white rounded-lg font-medium"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecurringBookingDetails; 