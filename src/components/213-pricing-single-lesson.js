import React, { useState } from 'react';
import PageHeader from './common/PageHeader';
import ToggleSwitch from './common/ToggleSwitch';

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
  
  // Duration options
  const durationOptions = [30, 60, 75, 90];
  
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
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  // 计算套餐价格
  const calculatePackagePrice = (lessons, price, discount) => {
    const originalTotal = lessons * price;
    const discountAmount = originalTotal * (discount / 100);
    return originalTotal - discountAmount;
  };

  // 计算费用结构
  const calculateFeeStructure = (lessonPrice, durationValue) => {
    if (!lessonPrice || !durationValue) return null;
    
    const price = parseFloat(lessonPrice) || 0;
    const duration = parseInt(durationValue) || 0;
    
    if (price <= 0 || duration <= 0) return null;
    
    // 费用计算
    const platformFee = price * 0.04;
    const bookingFee = 0.99;
    const studentPays = price + platformFee + bookingFee;
    const coachReceives = price * 0.97; // 扣除3%手续费
    
    return {
      duration: duration,
      lessonPrice: price,
      platformFee: platformFee,
      bookingFee: bookingFee,
      studentPays: studentPays,
      coachReceives: coachReceives
    };
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
                <div className={`h-10 w-10 rounded-full ${tier.active ? 'bg-green-100' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
                  <i 
                    className={`material-icons-outlined ${tier.active ? 'text-green-600' : 'text-gray-500'}`}
                    style={{fontSize: "20px"}}
                  >
                    schedule
                  </i>
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
                <div className="mr-4" onClick={(e) => e.stopPropagation()}>
                  <ToggleSwitch 
                    isOn={tier.active} 
                    onToggle={() => toggleActive(tier.id)} 
                  />
                </div>
                
                {/* 删除按钮 */}
                <button 
                  className="p-1.5 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(tier.id);
                  }}
                >
                  <i className="material-icons-outlined text-gray-500" style={{fontSize: "18px"}}>delete</i>
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
    const feeStructure = calculateFeeStructure(price, duration);
    
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
          <select
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
              setShowDurationError(false);
              setShowDuplicateError(false);
            }}
            className={`w-full p-2.5 border rounded-lg text-gray-700 text-sm ${
              showDurationError || showDuplicateError 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-purple-500'
            } focus:border-transparent focus:ring-2`}
          >
            <option value="">Select duration</option>
            {durationOptions.map(option => (
              <option key={option} value={option}>
                {option} minutes
              </option>
            ))}
          </select>
          {showDurationError && (
            <p className="mt-1 text-sm text-red-600">
              Please select a lesson duration
            </p>
          )}
          {showDuplicateError && (
            <p className="mt-1 text-sm text-red-600">
              A pricing tier with this duration already exists
            </p>
          )}
        </div>
        
        {/* 课程价格 */}
        <div className="mb-4">
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

        {/* 实时收费概览 */}
        {feeStructure && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
            <h4 className="text-sm font-medium text-green-800 mb-2">Revenue Overview</h4>
            
            <div className="space-y-2">
              {/* 课程时长和价格 */}
              <div className="text-xs text-green-700">
                <span className="font-medium">{feeStructure.duration}-minute lesson</span> at £{feeStructure.lessonPrice.toFixed(2)}
              </div>
              
              {/* 学生支付明细 */}
              <div className="bg-green-100 p-2 rounded text-xs">
                <div className="font-medium text-green-800 mb-1">What student pays:</div>
                <div className="space-y-1 text-green-700">
                  <div className="flex justify-between">
                    <span>Lesson price:</span>
                    <span>£{feeStructure.lessonPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform fee (4%):</span>
                    <span>£{feeStructure.platformFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Booking fee:</span>
                    <span>£{feeStructure.bookingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-green-200 pt-1">
                    <span>Total:</span>
                    <span>£{feeStructure.studentPays.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* 教练收入 */}
              <div className="bg-green-100 p-2 rounded text-xs">
                <div className="font-medium text-green-800 mb-1">What you receive:</div>
                <div className="space-y-1 text-green-700">
                  <div className="flex justify-between">
                    <span>Lesson price:</span>
                    <span>£{feeStructure.lessonPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee (-3%):</span>
                    <span>-£{(feeStructure.lessonPrice * 0.03).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-green-200 pt-1">
                    <span>You receive:</span>
                    <span>£{feeStructure.coachReceives.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
              <i className="material-icons text-red-600" style={{fontSize: "24px"}}>warning</i>
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
      <PageHeader title="Single Lesson Pricing" onBack={handleBack} />
      
      {/* 成功提示消息 */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <i className="material-icons text-green-600" style={{fontSize: "20px"}}>check_circle</i>
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
                className="w-full py-2.5 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg font-medium flex items-center justify-center"
                onClick={handleAddNew}
              >
                <i className="material-icons mr-1.5" style={{fontSize: "20px"}}>add</i>
                Add New Duration & Price
              </button>
            </div>
            
            {/* 服务费说明 */}
            <div className="p-4 bg-white">
              <div className="flex items-start bg-green-50 p-3 rounded-lg">
                <div className="mt-0.5 mr-3 flex-shrink-0">
                  <i className="material-icons text-green-600" style={{fontSize: "20px"}}>info</i>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800 mb-1">Fee Structure</h4>
                  <p className="text-sm text-green-800 mb-2">
                    When you set a lesson price, students will pay additional fees:
                  </p>
                  <ul className="text-xs text-green-700 space-y-1 mb-2">
                    <li>• Platform fee: 4% of your lesson price</li>
                    <li>• Booking fee: £0.99 per booking</li>
                  </ul>
                  <p className="text-sm text-green-800 mb-1">
                    You will receive your lesson price minus a 3% service fee.
                  </p>
                  <div className="text-xs text-green-700 bg-green-100 p-2 rounded mt-2">
                    <strong>Example:</strong> You set £50 → Student pays £52.99 → You receive £48.50
                  </div>
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