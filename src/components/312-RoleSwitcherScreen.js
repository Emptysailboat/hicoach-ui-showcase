import React, { useState } from 'react';
import { ArrowLeft, UserCheck, Users, ChevronRight, Book, Calendar, Award } from 'lucide-react';

const RoleSwitcherScreen = () => {
  const [activeRole, setActiveRole] = useState('student'); // 'student' or 'coach'
  
  // 示例数据 - 在实际应用中会从API获取
  const studentData = {
    name: 'Tom Wilson',
    profileImage: null, // 使用占位符
    sports: ['Tennis', 'Badminton'],
    upcomingLessons: 3,
    completedLessons: 27
  };
  
  const coachData = {
    name: 'Tom Wilson',
    profileImage: null, // 使用占位符
    sports: ['Golf'],
    upcomingLessons: 5,
    totalStudents: 12,
    rating: 4.8,
    reviews: 19
  };
  
  // 切换角色
  const handleRoleSwitch = (role) => {
    setActiveRole(role);
  };
  
  return (
    <div className="flex flex-col bg-gray-100 overflow-hidden">
      <div className="relative w-full max-w-md mx-auto bg-gray-50 h-screen overflow-hidden shadow-lg">
        {/* 头部栏 */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 shadow-sm">
          <div className="flex items-center">
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 ml-3">Switch Role</h1>
          </div>
        </div>
        
        {/* 主要内容 */}
        <div className="flex-1 p-4 overflow-auto">
          <p className="text-sm text-gray-600 mb-6">
            Switch between your roles to access different features in the app. Your data and conversations are kept separate for each role.
          </p>
          
          {/* 学员身份卡片 */}
          <div 
            className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-200 mb-4 relative overflow-hidden
              ${activeRole === 'student' ? 'border-green-600' : 'border-gray-200'}`}
            onClick={() => handleRoleSwitch('student')}
          >
            {/* 活跃指示器 */}
            {activeRole === 'student' && (
              <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded-bl-lg">
                Active
              </div>
            )}
            
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-800">Student</h2>
                  <p className="text-sm text-gray-500">Book lessons & track your progress</p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between mb-2.5">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-1">Sports:</span>
                    <div className="flex space-x-1">
                      {studentData.sports.map((sport, idx) => (
                        <span key={idx} className="text-xs font-medium bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-700">{studentData.upcomingLessons} upcoming</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Book className="w-3.5 h-3.5 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-700">{studentData.completedLessons} completed lessons</span>
                  </div>
                  
                  {activeRole !== 'student' && (
                    <button className="text-xs font-medium text-green-600 flex items-center">
                      Switch <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* 教练身份卡片 */}
          <div 
            className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-200 relative overflow-hidden
              ${activeRole === 'coach' ? 'border-green-600' : 'border-gray-200'}`}
            onClick={() => handleRoleSwitch('coach')}
          >
            {/* 活跃指示器 */}
            {activeRole === 'coach' && (
              <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded-bl-lg">
                Active
              </div>
            )}
            
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-800">Coach</h2>
                  <p className="text-sm text-gray-500">Manage lessons & connect with students</p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between mb-2.5">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-1">Teaching:</span>
                    <div className="flex space-x-1">
                      {coachData.sports.map((sport, idx) => (
                        <span key={idx} className="text-xs font-medium bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Award className="w-3.5 h-3.5 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-700">{coachData.rating} ({coachData.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Users className="w-3.5 h-3.5 text-gray-500 mr-1" />
                      <span className="text-xs text-gray-700">{coachData.totalStudents} students</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 text-gray-500 mr-1" />
                      <span className="text-xs text-gray-700">{coachData.upcomingLessons} lessons scheduled</span>
                    </div>
                  </div>
                  
                  {activeRole !== 'coach' && (
                    <button className="text-xs font-medium text-green-600 flex items-center">
                      Switch <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitcherScreen; 