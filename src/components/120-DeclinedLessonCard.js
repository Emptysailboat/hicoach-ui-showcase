import React from 'react';
import CoachInfoCard from './common/CoachInfoCard';
import PageHeader from './common/PageHeader';

const DeclinedLessonCard = () => {
  // 模拟教练数据
  const coachData = {
    id: 1,
    name: "Sarah Parker",
    rating: 4.8,
    reviews: 42,
    price: 60,
    location: "London",
    qualifications: ["Tennis Coach", "LTA-5"],
    lessonsCompleted: 156
  };

  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };

  return (
    <div className="flex flex-col bg-gray-50 max-w-md mx-auto h-full">
      {/* 顶部导航栏 */}
      <PageHeader title="Lesson Details" onBack={handleBack} />
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto px-4">
        {/* 状态标签和提示 - 红色样式表示被拒绝 */}
        <div className="py-3 bg-red-50 border-b border-red-200 -mx-4 px-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="inline-block px-2.5 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
              Declined
            </span>
            <span className="inline-block px-2.5 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
              Refunded
            </span>
          </div>
          <div className="mt-2 text-sm text-red-600 flex items-start" role="alert">
            <span className="material-icons-round text-red-600 mr-1.5 flex-shrink-0">cancel</span>
            <span>
              This lesson was declined by the coach. Reason: Schedule conflict. Your payment has been refunded.
            </span>
          </div>
        </div>
        
        {/* 教练信息 - 使用标准CoachInfoCard */}
        <section className="mb-4" aria-labelledby="coach-heading">
          <h2 id="coach-heading" className="text-lg font-semibold mb-3 text-gray-800">Coach</h2>
          <CoachInfoCard 
            coach={coachData}
            showLocation={false}
            className="shadow-sm"
          />
        </section>
        
        {/* 课程信息 */}
        <section className="mb-6" aria-labelledby="lesson-info-heading">
          <h2 id="lesson-info-heading" className="text-lg font-semibold mb-3 text-gray-800">Lesson Information</h2>
          <div className="status-card bg-white rounded-lg shadow-sm">
            {/* 日期 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons-round text-gray-500 mr-3 flex-shrink-0">event</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Date</h3>
                  <p className="text-gray-700">Monday, March 10, 2025</p>
                </div>
              </div>
            </div>
            
            {/* 时间 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons-round text-gray-500 mr-3 flex-shrink-0">schedule</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Time</h3>
                  <p className="text-gray-700">15:00 - 16:00 BST</p>
                </div>
              </div>
            </div>
            
            {/* 地点 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons-round text-gray-500 mr-3 flex-shrink-0">place</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Location</h3>
                  <p className="text-gray-700 font-medium">28 Wilton Grove</p>
                  <p className="text-gray-700">London SW19 3QX</p>
                </div>
              </div>
            </div>
            
            {/* 上课人数 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons-round text-gray-500 mr-3 flex-shrink-0">people</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Participants</h3>
                  <p className="text-gray-700">1 person</p>
                </div>
              </div>
            </div>
            
            {/* 费用 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons-round text-gray-500 mr-3 flex-shrink-0">attach_money</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Price</h3>
                  <p className="text-gray-700">£60 / hour</p>
                  <div className="mt-1.5 flex items-center">
                    <span className="inline-block px-2.5 py-0.5 bg-error-100 text-error-600 text-xs font-medium rounded">
                      Payment Refunded
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 是否需要带球拍 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons-round text-gray-500 mr-3 flex-shrink-0">sports_tennis</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Equipment</h3>
                  <p className="text-gray-700">You need to bring your own tennis racket</p>
                </div>
              </div>
            </div>
            
            {/* 课程内容 - 灰色标签表示不再相关 */}
            <div className="p-4">
              <div className="flex items-start">
                <span className="material-icons-round text-gray-500 mr-3 flex-shrink-0">subject</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Lesson Content</h3>
                  <p className="text-gray-700 mb-2">Focus areas:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded">
                      Forehand
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded">
                      Backhand
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded">
                      Serving
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 拒绝原因详细说明 */}
        <section className="mb-6">
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <div className="flex items-start">
              <span className="material-icons-round text-red-500 mr-2 mt-0.5 flex-shrink-0">info</span>
              <div>
                <p className="text-sm text-red-700 font-medium mb-1">Decline Reason</p>
                <p className="text-xs text-red-600">
                  The coach is unable to conduct this lesson due to a schedule conflict. We apologize for any inconvenience caused.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* 底部按钮 */}
        <div className="flex space-x-3 mb-6">
          <button 
            className="flex-1 px-4 py-2.5 border border-primary-500 text-primary-600 rounded-lg text-center flex items-center justify-center"
            aria-label="View other coaches"
          >
            Find Other Coaches
          </button>
          
          <button 
            className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg text-center flex items-center justify-center font-medium"
            aria-label="Book again with this coach"
          >
            Book Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeclinedLessonCard; 