import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  MessageCircle, 
  PhoneOutgoing,
  ExternalLink,
  FileText,
  X,
  CheckCircle,
  Award,
  MoreVertical,
  AlertTriangle
} from 'lucide-react';
import PageHeader from './common/PageHeader';

const CoachConfirmedLessonDetail = () => {
  // 状态管理
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // 关闭取消对话框
  const closeCancelDialog = () => {
    setShowCancelDialog(false);
  };
  
  // 关闭菜单
  const closeMenu = () => {
    setShowMenu(false);
  };
  
  // 处理取消课程
  const handleCancelClick = () => {
    setShowMenu(false);
    setShowCancelDialog(true);
  };
  
  // 显示成功消息
  const showSuccess = (message) => {
    setShowSuccessMessage(message);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  
  // 发送消息
  const handleSendMessage = () => {
    // 在实际应用中，这里会导航到消息界面
    console.log('Navigate to message screen');
    setShowMenu(false);
  };
  
  // 查看当天所有课程
  const handleViewAllLessons = () => {
    // 在实际应用中，这里会导航到当天课程列表
    console.log('Navigate to lessons on this day');
    setShowMenu(false);
  };
  
  // 添加课程笔记
  const handleAddNotes = () => {
    // 在实际应用中，这里会打开笔记编辑界面
    console.log('Open notes editor');
    setShowMenu(false);
    // 模拟成功添加笔记
    setTimeout(() => {
      showSuccess("Lesson notes have been saved");
    }, 1000);
  };
  
  // 导出日历
  const handleExportCalendar = () => {
    // 在实际应用中，这里会导出到日历
    console.log('Export to calendar');
    setShowMenu(false);
    // 模拟成功导出
    setTimeout(() => {
      showSuccess("Lesson added to your calendar");
    }, 1000);
  };
  
  // 渲染取消对话框
  const renderCancelDialog = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Cancel Lesson</h3>
            <button 
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={closeCancelDialog}
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to cancel this lesson? Canceling could affect your reliability rating.
          </p>
          
          <div className="bg-yellow-50 p-3 rounded-lg mb-4 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              This is a confirmed lesson. The student will be notified of your cancellation.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium"
              onClick={closeCancelDialog}
            >
              Keep Lesson
            </button>
            <button
              className="py-2 px-4 bg-red-600 text-white rounded-lg text-sm font-medium"
              onClick={() => {
                // 在实际应用中，这里会导航到取消原因选择页面
                console.log('Navigate to cancel reason screen');
                setShowCancelDialog(false);
              }}
            >
              Continue to Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染成功消息
  const renderSuccessMessage = () => {
    if (!showSuccessMessage) return null;
    
    return (
      <div className="fixed top-5 inset-x-0 flex justify-center z-50 px-4">
        <div className="bg-white rounded-lg shadow-lg p-3 flex items-center max-w-md">
          <div className="bg-green-100 rounded-full p-1 mr-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <span className="text-sm text-gray-800">{showSuccessMessage}</span>
        </div>
      </div>
    );
  };
  
  // 渲染操作菜单
  const renderMenu = () => {
    if (!showMenu) return null;
    
    return (
      <div className="fixed inset-0 z-50" onClick={closeMenu}>
        <div className="absolute top-12 right-4 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-56 py-1">
            {/* 菜单项 */}
            <button 
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={handleSendMessage}
            >
              <MessageCircle className="h-4 w-4 mr-3 text-gray-500" />
              Message Student
            </button>
            <button 
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={handleViewAllLessons}
            >
              <Calendar className="h-4 w-4 mr-3 text-gray-500" />
              View All Lessons Today
            </button>
            <button 
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={handleAddNotes}
            >
              <FileText className="h-4 w-4 mr-3 text-gray-500" />
              Add Lesson Notes
            </button>
            <button 
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={handleExportCalendar}
            >
              <ExternalLink className="h-4 w-4 mr-3 text-gray-500" />
              Export to Calendar
            </button>
            <div className="border-t border-gray-200 my-1"></div>
            <button 
              className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center"
              onClick={handleCancelClick}
            >
              <X className="h-4 w-4 mr-3 text-red-600" />
              Cancel Lesson
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // 右侧菜单按钮
  const rightMenuButton = (
    <button 
      className="p-1.5 rounded-full hover:bg-gray-100"
      onClick={() => setShowMenu(!showMenu)}
    >
      <MoreVertical className="h-5 w-5 text-gray-700" />
    </button>
  );
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <PageHeader 
        title="Lesson Details" 
        onBack={() => console.log('Navigate back')}
        rightElement={rightMenuButton}
      />
      
      {/* 成功消息提示 */}
      {renderSuccessMessage()}
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto">
        {/* 状态条 */}
        <div className="bg-green-50 px-4 py-3 border-b border-green-100">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <CheckCircle className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-green-800">Confirmed</h2>
              <p className="text-xs text-green-700 mt-0.5">
                This lesson is confirmed and on your schedule
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
                    Confirmed on March 10, 2025
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">2:00 PM - 3:00 PM (60 minutes)</p>
                  <div className="flex items-center mt-1">
                    <div className="bg-green-100 rounded-full h-1.5 w-1.5 mr-1.5"></div>
                    <p className="text-xs text-green-700">
                      Starts in 2 days, 4 hours
                    </p>
                  </div>
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
                <p className="text-xs text-gray-500 mt-0.5">Beginner • First time with you</p>
                
                <div className="flex space-x-2 mt-2">
                  <button className="py-1.5 px-3 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center">
                    <PhoneOutgoing className="h-3.5 w-3.5 mr-1.5" />
                    Call
                  </button>
                  <button className="py-1.5 px-3 bg-purple-600 text-white rounded-lg text-sm font-medium flex items-center">
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
          
          {/* 准备事项 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-3">Preparation Checklist</h2>
            
            <div className="space-y-2.5">
              <div className="flex items-start">
                <div className="flex h-5 items-center mt-0.5">
                  <input
                    id="balls"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                  />
                </div>
                <label htmlFor="balls" className="ml-2 text-sm text-gray-700">
                  Bring tennis balls (new beginner)
                </label>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center mt-0.5">
                  <input
                    id="racket"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                  />
                </div>
                <label htmlFor="racket" className="ml-2 text-sm text-gray-700">
                  Bring spare racket (student has their own but unsure of quality)
                </label>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center mt-0.5">
                  <input
                    id="plan"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                    defaultChecked
                  />
                </div>
                <label htmlFor="plan" className="ml-2 text-sm text-gray-700">
                  Prepare beginner lesson plan
                </label>
              </div>
            </div>
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
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Service fee:</span>
                <span className="text-sm text-red-600">-£6.00</span>
              </div>
              
              <div className="border-t border-gray-200 my-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 font-medium">You'll receive:</span>
                  <span className="text-sm text-green-600 font-medium">£34.00</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Payment will be released 24 hours after lesson completion
                </p>
              </div>
            </div>
          </div>
          
          {/* 取消政策 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-start">
              <Award className="h-5 w-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-800">Cancellation Policy</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Free cancellation up to 24 hours before the lesson. Cancellations within 24 hours 
                  may affect your rating and could incur a cancellation fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 操作按钮 */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <button
            className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium"
            onClick={handleCancelClick}
          >
            Cancel Lesson
          </button>
          <button
            className="flex-1 py-2.5 bg-purple-600 text-white rounded-lg font-medium"
            onClick={handleSendMessage}
          >
            Message
          </button>
        </div>
      </div>
      
      {/* 取消对话框 */}
      {showCancelDialog && renderCancelDialog()}
      
      {/* 操作菜单 */}
      {renderMenu()}
    </div>
  );
};

export default CoachConfirmedLessonDetail; 