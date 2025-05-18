import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

const SingleBookingTimeSelection = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // 模拟数据 - 在实际应用中会从API获取
  const availableSlots = {
    // 格式: "day-hour": "status" (available, booked, unavailable)
    "1-10": "available", "1-11": "available", "1-14": "booked", "1-15": "booked",
    "2-9": "available", "2-10": "available", "2-17": "available", "2-18": "available",
    "3-12": "booked", "3-13": "booked", "3-16": "available", "3-17": "available",
    "4-9": "available", "4-10": "available", "4-14": "available", "4-15": "available",
    "5-11": "booked", "5-12": "booked", "5-18": "available", "5-19": "available",
  };
  
  // 生成日期数据
  const days = [
    { name: "MON", date: 17 },
    { name: "TUE", date: 18 },
    { name: "WED", date: 19 },
    { name: "THU", date: 20 },
    { name: "FRI", date: 21 },
    { name: "SAT", date: 22 },
    { name: "SUN", date: 23 },
  ];
  
  // 生成时间数据 (6:00 - 22:00)
  const hours = Array.from({ length: 17 }, (_, i) => i + 6);
  
  // 获取时间段状态的函数
  const getSlotStatus = (day, hour) => {
    const key = `${day}-${hour}`;
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
      setSelectedSlot(`${day}-${hour}`);
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
      // 在实际应用中，这里会导航到下一步
      console.log('Selected slot:', selectedSlot);
    }
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    console.log("Back button clicked");
    // 实际项目中这里会返回上一页
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden">
      {/* 顶部导航栏 */}
      <PageHeader 
        title="Select Date & Time" 
        onBack={handleBack}
      />
      
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
        </div>
        <div className="text-xs text-gray-500">
          Step 2/4
        </div>
      </div>
      
      {/* 月份选择器 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <button 
          className="w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100"
          aria-label="Previous month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h2 className="text-lg font-medium text-gray-800">April 2025</h2>
        <button 
          className="w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100"
          aria-label="Next month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
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
                  <div key={index} className="py-2 text-center border-l border-gray-200">
                    <p className="text-xs font-medium text-gray-500">{day.name}</p>
                    <p className="text-sm font-semibold text-gray-800">{day.date}</p>
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
                    const slotKey = `${day}-${hour}`;
                    const isSelected = selectedSlot === slotKey;
                    
                    // 定义格子样式
                    let slotStyle = "";
                    
                    if (status === "available") {
                      // 可用：白色背景，浅绿色边框
                      slotStyle = isSelected
                        ? "bg-primary-100 border-2 border-primary-600 cursor-pointer"
                        : "bg-white border-2 border-primary-400 active:bg-primary-50 cursor-pointer";
                    } else if (status === "booked") {
                      // 已预订：深绿色背景，更深绿色边框
                      slotStyle = "bg-primary-600 border-2 border-primary-800";
                    } else {
                      // 不可用：更深的灰色背景，深灰色边框
                      slotStyle = "bg-gray-300 border border-gray-400";
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute text-primary-600">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
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
            <div className="w-4 h-4 bg-gray-300 border border-gray-400 rounded-sm mr-2"></div>
            <span className="text-xs text-gray-600">Unavailable</span>
          </div>
        </div>
      </div>
      
      {/* 底部按钮 */}
      <div className="bg-white px-4 py-3 border-t border-gray-200">
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

export default SingleBookingTimeSelection; 