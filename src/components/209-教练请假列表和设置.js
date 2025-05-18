import React, { useState } from 'react';
import { 
  Plus, 
  Trash2,
  Calendar,
  Clock,
  X,
  AlertTriangle,
  Edit
} from 'lucide-react';
import PageHeader from './common/PageHeader';

const CoachTimeOffPage = () => {
  // 状态管理
  const [view, setView] = useState('list'); // 'list', 'add', 'edit'
  const [editingId, setEditingId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmDeleteAll, setShowConfirmDeleteAll] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  // 表单状态
  const [isAllDay, setIsAllDay] = useState(false);
  const [startDate, setStartDate] = useState('2025-04-06');
  const [startTime, setStartTime] = useState('08:00');
  const [endDate, setEndDate] = useState('2025-04-07');
  const [endTime, setEndTime] = useState('20:00');
  const [notes, setNotes] = useState('');
  
  // 模拟数据 - time off 记录
  const [timeOffRecords, setTimeOffRecords] = useState([
    {
      id: 1,
      startDate: '2025-04-06',
      startTime: '08:00',
      endDate: '2025-04-07',
      endTime: '20:00',
      isAllDay: false,
      notes: 'Family vacation'
    }
  ]);
  
  // 格式化日期显示
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  
  // 生成日期选项
  const generateDateOptions = (daysAhead) => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < daysAhead; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      // 格式化日期显示
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${year}`;
      
      options.push({
        value: `${year}-${month}-${day}`,
        label: formattedDate
      });
    }
    
    return options;
  };
  
  // 格式化时间显示
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours, 10);
    return `${h > 12 ? h - 12 : h}:${minutes} ${h >= 12 ? 'PM' : 'AM'}`;
  };
  
  // 创建新记录
  const handleAddTimeOff = () => {
    // 检查开始时间是否早于结束时间
    if (!validateTimeRange()) {
      return;
    }
    
    const newRecord = {
      id: Date.now(),
      startDate,
      startTime: isAllDay ? '00:00' : startTime,
      endDate,
      endTime: isAllDay ? '23:59' : endTime,
      isAllDay,
      notes
    };
    
    setTimeOffRecords([...timeOffRecords, newRecord]);
    resetForm();
    setView('list');
  };
  
  // 更新记录
  const handleUpdateTimeOff = () => {
    // 检查开始时间是否早于结束时间
    if (!validateTimeRange()) {
      return;
    }
    
    const updatedRecords = timeOffRecords.map(record => 
      record.id === editingId ? {
        ...record,
        startDate,
        startTime: isAllDay ? '00:00' : startTime,
        endDate,
        endTime: isAllDay ? '23:59' : endTime,
        isAllDay,
        notes
      } : record
    );
    
    setTimeOffRecords(updatedRecords);
    resetForm();
    setView('list');
  };
  
  // 验证时间范围
  const validateTimeRange = () => {
    const startDateTime = new Date(`${startDate}T${isAllDay ? '00:00:00' : startTime}:00`);
    const endDateTime = new Date(`${endDate}T${isAllDay ? '23:59:59' : endTime}:00`);
    
    if (startDateTime >= endDateTime) {
      setAlertMessage('Start time must be earlier than end time');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return false;
    }
    
    return true;
  };
  
  // 删除单条记录
  const handleDeleteTimeOff = (id) => {
    const updatedRecords = timeOffRecords.filter(record => record.id !== id);
    setTimeOffRecords(updatedRecords);
    setShowConfirmDelete(false);
  };
  
  // 删除所有记录
  const handleDeleteAllTimeOff = () => {
    setTimeOffRecords([]);
    setShowConfirmDeleteAll(false);
  };
  
  // 编辑记录
  const handleEditTimeOff = (record) => {
    setEditingId(record.id);
    setStartDate(record.startDate);
    setStartTime(record.startTime);
    setEndDate(record.endDate);
    setEndTime(record.endTime);
    setIsAllDay(record.isAllDay);
    setNotes(record.notes);
    setView('edit');
  };
  
  // 重置表单
  const resetForm = () => {
    setStartDate('2025-04-06');
    setStartTime('08:00');
    setEndDate('2025-04-07');
    setEndTime('20:00');
    setIsAllDay(false);
    setNotes('');
    setEditingId(null);
  };
  
  // 取消添加/编辑
  const handleCancelForm = () => {
    resetForm();
    setView('list');
  };
  
  // 日期选择器的选项
  const dateOptions = generateDateOptions(90); // 生成未来90天的选项
  
  // 时间选择器的选项
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const h = hour.toString().padStart(2, '0');
        const m = minute.toString().padStart(2, '0');
        options.push({
          value: `${h}:${m}`,
          label: `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
        });
      }
    }
    return options;
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  const timeOptions = generateTimeOptions();
  
  // 渲染记录列表
  const renderTimeOffList = () => {
    return (
      <div className="flex-1 overflow-auto p-4">
        {/* 列表内容 */}
        {timeOffRecords.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-purple-700" />
                </div>
                <div className="ml-3">
                  <h2 className="text-base font-medium text-gray-800">Time Off Management</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Add periods when you're unavailable for lessons. Students won't be able to book during these times.
                  </p>
                </div>
              </div>
            </div>
            
            {/* 添加按钮 - 移至顶部 */}
            <div className="bg-purple-50 rounded-lg p-4 flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-purple-700">Add new time off period</span>
              <button
                className="py-2 px-3 bg-purple-600 text-white rounded-lg text-sm font-medium"
                onClick={() => setView('add')}
                aria-label="Add new time off"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            {timeOffRecords.map(record => (
              <div 
                key={record.id} 
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="flex flex-col mb-1">
                        <span className="text-sm font-semibold text-gray-800">
                          {formatDate(record.startDate)} - {formatDate(record.endDate)}
                        </span>
                        {record.isAllDay ? (
                          <span className="mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full w-fit">
                            All day
                          </span>
                        ) : (
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <span>{formatTime(record.startTime)} - {formatTime(record.endTime)}</span>
                          </div>
                        )}
                      </div>
                      
                      {record.notes && (
                        <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
                          {record.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-2">
                    <button
                      className="p-1.5 rounded-full bg-gray-100"
                      onClick={() => handleEditTimeOff(record)}
                      aria-label="Edit time off"
                    >
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      className="p-1.5 rounded-full bg-red-100"
                      onClick={() => {
                        setEditingId(record.id);
                        setShowConfirmDelete(true);
                      }}
                      aria-label="Delete time off"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Clear All 按钮 */}
            <div className="mt-6 flex justify-center">
              <button
                className="w-full py-3 px-4 bg-red-600 text-white rounded-lg flex items-center justify-center font-medium"
                onClick={() => setShowConfirmDeleteAll(true)}
                aria-label="Remove all time off periods"
              >
                Remove All Time Off
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-purple-700" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Time Off Set</h3>
            <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">
              You don't have any time off periods scheduled. Add your unavailable time to prevent bookings.
            </p>
            <button
              className="py-3 px-5 bg-purple-600 text-white rounded-lg text-sm font-medium"
              onClick={() => setView('add')}
              aria-label="Add time off"
            >
              Add Time Off
            </button>
          </div>
        )}
      </div>
    );
  };
  
  // 渲染添加/编辑表单
  const renderTimeOffForm = () => {
    return (
      <div className="flex-1 overflow-auto p-4">
        {/* 警告信息 */}
        {showAlert && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md" role="alert">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm text-red-700">{alertMessage}</span>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm p-5">
          <form onSubmit={(e) => {
            e.preventDefault();
            view === 'add' ? handleAddTimeOff() : handleUpdateTimeOff();
          }}>
            {/* 全天开关 */}
            <div className="mb-5">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isAllDay}
                  onChange={() => setIsAllDay(!isAllDay)}
                  className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mr-2"
                  aria-label="All day"
                />
                <span className="text-sm font-medium text-gray-700">All day</span>
              </label>
            </div>
            
            {/* 开始日期 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="startDate">
                Start Date
              </label>
              <select
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                aria-label="Start date"
              >
                {dateOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* 开始时间 - 仅在非全天时显示 */}
            {!isAllDay && (
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="startTime">
                  Start Time
                </label>
                <select
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Start time"
                >
                  {timeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* 结束日期 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="endDate">
                End Date
              </label>
              <select
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                aria-label="End date"
              >
                {dateOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* 结束时间 - 仅在非全天时显示 */}
            {!isAllDay && (
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="endTime">
                  End Time
                </label>
                <select
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="End time"
                >
                  {timeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* 备注 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="notes">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about this time off period"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
                aria-label="Notes"
              ></textarea>
            </div>
            
            {/* 操作按钮 */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                className="py-3 px-5 border border-gray-300 text-gray-700 rounded-lg font-medium"
                onClick={handleCancelForm}
                aria-label="Cancel"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="py-3 px-5 bg-purple-600 text-white rounded-lg font-medium"
                aria-label={view === 'add' ? "Add time off" : "Update time off"}
              >
                {view === 'add' ? 'Add Time Off' : 'Update Time Off'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // 删除确认对话框
  const renderDeleteConfirmation = () => {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
        role="dialog"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
      >
        <div className="bg-white rounded-lg p-5 mx-4 max-w-sm w-full">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
            <h3 id="delete-title" className="text-lg font-semibold text-gray-800">Delete Time Off</h3>
          </div>
          <p id="delete-description" className="text-gray-600 mb-5">
            Are you sure you want to delete this time off period? This action cannot be undone.
          </p>
          <div className="flex space-x-3 justify-end">
            <button
              className="py-3 px-5 border border-gray-300 rounded-lg text-gray-700 font-medium"
              onClick={() => setShowConfirmDelete(false)}
              aria-label="Cancel delete"
            >
              Cancel
            </button>
            <button
              className="py-3 px-5 bg-red-600 text-white rounded-lg font-medium"
              onClick={() => handleDeleteTimeOff(editingId)}
              aria-label="Confirm delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // 删除所有确认对话框
  const renderDeleteAllConfirmation = () => {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
        role="dialog"
        aria-labelledby="delete-all-title"
        aria-describedby="delete-all-description"
      >
        <div className="bg-white rounded-lg p-5 mx-4 max-w-sm w-full">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
            <h3 id="delete-all-title" className="text-lg font-semibold text-gray-800">Clear All Time Off</h3>
          </div>
          <p id="delete-all-description" className="text-gray-600 mb-5">
            Are you sure you want to delete all time off periods? This action cannot be undone.
          </p>
          <div className="flex space-x-3 justify-end">
            <button
              className="py-3 px-5 border border-gray-300 rounded-lg text-gray-700 font-medium"
              onClick={() => setShowConfirmDeleteAll(false)}
              aria-label="Cancel delete all"
            >
              Cancel
            </button>
            <button
              className="py-3 px-5 bg-red-600 text-white rounded-lg font-medium"
              onClick={handleDeleteAllTimeOff}
              aria-label="Confirm delete all"
            >
              Delete All
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <PageHeader 
        title={view === 'list' ? 'Time Off' : view === 'add' ? 'Add Time Off' : 'Edit Time Off'} 
        onBack={view === 'list' ? handleBack : () => setView('list')} 
      />
      
      {/* 主要内容区域 - 根据视图状态切换 */}
      {view === 'list' ? renderTimeOffList() : renderTimeOffForm()}
      
      {/* 删除确认对话框 */}
      {showConfirmDelete && renderDeleteConfirmation()}
      
      {/* 删除所有确认对话框 */}
      {showConfirmDeleteAll && renderDeleteAllConfirmation()}
    </div>
  );
};

export default CoachTimeOffPage; 