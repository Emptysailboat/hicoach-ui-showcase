import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

const StudentCancelLesson = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // 取消原因列表
  const cancelReasons = [
    { id: 'schedule', text: 'Schedule conflict' },
    { id: 'emergency', text: 'Personal emergency' },
    { id: 'weather', text: 'Weather conditions' },
    { id: 'venue', text: 'Issue with venue/location' },
    { id: 'other', text: 'Other reason' }
  ];
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  // 处理取消原因选择
  const handleReasonSelect = (reasonId) => {
    setSelectedReason(reasonId);
    if (reasonId !== 'other') {
      setOtherReason('');
    }
  };
  
  // 处理提交
  const handleSubmit = () => {
    // 在实际应用中这里会发送取消请求到服务器
    setShowSuccess(true);
    
    // 模拟成功后自动返回
    setTimeout(() => {
      // 这里可以导航回课程列表页或上一页
      console.log('Navigate back');
    }, 2000);
  };
  
  // 检查是否可以提交
  const canSubmit = selectedReason && (selectedReason !== 'other' || otherReason.trim() !== '');
  
  if (showSuccess) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
        {/* 顶部导航栏 */}
        <PageHeader title="Cancel Lesson" onBack={handleBack} />
        
        {/* 成功提示 */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-green-600">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lesson Cancelled</h2>
          <p className="text-gray-600 text-center">
            Your lesson has been cancelled successfully. The coach has been notified.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <PageHeader title="Cancel Lesson" onBack={handleBack} />
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-800 mb-2">Tennis Lesson with Sarah</h2>
            <p className="text-sm text-gray-600">Saturday, March 15, 2025 • 14:00 - 15:00</p>
          </div>
          
          <div className="py-2 px-3 bg-red-50 border border-red-100 rounded-lg mb-4">
            <p className="text-sm text-red-700">
              Please note: Canceling a confirmed lesson less than 24 hours before might incur a cancellation fee.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-base font-medium text-gray-800 mb-3">What's your reason for canceling?</h3>
          
          <div className="space-y-2 mb-4">
            {cancelReasons.map((reason) => (
              <div 
                key={reason.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedReason === reason.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleReasonSelect(reason.id)}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
                    selectedReason === reason.id 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedReason === reason.id && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{reason.text}</span>
                </div>
              </div>
            ))}
          </div>
          
          {selectedReason === 'other' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Please specify:</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm"
                rows={3}
                placeholder="Enter your reason for canceling..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              ></textarea>
            </div>
          )}
          
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-4">
              This reason will be shared with the coach. Please be respectful.
            </p>
            
            <div className="flex space-x-3">
              <button
                className="flex-1 py-2.5 bg-green-600 text-white font-medium rounded-lg"
                onClick={() => {
                  // 返回上一页
                  console.log('Navigate back');
                }}
              >
                Keep Lesson
              </button>
              <button
                className={`flex-1 py-2.5 font-medium rounded-lg ${
                  canSubmit 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!canSubmit}
                onClick={handleSubmit}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCancelLesson; 