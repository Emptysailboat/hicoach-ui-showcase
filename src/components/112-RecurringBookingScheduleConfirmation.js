import React, { useState } from 'react';

const RecurringBookingScheduleConfirmation = () => {
  // ===== STATE VARIABLES =====
  const [lessons, setLessons] = useState([
    { 
      id: 1, 
      date: 'Mon, Apr 21', 
      time: '14:00', 
      status: 'available', 
      isFirstLesson: true,
      conflictReason: null,
      isRegularTime: true
    },
    { 
      id: 2, 
      date: 'Mon, Apr 28', 
      time: '14:00', 
      status: 'available',
      conflictReason: null,
      isRegularTime: true
    },
    { 
      id: 3, 
      date: 'Mon, May 5', 
      time: '15:00', 
      status: 'adjusted',
      conflictReason: 'Coach unavailable at 14:00',
      isRegularTime: false
    },
    { 
      id: 4, 
      date: 'Mon, May 12', 
      time: '14:00', 
      status: 'available',
      conflictReason: null,
      isRegularTime: true
    },
    { 
      id: 5, 
      date: 'Mon, May 19', 
      time: '14:00', 
      status: 'available',
      conflictReason: null,
      isRegularTime: true
    },
    { 
      id: 6, 
      date: 'Mon, May 26', 
      time: '16:00', 
      status: 'adjusted',
      conflictReason: 'Coach Unavailable',
      isRegularTime: false
    },
    { 
      id: 7, 
      date: 'Mon, Jun 2', 
      time: '14:00', 
      status: 'available',
      conflictReason: null,
      isRegularTime: true
    },
    { 
      id: 8, 
      date: 'Mon, Jun 9', 
      time: '14:00', 
      status: 'available',
      conflictReason: null,
      isRegularTime: true
    }
  ]);
  
  // 编辑课程相关状态
  const [editingLesson, setEditingLesson] = useState(null);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [currentDay, setCurrentDay] = useState(0); // 0 = current week day
  const [selectedNewDay, setSelectedNewDay] = useState(null);
  const [selectedNewHour, setSelectedNewHour] = useState(null);
  
  // ===== MOCK DATA =====
  // 模拟选中的套餐数据
  const selectedPackage = {
    id: 'intermediate',
    name: '8 Lessons Package',
    sessions: 8,
    duration: 60
  };
  
  // 模拟可用时间段数据 - 在实际应用中会从API获取
  const availableSlots = {
    // 格式: "day-hour": "status" (available, booked, unavailable)
    "1-9": "available", "1-10": "available", "1-11": "available", "1-14": "available", "1-15": "available",
    "2-9": "available", "2-10": "booked", "2-17": "available", "2-18": "available",
    "3-12": "available", "3-13": "booked", "3-16": "available", "3-17": "available",
    "4-9": "available", "4-10": "available", "4-14": "available", "4-15": "booked",
    "5-11": "available", "5-12": "available", "5-18": "available", "5-19": "available",
  };
  
  // ===== HELPER FUNCTIONS =====
  // 生成当前周的日期数据
  const generateDaysForWeek = (weekOffset) => {
    // 使用固定的开始日期，而不是当前日期，确保日期显示一致性
    // 这里使用2025年4月21日作为第一课的日期
    const baseDate = new Date(2025, 3, 21); // 注意：月份从0开始，所以3表示4月
    const startOfWeek = new Date(baseDate);
    
    // 调整到本周一
    const dayOfWeek = baseDate.getDay() || 7; // 将周日(0)转换为7
    startOfWeek.setDate(baseDate.getDate() - (dayOfWeek - 1) + (weekOffset * 7));
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      // 使用英文月份和日期格式
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'];
      const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                              
      return {
        name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        date: date.getDate(),
        month: shortMonthNames[date.getMonth()],
        fullMonth: monthNames[date.getMonth()],
        year: date.getFullYear(),
        isToday: false // 不需要高亮今天
      };
    });
  };
  
  // 获取时间段状态的函数
  const getSlotStatus = (day, hour) => {
    // 根据当前周和日期调整
    const key = `${day}-${hour}`;
    return availableSlots[key] || "unavailable";
  };
  
  // 检查时间格是否被选中
  const isSlotSelected = (day, hour) => {
    return selectedNewDay === day && selectedNewHour === hour;
  };
  
  // 时间格式化函数
  const formatHour = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };
  
  // 当前显示的日期范围文本
  const getDateRangeText = () => {
    const days = generateDaysForWeek(currentDay);
    const startDay = days[0];
    const endDay = days[6];
    
    return `${startDay.month} ${startDay.date} - ${endDay.month} ${endDay.date}, ${startDay.year}`;
  };
  
  // ===== DERIVED DATA =====
  // 当前显示的日期
  const days = generateDaysForWeek(currentDay);
  
  // 生成时间数据 (9:00 - 21:00)
  const hours = Array.from({ length: 13 }, (_, i) => i + 9);
  
  // 获取调整过的课程数量
  const adjustedLessonsCount = lessons.filter(lesson => lesson.status === 'adjusted').length;
  
  // ===== EVENT HANDLERS =====
  // 处理编辑课程
  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setShowTimeSelector(true);
    // 重置选择状态
    setSelectedNewDay(null);
    setSelectedNewHour(null);
  };
  
  // 处理关闭编辑模态框
  const handleCloseEditModal = () => {
    setEditingLesson(null);
    setShowTimeSelector(false);
    setSelectedNewDay(null);
    setSelectedNewHour(null);
  };
  
  // 处理时间格子点击
  const handleSlotClick = (day, hour) => {
    const status = getSlotStatus(day, hour);
    if (status === "available") {
      setSelectedNewDay(day);
      setSelectedNewHour(hour);
    }
  };
  
  // 获取格子的完整描述（用于辅助技术）
  const getSlotDescription = (day, hour, status) => {
    const dayName = days[day - 1].name;
    const date = days[day - 1].date;
    const time = formatHour(hour);
    
    if (status === "available") {
      return `Available slot on ${dayName} ${date}, at ${time}`;
    } else if (status === "booked") {
      return `Booked slot on ${dayName} ${date}, at ${time}`;
    } else {
      return `Unavailable slot on ${dayName} ${date}, at ${time}`;
    }
  };
  
  // 处理更新课程时间
  const handleUpdateLessonTime = () => {
    if (editingLesson && selectedNewDay !== null && selectedNewHour !== null) {
      // 根据选择的日期和小时生成新的日期和时间
      const selectedDay = days[selectedNewDay - 1];
      const newDate = `${selectedDay.name}, ${selectedDay.month} ${selectedDay.date}`;
      const newTime = formatHour(selectedNewHour);
      
      setLessons(lessons.map(lesson => 
        lesson.id === editingLesson.id 
          ? { 
              ...lesson, 
              date: newDate,
              time: newTime, 
              status: 'user-adjusted',
              isRegularTime: false,
              conflictReason: null // 移除冲突原因
            } 
          : lesson
      ));
      
      setEditingLesson(null);
      setShowTimeSelector(false);
      setSelectedNewDay(null);
      setSelectedNewHour(null);
    }
  };

  // 处理继续按钮点击
  const handleContinue = () => {
    // 在实际应用中，这里会导航到下一步
    console.log('Continuing to next step with lessons:', lessons);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200">
        <button className="mr-2">
          <span className="material-icons-round text-gray-700" style={{ fontSize: '24px' }}>
            chevron_left
          </span>
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-gray-800">Confirm Schedule</h1>
        </div>
        <div className="w-6"></div>
      </div>
      
      {/* 进度指示器 */}
      <div className="flex justify-between items-center px-4 py-2.5 bg-white border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-green-600 text-white">
            1
          </div>
          <div className="h-1 w-5 bg-green-600"></div>
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-green-600 text-white">
            2
          </div>
          <div className="h-1 w-5 bg-green-600"></div>
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-green-600 text-white">
            3
          </div>
          <div className="h-1 w-5 bg-gray-200"></div>
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            4
          </div>
          <div className="h-1 w-5 bg-gray-200"></div>
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            5
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Step 3/5
        </div>
      </div>
      
      {/* 套餐信息 */}
      <div className="px-4 py-3 bg-purple-50 border-b border-purple-100">
        <div className="flex items-center">
          <p className="text-sm text-purple-700">
            <span className="font-medium">Package: </span>
            Intermediate Package ({selectedPackage.sessions} lessons, {selectedPackage.duration} min each)
          </p>
        </div>
      </div>
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {adjustedLessonsCount > 0 && (
            <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-start">
                <span className="material-icons-round text-purple-600 mr-2 flex-shrink-0 mt-0.5" style={{ fontSize: '20px' }}>
                  warning
                </span>
                <div>
                  <p className="text-sm text-purple-700">
                    <span className="font-medium">{adjustedLessonsCount} lessons</span> had to be rescheduled due to coach availability.
                  </p>
                  <p className="text-sm text-purple-700 mt-1">
                    You can adjust any lesson time by clicking the Edit button.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* 课程列表 */}
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <div 
                key={lesson.id}
                className={`p-2.5 rounded-lg border ${
                  lesson.status === 'adjusted' || lesson.status === 'user-adjusted' 
                    ? 'bg-purple-50 border-purple-100' 
                    : 'bg-green-50 border-green-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-800 mr-2">Lesson {lesson.id}</span>
                        {!lesson.isRegularTime && (
                          <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                            Adjusted
                          </span>
                        )}
                        {lesson.isRegularTime && (
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                            Regular time
                          </span>
                        )}
                      </div>
                      <button 
                        className="p-1.5 text-gray-600 active:bg-gray-100 rounded-lg border border-gray-200"
                        onClick={() => handleEditLesson(lesson)}
                        aria-label="Edit lesson time"
                      >
                        <span className="material-icons-round" style={{ fontSize: '16px' }}>
                          edit
                        </span>
                      </button>
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <span className="material-icons-round text-gray-600 mr-1.5" style={{ fontSize: '16px' }}>
                        event
                      </span>
                      <span className="text-gray-800 text-sm">{lesson.date}</span>
                      {lesson.isFirstLesson && (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          First lesson
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <span className="material-icons-round text-gray-600 mr-1.5" style={{ fontSize: '16px' }}>
                        schedule
                      </span>
                      <span className="text-gray-800 text-sm">{lesson.time}</span>
                    </div>
                    
                    {lesson.conflictReason && (
                      <div className="flex items-center mt-1 text-purple-700">
                        <span className="material-icons-round text-purple-600 mr-1.5" style={{ fontSize: '14px' }}>
                          info
                        </span>
                        <span className="text-xs">{lesson.conflictReason}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 底部信息提示 */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-start">
          <span className="material-icons-round text-purple-600 mr-2 mt-0.5" style={{ fontSize: '16px' }}>
            info
          </span>
          <p className="text-xs text-purple-700">
            We've scheduled your lessons at the same time each week where possible. You can adjust any lesson time if needed.
          </p>
        </div>
      </div>
      
      {/* 底部按钮 */}
      <div className="bg-white px-4 py-3 border-t border-gray-200">
        <button 
          className="w-full py-2.5 px-4 rounded-lg font-medium text-white bg-green-600 active:bg-green-700 flex justify-center items-center"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
      
      {/* 编辑时间模态框 */}
      {showTimeSelector && editingLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col m-4">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Change Lesson Time</h2>
              <button 
                className="p-1.5 rounded-full active:bg-gray-100"
                onClick={handleCloseEditModal}
              >
                <span className="material-icons-round text-gray-500" style={{ fontSize: '24px' }}>
                  close
                </span>
              </button>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Select a new time for your lesson on <span className="font-medium">{editingLesson.date}</span>.
              </p>
              
              {/* 周和月份选择器 */}
              <div className="bg-white mb-2 flex items-center justify-between">
                <button 
                  className="w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors text-gray-600"
                  aria-label="Previous week"
                  onClick={() => setCurrentDay(prev => Math.max(0, prev - 1))}
                >
                  <span className="material-icons-round" style={{ fontSize: '20px' }}>
                    chevron_left
                  </span>
                </button>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-800">{getDateRangeText()}</h3>
                </div>
                <button 
                  className="w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors text-gray-600"
                  aria-label="Next week"
                  onClick={() => setCurrentDay(prev => prev + 1)}
                >
                  <span className="material-icons-round" style={{ fontSize: '20px' }}>
                    chevron_right
                  </span>
                </button>
              </div>
              
              {/* 日历视图 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                {/* 星期和日期头部 */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                  <div className="flex">
                    {/* 左侧时间列的空白头部 */}
                    <div className="w-16 flex-shrink-0"></div>
                    
                    {/* 星期和日期 */}
                    <div className="flex-1 grid grid-cols-7">
                      {days.map((day, index) => (
                        <div key={index} className="py-2 text-center border-l border-gray-200 first:border-l-0">
                          <p className="text-xs font-medium text-gray-500">{day.name}</p>
                          <p className="text-sm font-semibold text-gray-800">{day.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* 时间格子 */}
                <div className="flex max-h-64 overflow-y-auto">
                  {/* 左侧时间列 */}
                  <div className="w-16 flex-shrink-0">
                    {hours.map((hour, index) => (
                      <div 
                        key={index} 
                        className="h-14 flex items-center justify-end pr-2 text-xs text-gray-500 font-medium"
                        aria-hidden="true"
                      >
                        {formatHour(hour)}
                      </div>
                    ))}
                  </div>
                  
                  {/* 时间格子矩阵 */}
                  <div className="flex-1 grid grid-cols-7">
                    {/* 遍历每一天 */}
                    {Array.from({ length: 7 }, (_, dayIndex) => (
                      <div key={dayIndex} className="border-l border-gray-200 first:border-l-0">
                        {/* 遍历每个小时 */}
                        {hours.map((hour, hourIndex) => {
                          const day = dayIndex + 1;
                          const status = getSlotStatus(day, hour);
                          const selected = isSlotSelected(day, hour);
                          
                          // 定义格子样式
                          let slotStyle = "";
                          
                          if (status === "available") {
                            // 可用：白色背景，浅紫色边框
                            slotStyle = selected
                              ? "bg-green-100 border-2 border-green-600 cursor-pointer"
                              : "bg-white border-2 border-green-400 active:bg-green-50 cursor-pointer";
                          } else if (status === "booked") {
                            // 已预订：深紫色背景，更深紫色边框
                            slotStyle = "bg-green-600 border-2 border-green-800";
                          } else {
                            // 不可用：灰色背景，灰色边框
                            slotStyle = "bg-gray-200 border border-gray-300";
                          }
                          
                          return (
                            <div 
                              key={hourIndex} 
                              className={`h-14 ${slotStyle} flex items-center justify-center relative transition-colors duration-150`}
                              onClick={() => handleSlotClick(day, hour)}
                              role={status === "available" ? "button" : "presentation"}
                              aria-label={getSlotDescription(day, hour, status)}
                              aria-disabled={status !== "available"}
                              aria-selected={selected}
                              tabIndex={status === "available" ? 0 : -1}
                            >
                              {status === "booked" && (
                                <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                              )}
                              {selected && (
                                <span className="material-icons-round text-green-600" style={{ fontSize: '18px' }}>
                                  check
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 图例 */}
              <div className="bg-white p-3 border-t border-gray-200 mb-4">
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white border-2 border-green-400 rounded-sm mr-2"></div>
                    <span className="text-xs text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-600 border-2 border-green-800 rounded-sm mr-2 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-300"></div>
                    </div>
                    <span className="text-xs text-gray-600">Booked</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded-sm mr-2"></div>
                    <span className="text-xs text-gray-600">Unavailable</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button 
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedNewDay !== null && selectedNewHour !== null
                      ? 'bg-green-600 text-white active:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={selectedNewDay === null || selectedNewHour === null}
                  onClick={handleUpdateLessonTime}
                >
                  Update Time
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurringBookingScheduleConfirmation; 