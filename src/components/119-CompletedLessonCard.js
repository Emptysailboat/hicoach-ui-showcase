import React, { useState } from 'react';
import CoachInfoCard from './common/CoachInfoCard';
import PageHeader from './common/PageHeader';

const CompletedLessonCard = () => {
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
  
  // 学员笔记状态
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState("I learned proper forehand techniques and improved my serving form. Need to work on footwork.");

  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };

  // 处理笔记编辑
  const handleSaveNote = () => {
    setIsEditing(false);
    // 实际应用中这里会有保存到后端的逻辑
  };

  return (
    <div className="flex flex-col bg-gray-50 max-w-md mx-auto h-full">
      {/* 顶部导航栏 */}
      <PageHeader title="Lesson Details" onBack={handleBack} />
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto px-4">
        {/* 状态标签和提示 */}
        <div className="py-3 bg-purple-50 border-b border-purple-200 -mx-4 px-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="inline-block px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
              Completed
            </span>
            <span className="inline-block px-2.5 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-full">
              Paid
            </span>
          </div>
          <div className="mt-2 text-sm text-purple-700 flex items-start" role="alert">
            <span className="material-icons-round text-purple-700 mr-1.5 flex-shrink-0">check_circle</span>
            <span>
              Great job completing your lesson! Review your coach's feedback and book your next session to continue your progress.
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
                <span className="material-icons-round text-primary-600 mr-3 flex-shrink-0">event</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Date</h3>
                  <p className="text-gray-700">Saturday, March 15, 2025</p>
                </div>
              </div>
            </div>
            
            {/* 时间 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons-round text-primary-600 mr-3 flex-shrink-0">schedule</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Time</h3>
                  <p className="text-gray-700">14:00 - 15:00 BST</p>
                </div>
              </div>
            </div>
            
            {/* 地点 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons-round text-primary-600 mr-3 flex-shrink-0">place</span>
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
                <span className="material-icons-round text-primary-600 mr-3 flex-shrink-0">people</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Participants</h3>
                  <p className="text-gray-700">1 person</p>
                </div>
              </div>
            </div>
            
            {/* 费用 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons-round text-primary-600 mr-3 flex-shrink-0">attach_money</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Price</h3>
                  <p className="text-gray-700">£60 / hour</p>
                  <div className="mt-1.5 flex items-center">
                    <span className="inline-block px-2.5 py-0.5 bg-primary-100 text-primary-600 text-xs font-medium rounded">
                      Payment Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 是否需要带球拍 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons-round text-primary-600 mr-3 flex-shrink-0">sports_tennis</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Equipment</h3>
                  <p className="text-gray-700">You need to bring your own tennis racket</p>
                </div>
              </div>
            </div>
            
            {/* 课程内容 - 亮紫色标签 */}
            <div className="p-4">
              <div className="flex items-start">
                <span className="material-icons-round text-primary-600 mr-3 flex-shrink-0">subject</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Lesson Content</h3>
                  <p className="text-gray-700 mb-2">Focus areas:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 bg-purple-100 text-purple-500 text-xs font-medium rounded">
                      Forehand
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 bg-purple-100 text-purple-500 text-xs font-medium rounded">
                      Backhand
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 bg-purple-100 text-purple-500 text-xs font-medium rounded">
                      Serving
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 教练反馈区域 */}
        <section className="mb-6" aria-labelledby="feedback-heading">
          <h2 id="feedback-heading" className="text-lg font-semibold mb-3 text-gray-800">Coach's Feedback</h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-gray-700 text-sm">
              Great session today! Your forehand technique has improved significantly. You're getting much better at controlling your shots and your timing is more consistent. 
              
              We need to work more on your footwork and positioning, as that will help you reach more difficult shots. Your serving form is coming along well, but we should focus on increasing the power while maintaining accuracy.
            </p>
          </div>
        </section>
        
        {/* 下一阶段目标区域 */}
        <section className="mb-6" aria-labelledby="next-target-heading">
          <h2 id="next-target-heading" className="text-lg font-semibold mb-3 text-gray-800">Next Goals</h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-600">1</span>
                </div>
                <p className="text-gray-700 text-sm ml-3">Improve footwork through specific movement drills</p>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-600">2</span>
                </div>
                <p className="text-gray-700 text-sm ml-3">Work on serving power while maintaining accuracy</p>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-600">3</span>
                </div>
                <p className="text-gray-700 text-sm ml-3">Practice forehand technique with different ball speeds</p>
              </div>
            </div>
            
            <div className="mt-3 p-3 bg-purple-50 rounded-md">
              <p className="text-sm text-purple-700">
                <span className="font-medium">Coach's recommendation:</span> 2-3 more sessions focusing on these areas would be ideal for significant progress.
              </p>
            </div>
          </div>
        </section>
        
        {/* 我的课程笔记区域 */}
        <section className="mb-6" aria-labelledby="my-notes-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="my-notes-heading" className="text-lg font-semibold text-gray-800">My Lesson Notes</h2>
            {!isEditing ? (
              <button 
                className="p-1.5 bg-gray-100 rounded-md text-gray-700 active:bg-gray-200 transition-colors"
                onClick={() => setIsEditing(true)}
                aria-label="Edit your notes"
              >
                <span className="material-icons-round text-gray-600 text-xl">edit</span>
              </button>
            ) : (
              <button 
                className="p-1.5 bg-primary-100 rounded-md text-primary-600 active:bg-primary-200 transition-colors"
                onClick={handleSaveNote}
                aria-label="Save your notes"
              >
                <span className="material-icons-round text-primary-600 text-xl">save</span>
              </button>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            {!isEditing ? (
              <p className="text-gray-700 text-sm">{noteText}</p>
            ) : (
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-700 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your notes about this lesson here..."
                aria-label="Your lesson notes"
              />
            )}
          </div>
        </section>
        
        {/* 底部按钮 */}
        <div className="flex space-x-3 mb-6">
          <button 
            className="flex-1 px-4 py-2.5 border border-primary-500 text-primary-600 rounded-lg text-center flex items-center justify-center"
            aria-label="Leave a review for this lesson"
          >
            Review & Rate
          </button>
          
          <button 
            className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg text-center flex items-center justify-center font-medium"
            aria-label="Book another lesson with this coach"
          >
            Book Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletedLessonCard; 