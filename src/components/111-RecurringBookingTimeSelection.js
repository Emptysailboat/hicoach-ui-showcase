import React, { useState } from 'react';

const RecurringBookingTimeSelection = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(0); // 0 = current week, 1 = next week, etc.
  
  // 模拟选中的套餐数据
  const selectedPackage = {
    id: 'intermediate',
    name: '8 Lessons Package',
    sessions: 8,
    duration: 60
  };
  
  // 模拟数据 - 在实际应用中会从API获取
  const availableSlots = {
    // 格式: "day-hour": "status" (available, booked, unavailable)
    "1-10": "available", "1-11": "available", "1-14": "booked", "1-15": "booked",
    "2-9": "available", "2-10": "available", "2-17": "available", "2-18": "available",
    "3-12": "booked", "3-13": "booked", "3-16": "available", "3-17": "available",
    "4-9": "available", "4-10": "available", "4-14": "available", "4-15": "available",
    "5-11": "booked", "5-12": "booked", "5-18": "available", "5-19": "available",
    // 下周的一些示例
    "8-10": "available", "8-11": "available", "8-14": "available", "8-15": "available",
    "9-9": "available", "9-10": "available", "9-17": "available", "9-18": "booked",
    "10-12": "available", "10-13": "available", "10-16": "available", "10-17": "available",
  };
  
  // 生成当前选择周的日期数据
  const generateDaysForWeek = (weekOffset) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    // 从本周一开始
    const daysSinceMonday = (today.getDay() + 6) % 7; // getDay() 0 = Sunday, convert to Monday = 0
    startOfWeek.setDate(today.getDate() - daysSinceMonday + (weekOffset * 7));
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return {
        name: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i],
        date: date.getDate(),
        fullDate: `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`,
        month: date.toLocaleString('en-US', { month: 'long' }),
        year: date.getFullYear(),
        isToday: date.toDateString() === today.toDateString()
      };
    });
  };
  
  // 当前显示的日期
  const days = generateDaysForWeek(currentWeek);
  
  // 当前显示的月份和年份
  const currentMonth = days[0].month;
  const currentYear = days[0].year;
  
  // 生成时间数据 (6:00 - 22:00)
  const hours = Array.from({ length: 17 }, (_, i) => i + 6);
  
  // 获取时间段状态的函数
  const getSlotStatus = (day, hour) => {
    // 根据当前周调整天数
    const adjustedDay = day + (currentWeek * 7);
    const key = `${adjustedDay}-${hour}`;
    
    return availableSlots[key] || "unavailable";
  };
  
  // 时间格式化函数
  const formatHour = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };
  
  // 处理时间格子点击
  const handleSlotClick = (day, hour) => {
    const status = getSlotStatus(day, hour);
    if (status === "available") {
      const adjustedDay = day + (currentWeek * 7);
      setSelectedSlot(`${adjustedDay}-${hour}`);
      setSelectedDate(days[day-1].fullDate);
      setSelectedTime(formatHour(hour));
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
  
  // 处理下一步点击
  const handleNextClick = () => {
    if (selectedSlot) {
      // 在实际应用中，这里会调用API导航到下一步
      console.log('Selected slot:', selectedSlot, 'Date:', selectedDate, 'Time:', selectedTime);
    }
  };
  
  // 切换周
  const handleWeekChange = (direction) => {
    if (direction === 'next') {
      setCurrentWeek(prev => prev + 1);
    } else {
      setCurrentWeek(prev => Math.max(0, prev - 1));
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1.5 rounded-full active:bg-gray-100">
          <span className="material-icons-round text-gray-700" style={{ fontSize: '24px' }}>
            arrow_back_ios_new
          </span>
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-gray-800">Select Starting Date</h1>
        </div>
        <div className="w-10"></div>
      </div>
      
      {/* 进度指示器 */}
      <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-primary-600 text-white">
            1
          </div>
          <div className="h-0.5 w-6 bg-primary-600"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-primary-600 text-white">
            2
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            3
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            4
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            5
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Step 2/5
        </div>
      </div>
      
      {/* 套餐信息 */}
      <div className="px-4 py-3 bg-purple-50 border-b border-purple-100">
        <div className="flex">
          <span className="material-icons-round text-purple-600 mr-2 flex-shrink-0" style={{ fontSize: '20px' }}>
            menu_book
          </span>
          <div>
            <p className="text-sm text-purple-700">
              <span className="font-medium">Package: </span>
              {selectedPackage.name} ({selectedPackage.sessions} lessons, {selectedPackage.duration} min each)
            </p>
          </div>
        </div>
        
        <div className="flex mt-3">
          <span className="material-icons-round text-purple-600 mr-2 flex-shrink-0" style={{ fontSize: '20px' }}>
            info
          </span>
          <div>
            <p className="text-sm text-purple-700">
              Please select your preferred starting time. We'll try to schedule your lessons at the same time each week.
            </p>
          </div>
        </div>
      </div>
      
      {/* 选择结果显示 */}
      {selectedDate && selectedTime && (
        <div className="px-4 py-2 bg-primary-50 border-b border-primary-100 flex items-center justify-between">
          <div className="flex items-center">
            <span className="material-icons-round text-primary-600 mr-1.5" style={{ fontSize: '18px' }}>
              event
            </span>
            <span className="text-sm text-primary-800 font-medium">{selectedDate}</span>
            <span className="material-icons-round text-primary-600 ml-3 mr-1.5" style={{ fontSize: '18px' }}>
              schedule
            </span>
            <span className="text-sm text-primary-800 font-medium">{selectedTime}</span>
          </div>
          <span className="text-xs text-primary-700">First lesson</span>
        </div>
      )}
      
      {/* 周和月份选择器 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <button 
          className={`w-8 h-8 flex items-center justify-center rounded-full ${currentWeek > 0 ? 'active:bg-gray-100 text-gray-600' : 'text-gray-300 cursor-not-allowed'} transition-colors`}
          aria-label="Previous week"
          disabled={currentWeek === 0}
          onClick={() => handleWeekChange('prev')}
        >
          <span className="material-icons-round" style={{ fontSize: '20px' }}>
            chevron_left
          </span>
        </button>
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-800">{currentMonth} {currentYear}</h2>
          <div className="text-xs text-gray-500 mt-1">
            {currentWeek === 0 ? "This week" : `Week ${currentWeek + 1}`}
          </div>
        </div>
        <button 
          className="w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors text-gray-600"
          aria-label="Next week"
          onClick={() => handleWeekChange('next')}
        >
          <span className="material-icons-round" style={{ fontSize: '20px' }}>
            chevron_right
          </span>
        </button>
      </div>
      
      {/* 日历视图 */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          {/* 星期和日期头部 */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="flex">
              {/* 左侧时间列的空白头部 */}
              <div className="w-16 flex-shrink-0"></div>
              
              {/* 星期和日期 */}
              <div className="flex-1 grid grid-cols-7">
                {days.map((day, index) => (
                  <div key={index} className={`py-2 text-center border-l border-gray-200 ${day.isToday ? 'bg-primary-50' : ''}`}>
                    <p className="text-xs font-medium text-gray-500">{day.name}</p>
                    <p className={`text-sm font-semibold ${day.isToday ? 'text-primary-600' : 'text-gray-800'}`}>
                      {day.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 时间格子 */}
          <div className="flex">
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
                <div key={dayIndex} className="border-l border-gray-200">
                  {/* 遍历每个小时 */}
                  {hours.map((hour, hourIndex) => {
                    const day = dayIndex + 1;
                    const status = getSlotStatus(day, hour);
                    const adjustedDay = day + (currentWeek * 7);
                    const slotKey = `${adjustedDay}-${hour}`;
                    const isSelected = selectedSlot === slotKey;
                    
                    // 定义格子样式
                    let slotStyle = "";
                    
                    if (status === "available") {
                      // 可用：白色背景，浅主色调边框
                      slotStyle = isSelected
                        ? "bg-primary-100 border-2 border-primary-600 cursor-pointer"
                        : "bg-white border-2 border-primary-400 active:bg-primary-50 cursor-pointer";
                    } else if (status === "booked") {
                      // 已预订：深主色调背景，更深主色调边框
                      slotStyle = "bg-primary-600 border-2 border-primary-800";
                    } else {
                      // 不可用：更深的灰色背景，深灰色边框
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
                        aria-selected={isSelected}
                        tabIndex={status === "available" ? 0 : -1}
                      >
                        {status === "booked" && (
                          <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                        )}
                        {isSelected && (
                          <span className="material-icons-round text-primary-600" style={{ fontSize: '18px' }}>
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
      </div>
      
      {/* 图例说明 */}
      <div className="bg-white p-3 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white border-2 border-primary-400 rounded-sm mr-2"></div>
            <span className="text-xs text-gray-600">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-primary-600 border-2 border-primary-800 rounded-sm mr-2 flex items-center justify-center">
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
      
      {/* 底部按钮 */}
      <div className="bg-white px-4 py-4 border-t border-gray-200">
        <button 
          className={`w-full py-3.5 px-4 rounded-lg font-medium text-white ${
            selectedSlot 
              ? 'bg-primary-600 active:bg-primary-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!selectedSlot}
          onClick={handleNextClick}
        >
          <div className="flex items-center justify-center">
            <span>Continue</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RecurringBookingTimeSelection; 