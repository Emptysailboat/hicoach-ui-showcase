import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

const PaymentMethodsPage = () => {
  // 状态管理
  const [creditCardExpanded, setCreditCardExpanded] = useState(true);
  const [digitalWalletExpanded, setDigitalWalletExpanded] = useState(true);
  const [addCardMode, setAddCardMode] = useState(false);
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvc: ''
  });
  
  // 统一的默认支付方式状态
  const [defaultPayment, setDefaultPayment] = useState({
    type: 'card', // 'card', 'apple_pay', 'google_pay'
    id: 1 // 如果是卡片，则存储卡片ID
  });
  
  // 表单状态
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  
  // 模拟已保存的信用卡
  const [savedCards, setSavedCards] = useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '04/25' }
  ]);
  
  // 检测信用卡类型
  const detectCardType = (number) => {
    // 移除所有空格和非数字字符
    const cardNumber = number.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    let re = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
    };
    
    if (re.visa.test(cardNumber)) return 'Visa';
    if (re.mastercard.test(cardNumber)) return 'Mastercard';
    if (re.amex.test(cardNumber)) return 'American Express';
    if (re.discover.test(cardNumber)) return 'Discover';
    
    // 对于不完整的卡号，基于前几位预测
    if (/^4/.test(cardNumber)) return 'Visa';
    if (/^5[1-5]/.test(cardNumber)) return 'Mastercard';
    if (/^3[47]/.test(cardNumber)) return 'American Express';
    if (/^6(?:011|5)/.test(cardNumber)) return 'Discover';
    
    return '';
  };
  
  // 格式化信用卡号
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
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
  
  // 验证表单
  const validateForm = () => {
    let errors = {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvc: ''
    };
    let isValid = true;
    
    // 验证卡号
    const strippedCardNumber = cardNumber.replace(/\s+/g, '');
    if (!strippedCardNumber) {
      errors.cardNumber = 'Card number is required';
      isValid = false;
    } else if (strippedCardNumber.length < 13 || strippedCardNumber.length > 19) {
      errors.cardNumber = 'Invalid card number length';
      isValid = false;
    }
    
    // 验证持卡人姓名
    if (!cardholderName.trim()) {
      errors.cardholderName = 'Cardholder name is required';
      isValid = false;
    }
    
    // 验证到期日期
    if (!expiryDate) {
      errors.expiryDate = 'Expiry date is required';
      isValid = false;
    } else {
      const [month, year] = expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // 获取后两位
      const currentMonth = currentDate.getMonth() + 1; // 月份从0开始
      
      if (!month || !year || month < 1 || month > 12) {
        errors.expiryDate = 'Invalid expiry date';
        isValid = false;
      } else if (parseInt(year) < currentYear || 
                (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        errors.expiryDate = 'Card has expired';
        isValid = false;
      }
    }
    
    // 验证CVC
    if (!cvc) {
      errors.cvc = 'CVC is required';
      isValid = false;
    } else if (cvc.length < 3) {
      errors.cvc = 'Invalid CVC';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  // 统一设置默认支付方式的处理函数
  const handleSetDefaultPayment = (type, id = null) => {
    setDefaultPayment({ type, id });
    
    setSuccessMessage('Default payment method updated');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  // 处理表单提交
  const handleAddCard = () => {
    if (!validateForm()) {
      return;
    }
    
    const cardType = detectCardType(cardNumber);
    const newCardId = Date.now();
    const newCard = {
      id: newCardId,
      type: cardType || 'Card',
      last4: cardNumber.replace(/\s+/g, '').slice(-4),
      expiry: expiryDate
    };
    
    // 如果设为默认，更新默认支付方式
    if (setAsDefault) {
      handleSetDefaultPayment('card', newCardId);
    }
    
    setSavedCards([...savedCards, newCard]);
    setSuccessMessage('Card added successfully');
    
    // 3秒后清除成功信息
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    
    // 重置表单
    setCardNumber('');
    setCardholderName('');
    setExpiryDate('');
    setCvc('');
    setSetAsDefault(false);
    setAddCardMode(false);
  };
  
  // 删除卡片
  const handleRemoveCard = (id) => {
    // 如果删除的是默认卡片，重置默认支付方式
    if (defaultPayment.type === 'card' && defaultPayment.id === id) {
      // 如果还有其他卡片，设置第一张为默认
      const remainingCards = savedCards.filter(card => card.id !== id);
      if (remainingCards.length > 0) {
        handleSetDefaultPayment('card', remainingCards[0].id);
      } else {
        // 没有剩余卡片，设置Google Pay为默认
        handleSetDefaultPayment('google_pay');
      }
    }
    
    const updatedCards = savedCards.filter(card => card.id !== id);
    setSavedCards(updatedCards);
    
    if (updatedCards.length === 0 && defaultPayment.type === 'card') {
      // 如果没有卡片了，设置Google Pay为默认
      handleSetDefaultPayment('google_pay');
    }
  };
  
  // 检查按钮是否可用
  const isFormValid = () => {
    const strippedCardNumber = cardNumber.replace(/\s+/g, '');
    return (
      strippedCardNumber.length >= 13 &&
      cardholderName.trim() !== '' &&
      expiryDate.length === 5 &&
      cvc.length >= 3
    );
  };
  
  // 处理返回按钮点击事件
  const handleBack = () => {
    console.log('Back button clicked');
    // 在实际应用中，这里应该是导航回上一页
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 使用PageHeader组件替换原有顶部标题栏 */}
      <div className="sticky top-0 z-10 shadow-sm">
        <PageHeader
          title="Payment Methods"
          onBack={handleBack}
          rightElement={null}
        />
      </div>
      
      {/* 成功消息提示 */}
      {successMessage && (
        <div className="mx-4 mt-2 bg-green-50 border border-green-100 rounded-lg px-4 py-2 flex items-center">
          <span className="material-icons-round text-green-600 mr-2" style={{fontSize: '20px'}}>check_circle</span>
          <span className="text-green-800">{successMessage}</span>
        </div>
      )}
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto pb-16">
        {/* 说明文字 */}
        <div className="px-4 py-4">
          <p className="text-gray-600">Select your preferred payment method for tennis lessons</p>
        </div>
        
        {/* 信用卡部分 */}
        <div className="mb-4 border-t border-b border-gray-200 bg-white">
          <button 
            className="w-full px-4 py-4 flex items-center justify-between"
            onClick={() => setCreditCardExpanded(!creditCardExpanded)}
          >
            <div className="flex items-center">
              <span className="material-icons-round text-green-600 mr-3" style={{fontSize: '20px'}}>credit_card</span>
              <span className="font-medium text-green-600">Credit & Debit Cards</span>
            </div>
            <span className="material-icons-round text-gray-400" style={{fontSize: '20px'}}>
              {creditCardExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          
          {creditCardExpanded && (
            <div className="px-4 pb-4">
              {/* 已保存的卡片列表 */}
              {savedCards.length > 0 ? (
                savedCards.map(card => (
                  <div key={card.id} className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                        <span className="material-icons-round text-blue-600" style={{fontSize: '18px'}}>credit_card</span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-800">{card.type} •••• {card.last4}</span>
                        </div>
                        <div className="text-sm text-gray-500">Expires {card.expiry}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {defaultPayment.type === 'card' && defaultPayment.id === card.id ? (
                        <div className="bg-[#E5F7EC] text-[#00B36F] px-2 py-1 rounded-full text-xs font-medium flex items-center mr-3">
                          <span className="material-icons-round mr-1" style={{fontSize: '14px'}}>check</span>
                          <span>Default</span>
                        </div>
                      ) : (
                        <button 
                          className="text-sm text-green-600 border border-green-300 rounded-full px-3 py-1 bg-green-50 mr-3"
                          onClick={() => handleSetDefaultPayment('card', card.id)}
                        >
                          Set as default
                        </button>
                      )}
                      <button 
                        onClick={() => handleRemoveCard(card.id)}
                        className="p-1 rounded-full bg-gray-100"
                      >
                        <span className="material-icons-round text-gray-400" style={{fontSize: '20px'}}>close</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <span className="material-icons-round text-gray-400" style={{fontSize: '24px'}}>credit_card</span>
                  </div>
                  <p className="text-gray-500 mb-1">No saved cards</p>
                  <p className="text-sm text-gray-400 mb-3">Add a credit or debit card to get started</p>
                </div>
              )}
              
              {/* 添加卡片按钮或表单 */}
              {!addCardMode ? (
                <button 
                  className="mt-4 text-gray-800 font-medium flex items-center"
                  onClick={() => setAddCardMode(true)}
                >
                  <span className="material-icons-round mr-1" style={{fontSize: '20px'}}>add</span> Add Credit Card
                </button>
              ) : (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-800">Add Credit Card</h3>
                    <button onClick={() => setAddCardMode(false)}>
                      <span className="material-icons-round text-gray-400" style={{fontSize: '20px'}}>close</span>
                    </button>
                  </div>
                  
                  {/* 卡号 */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        className={`w-full py-2.5 px-3 border ${formErrors.cardNumber ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-lg`}
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => {
                          setCardNumber(formatCardNumber(e.target.value));
                          if (formErrors.cardNumber) {
                            setFormErrors({...formErrors, cardNumber: ''});
                          }
                        }}
                        maxLength={19}
                      />
                      <div className="absolute right-3 top-2.5">
                        {detectCardType(cardNumber) ? (
                          <span className="text-sm font-medium text-gray-700">{detectCardType(cardNumber)}</span>
                        ) : (
                          <span className="material-icons-round text-gray-400" style={{fontSize: '20px'}}>credit_card</span>
                        )}
                      </div>
                    </div>
                    {formErrors.cardNumber && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="material-icons-round text-red-600 mr-1" style={{fontSize: '16px'}}>error</span>
                        {formErrors.cardNumber}
                      </p>
                    )}
                  </div>
                  
                  {/* 持卡人姓名 */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      className={`w-full py-2.5 px-3 border ${formErrors.cardholderName ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-lg`}
                      placeholder="John Doe"
                      value={cardholderName}
                      onChange={(e) => {
                        setCardholderName(e.target.value);
                        if (formErrors.cardholderName) {
                          setFormErrors({...formErrors, cardholderName: ''});
                        }
                      }}
                    />
                    {formErrors.cardholderName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="material-icons-round text-red-600 mr-1" style={{fontSize: '16px'}}>error</span>
                        {formErrors.cardholderName}
                      </p>
                    )}
                  </div>
                  
                  {/* 到期日期和CVC码 */}
                  <div className="flex mb-4 gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        className={`w-full py-2.5 px-3 border ${formErrors.expiryDate ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-lg`}
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => {
                          setExpiryDate(formatExpiryDate(e.target.value));
                          if (formErrors.expiryDate) {
                            setFormErrors({...formErrors, expiryDate: ''});
                          }
                        }}
                        maxLength={5}
                      />
                      {formErrors.expiryDate && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="material-icons-round text-red-600 mr-1" style={{fontSize: '16px'}}>error</span>
                          {formErrors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 mb-2">CVC</label>
                      <div className="relative">
                        <input
                          type="text"
                          className={`w-full py-2.5 px-3 border ${formErrors.cvc ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-lg`}
                          placeholder="123"
                          value={cvc}
                          onChange={(e) => {
                            setCvc(e.target.value.replace(/\D/g, '').slice(0, 3));
                            if (formErrors.cvc) {
                              setFormErrors({...formErrors, cvc: ''});
                            }
                          }}
                          maxLength={3}
                        />
                        <div className="group absolute right-3 top-2.5 cursor-help">
                          <span className="material-icons-round text-gray-400" style={{fontSize: '20px'}}>info</span>
                          <div className="absolute invisible group-hover:visible right-0 top-6 w-48 bg-gray-900 text-white text-xs rounded p-2 z-10">
                            3-digit security code on the back of your card
                          </div>
                        </div>
                      </div>
                      {formErrors.cvc && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="material-icons-round text-red-600 mr-1" style={{fontSize: '16px'}}>error</span>
                          {formErrors.cvc}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* 设为默认选项 */}
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="setAsDefault"
                      className="w-4 h-4 border-gray-300 rounded"
                      checked={setAsDefault}
                      onChange={(e) => setSetAsDefault(e.target.checked)}
                    />
                    <label htmlFor="setAsDefault" className="ml-2 text-gray-700">
                      Set as default payment method
                    </label>
                  </div>
                  
                  {/* 支持的卡类型 */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Accepted Card Types:</label>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">Visa</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">Mastercard</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">Amex</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">Discover</span>
                    </div>
                  </div>
                  
                  {/* 添加按钮 */}
                  <button
                    className={`w-full py-3.5 font-medium rounded-xl ${
                      isFormValid()
                        ? 'bg-[#00B36F] text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={handleAddCard}
                    disabled={!isFormValid()}
                  >
                    Add Card
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* 数字钱包部分 */}
        <div className="mb-4 border-t border-b border-gray-200 bg-white">
          <button 
            className="w-full px-4 py-4 flex items-center justify-between"
            onClick={() => setDigitalWalletExpanded(!digitalWalletExpanded)}
          >
            <div className="flex items-center">
              <span className="material-icons-round text-green-600 mr-3" style={{fontSize: '20px'}}>account_balance_wallet</span>
              <span className="font-medium text-green-600">Digital Wallets</span>
            </div>
            <span className="material-icons-round text-gray-400" style={{fontSize: '20px'}}>
              {digitalWalletExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          
          {digitalWalletExpanded && (
            <div className="px-4 pb-4">
              {/* Apple Pay */}
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <div className="font-medium text-gray-800">Apple Pay</div>
                  <div className="text-sm text-gray-500">Pay directly with your Apple device</div>
                </div>
                {defaultPayment.type === 'apple_pay' ? (
                  <div className="bg-[#E5F7EC] text-[#00B36F] px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <span className="material-icons-round mr-1" style={{fontSize: '14px'}}>check</span>
                    <span>Default</span>
                  </div>
                ) : (
                  <button 
                    className="text-sm text-green-600 border border-green-300 rounded-full px-3 py-1 bg-green-50"
                    onClick={() => handleSetDefaultPayment('apple_pay')}
                  >
                    Set as default
                  </button>
                )}
              </div>
              
              {/* Google Pay */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="font-medium text-gray-800">Google Pay</div>
                  <div className="text-sm text-gray-500">Pay directly with your Google account</div>
                </div>
                {defaultPayment.type === 'google_pay' ? (
                  <div className="bg-[#E5F7EC] text-[#00B36F] px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <span className="material-icons-round mr-1" style={{fontSize: '14px'}}>check</span>
                    <span>Default</span>
                  </div>
                ) : (
                  <button 
                    className="text-sm text-green-600 border border-green-300 rounded-full px-3 py-1 bg-green-50"
                    onClick={() => handleSetDefaultPayment('google_pay')}
                  >
                    Set as default
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* 安全支付信息 */}
        <div className="px-4 py-4 bg-purple-50 rounded-lg mx-4 mb-8">
          <div className="flex items-start">
            <span className="material-icons-round text-purple-600 mr-2 mt-0.5 flex-shrink-0" style={{fontSize: '20px'}}>shield</span>
            <div>
              <div className="text-purple-800 font-medium mb-2">Secure Payments</div>
              <p className="text-sm text-purple-700 mb-2">
                Your payment information is encrypted and securely stored. We never store your full card details on our servers.
              </p>
              <p className="text-sm text-purple-700">
                For Apple Pay and Google Pay, your card details remain securely within your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage; 