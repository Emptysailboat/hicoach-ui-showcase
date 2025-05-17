import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, ChevronLeft, ChevronRight, Plus, X, Check, AlertTriangle } from 'lucide-react';

const CoachAvailabilityEntryPage = () => {
  // 模拟当前日期和周数据
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(today));
  
  // 可用时间段数据
  const [availabilitySlots, setAvailabilitySlots] = useState([
    { id: 1, day: 0, startTime: '09:00', endTime: '12:00' },
    { id: 2, day: 0, startTime: '14:00', endTime: '18:00' },
    { id: 3, day: 2, startTime: '08:00', endTime: '12:00' },
    { id: 4, day: 2, startTime: '13:00', endTime: '17:00' },
    { id: 5, day: 4, startTime: '10:00', endTime: '14:00' },
    { id: 6, day: 5, startTime: '09:00', endTime: '15:00' }
  ]);
  
  // 新时间段状态
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day: 0,
    startTime: '09:00',
    endTime: '10:00'
  });
  const [slotError, setSlotError] = useState(null);
  
  // 保存状态
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // 获取一周的开始日期（周一）
  function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 调整周日
    return new Date(d.setDate(diff));
  }
  
  // 获取一周的日期数组
  function getWeekDates(startDate) {
    const dates = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  }
  
  // 格式化日期显示
  function formatDate(date) {
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(date);
  }
  
  // 获取星期几名称
  function getDayName(date) {
    return new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(date);
  }
  
  // 检查日期是否是今天
  function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }
  
  // 切换到上一周
  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeekStart(prevWeek);
  };
  
  // 切换到下一周
  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeekStart(nextWeek);
  };
  
  // 切换到当前周
  const goToCurrentWeek = () => {
    setCurrentWeekStart(getWeekStart(new Date()));
  };
  
  // 处理新时间段的变更
  const handleNewSlotChange = (field, value) => {
    setNewSlot({
      ...newSlot,
      [field]: value
    });
    setSlotError(null);
  };
  
  // 添加新的时间段
  const addTimeSlot = () => {
    // 验证开始时间必须早于结束时间
    const start = newSlot.startTime.split(':').map(Number);
    const end = newSlot.endTime.split(':').map(Number);
    
    if (start[0] > end[0] || (start[0] === end[0] && start[1] >= end[1])) {
      setSlotError('End time must be after start time');
      return;
    }
    
    // 验证与现有时间段不重叠（同一天）
    const overlapping = availabilitySlots.some(slot => {
      if (slot.day !== newSlot.day) return false;
      
      const slotStart = slot.startTime.split(':').map(Number);
      const slotEnd = slot.endTime.split(':').map(Number);
      
      // 检查重叠情况
      if (
        (start[0] < slotEnd[0] || (start[0] === slotEnd[0] && start[1] <= slotEnd[1])) &&
        (end[0] > slotStart[0] || (end[0] === slotStart[0] && end[1] >= slotStart[1]))
      ) {
        return true;
      }
      
      return false;
    });
    
    if (overlapping) {
      setSlotError('This time slot overlaps with an existing one');
      return;
    }
    
    // 添加新时间段
    const newId = Math.max(0, ...availabilitySlots.map(s => s.id)) + 1;
    setAvailabilitySlots([
      ...availabilitySlots,
      { ...newSlot, id: newId }
    ]);
    
    // 重置并关闭添加表单
    setNewSlot({
      day: 0,
      startTime: '09:00',
      endTime: '10:00'
    });
    setShowAddSlot(false);
  };
  
  // 删除时间段
  const deleteTimeSlot = (id) => {
    setAvailabilitySlots(availabilitySlots.filter(slot => slot.id !== id));
  };
  
  // 保存所有时间段
  const saveAvailability = () => {
    setIsSaving(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // 3秒后隐藏成功消息
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
      console.log("Saved availability slots:", availabilitySlots);
    }, 1500);
  };
  
  // 生成时间选择器选项
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };
  
  const timeOptions = generateTimeOptions();
  const weekDates = getWeekDates(currentWeekStart);
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex items-center">
          <button className="p-1 rounded-full hover:bg-gray-100 mr-2 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Availability</h1>
        </div>
        <div className="flex items-center">
          <button 
            className="py-1.5 px-3 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            onClick={goToCurrentWeek}
          >
            Today
          </button>
        </div>
      </div>
      
      {/* 主要内容区 */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* 周导航 */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <button 
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              onClick={goToPreviousWeek}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="text-sm font-medium text-gray-700">
              {new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(currentWeekStart)} {currentWeekStart.getFullYear()}
            </div>
            
            <button 
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              onClick={goToNextWeek}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDates.map((date, index) => (
              <div 
                key={index} 
                className={`py-1.5 rounded-lg ${isToday(date) ? 'bg-green-100 text-green-800' : ''}`}
              >
                <div className="text-xs font-medium">{getDayName(date)}</div>
                <div className={`text-sm mt-0.5 ${isToday(date) ? 'font-semibold' : ''}`}>{formatDate(date)}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 说明卡片 */}
        <div className="px-4 pt-4">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-5 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <h2 className="text-base font-semibold text-gray-800">Set Your Coaching Hours</h2>
            </div>
            
            <p className="text-gray-600 text-sm mb-3">
              Define when you're available to coach. Students will only be able to book lessons during these hours.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mr-2" />
                <p className="text-sm text-yellow-700">
                  Remember to update your availability regularly to maximize booking opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 成功消息 */}
        {saveSuccess && (
          <div className="px-4 mb-4">
            <div className="bg-green-50 rounded-lg border border-green-200 p-3 flex items-center">
              <Check className="h-5 w-5 text-green-600 flex-shrink-0 mr-2" />
              <p className="text-sm text-green-700">Your availability has been saved successfully!</p>
            </div>
          </div>
        )}
        
        {/* 可用时间段列表 */}
        <div className="px-4">
          <h3 className="text-base font-medium text-gray-800 mb-3">Your Available Hours</h3>
          
          <div className="space-y-3 mb-5">
            {availabilitySlots.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">No availability set yet. Add your coaching hours below.</p>
              </div>
            ) : (
              availabilitySlots.map(slot => {
                const day = weekDates[slot.day];
                return (
                  <div key={slot.id} className="bg-white rounded-lg border border-gray-200 p-3 flex justify-between items-center shadow-sm">
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        {getDayName(day)}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {slot.startTime} - {slot.endTime}
                      </div>
                    </div>
                    <button 
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={() => deleteTimeSlot(slot.id)}
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
          
          {/* 添加新时间段 */}
          {showAddSlot ? (
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-5 shadow-sm">
              <h4 className="text-sm font-medium text-gray-800 mb-3">Add New Time Slot</h4>
              
              {slotError && (
                <div className="bg-red-50 rounded-lg border border-red-200 p-2 mb-3 flex items-start">
                  <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mr-1.5 mt-0.5" />
                  <p className="text-xs text-red-700">{slotError}</p>
                </div>
              )}
              
              <div className="space-y-3">
                {/* 选择星期几 */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Day</label>
                  <select 
                    value={newSlot.day} 
                    onChange={(e) => handleNewSlotChange('day', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {weekDates.map((date, index) => (
                      <option key={index} value={index}>
                        {getDayName(date)} ({formatDate(date)})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* 时间范围选择 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Start Time</label>
                    <select 
                      value={newSlot.startTime} 
                      onChange={(e) => handleNewSlotChange('startTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {timeOptions.map((time) => (
                        <option key={`start-${time}`} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">End Time</label>
                    <select 
                      value={newSlot.endTime} 
                      onChange={(e) => handleNewSlotChange('endTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {timeOptions.map((time) => (
                        <option key={`end-${time}`} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* 按钮组 */}
                <div className="flex justify-end space-x-2 pt-2">
                  <button 
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => {
                      setShowAddSlot(false);
                      setSlotError(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    onClick={addTimeSlot}
                  >
                    Add Slot
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              className="w-full py-2.5 px-4 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 mb-5 transition-colors shadow-sm"
              onClick={() => setShowAddSlot(true)}
            >
              <Plus className="w-4 h-4 mr-1.5" /> Add New Time Slot
            </button>
          )}
          
          {/* 保存按钮 */}
          <button 
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium transition-colors 
              ${isSaving 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'}`}
            onClick={saveAvailability}
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white mr-2"></div>
                Saving...
              </span>
            ) : (
              'Save Availability'
            )}
          </button>
          
          {/* 底部说明 */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Your availability updates will be visible to students immediately after saving.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoachAvailabilityEntryPage; 