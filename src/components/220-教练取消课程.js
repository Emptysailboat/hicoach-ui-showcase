import React, { useState } from 'react';
import { ChevronLeft, CheckCircle, X, AlertTriangle } from 'lucide-react';

const CoachCancelLesson = () => {
  // 取消原因选项
  const cancelReasons = [
    {
      id: 'schedule_conflict',
      label: 'Schedule Conflict',
      description: 'I have another commitment at this time.'
    },
    {
      id: 'illness',
      label: 'Illness or Injury',
      description: 'I am unwell or injured and cannot coach effectively.'
    },
    {
      id: 'transportation',
      label: 'Transportation Issues',
      description: 'I am unable to reach the lesson location.'
    },
    {
      id: 'weather',
      label: 'Unsuitable Weather',
      description: 'Weather conditions make it unsafe or impractical to play.'
    },
    {
      id: 'personal_emergency',
      label: 'Personal Emergency',
      description: 'I have an unexpected personal matter to attend to.'
    },
    {
      id: 'other',
      label: 'Other Reason',
      description: 'Please provide details in the additional comments.'
    }
  ];
  
  // 状态管理
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // 处理选择原因
  const handleReasonSelect = (reasonId) => {
    setSelectedReason(reasonId);
    setError('');
  };
  
  // 处理评论输入
  const handleCommentsChange = (e) => {
    setAdditionalComments(e.target.value);
  };
  
  // 处理继续按钮点击
  const handleContinue = () => {
    if (!selectedReason) {
      setError('Please select a reason for cancellation');
      return;
    }
    
    if (selectedReason === 'other' && !additionalComments.trim()) {
      setError('Please provide additional details for your cancellation reason');
      return;
    }
    
    setShowConfirm(true);
  };
  
  // 关闭确认对话框
  const closeConfirmDialog = () => {
    setShowConfirm(false);
  };
  
  // 提交取消请求
  const submitCancellation = () => {
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirm(false);
      setShowSuccess(true);
      
      // 在实际应用中，这里可能会导航回课程列表页面
      setTimeout(() => {
        console.log('Navigate back to lessons');
      }, 2000);
    }, 1000);
  };
  
  // 渲染确认对话框
  const renderConfirmDialog = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-4">
          <div className="mb-4 flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">Confirm Cancellation</h3>
            <p className="text-sm text-gray-600 text-center">
              Are you sure you want to cancel your lesson with Alex on Saturday, March 15, 2025?
            </p>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg mb-4 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              This action cannot be undone. Your student will be notified of the cancellation.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              className="w-full py-2.5 bg-red-600 text-white rounded-lg font-medium flex items-center justify-center"
              onClick={submitCancellation}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : "Cancel Lesson"}
            </button>
            
            <button
              className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium"
              onClick={closeConfirmDialog}
              disabled={isSubmitting}
            >
              Keep Lesson
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染成功消息
  const renderSuccessMessage = () => {
    return (
      <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <X className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Lesson Cancelled</h2>
          <p className="text-gray-600 text-center mb-6">
            Your lesson with Alex has been cancelled. The student has been notified.
          </p>
        </div>
      </div>
    );
  };
  
  // 如果已成功取消，显示成功页面
  if (showSuccess) {
    return renderSuccessMessage();
  }
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-gray-800">Cancel Lesson</h1>
        </div>
        <div className="w-6"></div> {/* 平衡左侧图标 */}
      </div>
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-base font-medium text-gray-800 mb-1">Lesson Details</h2>
          <p className="text-sm text-gray-500 mb-3">
            Tennis lesson with Alex Thompson
          </p>
          
          <div className="flex items-center py-2 border-t border-gray-100">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Saturday, March 15, 2025</p>
              <p className="text-xs text-gray-500">2:00 PM - 3:00 PM (60 minutes)</p>
            </div>
            <div className="bg-yellow-100 py-1 px-2 rounded text-xs font-medium text-yellow-800">
              In 2 days
            </div>
          </div>
        </div>
        
        {/* 取消政策 */}
        <div className="bg-yellow-50 p-3 rounded-lg mb-4 border border-yellow-100">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-800 mt-0.5 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Cancellation Policy</h3>
              <p className="text-xs text-yellow-700 mt-1">
                Cancellations within 24 hours of the lesson start time may affect your coach reliability rating and could result in a cancellation fee.
              </p>
            </div>
          </div>
        </div>
        
        {/* 取消原因 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-base font-medium text-gray-800 mb-3">
            Reason for Cancellation <span className="text-red-500">*</span>
          </h2>
          
          <div className="space-y-2">
            {cancelReasons.map(reason => (
              <label 
                key={reason.id}
                className={`block p-3 border rounded-lg cursor-pointer ${
                  selectedReason === reason.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="radio"
                      name="cancelReason"
                      value={reason.id}
                      checked={selectedReason === reason.id}
                      onChange={() => handleReasonSelect(reason.id)}
                      className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                  </div>
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-800">
                      {reason.label}
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5">
                      {reason.description}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
          
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
        
        {/* 附加说明 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-medium text-gray-800">
              Additional Comments
              {selectedReason === 'other' && <span className="text-red-500"> *</span>}
            </h2>
            <span className="text-xs text-gray-500">
              {additionalComments.length}/200
            </span>
          </div>
          
          <textarea
            value={additionalComments}
            onChange={handleCommentsChange}
            placeholder="Provide any additional details about your cancellation..."
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
            maxLength={200}
          ></textarea>
          
          <p className="text-xs text-gray-500 mt-2">
            This information will be shared with the student.
          </p>
        </div>
      </div>
      
      {/* 底部按钮 */}
      <div className="bg-white border-t border-gray-200 p-4">
        <button
          className="w-full py-2.5 bg-red-600 text-white rounded-lg font-medium"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
      
      {/* 确认对话框 */}
      {showConfirm && renderConfirmDialog()}
    </div>
  );
};

export default CoachCancelLesson; 