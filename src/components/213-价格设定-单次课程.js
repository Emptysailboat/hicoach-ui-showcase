import React, { useState } from 'react';
import { ChevronLeft, Plus, Clock, Trash2, CheckCircle, X, AlertTriangle } from 'lucide-react';

const SingleLessonPricingPage = () => {
  // 状态管理
  const [pricingTiers, setPricingTiers] = useState([
    {
      id: 1,
      duration: 60,
      price: 40,
      active: true
    },
    {
      id: 2,
      duration: 90,
      price: 55,
      active: true
    }
  ]);
  
  const [editMode, setEditMode] = useState(false);
  const [editingTier, setEditingTier] = useState(null);
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showDurationError, setShowDurationError] = useState(false);
  const [showPriceError, setShowPriceError] = useState(false);
  const [showDuplicateError, setShowDuplicateError] = useState(false);
  
  // 打开添加新定价表单
  const handleAddNew = () => {
    setEditMode(true);
    setEditingTier(null);
    setDuration('');
    setPrice('');
    clearErrors();
  };
  
  // 打开编辑表单
  const handleEdit = (tier) => {
    setEditMode(true);
    setEditingTier(tier.id);
    setDuration(tier.duration.toString());
    setPrice(tier.price.toString());
    clearErrors();
  };
  
  // 切换定价层级的激活状态
  const toggleActive = (id) => {
    setPricingTiers(prevTiers =>
      prevTiers.map(tier =>
        tier.id === id ? { ...tier, active: !tier.active } : tier
      )
    );
  };
  
  // 清除错误提示
  const clearErrors = () => {
    setShowDurationError(false);
    setShowPriceError(false);
    setShowDuplicateError(false);
  };
  
  // 验证表单
  const validateForm = () => {
    let isValid = true;
    
    // 验证课程时长
    if (!duration || isNaN(parseInt(duration)) || parseInt(duration) <= 0) {
      setShowDurationError(true);
      isValid = false;
    }
    
    // 验证价格
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setShowPriceError(true);
      isValid = false;
    }
    
    // 检查是否有重复的课程时长
    const durationVal = parseInt(duration);
    const hasDuplicate = pricingTiers.some(tier => 
      tier.duration === durationVal && (!editingTier || tier.id !== editingTier)
    );
    
    if (hasDuplicate) {
      setShowDuplicateError(true);
      isValid = false;
    }
    
    return isValid;
  };
  
  // 保存定价
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    
    if (editingTier) {
      // 更新现有定价
      setPricingTiers(prevTiers =>
        prevTiers.map(tier =>
          tier.id === editingTier
            ? { ...tier, duration: parseInt(duration), price: parseFloat(price) }
            : tier
        )
      );
    } else {
      // 添加新定价
      const newTier = {
        id: Date.now(),
        duration: parseInt(duration),
        price: parseFloat(price),
        active: true
      };
      setPricingTiers([...pricingTiers, newTier]);
    }
    
    setEditMode(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };
  
  // 取消编辑
  const handleCancel = () => {
    setEditMode(false);
    clearErrors();
  };
  
  // 确认删除
  const handleConfirmDelete = () => {
    setPricingTiers(prevTiers => prevTiers.filter(tier => tier.id !== deletingId));
    setShowConfirmDelete(false);
  };
  
  // 点击删除按钮
  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setShowConfirmDelete(true);
  };
  
  // 渲染价格表
  const renderPricingTable = () => {
    return (
      <div className="divide-y divide-gray-200">
        {pricingTiers.map(tier => (
          <div 
            key={tier.id} 
            className={`p-4 ${!tier.active ? 'bg-gray-50' : ''}`}
            onClick={() => handleEdit(tier)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full ${tier.active ? 'bg-blue-100' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
                  <Clock className={`h-5 w-5 ${tier.active ? 'text-blue-600' : 'text-gray-500'}`} />
                </div>
                <div>
                  <h3 className={`font-medium ${tier.active ? 'text-gray-800' : 'text-gray-500'}`}>
                    {tier.duration} minute lesson
                  </h3>
                  <p className={`text-sm ${tier.active ? 'text-gray-600' : 'text-gray-400'}`}>
                    £{tier.price.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                {/* 激活/停用开关 */}
                <label className="inline-flex items-center cursor-pointer mr-4">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={tier.active}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleActive(tier.id);
                    }} 
                  />
                  <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                </label>
                
                {/* 删除按钮 */}
                <button 
                  className="p-1.5 rounded-full hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(tier.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // 渲染编辑表单
  const renderEditForm = () => {
    return (
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          {editingTier ? 'Edit Pricing' : 'Add New Pricing'}
        </h2>
        
        {/* 课程时长 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lesson Duration (minutes) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
              setShowDurationError(false);
              setShowDuplicateError(false);
            }}
            placeholder="e.g. 60"
            className={`w-full p-2.5 border rounded-lg text-gray-700 text-sm ${
              showDurationError || showDuplicateError 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-purple-500'
            } focus:border-transparent focus:ring-2`}
            min="15"
            step="15"
          />
          {showDurationError && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a valid duration (must be a positive number)
            </p>
          )}
          {showDuplicateError && (
            <p className="mt-1 text-sm text-red-600">
              A pricing tier with this duration already exists
            </p>
          )}
        </div>
        
        {/* 课程价格 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lesson Price (£) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">£</span>
            </div>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setShowPriceError(false);
              }}
              placeholder="0.00"
              className={`w-full pl-8 p-2.5 border rounded-lg text-gray-700 text-sm ${
                showPriceError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-purple-500'
              } focus:border-transparent focus:ring-2`}
              min="0.01"
              step="0.01"
            />
          </div>
          {showPriceError && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a valid price (must be greater than 0)
            </p>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="py-2.5 px-4 bg-green-600 text-white rounded-lg font-medium"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    );
  };
  
  // 渲染删除确认对话框
  const renderDeleteConfirmation = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
        <div className="bg-white rounded-lg p-5 mx-4 max-w-sm w-full">
          <div className="flex flex-col items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Delete Pricing</h3>
            <p className="text-gray-600 text-center">
              Are you sure you want to delete this pricing tier? This action cannot be undone.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium"
              onClick={() => setShowConfirmDelete(false)}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-medium"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-gray-800">Single Lesson Pricing</h1>
        </div>
        <div className="w-6"></div>
      </div>
      
      {/* 成功提示消息 */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-gray-800 font-medium">Pricing updated successfully</span>
          </div>
        </div>
      )}
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto">
        {!editMode ? (
          <div className="divide-y divide-gray-200">
            {/* 说明部分 */}
            <div className="p-4 bg-white">
              <h2 className="text-base font-medium text-gray-800 mb-2">Set Your Single Lesson Prices</h2>
              <p className="text-sm text-gray-600">
                Configure prices for different lesson durations. Students will see these options when booking.
              </p>
            </div>
            
            {/* 价格列表 */}
            <div className="bg-white">
              {renderPricingTable()}
            </div>
            
            {/* 添加新价格按钮 */}
            <div className="p-4 bg-white">
              <button 
                className="w-full py-2.5 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50"
                onClick={handleAddNew}
              >
                <Plus className="h-5 w-5 mr-1.5" />
                Add New Duration & Price
              </button>
            </div>
            
            {/* 服务费说明 */}
            <div className="p-4 bg-white">
              <div className="flex items-start bg-blue-50 p-3 rounded-lg">
                <div className="mt-0.5 mr-3 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                    <circle cx="12" cy="16" r="1" fill="currentColor"></circle>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-800">
                    HiCoach takes a 15% service fee from each lesson. Set your rates with this in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white">
            {renderEditForm()}
          </div>
        )}
      </div>
      
      {/* 删除确认对话框 */}
      {showConfirmDelete && renderDeleteConfirmation()}
    </div>
  );
};

export default SingleLessonPricingPage; 