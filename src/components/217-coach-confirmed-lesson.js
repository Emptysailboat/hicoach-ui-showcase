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
import StudentInfoCard from './StudentInfoCard';

const CoachConfirmedLessonDetail = () => {
  // 状态管理
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelReasonError, setCancelReasonError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
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
  
  // 处理取消课程
  const handleCancel = () => {
    setShowCancelDialog(true);
  };
  
  // 处理重新安排
  const handleReschedule = () => {
    setShowRescheduleDialog(true);
  };
  
  // 提交取消
  const submitCancel = () => {
    if (!cancelReason.trim()) {
      setCancelReasonError(true);
      return;
    }
    
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setShowCancelDialog(false);
      console.log('Lesson cancelled: ' + cancelReason);
    }, 1000);
  };
  
  // 关闭取消对话框
  const closeCancelDialog = () => {
    if (!isSubmitting) {
      setShowCancelDialog(false);
      setCancelReason('');
      setCancelReasonError(false);
    }
  };
  
  // 关闭重新安排对话框
  const closeRescheduleDialog = () => {
    if (!isSubmitting) {
      setShowRescheduleDialog(false);
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
    console.log('Navigate back');
  };

  // 处理学生资料点击
  const handleStudentClick = (student) => {
    console.log('View student profile', student);
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
              Please provide a reason for cancelling this lesson. This will be shared with the student.
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
  
  // 渲染成功消息
  const renderSuccessMessage = () => {
    if (!showSuccessMessage) return null;
    
    return (
      <div className="fixed top-5 inset-x-0 flex justify-center z-50 px-4">
        <div className="bg-white rounded-lg shadow-lg p-3 flex items-center max-w-md">
          <div className="bg-green-100 rounded-full p-1 mr-3">
            <span className="material-icons text-green-600 text-xl">check_circle</span>
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
      <div className="fixed inset-0 z-50" onClick={() => setShowMenu(false)}>
        <div className="absolute top-12 right-4 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-56 py-1">
            <button 
              className="w-full px-4 py-3 text-left text-sm text-gray-700 flex items-center"
              onClick={handleSendMessage}
            >
              <span className="material-icons text-gray-500 mr-3 text-base">chat</span>
              Message Student
            </button>
            <button 
              className="w-full px-4 py-3 text-left text-sm text-gray-700 flex items-center"
              onClick={handleViewAllLessons}
            >
              <span className="material-icons text-gray-500 mr-3 text-base">calendar_today</span>
              View All Lessons Today
            </button>
            <button 
              className="w-full px-4 py-3 text-left text-sm text-gray-700 flex items-center"
              onClick={handleAddNotes}
            >
              <span className="material-icons text-gray-500 mr-3 text-base">note</span>
              Add Lesson Notes
            </button>
            <button 
              className="w-full px-4 py-3 text-left text-sm text-gray-700 flex items-center"
              onClick={handleExportCalendar}
            >
              <span className="material-icons text-gray-500 mr-3 text-base">event</span>
              Export to Calendar
            </button>
            <div className="border-t border-gray-200 my-1"></div>
            <button 
              className="w-full px-4 py-3 text-left text-sm text-red-600 flex items-center"
              onClick={handleCancel}
            >
              <span className="material-icons text-red-600 mr-3 text-base">close</span>
              Cancel Lesson
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col bg-gray-50 max-w-md mx-auto h-full">
      <PageHeader title="Lesson Details" onBack={handleBack} />
      
      {renderSuccessMessage()}
      
      <div className="flex-1 overflow-auto px-4">
        <div className="py-4 bg-green-50 border-b border-green-200 -mx-4 px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              Confirmed
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="material-icons text-green-700 mr-2 flex-shrink-0">person</span>
              <span className="text-sm text-green-800">
                Coach accepted the lesson request
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="material-icons text-green-700 mr-2 flex-shrink-0">schedule</span>
              <span className="text-sm text-green-800">
                Accepted on March 10, 2025
              </span>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-green-700 mr-2 flex-shrink-0">info</span>
              <div className="text-sm text-green-800">
                <p className="mb-1">This lesson is in 5 days</p>
                <p>If you need to reschedule, please do so at least 24 hours before the lesson. Late rescheduling may affect your coach rating and future bookings.</p>
              </div>
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
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">event</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Date</h3>
                  <p className="text-gray-700">Saturday, March 15, 2025</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">schedule</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Time</h3>
                  <p className="text-gray-700">14:00 - 15:00 BST</p>
                </div>
              </div>
            </div>
            
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
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">people</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Participants</h3>
                  <p className="text-gray-700">1 person</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">payments</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Price</h3>
                  <p className="text-gray-700">£60 / hour</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start">
                <span className="material-icons text-primary-600 mr-3 flex-shrink-0">sports_tennis</span>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Equipment</h3>
                  <p className="text-gray-700">Student will bring their own tennis racket</p>
                </div>
              </div>
            </div>
            
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
        
        <div className="flex space-x-3 mb-6">
          <button 
            className="flex-1 px-4 py-3 border border-red-500 text-red-600 rounded-lg text-center flex items-center justify-center"
            onClick={handleCancel}
            aria-label="Cancel this lesson"
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
        </div>
      </div>
      
      {showCancelDialog && renderCancelDialog()}
      {renderMenu()}
    </div>
  );
};

export default CoachConfirmedLessonDetail; 