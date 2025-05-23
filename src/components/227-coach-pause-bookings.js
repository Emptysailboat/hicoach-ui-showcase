import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

const CoachPauseAccountPage = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // 自定义日期输入字段
  const [customDay, setCustomDay] = useState("");
  const [customMonth, setCustomMonth] = useState("");
  const [customYear, setCustomYear] = useState("");
  
  // 帮助说明的展开/收起状态
  const [showHelp, setShowHelp] = useState(false);
  
  // 模拟当前日期和可选的恢复日期
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  // 计算明天的日期，作为日期选择器的最小值
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toISOString().split('T')[0];
  
  // 月份选项
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];
  
  // 模拟一些可选的未来日期，实际应用中可能由后端提供或根据业务逻辑生成
  const futureDates = [
    { value: "1week", label: "1 Week (May 15, 2025)", date: "2025-05-15" },
    { value: "2weeks", label: "2 Weeks (May 22, 2025)", date: "2025-05-22" },
    { value: "1month", label: "1 Month (June 8, 2025)", date: "2025-06-08" },
    { value: "custom", label: "Custom Date", date: "" }
  ];
  
  // 格式化日期为更友好的显示格式 (DD Month YYYY)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      timeZone: 'UTC' // 避免时区问题
    };
    
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  
  // 验证和构建自定义日期
  const validateAndBuildCustomDate = () => {
    if (!customDay || !customMonth || !customYear) return false;
    
    // 验证年份、月份、日期
    const year = parseInt(customYear);
    const month = parseInt(customMonth);
    const day = parseInt(customDay);
    
    if (year < today.getFullYear() || year > 2100) return false;
    if (month < 1 || month > 12) return false;
    
    // 检查日期是否有效
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > lastDayOfMonth) return false;
    
    // 确保日期在明天之后
    const selectedDate = new Date(year, month - 1, day);
    if (selectedDate <= tomorrow) return false;
    
    // 构建ISO格式日期
    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setCustomDate(dateString);
    return true;
  };
  
  // 当自定义日期输入改变时更新
  const updateCustomDate = () => {
    if (validateAndBuildCustomDate()) {
      // 成功创建有效日期
      setToastMessage('Custom date selected');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };
  
  const handlePauseAccount = () => {
    const dateToUse = selectedDate === "custom" ? customDate : selectedDate;
    
    if (!dateToUse) {
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
    const finalDate = selectedDate === "custom" ? customDate : selectedDate;
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
    setCustomDate("");
    setCustomDay("");
    setCustomMonth("");
    setCustomYear("");
    setShowDatePicker(false);
    setToastMessage('Account resumed');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };
  
  const handleDateSelect = (value) => {
    if (value === "custom") {
      setSelectedDate("custom");
      setShowDatePicker(true);
    } else {
      const selectedOption = futureDates.find(date => date.value === value);
      setSelectedDate(selectedOption ? selectedOption.date : "");
      setShowDatePicker(false);
      setCustomDate("");
      setCustomDay("");
      setCustomMonth("");
      setCustomYear("");
    }
  };
  
  const clearCustomDate = () => {
    setCustomDate("");
    setCustomDay("");
    setCustomMonth("");
    setCustomYear("");
    setShowToast(true);
    setToastMessage('Custom date cleared');
    setTimeout(() => setShowToast(false), 2000);
  };
  
  // 确定显示的日期文本
  const displayDate = selectedDate === "custom" ? customDate : selectedDate;
  // 格式化后的友好日期显示
  const formattedDisplayDate = formatDateForDisplay(displayDate);
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden relative">
      {/* Toast 通知 */}
      {showToast && (
        <div className="fixed top-20 left-0 right-0 mx-auto w-4/5 bg-gray-800 text-white py-2.5 px-4 rounded-lg z-50 flex items-center justify-center shadow-lg" style={{ maxWidth: "320px" }}>
          <span className="material-icons text-sm mr-2">check_circle</span>
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}
      
      {/* 确认对话框 */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-5 max-w-sm w-full">
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-3">
                <span className="material-icons">warning</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center">Confirm Account Pause</h3>
            </div>
            
            <p className="text-gray-600 mb-5 text-center">
              Your account will be paused immediately. You won't receive any new booking requests until <span className="font-medium text-gray-800">{formattedDisplayDate}</span>.
            </p>
            
            <div className="flex flex-col space-y-3">
              <button onClick={confirmPause} className="w-full py-3 rounded-lg bg-green-600 text-white font-medium">
                Confirm Pause
              </button>
              <button onClick={() => setShowConfirmation(false)} className="w-full py-3 rounded-lg bg-gray-100 text-gray-700 font-medium">
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
      <div className="flex-1 overflow-y-auto pb-16 pt-4">
        {/* 如果账户已暂停，显示当前状态 */}
        {isPaused ? (
          <div className="px-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-5">
              <div className="flex flex-col items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                  <span className="material-icons">schedule</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Account Paused</h2>
                <p className="text-gray-600 text-center">Your account is currently paused and will automatically resume on:</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center mb-5 border border-gray-200">
                <span className="material-icons text-green-600 mb-1">event</span>
                <span className="font-semibold text-lg text-gray-800">{formattedDisplayDate}</span>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 mb-5 flex items-start">
                <span className="material-icons text-yellow-600 mr-2 flex-shrink-0 mt-0.5">info</span>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">What This Means</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• You won't receive any new booking requests</li>
                    <li>• Your profile will be marked as unavailable</li>
                    <li>• Existing bookings will not be affected</li>
                  </ul>
                </div>
              </div>
              
              <button onClick={resumeAccount} className="w-full py-3 rounded-lg flex items-center justify-center font-medium border border-green-600 text-green-600">
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
                <span className="material-icons text-purple-600 mr-3 flex-shrink-0 mt-0.5">warning</span>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Important Information</h3>
                  <p className="text-sm text-gray-600">Existing bookings will not be affected. Students who have already booked lessons will still be able to attend.</p>
                </div>
              </div>
            </div>
            
            {/* 选项卡片 */}
            <div className="px-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <span className="material-icons">event</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Resume Date</h3>
                </div>
                
                <p className="text-gray-600 mb-4">Select when you want to automatically resume accepting bookings:</p>
                
                {/* 日期选择 */}
                <div className="space-y-3 mb-5">
                  {futureDates.map((date) => (
                    <div 
                      key={date.value}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                        (selectedDate === date.date || (date.value === "custom" && selectedDate === "custom"))
                          ? 'border-green-600 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      onClick={() => handleDateSelect(date.value)}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        (selectedDate === date.date || (date.value === "custom" && selectedDate === "custom"))
                          ? 'border-green-600 bg-green-600' 
                          : 'border-gray-400'
                      }`}>
                        {(selectedDate === date.date || (date.value === "custom" && selectedDate === "custom")) && (
                          <span className="material-icons text-white text-xs">check</span>
                        )}
                      </div>
                      <span className={`font-medium ${
                        (selectedDate === date.date || (date.value === "custom" && selectedDate === "custom"))
                          ? 'text-gray-800' 
                          : 'text-gray-700'
                      }`}>{date.label}</span>
                    </div>
                  ))}
                </div>
                
                {/* 自定义日期选择器 - 使用下拉菜单和输入框代替原生日期选择器 */}
                {showDatePicker && (
                  <div className="mb-5 bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Select a custom resume date:
                      </label>
                      {(customDay || customMonth || customYear) && (
                        <button 
                          onClick={clearCustomDate}
                          className="text-sm text-gray-500 flex items-center"
                        >
                          <span className="material-icons text-xs mr-1">close</span>
                          Clear
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {/* 日期输入 */}
                      <div className="w-20">
                        <label className="block text-xs text-gray-500 mb-1">Day</label>
                        <input 
                          type="number" 
                          min="1" 
                          max="31" 
                          placeholder="DD"
                          value={customDay}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 31)) {
                              setCustomDay(value);
                              setTimeout(updateCustomDate, 100);
                            }
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md text-center"
                        />
                      </div>
                      
                      {/* 月份选择 */}
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Month</label>
                        <select 
                          value={customMonth}
                          onChange={(e) => {
                            setCustomMonth(e.target.value);
                            setTimeout(updateCustomDate, 100);
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select month</option>
                          {months.map(month => (
                            <option key={month.value} value={month.value}>{month.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* 年份输入 */}
                      <div className="w-24">
                        <label className="block text-xs text-gray-500 mb-1">Year</label>
                        <input 
                          type="number" 
                          min={today.getFullYear()} 
                          max="2100" 
                          placeholder="YYYY"
                          value={customYear}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || (parseInt(value) >= today.getFullYear() && parseInt(value) <= 2100)) {
                              setCustomYear(value);
                              setTimeout(updateCustomDate, 100);
                            }
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md text-center"
                        />
                      </div>
                    </div>
                    
                    {customDate && (
                      <div className="mt-3 text-sm text-green-600 flex items-center bg-white p-2 rounded-md border border-green-100">
                        <span className="material-icons text-xs mr-1">check_circle</span>
                        Selected date: {formatDateForDisplay(customDate)}
                      </div>
                    )}
                  </div>
                )}
                
                {/* 暂停按钮 */}
                <button 
                  onClick={handlePauseAccount}
                  className={`w-full py-3 rounded-lg flex items-center justify-center font-medium ${
                    (selectedDate && selectedDate !== "custom") || (selectedDate === "custom" && customDate)
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!((selectedDate && selectedDate !== "custom") || (selectedDate === "custom" && customDate))}
                >
                  {(selectedDate && selectedDate !== "custom") || (selectedDate === "custom" && customDate) 
                    ? 'Pause Account' 
                    : 'Select a Date First'}
                </button>
              </div>
            </div>
            
            {/* 帮助信息展开/折叠区域 */}
            <div className="px-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <button 
                  className="w-full p-4 flex items-center justify-between"
                  onClick={() => setShowHelp(!showHelp)}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                      <span className="material-icons">info</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">What to know</h3>
                  </div>
                  <div>
                    <span className="material-icons">
                      {showHelp ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                    </span>
                  </div>
                </button>
                
                {showHelp && (
                  <div className="p-4 pt-6 border-t border-gray-200">
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