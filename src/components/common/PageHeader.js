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
    <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200">
      <div className={`${onBack ? 'w-10' : 'w-5'} flex-shrink-0`}>
        {onBack && (
          <button 
            onClick={onBack}
            className="p-1 rounded-full"
            aria-label="Go back"
          >
            <i className="material-icons-outlined text-gray-700" style={{fontSize: "20px"}}>arrow_back</i>
          </button>
        )}
      </div>
      <h2 className="text-lg font-semibold flex-1 text-center">{title}</h2>
      <div className="w-10 flex-shrink-0 flex justify-end">
        {rightElement || null}
      </div>
    </div>
  );
};

export default PageHeader; 