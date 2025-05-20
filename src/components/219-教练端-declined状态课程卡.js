import React from 'react';
import PageHeader from './common/PageHeader';
import StudentInfoCard from './StudentInfoCard';

const CoachDeclinedLessonDetail = () => {
  // 学生数据
  const studentData = {
    id: '1',
    name: 'Alex Johnson',
    rating: 4.8,
    reviews: 12,
    price: 0,
    distance: 0.7,
    lessonsCompleted: 24,
    location: 'London',
    qualifications: [],
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    console.log('Navigate back');
  };

  // 处理学生资料点击
  const handleStudentClick = (student) => {
    console.log('View student profile', student);
  };
  
  // 发送消息
  const handleSendMessage = () => {
    console.log('Navigate to message screen');
  };
  
  return (
    <div className="flex flex-col bg-gray-50 max-w-md mx-auto h-full">
      <PageHeader title="Lesson Details" onBack={handleBack} />
      
      <div className="flex-1 overflow-auto px-4">
        <div className="py-4 bg-red-50 border-b border-red-200 -mx-4 px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
              Declined
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="material-icons text-red-700 mr-2 flex-shrink-0">person</span>
              <span className="text-sm text-red-800">
                Coach declined due to schedule conflict
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="material-icons text-red-700 mr-2 flex-shrink-0">schedule</span>
              <span className="text-sm text-red-800">
                Declined on March 10, 2025
              </span>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-red-700 mr-2 flex-shrink-0">info</span>
              <p className="text-sm text-red-800">
                I'm sorry, but I'm not available at this time due to another lesson commitment. I would be happy to schedule a lesson with you at a different time. Please check my available slots and book again at your convenience.
              </p>
            </div>
          </div>
        </div>
        
        <section className="mb-6" aria-labelledby="student-heading">
          <h2 id="student-heading" className="text-lg font-semibold mb-4 text-gray-800">Student</h2>
          <StudentInfoCard 
            student={studentData}
            showLocation={true}
            showQualifications={false}
            onMessage={handleSendMessage}
          />
        </section>
        
        <section className="mb-6" aria-labelledby="lesson-info-heading">
          <h2 id="lesson-info-heading" className="text-lg font-semibold mb-4 text-gray-800">Lesson Information</h2>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">event</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Date</h3>
                  <p className="text-gray-700">Saturday, March 15, 2025</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">schedule</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Time</h3>
                  <p className="text-gray-700">14:00 - 15:00 BST</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">place</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Location</h3>
                  <p className="text-gray-700 font-medium">28 Wilton Grove</p>
                  <p className="text-gray-700">London SW19 3QX</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">people</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Participants</h3>
                  <p className="text-gray-700">1 person</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">payments</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Price</h3>
                  <p className="text-gray-700">£60 / hour</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">sports_tennis</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Equipment</h3>
                  <p className="text-gray-700">Student will bring their own tennis racket</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">info</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Lesson Content</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-600 text-sm font-medium rounded">
                      Forehand
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-600 text-sm font-medium rounded">
                      Backhand
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-600 text-sm font-medium rounded">
                      Serving
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="flex flex-col gap-3 mb-6">
          <button 
            className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg text-sm font-medium flex items-center justify-center"
            onClick={handleSendMessage}
          >
            <span className="material-icons mr-2">chat</span>
            Message the Learner
          </button>
          
          <button 
            className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium flex items-center justify-center"
            onClick={() => console.log('Contact HiCoach')}
          >
            <span className="material-icons mr-2">support_agent</span>
            Contact HiCoach
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachDeclinedLessonDetail; 