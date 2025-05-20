import React, { useState } from 'react';
import PageHeader from './common/PageHeader';
import StudentInfoCard from './common/StudentInfoCard';

const CoachPendingLessonDetail = () => {
  // 状态管理
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelReasonError, setCancelReasonError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  // 处理发送消息
  const handleSendMessage = (student) => {
    // 在实际应用中，这里会导航到消息界面
    console.log('Navigate to message screen with student:', student);
  };
  
  // 处理确认课程
  const handleConfirm = () => {
    setShowConfirmDialog(true);
  };
  
  // 处理重新安排
  const handleReschedule = () => {
    setShowRescheduleDialog(true);
  };
  
  // 处理取消课程
  const handleCancel = () => {
    setShowCancelDialog(true);
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
  
  // 提交取消
  const submitCancel = () => {
    // 验证是否填写取消原因
    if (!cancelReason.trim()) {
      setCancelReasonError(true);
      return;
    }
    
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setShowCancelDialog(false);
      // 在实际应用中，这里可能会导航到取消状态页面或刷新当前页面
      console.log('Lesson cancelled: ' + cancelReason);
    }, 1000);
  };
  
  // 关闭确认对话框
  const closeConfirmDialog = () => {
    if (!isSubmitting) {
      setShowConfirmDialog(false);
    }
  };
  
  // 关闭重新安排对话框
  const closeRescheduleDialog = () => {
    if (!isSubmitting) {
      setShowRescheduleDialog(false);
    }
  };
  
  // 关闭取消对话框
  const closeCancelDialog = () => {
    if (!isSubmitting) {
      setShowCancelDialog(false);
      setCancelReason('');
      setCancelReasonError(false);
    }
  };
  
  // 处理取消原因输入
  const handleReasonChange = (e) => {
    setCancelReason(e.target.value);
    if (e.target.value.trim()) {
      setCancelReasonError(false);
    }
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };

  // 处理学生资料点击
  const handleStudentClick = (student) => {
    console.log('View student profile', student);
  };
  
  // 渲染确认对话框
  const renderConfirmDialog = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="mb-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="material-icons text-green-600 text-2xl">check_circle</span>
            </div>
            <h3 id="confirm-dialog-title" className="text-lg font-semibold text-gray-800 mb-2 text-center">Confirm Lesson</h3>
            <p className="text-sm text-gray-600 text-center">
              Are you sure you want to confirm this lesson with Alex for Saturday, March 15, 2025?
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              className="w-full py-3 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center"
              onClick={submitConfirmation}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : "Confirm Lesson"}
            </button>
            
            <button
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
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
  
  // 渲染取消对话框
  const renderCancelDialog = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="cancel-dialog-title">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <span className="material-icons text-red-600 text-xl">close</span>
                </div>
                <h3 id="cancel-dialog-title" className="text-lg font-semibold text-gray-800">Cancel Lesson</h3>
              </div>
              <button 
                className="p-2 rounded-full bg-gray-100"
                onClick={closeCancelDialog}
                disabled={isSubmitting}
                aria-label="Close dialog"
              >
                <span className="material-icons text-gray-500">close</span>
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Please provide a reason for cancelling this lesson request. This will be shared with the student.
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cancel-reason">
              Reason for cancelling <span className="text-red-500">*</span>
            </label>
            <textarea
              id="cancel-reason"
              value={cancelReason}
              onChange={handleReasonChange}
              className={`w-full p-3 border ${cancelReasonError ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm`}
              placeholder="I'm sorry, but I need to cancel this lesson because..."
              rows={4}
              disabled={isSubmitting}
              aria-invalid={cancelReasonError}
              aria-required="true"
            ></textarea>
            {cancelReasonError && (
              <p className="mt-2 text-xs text-red-600" role="alert">Please provide a reason for cancelling</p>
            )}
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              className="w-full py-3 bg-red-600 text-white rounded-lg font-medium flex items-center justify-center"
              onClick={submitCancel}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : "Cancel Lesson"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col bg-gray-50 max-w-md mx-auto h-full">
      {/* 顶部导航栏 */}
      <PageHeader title="Lesson Details" onBack={handleBack} />
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto px-4">
        {/* 状态标签和提示 */}
        <div className="py-4 bg-yellow-50 border-b border-yellow-200 -mx-4 px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
              Pending
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="material-icons text-yellow-700 mr-2 flex-shrink-0">person</span>
              <span className="text-sm text-yellow-800">
                Student requested a lesson
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="material-icons text-yellow-700 mr-2 flex-shrink-0">schedule</span>
              <span className="text-sm text-yellow-800">
                Requested on March 10, 2025
              </span>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-yellow-700 mr-2 flex-shrink-0">warning</span>
              <span className="text-sm text-yellow-800">
                Please respond within 24 hours to confirm or reschedule this lesson request.
              </span>
            </div>
          </div>
        </div>
        
        {/* 学生信息 */}
        <section className="mb-6" aria-labelledby="student-heading">
          <h2 id="student-heading" className="text-lg font-semibold mb-4 text-gray-800">Student</h2>
          <StudentInfoCard 
            student={studentData}
            showLocation={true}
            showQualifications={false}
            onMessage={handleSendMessage}
          />
        </section>
        
        {/* 课程信息 */}
        <section className="mb-6" aria-labelledby="lesson-info-heading">
          <h2 id="lesson-info-heading" className="text-lg font-semibold mb-4 text-gray-800">Lesson Information</h2>
          <div className="bg-white rounded-lg shadow-sm">
            {/* 日期 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">event</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Date</h3>
                  <p className="text-gray-700">Saturday, March 15, 2025</p>
                </div>
              </div>
            </div>
            
            {/* 时间 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">schedule</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Time</h3>
                  <p className="text-gray-700">14:00 - 15:00 BST</p>
                </div>
              </div>
            </div>
            
            {/* 地点 */}
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
            
            {/* 上课人数 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">people</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Participants</h3>
                  <p className="text-gray-700">1 person</p>
                </div>
              </div>
            </div>
            
            {/* 费用 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">payments</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Price</h3>
                  <p className="text-gray-700">£60 / hour</p>
                </div>
              </div>
            </div>
            
            {/* 设备 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">sports_tennis</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Equipment</h3>
                  <p className="text-gray-700">Student will bring their own tennis racket</p>
                </div>
              </div>
            </div>
            
            {/* 课程内容 */}
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
        
        {/* 底部按钮 */}
        <div className="flex space-x-3 mb-6">
          <button 
            className="flex-1 px-4 py-3 border border-red-500 text-red-600 rounded-lg text-center flex items-center justify-center"
            onClick={handleCancel}
            aria-label="Cancel this lesson request"
          >
            Cancel
          </button>
          
          <button 
            className="flex-1 px-4 py-3 border border-yellow-500 text-yellow-600 rounded-lg text-center flex items-center justify-center"
            onClick={handleReschedule}
            aria-label="Reschedule this lesson"
          >
            Reschedule
          </button>
          
          <button 
            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium text-center flex items-center justify-center"
            onClick={handleConfirm}
            aria-label="Confirm this lesson"
          >
            Confirm
          </button>
        </div>
      </div>
      
      {/* 确认对话框 */}
      {showConfirmDialog && renderConfirmDialog()}
      
      {/* 取消对话框 */}
      {showCancelDialog && renderCancelDialog()}
    </div>
  );
};

export default CoachPendingLessonDetail; 