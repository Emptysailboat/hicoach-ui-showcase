import React, { useState } from 'react';
import { ChevronLeft, Mail, HelpCircle, Trash2, ExternalLink, ChevronRight, BookOpen } from 'lucide-react';
import PageHeader from './common/PageHeader';

const SupportPage = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 定义支持选项
  const supportOptions = [
    {
      id: 'email',
      icon: <Mail className="w-5 h-5" />,
      title: 'Email Hicoach Team',
      description: 'Get direct support from our team',
      action: 'mailto:support@hicoach.com',
      external: false
    },
    {
      id: 'support-center',
      icon: <HelpCircle className="w-5 h-5" />,
      title: 'Support Center',
      description: 'Browse FAQs and help articles',
      action: 'https://hicoach.com/support',
      external: true
    },
    {
      id: 'app-guide',
      icon: <BookOpen className="w-5 h-5" />,
      title: 'App Guide',
      description: 'Learn how to use all features of Hicoach',
      action: 'https://hicoach.com/guide',
      external: true,
      new: true
    },
    {
      id: 'delete-account',
      icon: <Trash2 className="w-5 h-5" />,
      title: 'Delete Account',
      description: 'Permanently delete your account and data',
      action: '/account/delete',
      external: false,
      danger: true
    }
  ];

  // 处理选项点击
  const handleOptionClick = (option) => {
    if (option.id === 'delete-account') {
      setShowDeleteConfirm(true);
      return;
    }

    console.log(`Navigating to: ${option.action}`);
    if (option.external) {
      window.open(option.action, '_blank');
    } else if (option.action.startsWith('mailto:')) {
      window.location.href = option.action;
    } else {
      console.log(`Internal navigation to: ${option.action}`);
    }
  };

  // 处理删除确认
  const handleDeleteConfirm = () => {
    console.log('Account deletion confirmed');
    setShowDeleteConfirm(false);
    // 在实际应用中，这里会执行删除账户的操作
  };

  // 用于返回上一级页面的函数
  const handleBack = () => {
    console.log('Navigate back to profile page');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 使用PageHeader组件替换原有顶部标题栏 */}
      <div className="sticky top-0 z-10 shadow-sm">
        <PageHeader
          title="Support"
          onBack={handleBack}
          rightElement={null}
        />
      </div>
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4">
          {/* 支持选项卡片 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-gray-200">
            {supportOptions.map((option, index) => (
              <div 
                key={option.id}
                className={`
                  ${index !== supportOptions.length - 1 ? 'border-b border-gray-100' : ''}
                `}
              >
                <button 
                  onClick={() => handleOptionClick(option)}
                  className={`
                    w-full p-4 flex items-center justify-between text-left
                    ${option.danger ? 'bg-red-50' : 'bg-white'}
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    ${option.danger ? 'focus:ring-red-500' : 'focus:ring-green-500'}
                    focus:ring-opacity-50
                  `}
                  aria-label={option.title}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0
                      ${option.danger ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}
                    `}>
                      {option.icon}
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${option.danger ? 'text-red-600' : 'text-gray-800'}`}>
                          {option.title}
                        </span>
                        {option.new && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full font-medium">
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {option.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center flex-shrink-0 ml-2">
                    {option.external && (
                      <ExternalLink className="w-4 h-4 text-gray-400 mr-1" />
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              </div>
            ))}
          </div>
          
          {/* 联系信息 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 p-4 border border-gray-200">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h2>
            <div className="space-y-2">
              <p className="text-xs text-gray-500 flex items-center">
                <span className="inline-block w-32">Business Hours:</span> 
                <span className="font-medium">9am - 6pm (Monday to Friday)</span>
              </p>
              <p className="text-xs text-gray-500 flex items-center">
                <span className="inline-block w-32">Response Time:</span> 
                <span className="font-medium">Usually within 24 hours</span>
              </p>
            </div>
          </div>
          
          {/* 版本信息 */}
          <div className="mt-8 mb-4 text-center">
            <p className="text-xs text-gray-400">App version 1.0.3</p>
            <p className="text-xs text-gray-400 mt-1">© 2025 Hicoach. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Account Deletion</h3>
            <p className="text-sm text-gray-600 mb-4">
              This action will permanently delete your account and all associated data. This cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage; 