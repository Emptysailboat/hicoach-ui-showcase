import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

const VerifyIdentityPage = () => {
  // 状态用于跟踪验证是否已启动
  const [verificationStarted, setVerificationStarted] = useState(false);
  
  // 模拟启动身份验证流程
  const startVerification = () => {
    setVerificationStarted(true);
    // 在实际应用中，这里会重定向到第三方服务商
    console.log("Starting third-party verification flow...");
    // 模拟跳转
    setTimeout(() => {
      // 这会在实际应用中替换为重定向到第三方验证服务
      alert("Redirecting to third-party identity verification service...");
    }, 1000);
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <PageHeader title="Verify Your Identity" onBack={handleBack} />
      
      {/* 主要内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 pt-5">
        {/* 说明卡片 */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-5 border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="material-icons text-green-600" style={{ fontSize: '20px' }}>security</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Identity Verification</h2>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            To ensure safety and trust on our platform, we require all coaches to verify their identity. 
            This is a secure process powered by our trusted partner.
          </p>
          
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">What you'll need:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-green-600 font-bold">•</span>
                <span>A valid government-issued photo ID (passport, driver's license, residence permit)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600 font-bold">•</span>
                <span>Your device's camera for a quick selfie</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600 font-bold">•</span>
                <span>A few minutes of your time (process typically takes 3-5 minutes)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-r-lg mb-5">
            <div className="flex">
              <span className="material-icons text-purple-600" style={{ fontSize: '20px', marginRight: '8px' }}>warning</span>
              <p className="text-sm text-purple-700">
                Your information is securely processed and protected. We only verify your identity and don't store sensitive document data.
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="material-icons text-green-600" style={{ fontSize: '20px', marginRight: '8px' }}>check_circle</span>
              <span>Quick and easy process</span>
            </div>
            <div className="flex items-start">
              <span className="material-icons text-green-600" style={{ fontSize: '20px', marginRight: '8px' }}>check_circle</span>
              <span>Secure and encrypted</span>
            </div>
            <div className="flex items-start">
              <span className="material-icons text-green-600" style={{ fontSize: '20px', marginRight: '8px' }}>check_circle</span>
              <span>Required only once</span>
            </div>
          </div>
        </div>
        
        {/* 主按钮 */}
        <button 
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium 
            ${verificationStarted 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-green-600 text-white active:bg-green-800'}`}
          onClick={startVerification}
          disabled={verificationStarted}
        >
          {verificationStarted ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white mr-2"></div>
              Redirecting...
            </span>
          ) : (
            <span className="flex items-center">
              Start Verification 
              <span className="material-icons" style={{ fontSize: '16px', marginLeft: '8px' }}>open_in_new</span>
            </span>
          )}
        </button>
        
        {/* 底部说明 */}
        <p className="text-xs text-gray-500 text-center mt-5">
          By proceeding, you agree to our terms and conditions regarding identity verification.
        </p>
      </div>
    </div>
  );
};

export default VerifyIdentityPage; 