import React, { useState } from 'react';
import PageHeader from './common/PageHeader';
import StudentInfoCard from './StudentInfoCard';

const CoachCompletedLessonDetail = () => {
  // 状态管理
  const [isEditingFeedback, setIsEditingFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('Alex showed good enthusiasm and coordination for a beginner. We focused on basic grip, stance, and forehand technique. Next lesson plan: continue with forehand practice, introduce backhand basics and work on ball tracking.');
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [goals, setGoals] = useState([
    'Improve footwork through specific movement drills',
    'Work on serving power while maintaining accuracy',
    'Practice forehand technique with different ball speeds'
  ]);
  const [newGoal, setNewGoal] = useState('');
  
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

  // 处理保存反馈
  const handleSaveFeedback = () => {
    setIsEditingFeedback(false);
  };

  // 处理保存目标
  const handleSaveGoals = () => {
    setIsEditingGoals(false);
  };

  // 添加新目标
  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal('');
    }
  };

  // 删除目标
  const handleRemoveGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };
  
  return (
    <div className="flex flex-col bg-gray-50 max-w-md mx-auto h-full">
      <PageHeader title="Lesson Details" onBack={handleBack} />
      
      <div className="flex-1 overflow-auto px-4">
        <div className="py-4 bg-purple-50 border-b border-purple-200 -mx-4 px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
              Completed
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="material-icons text-purple-700 mr-2 flex-shrink-0">check_circle</span>
              <span className="text-sm text-purple-800">
                Student has confirmed the completion of this lesson.
              </span>
            </div>
            <div className="flex items-start">
              <span className="material-icons text-purple-700 mr-2 flex-shrink-0">schedule</span>
              <span className="text-sm text-purple-800">
                Confirmed on March 15, 2025 at 15:30
              </span>
            </div>
            <div className="flex items-start">
              <span className="material-icons text-purple-700 mr-2 flex-shrink-0">info</span>
              <span className="text-sm text-purple-800">
                Please complete the feedback and next goals to help track learning progress and improve future lessons.
              </span>
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
                <span className="material-icons text-green-600 mr-3 flex-shrink-0">event</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Date</h3>
                  <p className="text-gray-700">Saturday, March 15, 2025</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-green-600 mr-3 flex-shrink-0">schedule</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Time</h3>
                  <p className="text-gray-700">14:00 - 15:00 BST</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-green-600 mr-3 flex-shrink-0">place</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Location</h3>
                  <p className="text-gray-700 font-medium">28 Wilton Grove</p>
                  <p className="text-gray-700">London SW19 3QX</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-green-600 mr-3 flex-shrink-0">people</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Participants</h3>
                  <p className="text-gray-700">1 person</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-green-600 mr-3 flex-shrink-0">sports_tennis</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Equipment</h3>
                  <p className="text-gray-700">Student will bring their own tennis racket</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start">
                <span className="material-icons text-green-600 mr-3 flex-shrink-0">info</span>
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
        
        <section className="mb-6" aria-labelledby="feedback-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="feedback-heading" className="text-lg font-semibold text-gray-800">Coach Feedback</h2>
            {!isEditingFeedback ? (
              <button 
                className="p-1.5 bg-gray-100 rounded-md text-gray-700 active:bg-gray-200 transition-colors"
                onClick={() => setIsEditingFeedback(true)}
                aria-label="Edit feedback"
              >
                <span className="material-icons-round text-gray-600 text-xl">edit</span>
              </button>
            ) : (
              <button 
                className="p-1.5 bg-green-100 rounded-md text-green-600 active:bg-green-200 transition-colors"
                onClick={handleSaveFeedback}
                aria-label="Save feedback"
              >
                <span className="material-icons-round text-green-600 text-xl">save</span>
              </button>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            {!isEditingFeedback ? (
              <p className="text-sm text-gray-700">{feedbackText}</p>
            ) : (
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-700"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={4}
              />
            )}
          </div>
        </section>

        <section className="mb-6" aria-labelledby="goals-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="goals-heading" className="text-lg font-semibold text-gray-800">Next Goals</h2>
            {!isEditingGoals ? (
              <button 
                className="p-1.5 bg-gray-100 rounded-md text-gray-700 active:bg-gray-200 transition-colors"
                onClick={() => setIsEditingGoals(true)}
                aria-label="Edit goals"
              >
                <span className="material-icons-round text-gray-600 text-xl">edit</span>
              </button>
            ) : (
              <button 
                className="p-1.5 bg-green-100 rounded-md text-green-600 active:bg-green-200 transition-colors"
                onClick={handleSaveGoals}
                aria-label="Save goals"
              >
                <span className="material-icons-round text-green-600 text-xl">save</span>
              </button>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-3">
              {goals.map((goal, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 text-sm ml-3 flex-1">{goal}</p>
                  {isEditingGoals && (
                    <button 
                      onClick={() => handleRemoveGoal(index)}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <span className="material-icons text-sm">close</span>
                    </button>
                  )}
                </div>
              ))}
              {isEditingGoals && (
                <div className="flex items-center mt-3">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Add a new goal..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm text-gray-700"
                  />
                  <button 
                    onClick={handleAddGoal}
                    className="ml-2 p-2 bg-purple-100 text-purple-600 rounded-lg"
                  >
                    <span className="material-icons">add</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="mb-6" aria-labelledby="student-notes-heading">
          <h2 id="student-notes-heading" className="text-lg font-semibold mb-4 text-gray-800">Student Notes</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-700">
              I'm a complete beginner and have never played tennis before. I'd like to learn the basics and eventually be able to play with friends. I have my own racket but not sure if it's the right one.
            </p>
          </div>
        </section>

        <div className="mb-6">
          <button 
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center"
            onClick={handleSendMessage}
          >
            <span className="material-icons mr-2">chat</span>
            Message the Learner
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachCompletedLessonDetail; 