import React from 'react';

/**
 * 通用滑动开关组件
 * @param {boolean} isOn - 当前开关状态
 * @param {function} onToggle - 切换开关时的回调
 * @param {string} className - 可选，外部自定义样式
 * @param {boolean} disabled - 可选，是否禁用
 * @param {string} ariaLabel - 可选，无障碍标签
 */
const ToggleSwitch = ({
  isOn,
  onToggle,
  className = '',
  disabled = false,
  ariaLabel = 'toggle switch'
}) => (
  <label className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}>
    <input
      type="checkbox"
      className="sr-only"
      checked={isOn}
      onChange={onToggle}
      aria-checked={isOn}
      role="switch"
      disabled={disabled}
      aria-label={ariaLabel}
    />
    <div
      className="relative w-11 h-6 rounded-full transition-colors"
      style={{
        backgroundColor: isOn ? '#059669' : '#d1d5db',
        transition: 'background-color 0.2s'
      }}
    >
      <div
        className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform"
        style={{
          transform: isOn ? 'translateX(20px)' : 'translateX(0)',
          transition: 'transform 0.2s'
        }}
      ></div>
    </div>
  </label>
);

export default ToggleSwitch; 