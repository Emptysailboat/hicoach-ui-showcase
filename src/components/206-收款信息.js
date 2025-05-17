import React, { useState } from 'react';
import { ArrowLeft, CreditCard, AlertTriangle, CheckCircle, Check, AlertCircle } from 'lucide-react';

const BankDetailsPage = () => {
  // 表单状态
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    sortCode: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postcode: ''
  });
  
  // 错误状态
  const [errors, setErrors] = useState({});
  
  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除该字段的错误（如果有）
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // 验证表单
  const validateForm = () => {
    const newErrors = {};
    
    // 验证账户持有人姓名
    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account holder name is required';
    }
    
    // 验证账号
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{8}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Account number must be 8 digits';
    }
    
    // 验证排序码
    if (!formData.sortCode.trim()) {
      newErrors.sortCode = 'Sort code is required';
    } else if (!/^\d{6}$/.test(formData.sortCode)) {
      newErrors.sortCode = 'Sort code must be 6 digits';
    }
    
    // 验证银行名称
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    
    // 验证地址第一行
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address line 1 is required';
    }
    
    // 验证城市
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    // 验证邮编
    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 验证表单
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      
      // 模拟随机成功/失败（90%成功率）
      const isSuccess = Math.random() < 0.9;
      
      if (isSuccess) {
        setSubmitSuccess(true);
        console.log("Bank details submitted successfully:", formData);
      } else {
        setSubmitError('There was a problem connecting to the server. Please try again.');
      }
    }, 1500);
  };
  
  // 格式化排序码显示（添加破折号）
  const formatSortCode = (value) => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    const parts = [];
    
    for (let i = 0; i < digits.length && i < 6; i += 2) {
      parts.push(digits.slice(i, i + 2));
    }
    
    return parts.join('-');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex items-center">
          <button className="p-1 rounded-full hover:bg-gray-100 mr-2 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Bank Details</h1>
        </div>
      </div>
      
      {/* 主要内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 pt-5">
        {!submitSuccess ? (
          <>
            {/* 说明卡片 */}
            <div className="bg-white rounded-xl shadow-sm p-5 mb-5 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Payment Information</h2>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                Please provide your bank details so we can pay you for your coaching sessions. Your information is securely stored and protected.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg mb-5">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mr-2" />
                  <p className="text-sm text-yellow-700">
                    Please ensure all details are accurate. Incorrect bank details may result in delayed payments.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Payments are processed every Friday</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>You'll receive an email confirmation for each payment</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Your bank details are securely encrypted</span>
                </div>
              </div>
            </div>
            
            {/* 提交错误提示 */}
            {submitError && (
              <div className="bg-red-50 rounded-lg border border-red-200 p-3 mb-5 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-700">Submission failed</p>
                  <p className="text-xs text-red-600">{submitError}</p>
                </div>
              </div>
            )}
            
            {/* 表单 */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 账户持有人姓名 */}
              <div>
                <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Holder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="accountHolderName"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.accountHolderName ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  placeholder="e.g. John Smith"
                />
                {errors.accountHolderName && (
                  <p className="mt-1 text-xs text-red-600">{errors.accountHolderName}</p>
                )}
              </div>
              
              {/* 账号 */}
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.accountNumber ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  placeholder="8 digits"
                  maxLength={8}
                />
                {errors.accountNumber && (
                  <p className="mt-1 text-xs text-red-600">{errors.accountNumber}</p>
                )}
              </div>
              
              {/* 排序码 */}
              <div>
                <label htmlFor="sortCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="sortCode"
                  name="sortCode"
                  value={formData.sortCode}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.sortCode ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  placeholder="6 digits"
                  maxLength={6}
                />
                {formData.sortCode && (
                  <p className="mt-1 text-xs text-gray-500">Format: {formatSortCode(formData.sortCode)}</p>
                )}
                {errors.sortCode && (
                  <p className="mt-1 text-xs text-red-600">{errors.sortCode}</p>
                )}
              </div>
              
              {/* 银行名称 */}
              <div>
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.bankName ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  placeholder="e.g. HSBC"
                />
                {errors.bankName && (
                  <p className="mt-1 text-xs text-red-600">{errors.bankName}</p>
                )}
              </div>
              
              {/* 银行地址 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Bank Address</h3>
                
                {/* 地址第一行 */}
                <div className="mb-3">
                  <label htmlFor="addressLine1" className="block text-sm text-gray-700 mb-1">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.addressLine1 ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    placeholder="Street address"
                  />
                  {errors.addressLine1 && (
                    <p className="mt-1 text-xs text-red-600">{errors.addressLine1}</p>
                  )}
                </div>
                
                {/* 地址第二行 */}
                <div className="mb-3">
                  <label htmlFor="addressLine2" className="block text-sm text-gray-700 mb-1">
                    Address Line 2 <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Apartment, suite, etc."
                  />
                </div>
                
                {/* 城市和邮编 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="city" className="block text-sm text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      placeholder="e.g. London"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="postcode" className="block text-sm text-gray-700 mb-1">
                      Postcode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="postcode"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.postcode ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      placeholder="e.g. SW1A 1AA"
                    />
                    {errors.postcode && (
                      <p className="mt-1 text-xs text-red-600">{errors.postcode}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 提交按钮 */}
              <button 
                type="submit"
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium transition-colors 
                  ${isSubmitting 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white mr-2"></div>
                    Saving...
                  </span>
                ) : (
                  'Save Bank Details'
                )}
              </button>
            </form>
          </>
        ) : (
          <div>
            {/* 提交成功显示 */}
            <div className="bg-green-50 rounded-xl border border-green-200 p-5 mb-5">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-green-800">Bank Details Saved!</h2>
              </div>
              
              <p className="text-green-700 text-sm mb-4">
                Your bank details have been successfully saved. You're now ready to receive payments for your coaching sessions.
              </p>
              
              <div className="bg-white rounded-lg border border-green-100 p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Summary</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Holder:</span>
                    <span className="text-gray-800 font-medium">{formData.accountHolderName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Number:</span>
                    <span className="text-gray-800 font-medium">••••{formData.accountNumber.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sort Code:</span>
                    <span className="text-gray-800 font-medium">{formatSortCode(formData.sortCode)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bank:</span>
                    <span className="text-gray-800 font-medium">{formData.bankName}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 继续按钮 */}
            <button 
              className="w-full py-3 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 
              active:bg-green-800 font-medium transition-colors flex items-center justify-center"
              onClick={() => console.log("Navigate back to onboarding")}
            >
              <Check className="mr-1.5 h-5 w-5" /> Continue
            </button>
          </div>
        )}
        
        {/* 底部说明 */}
        <p className="text-xs text-gray-500 text-center mt-5">
          Your bank details are securely encrypted and stored in compliance with financial regulations.
        </p>
      </div>
    </div>
  );
};

export default BankDetailsPage; 