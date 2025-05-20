import React from 'react';

const LessonCard = ({ 
  type,
  status,
  paymentStatus,
  date,
  time,
  location,
  price,
  student,
  onClick
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'border-green-500';
      case 'pending':
        return 'border-yellow-500';
      case 'cancelled':
        return 'border-red-500';
      default:
        return 'border-gray-300';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusStyle = (status, paymentStatus) => {
    if (status === 'cancelled') {
      return 'bg-red-100 text-red-800';
    }
    return paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 cursor-pointer ${getStatusColor(status)}`}
      onClick={onClick}
    >
      <div className="p-3">
        <div className="mb-1">
          <h3 className="font-medium text-sm text-gray-800">{type}</h3>
        </div>
        
        <div className="flex justify-between items-start mb-1.5">
          <span className={`inline-block px-2 py-0.5 ${getStatusStyle(status)} text-xs font-medium rounded-full`}>
            {status === 'cancelled' ? 'Cancelled' : status === 'confirmed' ? 'Confirmed' : 'Pending'}
          </span>
          <span className={`inline-block px-2 py-0.5 ${getPaymentStatusStyle(status, paymentStatus)} text-xs font-medium rounded-full`}>
            {paymentStatus}
          </span>
        </div>
        
        <div className="flex items-center mt-2">
          <span className="material-icons text-gray-500" style={{ fontSize: '14px' }}>calendar_today</span>
          <span className="ml-1.5 text-xs text-gray-700">{date}</span>
          <span className="mx-1 text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-700">{time.split(' - ')[0]}</span>
        </div>
        
        <div className="flex items-center mt-1.5">
          <span className="material-icons text-gray-500" style={{ fontSize: '14px' }}>location_on</span>
          <span className="ml-1.5 text-xs text-gray-700">{location}</span>
        </div>
        
        <div className="flex justify-between items-center mt-1.5 pt-1.5 border-t border-gray-100">
          <span className="text-green-600 text-xs font-medium">{price}</span>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs font-bold mr-1">
              {student.charAt(0)}
            </div>
            <span className="text-gray-700 text-xs font-medium">Student: {student}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard; 