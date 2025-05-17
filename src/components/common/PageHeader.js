import React from 'react';

/**
 * 页面顶部标题栏通用组件
 * @param {Object} props
 * @param {string} props.title - 页面标题
 * @param {Function} props.onBack - 点击返回按钮时的回调函数
 * @param {React.ReactNode} props.rightElement - 右侧元素，可选
 */
const PageHeader = ({ title, onBack, rightElement }) => {
  return (
    <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
      {onBack && (
        <button 
          className="p-1.5 rounded-full active:bg-gray-100"
          onClick={onBack}
          aria-label="Go back"
        >
          <i className="material-icons-round text-gray-700" style={{ fontSize: '20px' }}>arrow_back_ios_new</i>
        </button>
      )}
      <div className="flex-1 flex justify-center">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>
      <div className="w-8">
        {rightElement || null}
      </div>
    </div>
  );
};

export default PageHeader; 