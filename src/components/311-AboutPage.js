import React from 'react';
import { ChevronLeft, FileText, Shield, Lock, ExternalLink, ChevronRight } from 'lucide-react';

const AboutPage = () => {
  // 定义关于选项
  const aboutOptions = [
    {
      id: 'legal-notices',
      icon: <FileText className="w-5 h-5" />,
      title: 'Legal Notices',
      description: 'Copyright and licensing information',
      action: 'https://hicoach.com/legal',
      external: true
    },
    {
      id: 'terms',
      icon: <Shield className="w-5 h-5" />,
      title: 'Terms & Conditions',
      description: 'Rules and guidelines for using our service',
      action: 'https://hicoach.com/terms',
      external: true
    },
    {
      id: 'privacy',
      icon: <Lock className="w-5 h-5" />,
      title: 'Privacy Policy',
      description: 'How we collect, use and protect your data',
      action: 'https://hicoach.com/privacy',
      external: true
    }
  ];

  // 处理选项点击
  const handleOptionClick = (action) => {
    console.log(`Navigating to: ${action}`);
    // 在实际应用中，这里会使用导航库或window.location来导航
    window.open(action, '_blank');
  };

  // 用于模拟返回上一级页面的函数
  const handleBack = () => {
    console.log('Navigate back to profile page');
    // 在实际应用中，这里会导航回个人资料页面
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 顶部标题栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex items-center">
          <button className="p-1 rounded-full hover:bg-gray-100 mr-2 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-700" onClick={handleBack} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">About</h1>
        </div>
      </div>
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* 关于选项卡片 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-gray-200">
            {aboutOptions.map((option, index) => (
              <div 
                key={option.id}
                className={index !== aboutOptions.length - 1 ? 'border-b border-gray-100' : ''}
              >
                <button 
                  onClick={() => handleOptionClick(option.action)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mr-3">
                      {option.icon}
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        {option.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {option.external && (
                      <ExternalLink className="w-4 h-4 text-gray-400 mr-1" />
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              </div>
            ))}
          </div>
          
          {/* 应用信息 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 p-4 border border-gray-200">
            <div className="flex flex-col items-center">
              {/* 应用图标 */}
              <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-3 border border-green-100">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              <h2 className="text-base font-semibold text-gray-800 mb-1">HiCoach Tennis</h2>
              <p className="text-sm text-gray-500 mb-3">Version 1.0.3</p>
              
              <p className="text-xs text-gray-500 text-center mb-2">© 2025 HiCoach Inc. All rights reserved.</p>
            </div>
          </div>
          
          {/* 开发者信息 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 p-4 border border-gray-200">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Development</h2>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-500">Design & Development: HiCoach Team</p>
              <p className="text-xs text-gray-500">Contact: developers@hicoach.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 