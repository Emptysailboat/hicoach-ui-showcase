import React, { useState } from 'react';
import PageHeader from './common/PageHeader';
import ToggleSwitch from './common/ToggleSwitch';

const PackagePricingPage = () => {
  // 状态管理
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "5-Lesson Package",
      lessons: 5,
      singleLessonPrice: 40,
      discount: 10,
      active: true
    },
    {
      id: 2,
      name: "10-Lesson Package",
      lessons: 10,
      singleLessonPrice: 40,
      discount: 15,
      active: true
    }
  ]);
  
  const [editMode, setEditMode] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [numberOfLessons, setNumberOfLessons] = useState('');
  const [singleLessonPrice, setSingleLessonPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showLessonsError, setShowLessonsError] = useState(false);
  const [showPriceError, setShowPriceError] = useState(false);
  const [showDiscountError, setShowDiscountError] = useState(false);
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  // 打开添加新套餐表单
  const handleAddNew = () => {
    setEditMode(true);
    setEditingPackage(null);
    setNumberOfLessons('');
    setSingleLessonPrice('');
    setDiscountPercent('');
    clearErrors();
  };
  
  // 打开编辑表单
  const handleEdit = (pkg) => {
    setEditMode(true);
    setEditingPackage(pkg.id);
    setNumberOfLessons(pkg.lessons.toString());
    setSingleLessonPrice(pkg.singleLessonPrice.toString());
    setDiscountPercent(pkg.discount.toString());
    clearErrors();
  };
  
  // 切换套餐的激活状态
  const toggleActive = (id) => {
    setPackages(prevPackages =>
      prevPackages.map(pkg =>
        pkg.id === id ? { ...pkg, active: !pkg.active } : pkg
      )
    );
  };
  
  // 清除错误提示
  const clearErrors = () => {
    setShowLessonsError(false);
    setShowPriceError(false);
    setShowDiscountError(false);
  };
  
  // 验证表单
  const validateForm = () => {
    let isValid = true;
    
    // 验证课程数量
    if (!numberOfLessons || isNaN(parseInt(numberOfLessons)) || parseInt(numberOfLessons) <= 1) {
      setShowLessonsError(true);
      isValid = false;
    }
    
    // 验证单节课价格
    if (!singleLessonPrice || isNaN(parseFloat(singleLessonPrice)) || parseFloat(singleLessonPrice) <= 0) {
      setShowPriceError(true);
      isValid = false;
    }
    
    // 验证折扣 (允许为0)
    if (!discountPercent || isNaN(parseFloat(discountPercent)) || parseFloat(discountPercent) < 0 || parseFloat(discountPercent) > 50) {
      setShowDiscountError(true);
      isValid = false;
    }
    
    return isValid;
  };
  
  // 保存套餐
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    
    const packageName = `${numberOfLessons}-Lesson Package`;
    
    if (editingPackage) {
      // 更新现有套餐
      setPackages(prevPackages =>
        prevPackages.map(pkg =>
          pkg.id === editingPackage
            ? { 
                ...pkg, 
                name: packageName,
                lessons: parseInt(numberOfLessons), 
                singleLessonPrice: parseFloat(singleLessonPrice),
                discount: parseFloat(discountPercent)
              }
            : pkg
        )
      );
    } else {
      // 添加新套餐
      const newPackage = {
        id: Date.now(),
        name: packageName,
        lessons: parseInt(numberOfLessons),
        singleLessonPrice: parseFloat(singleLessonPrice),
        discount: parseFloat(discountPercent),
        active: true
      };
      setPackages([...packages, newPackage]);
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
    setPackages(prevPackages => prevPackages.filter(pkg => pkg.id !== deletingId));
    setShowConfirmDelete(false);
  };
  
  // 点击删除按钮
  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setShowConfirmDelete(true);
  };

  // 计算套餐价格
  const calculatePackagePrice = (lessons, price, discount) => {
    const originalTotal = lessons * price;
    const discountAmount = originalTotal * (discount / 100);
    return originalTotal - discountAmount;
  };

  // 计算费用结构
  const calculateFeeStructure = (lessonPrice, numberOfLessonsValue, discountValue) => {
    if (!lessonPrice || !numberOfLessonsValue) return null;
    
    const lessons = parseInt(numberOfLessonsValue) || 0;
    const discount = parseFloat(discountValue) || 0;
    const singlePrice = parseFloat(lessonPrice) || 0;
    
    // 单节课费用计算
    const platformFee = singlePrice * 0.04;
    const bookingFee = 0.99;
    const studentPaysSingle = singlePrice + platformFee + bookingFee;
    const coachReceivesSingle = singlePrice * 0.97; // 扣除3%手续费
    
    // 套餐费用计算
    const packageOriginalTotal = lessons * singlePrice;
    const packageDiscountAmount = packageOriginalTotal * (discount / 100);
    const packageFinalPrice = packageOriginalTotal - packageDiscountAmount;
    const packagePlatformFee = packageFinalPrice * 0.04;
    const studentPaysPackage = packageFinalPrice + packagePlatformFee + bookingFee;
    const coachReceivesPackage = packageFinalPrice * 0.97;
    
    return {
      single: {
        studentPays: studentPaysSingle,
        coachReceives: coachReceivesSingle
      },
      package: {
        originalTotal: packageOriginalTotal,
        discountAmount: packageDiscountAmount,
        finalPrice: packageFinalPrice,
        studentPays: studentPaysPackage,
        coachReceives: coachReceivesPackage,
        lessons: lessons,
        discount: discount
      }
    };
  };
  
  // 渲染套餐列表
  const renderPackagesTable = () => {
    return (
      <div className="divide-y divide-gray-200">
        {packages.map(pkg => (
          <div 
            key={pkg.id} 
            className={`p-4 ${!pkg.active ? 'bg-gray-50' : ''}`}
            onClick={() => handleEdit(pkg)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full ${pkg.active ? 'bg-purple-100' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
                  <i 
                    className={`material-icons-outlined ${pkg.active ? 'text-purple-600' : 'text-gray-500'}`}
                    style={{fontSize: "20px"}}
                  >
                    inventory_2
                  </i>
                </div>
                <div>
                  <h3 className={`font-medium ${pkg.active ? 'text-gray-800' : 'text-gray-500'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-sm ${pkg.active ? 'text-gray-600' : 'text-gray-400'}`}>
                    {pkg.lessons} lessons • {pkg.discount}% discount • £{calculatePackagePrice(pkg.lessons, pkg.singleLessonPrice, pkg.discount).toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                {/* 激活/停用开关 */}
                <div className="mr-4" onClick={(e) => e.stopPropagation()}>
                  <ToggleSwitch 
                    isOn={pkg.active} 
                    onToggle={() => toggleActive(pkg.id)} 
                  />
                </div>
                
                {/* 删除按钮 */}
                <button 
                  className="p-1.5 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(pkg.id);
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
    const feeStructure = calculateFeeStructure(singleLessonPrice, numberOfLessons, discountPercent);
    
    return (
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          {editingPackage ? 'Edit Package' : 'Add New Package'}
        </h2>
        
        {/* 课程数量 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Lessons <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={numberOfLessons}
            onChange={(e) => {
              setNumberOfLessons(e.target.value);
              setShowLessonsError(false);
            }}
            placeholder="e.g. 5"
            className={`w-full p-2.5 border rounded-lg text-gray-700 text-sm ${
              showLessonsError 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-purple-500'
            } focus:border-transparent focus:ring-2`}
            min="2"
          />
          {showLessonsError && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a valid number of lessons (must be at least 2)
            </p>
          )}
        </div>

        {/* 单节课价格 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Single Lesson Price (£) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">£</span>
            </div>
            <input
              type="number"
              value={singleLessonPrice}
              onChange={(e) => {
                setSingleLessonPrice(e.target.value);
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
        
        {/* 折扣百分比 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Percentage <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => {
                setDiscountPercent(e.target.value);
                setShowDiscountError(false);
              }}
              placeholder="e.g. 10"
              className={`w-full p-2.5 pr-8 border rounded-lg text-gray-700 text-sm ${
                showDiscountError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-purple-500'
              } focus:border-transparent focus:ring-2`}
              min="0"
              max="50"
              step="1"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
          {showDiscountError && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a valid discount (0-50%)
            </p>
          )}
        </div>

        {/* 实时收费概览 */}
        {feeStructure && (
          <div className="mb-4 bg-purple-50 border border-purple-200 rounded-lg p-3">
            <h4 className="text-sm font-medium text-purple-800 mb-2">Revenue Overview</h4>
            
            {/* 单节课收费 */}
            <div className="mb-3">
              <h5 className="text-xs font-medium text-purple-700 mb-1">Single Lesson:</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-purple-600">
                  Student pays: <span className="font-medium">£{feeStructure.single.studentPays.toFixed(2)}</span>
                </div>
                <div className="text-purple-600">
                  You receive: <span className="font-medium">£{feeStructure.single.coachReceives.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* 套餐收费 */}
            {feeStructure.package.lessons > 1 && (
              <div className="border-t border-purple-200 pt-2">
                <h5 className="text-xs font-medium text-purple-700 mb-1">
                  {feeStructure.package.lessons}-Lesson Package {feeStructure.package.discount > 0 && `(${feeStructure.package.discount}% off)`}:
                </h5>
                <div className="space-y-1 text-xs text-purple-600">
                  {feeStructure.package.discount > 0 && (
                    <div className="flex justify-between">
                      <span>Original total:</span>
                      <span>£{feeStructure.package.originalTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {feeStructure.package.discount > 0 && (
                    <div className="flex justify-between">
                      <span>Discount (-{feeStructure.package.discount}%):</span>
                      <span>-£{feeStructure.package.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium">
                    <span>Student pays:</span>
                    <span>£{feeStructure.package.studentPays.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>You receive:</span>
                    <span>£{feeStructure.package.coachReceives.toFixed(2)}</span>
                  </div>
                  {feeStructure.package.discount > 0 && (
                    <div className="text-xs text-purple-500 mt-1">
                      Student saves £{(feeStructure.package.studentPays - (feeStructure.single.studentPays * feeStructure.package.lessons)).toFixed(2)} vs individual lessons
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 折扣提示 */}
        <div className="mb-6">
          <p className="text-sm text-purple-600">
            Discount percentage is not required and can be 0, but offering some discount helps encourage package bookings.
          </p>
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
              <i className="material-icons text-red-600" style={{fontSize: "24px"}}>warning</i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Delete Package</h3>
            <p className="text-gray-600 text-center">
              Are you sure you want to delete this package? This action cannot be undone.
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
      <PageHeader title="Package Pricing" onBack={handleBack} />
      
      {/* 成功提示消息 */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <i className="material-icons text-green-600" style={{fontSize: "20px"}}>check_circle</i>
            </div>
            <span className="text-gray-800 font-medium">Package updated successfully</span>
          </div>
        </div>
      )}
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto">
        {!editMode ? (
          <div className="divide-y divide-gray-200">
            {/* 说明部分 */}
            <div className="p-4 bg-white">
              <h2 className="text-base font-medium text-gray-800 mb-2">Set Your Lesson Packages</h2>
              <p className="text-sm text-gray-600">
                Create discounted packages for students who commit to multiple lessons.
              </p>
            </div>
            
            {/* 套餐列表 */}
            <div className="bg-white">
              {renderPackagesTable()}
            </div>
            
            {/* 添加新套餐按钮 */}
            <div className="p-4 bg-white">
              <button 
                className="w-full py-2.5 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg font-medium flex items-center justify-center"
                onClick={handleAddNew}
              >
                <i className="material-icons mr-1.5" style={{fontSize: "20px"}}>add</i>
                Add New Package
              </button>
            </div>
            
            {/* 套餐说明 */}
            <div className="p-4 bg-white">
              <div className="flex items-start bg-purple-50 p-3 rounded-lg">
                <div className="mt-0.5 mr-3 flex-shrink-0">
                  <i className="material-icons text-purple-600" style={{fontSize: "20px"}}>info</i>
                </div>
                <div>
                  <p className="text-sm text-purple-800">
                    Packages are a great way to encourage repeat bookings. The discount is applied to your normal hourly rate.
                  </p>
                </div>
              </div>
            </div>
            
            {/* 价格示例 */}
            <div className="p-4 bg-white">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Example Price Calculation</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>60-minute lesson rate:</span>
                    <span className="font-medium">£40.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>5-lesson package (10% discount):</span>
                    <span className="font-medium">£180.00</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Student saves £20.00 compared to booking 5 individual lessons.
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

export default PackagePricingPage; 