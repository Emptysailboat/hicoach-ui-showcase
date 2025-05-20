import React from 'react';

const LessonInfoCard = ({ studentName, date, time, duration, status }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="text-base font-medium text-gray-800 mb-1">Lesson Details</h2>
      <p className="text-sm text-gray-500 mb-3">
        Tennis lesson with {studentName}
      </p>
      
      <div className="flex items-center py-2 border-t border-gray-100">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">{date}</p>
          <p className="text-xs text-gray-500">{time} ({duration})</p>
        </div>
        <div className="bg-yellow-100 py-1 px-2 rounded text-xs font-medium text-yellow-800">
          {status}
        </div>
      </div>
    </div>
  );
};

export default LessonInfoCard; 