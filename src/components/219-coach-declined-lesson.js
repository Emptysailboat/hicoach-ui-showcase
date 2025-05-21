import React from 'react';
import { ArrowLeft, MessageSquare, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

const CoachDeclinedLessonDetail = () => {
  const lesson = {
    id: 12345,
    type: 'Tennis',
    status: 'declined',
    declinedReason: 'Schedule conflict with another commitment',
    declinedAt: new Date('2025-04-03T14:30:00'),
    declinedBy: 'coach',
    date: new Date('2025-04-06T09:00:00'),
    endTime: new Date('2025-04-06T10:00:00'),
    location: '28 Wilton Grove, London SW19 3QX',
    price: '£60.00',
    student: { name: 'Alice Smith', rating: 4.5, lessonsCount: 12 }
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  // 处理学员个人资料查看
  const handleStudentClick = (student) => {
    console.log(`Viewing ${student.name}'s profile`);
  };
  
  // 处理发送消息
  const handleSendMessage = () => {
    console.log(`Sending message to ${lesson.student.name}`);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex items-center">
          <button 
            className="p-1.5 rounded-full hover:bg-gray-100 mr-1"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 ml-1">Declined Lesson</h1>
        </div>
        <button className="p-1.5 rounded-full hover:bg-gray-100">
          <MoreVertical className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      
      {/* 主要内容区 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* 状态卡片 */}
        <div className="bg-red-50 border-t-4 border-red-500 p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-medium text-red-800">Lesson Declined</h2>
              <p className="text-sm text-red-700 mt-1">
                You declined this lesson on {format(lesson.declinedAt, 'MMM d, yyyy')} at {format(lesson.declinedAt, 'h:mm a')}
              </p>
            </div>
          </div>
        </div>
        
        {/* 课程详情 */}
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* 课程类型与时间 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900">{lesson.type} Lesson</h3>
                <span className="text-red-600 text-sm font-medium">Declined</span>
              </div>
              
              <div className="flex items-center text-gray-700 text-sm mb-1">
                <span className="material-icons mr-1.5 text-gray-500" style={{fontSize: '16px'}}>event</span>
                <span>{format(lesson.date, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              
              <div className="flex items-center text-gray-700 text-sm">
                <span className="material-icons mr-1.5 text-gray-500" style={{fontSize: '16px'}}>schedule</span>
                <span>{format(lesson.date, 'h:mm a')} - {format(lesson.endTime, 'h:mm a')}</span>
              </div>
            </div>
            
            {/* 地点 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons mt-0.5 mr-1.5 text-gray-500" style={{fontSize: '16px'}}>location_on</span>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Location</h4>
                  <p className="text-sm text-gray-700 mt-0.5">{lesson.location}</p>
                </div>
              </div>
            </div>
            
            {/* 费用 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center">
                <span className="material-icons mr-1.5 text-gray-500" style={{fontSize: '16px'}}>payments</span>
                <h4 className="text-sm font-medium text-gray-900">Price</h4>
                <span className="text-sm text-gray-700 ml-auto">{lesson.price}</span>
              </div>
            </div>
            
            {/* 学员信息 */}
            <div className="p-4 border-b border-gray-100">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Student</h4>
              <div 
                className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
                onClick={() => handleStudentClick(lesson.student)}
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">
                  {lesson.student.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-800">{lesson.student.name}</div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">{lesson.student.lessonsCount} lessons</span>
                    <span className="mx-1.5 text-gray-300">•</span>
                    <div className="flex items-center">
                      <span className="material-icons text-yellow-400" style={{fontSize: '14px'}}>star</span>
                      <span className="text-xs text-gray-500 ml-0.5">{lesson.student.rating}</span>
                    </div>
                  </div>
                </div>
                <span className="material-icons ml-auto text-gray-400">chevron_right</span>
              </div>
            </div>
            
            {/* 拒绝原因 */}
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Decline Reason</h4>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                {lesson.declinedReason}
              </p>
            </div>
          </div>
        </div>
        
        {/* 学员消息按钮 */}
        <div className="px-4 mt-4">
          <button 
            className="w-full py-3 flex items-center justify-center bg-purple-600 text-white rounded-lg font-medium"
            onClick={handleSendMessage}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Message Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachDeclinedLessonDetail; 