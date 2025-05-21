import React, { useState } from 'react';
import { Plus, Package, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import PageHeader from './common/PageHeader';

const PackagePricingPage = () => {
  // 状态管理
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "5-Lesson Package",
      lessons: 5,
      discount: 10,
      active: true
    },
    {
      id: 2,
      name: "10-Lesson Package",
      lessons: 10,
      discount: 15,
      active: true
    }
  ]);
  
  const [editMode, setEditMode] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [packageName, setPackageName] = useState('');
  const [numberOfLessons, setNumberOfLessons] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showNameError, setShowNameError] = useState(false);
  const [showLessonsError, setShowLessonsError] = useState(false);
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
    setPackageName('');
    setNumberOfLessons('');
    setDiscountPercent('');
    clearErrors();
  };
  
  // 打开编辑表单
  const handleEdit = (pkg) => {
    setEditMode(true);
    setEditingPackage(pkg.id);
    setPackageName(pkg.name);
    setNumberOfLessons(pkg.lessons.toString());
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
    setShowNameError(false);
    setShowLessonsError(false);
    setShowDiscountError(false);
  };
  
  // 验证表单
  const validateForm = () => {
    let isValid = true;
    
    // 验证套餐名称
    if (!packageName.trim()) {
      setShowNameError(true);
      isValid = false;
    }
    
    // 验证课程数量
    if (!numberOfLessons || isNaN(parseInt(numberOfLessons)) || parseInt(numberOfLessons) <= 1) {
      setShowLessonsError(true);
      isValid = false;
    }
    
    // 验证折扣
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
    
    if (editingPackage) {
      // 更新现有套餐
      setPackages(prevPackages =>
        prevPackages.map(pkg =>
          pkg.id === editingPackage
            ? { 
                ...pkg, 
                name: packageName, 
                lessons: parseInt(numberOfLessons), 
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
                  <Package className={`h-5 w-5 ${pkg.active ? 'text-purple-600' : 'text-gray-500'}`} />
                </div>
                <div>
                  <h3 className={`font-medium ${pkg.active ? 'text-gray-800' : 'text-gray-500'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-sm ${pkg.active ? 'text-gray-600' : 'text-gray-400'}`}>
                    {pkg.lessons} lessons • {pkg.discount}% discount
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                {/* 激活/停用开关 */}
                <label className="inline-flex items-center cursor-pointer mr-4">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={pkg.active}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleActive(pkg.id);
                    }} 
                  />
                  <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                </label>
                
                {/* 删除按钮 */}
                <button 
                  className="p-1.5 rounded-full hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(pkg.id);
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
          {editingPackage ? 'Edit Package' : 'Add New Package'}
        </h2>
        
        {/* 套餐名称 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => {
              setPackageName(e.target.value);
              setShowNameError(false);
            }}
            placeholder="e.g. 5-Lesson Package"
            className={`w-full p-2.5 border rounded-lg text-gray-700 text-sm ${
              showNameError 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-purple-500'
            } focus:border-transparent focus:ring-2`}
          />
          {showNameError && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a package name
            </p>
          )}
        </div>
        
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
        
        {/* 折扣百分比 */}
        <div className="mb-6">
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
              <CheckCircle className="h-5 w-5 text-green-600" />
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
                className="w-full py-2.5 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50"
                onClick={handleAddNew}
              >
                <Plus className="h-5 w-5 mr-1.5" />
                Add New Package
              </button>
            </div>
            
            {/* 套餐说明 */}
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