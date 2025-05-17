import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  MessageCircle, 
  PhoneOutgoing,
  CheckCircle,
  X,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

const CoachPendingLessonDetail = () => {
  // 状态管理
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [declineReasonError, setDeclineReasonError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 处理确认课程
  const handleConfirm = () => {
    setShowConfirmDialog(true);
  };
  
  // 处理拒绝课程
  const handleDecline = () => {
    setShowDeclineDialog(true);
  };
  
  // 提交确认
  const submitConfirmation = () => {
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmDialog(false);
      // 在实际应用中，这里可能会导航到确认状态页面或刷新当前页面
      console.log('Lesson confirmed');
    }, 1000);
  };
  
  // 提交拒绝
  const submitDecline = () => {
    // 验证是否填写拒绝原因
    if (!declineReason.trim()) {
      setDeclineReasonError(true);
      return;
    }
    
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setShowDeclineDialog(false);
      // 在实际应用中，这里可能会导航到拒绝状态页面或刷新当前页面
      console.log('Lesson declined: ' + declineReason);
    }, 1000);
  };
  
  // 关闭确认对话框
  const closeConfirmDialog = () => {
    if (!isSubmitting) {
      setShowConfirmDialog(false);
    }
  };
  
  // 关闭拒绝对话框
  const closeDeclineDialog = () => {
    if (!isSubmitting) {
      setShowDeclineDialog(false);
      setDeclineReason('');
      setDeclineReasonError(false);
    }
  };
  
  // 处理拒绝原因输入
  const handleReasonChange = (e) => {
    setDeclineReason(e.target.value);
    if (e.target.value.trim()) {
      setDeclineReasonError(false);
    }
  };
  
  // 渲染确认对话框
  const renderConfirmDialog = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-4">
          <div className="mb-4 flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">Confirm Lesson</h3>
            <p className="text-sm text-gray-600 text-center">
              Are you sure you want to confirm this lesson with Alex for Saturday, March 15, 2025?
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              className="w-full py-2.5 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center"
              onClick={submitConfirmation}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : "Confirm Lesson"}
            </button>
            
            <button
              className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium"
              onClick={closeConfirmDialog}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染拒绝对话框
  const renderDeclineDialog = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  <X className="h-4 w-4 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Decline Lesson</h3>
              </div>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={closeDeclineDialog}
                disabled={isSubmitting}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Please provide a reason for declining this lesson request. This will be shared with the student.
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for declining <span className="text-red-500">*</span>
            </label>
            <textarea
              value={declineReason}
              onChange={handleReasonChange}
              className={`w-full p-3 border ${declineReasonError ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent`}
              placeholder="I'm sorry, but I'm not available at this time..."
              rows={4}
              disabled={isSubmitting}
            ></textarea>
            {declineReasonError && (
              <p className="mt-1 text-xs text-red-600">Please provide a reason for declining</p>
            )}
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              className="w-full py-2.5 bg-red-600 text-white rounded-lg font-medium flex items-center justify-center"
              onClick={submitDecline}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : "Decline Lesson"}
            </button>
          </div>
        </div>
      </div>
    );
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
        <div className="bg-yellow-50 px-4 py-3 border-b border-yellow-100">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
              <Clock className="h-4 w-4 text-yellow-700" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-yellow-800">Pending Confirmation</h2>
              <p className="text-xs text-yellow-700 mt-0.5">
                Please confirm or decline this lesson request
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
                    Booking made on March 10, 2025
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">2:00 PM - 3:00 PM (60 minutes)</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Please arrive 5-10 minutes early
                  </p>
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
              </div>
            </div>
          </div>
          
          {/* 提醒信息 */}
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                This request expires in 24 hours. Please respond to maintain a good response rate.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 操作按钮 */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <button
            className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium"
            onClick={handleDecline}
          >
            Decline
          </button>
          <button
            className="flex-1 py-2.5 bg-green-600 text-white rounded-lg font-medium"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
      
      {/* 确认对话框 */}
      {showConfirmDialog && renderConfirmDialog()}
      
      {/* 拒绝对话框 */}
      {showDeclineDialog && renderDeclineDialog()}
    </div>
  );
};

export default CoachPendingLessonDetail; 