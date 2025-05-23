import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

const CoachPromotePage = () => {
  const [linkCopied, setLinkCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // 模拟推广链接和促销码
  const promotionLink = "https://tennis-coach.app/join/alex123";
  const promotionCode = "ALEXTENNIS5";
  
  const handleCopyLink = () => {
    setLinkCopied(true);
    setToastMessage('Link copied to clipboard!');
    setShowToast(true);
    
    // 在实际应用中这行会执行复制操作
    // navigator.clipboard.writeText(promotionLink);
    
    setTimeout(() => {
      setLinkCopied(false);
      setShowToast(false);
    }, 2000);
  };
  
  const handleCopyCode = () => {
    setCodeCopied(true);
    setToastMessage('Promotion code copied!');
    setShowToast(true);
    setTimeout(() => {
      setCodeCopied(false);
      setShowToast(false);
    }, 2000);
  };
  
  const handleShare = () => {
    setToastMessage('Sharing options opened');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden relative">
      {/* Toast 通知 */}
      {showToast && (
        <div className="fixed top-20 left-0 right-0 mx-auto w-4/5 bg-gray-800 text-white py-2.5 px-4 rounded-lg z-50 flex items-center justify-center shadow-lg" style={{ maxWidth: "320px" }}>
          <span className="material-icons text-sm mr-2">check_circle</span>
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}
      
      {/* 顶部标题栏 */}
      <PageHeader 
        title="Promote Yourself" 
        onBack={() => console.log('Navigate back')}
      />
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto pb-16 pt-4">
        {/* 提示文本 */}
        <div className="px-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Grow Your Coaching Business</h2>
          <p className="text-gray-600">Share your app link and promotion code with potential students to build your client base.</p>
        </div>
        
        {/* 分享应用链接卡片 */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                <span className="material-icons">share</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Share Your Link</h3>
            </div>
            
            <p className="text-gray-600 mb-4">Share this link with potential students so they can download the app and book lessons with you.</p>
            
            {/* 链接显示 */}
            <div className="flex items-center bg-gray-50 p-3.5 rounded-lg border border-gray-200 mb-4">
              <div className="flex-1 truncate text-gray-700 font-medium text-center">
                {promotionLink}
              </div>
            </div>
            
            {/* 复制链接按钮 */}
            <button 
              onClick={handleCopyLink}
              className={`w-full py-3 mt-2 rounded-lg flex items-center justify-center font-medium ${
                linkCopied 
                  ? 'bg-green-100 text-green-600 border border-green-200' 
                  : 'bg-green-600 text-white'
              }`}
            >
              {linkCopied ? (
                <>
                  <span className="material-icons mr-2">check_circle</span>
                  Copied!
                </>
              ) : (
                <>
                  <span className="material-icons mr-2">content_copy</span>
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* 促销码卡片 */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                <span className="material-icons">card_giftcard</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Promotion Code</h3>
            </div>
            
            <p className="text-gray-600 mb-4">Share this code with new students to give them £5 off their first lesson with you.</p>
            
            {/* 特色展示促销码 */}
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-4 flex flex-col items-center">
              <span className="text-sm text-purple-600 font-medium mb-1">YOUR PROMO CODE</span>
              <span className="text-2xl font-bold tracking-wider text-gray-800 mb-1">{promotionCode}</span>
              <span className="text-sm text-gray-600">£5 off first lesson</span>
              <div className="mt-2 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                Valid for new students only
              </div>
            </div>
            
            {/* 复制按钮 */}
            <button 
              onClick={handleCopyCode}
              className={`w-full py-3 rounded-lg flex items-center justify-center font-medium ${
                codeCopied 
                  ? 'bg-green-100 text-green-600 border border-green-200' 
                  : 'bg-purple-600 text-white'
              }`}
            >
              {codeCopied ? (
                <>
                  <span className="material-icons mr-2">check_circle</span>
                  Code Copied!
                </>
              ) : (
                <>
                  <span className="material-icons mr-2">content_copy</span>
                  Copy Promotion Code
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* 使用说明 */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">How It Works</h3>
            
            <div className="flex mb-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                <span className="font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Share your link</h4>
                <p className="text-gray-600 text-sm">Send your personalized link to potential students.</p>
              </div>
            </div>
            
            <div className="flex mb-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                <span className="font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Share your promo code</h4>
                <p className="text-gray-600 text-sm">Give them your unique code for £5 discount.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                <span className="font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Grow your business</h4>
                <p className="text-gray-600 text-sm">Track new students who book through your link.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 追踪数据 */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-4">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Promotion Stats</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">12</span>
                <span className="text-xs text-gray-600">Link Clicks</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">5</span>
                <span className="text-xs text-gray-600">App Downloads</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex flex-col items-center">
                <span className="text-2xl font-bold text-green-600">3</span>
                <span className="text-xs text-gray-600">New Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachPromotePage; 