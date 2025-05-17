import React from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  MessageCircle, 
  X,
  ExternalLink
} from 'lucide-react';

const CoachDeclinedLessonDetail = () => {
  // 发送消息
  const handleSendMessage = () => {
    // 在实际应用中，这里会导航到消息界面
    console.log('Navigate to message screen');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-gray-800">Lesson Details</h1>
        </div>
        <div className="w-6"></div> {/* 平衡左侧图标 */}
      </div>
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto">
        {/* 状态条 */}
        <div className="bg-red-50 px-4 py-3 border-b border-red-100">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <X className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-red-800">Declined</h2>
              <p className="text-xs text-red-700 mt-0.5">
                You declined this lesson request on March 10, 2025
              </p>
            </div>
          </div>
        </div>
        
        {/* 课程详情 */}
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-3">Tennis Lesson with Alex</h2>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">Saturday, March 15, 2025</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Request received on March 10, 2025
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">2:00 PM - 3:00 PM (60 minutes)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">Wimbledon Tennis Club</p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    30 Somerset Road, London, SW19 5JU
                  </p>
                  <button className="text-xs text-purple-600 font-medium flex items-center mt-1">
                    <ExternalLink className="h-3 w-3 mr-1" /> View Map
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 拒绝原因 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-2">Your Decline Reason</h2>
            <p className="text-sm text-gray-700">
              I'm sorry, but I'm not available at this time due to another lesson commitment. I would be happy to schedule a lesson with you at a different time. Please check my available slots and book again at your convenience.
            </p>
          </div>
          
          {/* 学员信息 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-3">Student Information</h2>
            
            <div className="flex items-start">
              <div className="h-12 w-12 bg-gray-200 rounded-full flex-shrink-0 mr-3">
                {/* 学员头像 */}
                <User className="h-12 w-12 text-gray-400" />
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Alex Thompson</p>
                <p className="text-xs text-gray-500 mt-0.5">Beginner • First booking attempt</p>
                
                <div className="flex space-x-2 mt-2">
                  <button 
                    className="py-1.5 px-3 bg-purple-600 text-white rounded-lg text-sm font-medium flex items-center"
                    onClick={handleSendMessage}
                  >
                    <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 备注信息 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-2">Notes from Student</h2>
            <p className="text-sm text-gray-700">
              I'm a complete beginner and have never played tennis before. I'd like to learn the basics and eventually be able to play with friends. I have my own racket but not sure if it's the right one.
            </p>
          </div>
          
          {/* 课程费用 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-3">Lesson Details</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Lesson type:</span>
                <span className="text-sm text-gray-800 font-medium">Single lesson (60 min)</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Lesson price:</span>
                <span className="text-sm text-gray-800 font-medium">£40.00</span>
              </div>
            </div>
          </div>
          
          {/* 推荐操作 */}
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <div className="flex items-start">
              <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Suggest Alternative Time</p>
                <p className="text-xs text-blue-700 mt-1">
                  Consider messaging the student to suggest alternative times when you're available. This helps maintain your booking rate.
                </p>
                <button 
                  className="mt-2 py-1.5 px-3 bg-blue-600 text-white rounded-lg text-xs font-medium"
                  onClick={handleSendMessage}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDeclinedLessonDetail; 