import React, { useState } from 'react';
import PageHeader from './common/PageHeader';
// 移除不需要的导入，因为图标库已在index.html中引入

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const passwordStrength = () => {
    if (!newPassword) return 0;
    
    let score = 0;
    if (newPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;
    
    return score;
  };
  
  const getStrengthLabel = () => {
    const strength = passwordStrength();
    if (strength === 0) return '';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };
  
  const getStrengthColor = () => {
    const strength = passwordStrength();
    if (strength === 0) return 'bg-gray-200';
    if (strength === 1) return 'bg-red-500';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-blue-500';
    return 'bg-green-600';
  };
  
  const getStrengthTextColor = () => {
    const strength = passwordStrength();
    if (strength === 0) return 'text-gray-500';
    if (strength === 1) return 'text-red-500';
    if (strength === 2) return 'text-yellow-500';
    if (strength === 3) return 'text-blue-500';
    return 'text-green-600';
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (isFormValid()) {
      setFormSuccess(true);
    }
  };
  
  const passwordRequirementsMet = {
    length: newPassword.length >= 8,
    upperLower: /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword),
    numbers: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword)
  };
  
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== '';
  
  const isFormValid = () => {
    return (
      currentPassword && 
      newPassword && 
      confirmPassword && 
      passwordsMatch && 
      passwordStrength() >= 2
    );
  };
  
  // 处理返回按钮点击事件
  const handleBack = () => {
    if (showForgotPassword) {
      setShowForgotPassword(false);
    } else {
      console.log('Back button clicked');
      // 在实际应用中，这里应该是导航回上一页
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 使用PageHeader组件替换原有顶部标题栏 */}
      <div className="sticky top-0 z-10 shadow-sm">
        <PageHeader
          title={showForgotPassword ? "Reset Password" : "Change Password"}
          onBack={handleBack}
          rightElement={null}
        />
      </div>
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto pb-16">
        {showForgotPassword ? (
          <div className="px-6 py-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Reset Your Password</h2>
            <p className="text-gray-600 mb-6">Enter your email address and we'll send you instructions to reset your password.</p>
            
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <span className="material-icons-round text-gray-400" style={{fontSize: '20px'}}>email</span>
                </div>
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#00B36F] focus:ring-1 focus:ring-[#00B36F] outline-none"
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
              </div>
            </div>
            
            <button 
              type="button" 
              className="w-full py-3 bg-[#00B36F] text-white font-medium rounded-lg mb-3"
            >
              Send Reset Instructions
            </button>
            
            <button 
              type="button" 
              className="w-full py-2.5 text-gray-600 font-medium rounded-lg border border-gray-300 bg-gray-50"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </button>
          </div>
        ) : formSuccess ? (
          <div className="px-6 py-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <span className="material-icons-round text-[#00B36F]" style={{fontSize: '32px'}}>check</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Password Changed!</h2>
            <p className="text-gray-600 text-center mb-6">Your password has been updated successfully.</p>
            <button 
              className="px-6 py-2.5 bg-[#00B36F] text-white font-medium rounded-lg"
              onClick={() => window.history.back()}
            >
              Back to Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6">
            {/* 当前密码 */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <button 
                  type="button" 
                  className="text-xs font-medium text-[#00B36F]"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  className={`w-full px-4 py-2.5 rounded-lg border ${formSubmitted && !currentPassword ? 'border-red-300' : 'border-gray-200'} focus:border-[#00B36F] focus:ring-1 focus:ring-[#00B36F] outline-none`}
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-icons-round" style={{fontSize: '20px'}}>
                    {showCurrentPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {formSubmitted && !currentPassword && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center">
                  <span className="material-icons-round text-red-600 mr-1" style={{fontSize: '16px'}}>error</span>
                  Please enter your current password
                </p>
              )}
            </div>
            
            {/* 新密码 */}
            <div className="mb-5">
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  className={`w-full px-4 py-2.5 rounded-lg border ${formSubmitted && !newPassword ? 'border-red-300' : 'border-gray-200'} focus:border-[#00B36F] focus:ring-1 focus:ring-[#00B36F] outline-none`}
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-icons-round" style={{fontSize: '20px'}}>
                    {showNewPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {formSubmitted && !newPassword && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center">
                  <span className="material-icons-round text-red-600 mr-1" style={{fontSize: '16px'}}>error</span>
                  Please enter a new password
                </p>
              )}
              
              {/* 密码强度指示器 */}
              {newPassword && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-500">Password Strength</p>
                    <p className={`text-xs font-medium ${getStrengthTextColor()}`}>
                      {getStrengthLabel()}
                    </p>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()}`} 
                      style={{ width: `${passwordStrength() * 25}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 确认新密码 */}
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    formSubmitted && (!confirmPassword || (confirmPassword && !passwordsMatch)) 
                      ? 'border-red-300' 
                      : confirmPassword && passwordsMatch 
                        ? 'border-[#00B36F]' 
                        : 'border-gray-200'
                  } focus:border-[#00B36F] focus:ring-1 focus:ring-[#00B36F] outline-none`}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-icons-round" style={{fontSize: '20px'}}>
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {formSubmitted && !confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center">
                  <span className="material-icons-round text-red-600 mr-1" style={{fontSize: '16px'}}>error</span>
                  Please confirm your new password
                </p>
              )}
              {formSubmitted && confirmPassword && !passwordsMatch && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center">
                  <span className="material-icons-round text-red-600 mr-1" style={{fontSize: '16px'}}>error</span>
                  Passwords don't match
                </p>
              )}
              {confirmPassword && passwordsMatch && (
                <p className="mt-1.5 text-sm text-[#00B36F] flex items-center">
                  <span className="material-icons-round text-[#00B36F] mr-1" style={{fontSize: '16px'}}>check</span>
                  Passwords match
                </p>
              )}
            </div>
            
            {/* 密码提示 */}
            <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-100">
              <h3 className="text-sm font-medium text-purple-700 mb-2">Password Tips</h3>
              <ul className="space-y-1.5">
                <li className="text-sm flex items-start">
                  <span className="text-purple-600 font-medium mr-2">1.</span>
                  <span className="text-gray-600 flex-1">
                    Use at least 8 characters
                    {passwordRequirementsMet.length && (
                      <span className="material-icons-round text-[#00B36F] inline ml-1" style={{fontSize: '14px'}}>check</span>
                    )}
                  </span>
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-purple-600 font-medium mr-2">2.</span>
                  <span className="text-gray-600 flex-1">
                    Include uppercase and lowercase letters
                    {passwordRequirementsMet.upperLower && (
                      <span className="material-icons-round text-[#00B36F] inline ml-1" style={{fontSize: '14px'}}>check</span>
                    )}
                  </span>
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-purple-600 font-medium mr-2">3.</span>
                  <span className="text-gray-600 flex-1">
                    Add numbers and special characters
                    {(passwordRequirementsMet.numbers && passwordRequirementsMet.special) && (
                      <span className="material-icons-round text-[#00B36F] inline ml-1" style={{fontSize: '14px'}}>check</span>
                    )}
                  </span>
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-purple-600 font-medium mr-2">4.</span>
                  <span className="text-gray-600">Avoid using personal information</span>
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-purple-600 font-medium mr-2">5.</span>
                  <span className="text-gray-600">Don't reuse passwords across different services</span>
                </li>
              </ul>
            </div>
            
            {/* 提交按钮 */}
            <button 
              type="submit" 
              className={`w-full py-3 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B36F] ${
                isFormValid() 
                  ? 'bg-[#00B36F] cursor-pointer' 
                  : 'bg-[#66D19C] cursor-not-allowed opacity-70'
              }`}
              disabled={!isFormValid()}
            >
              Update Password
            </button>
          </form>
        )}
      </div>
      
      {/* 底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 grid grid-cols-4 shadow-md max-w-md mx-auto">
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons-round text-gray-500" style={{fontSize: '20px'}}>home</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-0.5">Home</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons-round text-gray-500" style={{fontSize: '20px'}}>menu_book</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-0.5">Lessons</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-icons-round text-gray-500" style={{fontSize: '20px'}}>favorite</span>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-0.5">My Coaches</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#E5F7EC] flex items-center justify-center">
            <span className="material-icons-round text-[#00B36F]" style={{fontSize: '20px'}}>person</span>
          </div>
          <span className="text-xs font-medium text-[#00B36F] mt-0.5">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordPage; 