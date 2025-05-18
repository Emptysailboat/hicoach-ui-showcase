import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

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
  
  // 处理返回按钮点击事件
  const handleBack = () => {
    console.log('Back button clicked');
    // 在实际应用中，这里应该是导航回上一页
  };
  
  return (
    <div className="flex flex-col bg-gray-100 overflow-hidden">
      <div className="relative w-full max-w-md mx-auto bg-gray-50 h-screen overflow-hidden shadow-lg">
        {/* 使用PageHeader组件替换原有顶部标题栏 */}
        <div className="sticky top-0 z-10 shadow-sm">
          <PageHeader
            title="Switch Role"
            onBack={handleBack}
            rightElement={null}
          />
        </div>
        
        {/* 主要内容 */}
        <div className="flex-1 p-4 overflow-auto">
          <p className="text-sm text-gray-600 mb-6">
            Switch between your roles to access different features in the app. Your data and conversations are kept separate for each role.
          </p>
          
          {/* 学员身份卡片 */}
          <div 
            className={`bg-white rounded-xl shadow-sm border-2 mb-4 relative overflow-hidden
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
                  <span className="material-icons" style={{fontSize: '24px'}}>person</span>
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
                    <span className="material-icons-outlined text-gray-500 mr-1" style={{fontSize: '14px'}}>calendar_today</span>
                    <span className="text-xs text-gray-700">{studentData.upcomingLessons} upcoming</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons-outlined text-gray-500 mr-1" style={{fontSize: '14px'}}>menu_book</span>
                    <span className="text-xs text-gray-700">{studentData.completedLessons} completed lessons</span>
                  </div>
                  
                  {activeRole !== 'student' && (
                    <button className="text-xs font-medium text-green-600 flex items-center">
                      Switch <span className="material-icons" style={{fontSize: '14px'}}>chevron_right</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* 教练身份卡片 */}
          <div 
            className={`bg-white rounded-xl shadow-sm border-2 relative overflow-hidden
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
                  <span className="material-icons" style={{fontSize: '24px'}}>groups</span>
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
                    <span className="material-icons-outlined text-gray-500 mr-1" style={{fontSize: '14px'}}>star</span>
                    <span className="text-xs text-gray-700">{coachData.rating} ({coachData.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <span className="material-icons-outlined text-gray-500 mr-1" style={{fontSize: '14px'}}>people</span>
                      <span className="text-xs text-gray-700">{coachData.totalStudents} students</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="material-icons-outlined text-gray-500 mr-1" style={{fontSize: '14px'}}>calendar_today</span>
                      <span className="text-xs text-gray-700">{coachData.upcomingLessons} lessons scheduled</span>
                    </div>
                  </div>
                  
                  {activeRole !== 'coach' && (
                    <button className="text-xs font-medium text-green-600 flex items-center">
                      Switch <span className="material-icons" style={{fontSize: '14px'}}>chevron_right</span>
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