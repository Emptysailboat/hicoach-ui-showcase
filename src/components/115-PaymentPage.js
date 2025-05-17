import React, { useState } from 'react';

const PaymentPage = () => {
  // 支付信息状态
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // 模拟订单摘要数据
  const orderSummary = {
    packageName: 'Intermediate Package',
    price: 350,
    discount: 30,
    bookingFee: 5,
    platformFee: 3,
    totalAmount: 328,
    coach: 'Sarah Johnson',
    startDate: 'Mon, Apr 18',
    location: 'Central Park Courts'
  };
  
  // 格式化信用卡号，每4位添加空格
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // 格式化过期日期
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  // 处理信用卡号输入
  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    setCardNumber(formatCardNumber(input));
  };
  
  // 处理过期日期输入
  const handleExpiryDateChange = (e) => {
    const input = e.target.value;
    setExpiryDate(formatExpiryDate(input));
  };
  
  // 检查表单是否完整
  const isFormComplete = () => {
    // 最基本的要求是接受条款
    if (!acceptTerms) return false;
    
    // 如果选择的是信用卡，还需要检查其他字段
    if (paymentMethod === 'credit-card') {
      return (
        cardNumber.replace(/\s/g, '').length === 16 &&
        cardName.trim() !== '' &&
        expiryDate.length === 5 &&
        cvv.length === 3
      );
    }
    
    // 对于Apple Pay和Google Pay，只需要同意条款就可以
    return true;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1">
          <i className="material-icons-round text-gray-700">arrow_back_ios_new</i>
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-semibold">Payment</h1>
        </div>
        <div className="w-5"></div>
      </div>
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto px-4 py-5">
        {/* 价格详情卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-5">
          <h4 className="font-medium text-primary-600 mb-3">Price Details</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Package price:</span>
              <span className="text-gray-800">£{orderSummary.price}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Package discount:</span>
              <span className="text-primary-600">-£30</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Booking fee:</span>
              <span className="text-gray-800">£5</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Platform support fee:</span>
              <span className="text-gray-800">£3</span>
            </div>
            
            <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
              <span className="font-medium text-gray-800">Total:</span>
              <span className="font-medium text-primary-700">£{orderSummary.totalAmount}</span>
            </div>
          </div>
        </div>
        
        {/* 支付方式选择 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-5">
          <h4 className="font-medium text-primary-600 mb-3">Payment Method</h4>
          
          <div className="space-y-3">
            <div 
              className={`flex items-center p-3 rounded-lg border-2 ${
                paymentMethod === 'credit-card' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200'
              } cursor-pointer`}
              onClick={() => setPaymentMethod('credit-card')}
            >
              <div className={`w-5 h-5 rounded-full ${paymentMethod === 'credit-card' ? 'border-primary-600 bg-primary-600' : 'border border-gray-300'} flex items-center justify-center mr-3`}>
                {paymentMethod === 'credit-card' && 
                  <i className="material-icons-round text-white" style={{ fontSize: '14px' }}>check</i>
                }
              </div>
              <i className="material-icons-round text-gray-600 mr-2">credit_card</i>
              <span className="text-gray-800">Credit / Debit Card</span>
            </div>
            
            <div 
              className={`flex items-center p-3 rounded-lg border-2 ${
                paymentMethod === 'apple-pay' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200'
              } cursor-pointer`}
              onClick={() => setPaymentMethod('apple-pay')}
            >
              <div className={`w-5 h-5 rounded-full ${paymentMethod === 'apple-pay' ? 'border-primary-600 bg-primary-600' : 'border border-gray-300'} flex items-center justify-center mr-3`}>
                {paymentMethod === 'apple-pay' && 
                  <i className="material-icons-round text-white" style={{ fontSize: '14px' }}>check</i>
                }
              </div>
              <span className="text-gray-800">Apple Pay</span>
            </div>
            
            <div 
              className={`flex items-center p-3 rounded-lg border-2 ${
                paymentMethod === 'google-pay' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200'
              } cursor-pointer`}
              onClick={() => setPaymentMethod('google-pay')}
            >
              <div className={`w-5 h-5 rounded-full ${paymentMethod === 'google-pay' ? 'border-primary-600 bg-primary-600' : 'border border-gray-300'} flex items-center justify-center mr-3`}>
                {paymentMethod === 'google-pay' && 
                  <i className="material-icons-round text-white" style={{ fontSize: '14px' }}>check</i>
                }
              </div>
              <span className="text-gray-800">Google Pay</span>
            </div>
          </div>
        </div>
        
        {/* 信用卡表单 - 仅在选择信用卡时显示 */}
        {paymentMethod === 'credit-card' && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-5">
            <div className="flex items-center mb-3">
              <i className="material-icons-round text-primary-600 mr-2">credit_card</i>
              <h4 className="font-medium text-primary-600">Card Details</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                    placeholder="123"
                    maxLength={3}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="save-card"
                  checked={saveCard}
                  onChange={() => setSaveCard(!saveCard)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="save-card" className="ml-2 text-sm text-gray-600">
                  Save card for future payments
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Apple Pay 说明 */}
        {paymentMethod === 'apple-pay' && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-5 text-center">
            <p className="text-gray-700 mb-3">Click the "Pay" button to complete your payment with Apple Pay.</p>
          </div>
        )}
        
        {/* Google Pay 说明 */}
        {paymentMethod === 'google-pay' && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-5 text-center">
            <p className="text-gray-700 mb-3">Click the "Pay" button to complete your payment with Google Pay.</p>
          </div>
        )}
        
        {/* 条款和条件 */}
        <div className="mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the <span className="text-primary-600">Payment Terms</span> and <span className="text-primary-600">Refund Policy</span>. I understand that applicable fees may apply in case of cancellation.
            </label>
          </div>
        </div>
        
        {/* 支付安全信息 */}
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 mb-5">
          <div className="flex">
            <i className="material-icons-round text-purple-600 mr-2 flex-shrink-0">lock</i>
            <p className="text-sm text-purple-700">
              Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
            </p>
          </div>
        </div>
        
        {/* 底部导航 */}
        <div className="flex justify-end">
          <button 
            className={`px-5 py-2.5 rounded-lg font-medium ${
              isFormComplete() 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isFormComplete()}
          >
            {paymentMethod === 'credit-card' ? 'Pay' : `Pay with ${paymentMethod === 'apple-pay' ? 'Apple Pay' : 'Google Pay'}`} £{orderSummary.totalAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 