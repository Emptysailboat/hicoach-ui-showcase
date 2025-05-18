import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Info
} from 'lucide-react';
import PageHeader from './common/PageHeader';

// 添加自定义CSS动画
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .animate-pulse-once {
    animation: pulse 0.5s ease-out;
  }
`;

const CoachPauseAccountPage = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // 帮助说明的展开/收起状态
  const [showHelp, setShowHelp] = useState(false);
  
  // 模拟当前日期和可选的恢复日期
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  // 模拟一些可选的未来日期，实际应用中可能由后端提供或根据业务逻辑生成
  const futureDates = [
    { value: "1week", label: "1 Week (May 15, 2025)", date: "2025-05-15" },
    { value: "2weeks", label: "2 Weeks (May 22, 2025)", date: "2025-05-22" },
    { value: "1month", label: "1 Month (June 8, 2025)", date: "2025-06-08" },
    { value: "custom", label: "Custom Date", date: "" }
  ];
  
  const handlePauseAccount = () => {
    if (!selectedDate) {
      setToastMessage('Please select a resume date');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return;
    }
    
    setShowConfirmation(true);
  };
  
  const confirmPause = () => {
    setIsPaused(true);
    setShowConfirmation(false);
    setToastMessage('Account paused successfully!');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };
  
  const resumeAccount = () => {
    setIsPaused(false);
    setSelectedDate("");
    setToastMessage('Account resumed');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };
  
  const handleDateSelect = (value) => {
    const selectedOption = futureDates.find(date => date.value === value);
    setSelectedDate(selectedOption ? selectedOption.date : "");
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden relative">
      {/* 添加自定义样式 */}
      <style>{customStyles}</style>
      
      {/* Toast 通知 */}
      {showToast && (
        <div className="fixed top-20 left-0 right-0 mx-auto w-4/5 bg-gray-800 text-white py-2.5 px-4 rounded-lg z-50 flex items-center justify-center shadow-lg animate-fade-in" style={{ maxWidth: "320px" }}>
          <CheckCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}
      
      {/* 确认对话框 */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-5 max-w-sm w-full animate-fade-in">
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center">Confirm Account Pause</h3>
            </div>
            
            <p className="text-gray-600 mb-5 text-center">
              Your account will be paused immediately. You won't receive any new booking requests until {selectedDate}.
            </p>
            
            <div className="flex flex-col space-y-3">
              <button onClick={confirmPause} className="w-full py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 active:bg-green-800 transition-colors">
                Confirm Pause
              </button>
              <button onClick={() => setShowConfirmation(false)} className="w-full py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 顶部标题栏 */}
      <PageHeader 
        title="Pause Account" 
        onBack={() => console.log('Navigate back')}
      />
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto pb-16 pt-4 scroll-smooth">
        {/* 如果账户已暂停，显示当前状态 */}
        {isPaused ? (
          <div className="px-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-5 hover:shadow transition-shadow duration-200">
              <div className="flex flex-col items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                  <Clock className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Account Paused</h2>
                <p className="text-gray-600 text-center">Your account is currently paused and will automatically resume on:</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center mb-5 border border-gray-200">
                <Calendar className="w-5 h-5 text-green-600 mb-1" />
                <span className="font-semibold text-lg text-gray-800">{selectedDate}</span>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 mb-5 flex items-start">
                <Info className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">What This Means</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• You won't receive any new booking requests</li>
                    <li>• Your profile will be marked as unavailable</li>
                    <li>• Existing bookings will not be affected</li>
                  </ul>
                </div>
              </div>
              
              <button onClick={resumeAccount} className="w-full py-3 rounded-lg flex items-center justify-center font-medium border border-green-600 text-green-600 hover:bg-green-50 active:bg-green-100 transition-colors">
                Resume Now
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* 提示文本 */}
            <div className="px-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Pause Your Availability</h2>
              <p className="text-gray-600">Temporarily stop receiving new booking requests until you're ready to coach again.</p>
            </div>
            
            {/* 警告提示卡片 - 已修改为紫色 */}
            <div className="px-4 mb-6">
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex">
                <AlertCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Important Information</h3>
                  <p className="text-sm text-gray-600">Existing bookings will not be affected. Students who have already booked lessons will still be able to attend.</p>
                </div>
              </div>
            </div>
            
            {/* 选项卡片 */}
            <div className="px-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-4 hover:shadow transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Resume Date</h3>
                </div>
                
                <p className="text-gray-600 mb-4">Select when you want to automatically resume accepting bookings:</p>
                
                {/* 日期选择 */}
                <div className="space-y-3 mb-5">
                  {futureDates.map((date) => (
                    <div 
                      key={date.value}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedDate === date.date 
                          ? 'border-green-600 bg-green-50' 
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => handleDateSelect(date.value)}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        selectedDate === date.date 
                          ? 'border-green-600 bg-green-600' 
                          : 'border-gray-400'
                      }`}>
                        {selectedDate === date.date && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className={`font-medium ${
                        selectedDate === date.date 
                          ? 'text-gray-800' 
                          : 'text-gray-700'
                      }`}>{date.label}</span>
                    </div>
                  ))}
                </div>
                
                {/* 暂停按钮 */}
                <button 
                  onClick={handlePauseAccount}
                  className="w-full py-3 rounded-lg flex items-center justify-center font-medium bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-colors"
                >
                  Pause Account
                </button>
              </div>
            </div>
            
            {/* 帮助信息展开/折叠区域 */}
            <div className="px-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow transition-shadow duration-200">
                <button 
                  className="w-full p-4 flex items-center justify-between"
                  onClick={() => setShowHelp(!showHelp)}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                      <Info className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">What to know</h3>
                  </div>
                  <div className={`transform transition-transform ${showHelp ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </button>
                
                {showHelp && (
                  <div className="p-4 pt-6 border-t border-gray-200 animate-fade-in">
                    <div className="space-y-4 text-gray-600">
                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                          <span className="text-xs font-semibold">1</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">When you pause your account, your profile will be marked as unavailable and you won't receive any new booking requests.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                          <span className="text-xs font-semibold">2</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">Existing bookings will not be affected. Students who have already booked lessons will still be able to attend.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                          <span className="text-xs font-semibold">3</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">You can resume accepting bookings at any time, even before your selected resume date.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                          <span className="text-xs font-semibold">4</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">If you need to cancel any existing bookings, please do so from the Bookings page.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoachPauseAccountPage; 