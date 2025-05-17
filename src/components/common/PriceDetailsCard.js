import React from 'react';

/**
 * 价格详情卡片组件
 * @param {Object} props
 * @param {number} props.subtotal - 小计金额
 * @param {number} props.discount - 折扣金额
 * @param {Array} props.fees - 费用项数组，每项为 {name: string, amount: number}
 * @param {number} props.total - 总计金额
 * @param {string} props.className - 额外的CSS类名
 * @param {string} props.title - 卡片标题，默认为"Price Details"
 * @param {string} props.currencySymbol - 货币符号，默认为"£"
 */
const PriceDetailsCard = ({
  subtotal,
  discount = 0,
  fees = [],
  total,
  className = '',
  title = 'Price Details',
  currencySymbol = '£'
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 border border-gray-200 ${className}`}>
      <h4 className="font-medium text-primary-600 mb-3">{title}</h4>
      
      <div className="space-y-2">
        {/* 小计 */}
        {subtotal !== undefined && (
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800">{currencySymbol}{subtotal}</span>
          </div>
        )}
        
        {/* 折扣 */}
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">-{currencySymbol}{discount}</span>
          </div>
        )}
        
        {/* 各种费用 */}
        {fees.map((fee, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">{fee.name}</span>
            <span className="text-gray-800">{currencySymbol}{fee.amount}</span>
          </div>
        ))}
        
        {/* 总计 */}
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-800">Total</span>
            <span className="font-medium text-primary-600">{currencySymbol}{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceDetailsCard; 