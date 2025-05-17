import React from 'react';
import CoachInfoCard from './common/CoachInfoCard';
import LocationCard from './common/LocationCard';
import PriceDetailsCard from './common/PriceDetailsCard';
import LessonDetailsCard from './common/LessonDetailsCard';

const SingleBookingConfirmation = () => {
  // 模拟用户已选择的课程详情
  const selectedLesson = {
    type: 'Single Lesson',
    coach: 'Sarah Johnson',
    date: 'Mon, Apr 1',
    time: '10:00',
    duration: 60,
    people: 2,
    location: {
      name: 'Central Park Courts',
      address: '45 Park Ave',
      distance: '0.8 miles'
    },
    skills: ['Fore hand', 'Back hand', 'Serving'],
    needsEquipment: true,
    price: 50
  };

  // 构建教练对象
  const coachData = {
    id: 'coach-1',
    name: selectedLesson.coach,
    rating: 4.9,
    reviews: 28,
    price: selectedLesson.price,
    lessonsCompleted: 352,
    qualifications: ['Tennis Level 2', 'First Aid']
  };

  // 构建场地对象
  const locationData = {
    id: 'location-1',
    name: selectedLesson.location.name,
    address: selectedLesson.location.address,
    distance: selectedLesson.location.distance,
    facilities: ['Indoor courts', 'Changing rooms', 'Parking']
  };

  // 计算总价和准备价格数据
  const subtotal = selectedLesson.price * selectedLesson.people;
  const discount = 5;
  const fees = [
    { name: 'Booking fee', amount: 3 },
    { name: 'Platform support fee', amount: 2 }
  ];
  const total = subtotal - discount + fees.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1.5 rounded-full active:bg-gray-100">
          <span className="material-icons-round text-gray-700" style={{ fontSize: '24px' }}>
            arrow_back_ios_new
          </span>
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-gray-800">Review & Pay</h1>
        </div>
        <div className="w-5"></div>
      </div>
      
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
        </div>
        <div className="text-xs text-gray-500">
          Step 4/4
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
            className="border border-gray-200"
          />
        </div>
        
        {/* 课程详情 - 使用LessonDetailsCard组件 */}
        <div className="mb-4">
          <LessonDetailsCard 
            lesson={selectedLesson}
            title="Lesson Details"
            className="border border-gray-200"
            skillTagClassName="bg-purple-50 text-purple-600"
          />
        </div>
        
        {/* 位置详情 - 使用LocationCard组件 */}
        <div className="mb-4">
          <h4 className="font-medium text-primary-600 mb-3">Location</h4>
          <LocationCard 
            location={locationData}
            className="border border-gray-200"
            facilitiesClassName="inline-block px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full mr-1.5 mb-1"
          />
        </div>
        
        {/* 价格详情 - 使用PriceDetailsCard组件 */}
        <div className="mb-4">
          <PriceDetailsCard
            subtotal={subtotal}
            discount={discount}
            fees={fees}
            total={total}
            className="mb-2"
          />
        </div>
        
        {/* 提示信息 */}
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 mb-6">
          <div className="flex">
            <span className="material-icons-round text-purple-600 mr-2 flex-shrink-0" style={{ fontSize: '20px' }}>
              info
            </span>
            <p className="text-sm text-purple-700">
              Payment will be processed securely. You can cancel or reschedule up to 24 hours before your lesson without any fees.
            </p>
          </div>
        </div>
        
        {/* 底部按钮 */}
        <div className="flex justify-center">
          <button 
            className="w-full px-5 py-3 bg-primary-600 text-white rounded-lg font-medium active:bg-primary-700"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBookingConfirmation; 