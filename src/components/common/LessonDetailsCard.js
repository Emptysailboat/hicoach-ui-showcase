import React from 'react';

/**
 * 课程详情卡片组件
 * @param {Object} props
 * @param {Object} props.lesson - 课程详情对象
 * @param {string} props.lesson.type - 课程类型
 * @param {string} [props.lesson.date] - 课程日期
 * @param {string} [props.lesson.time] - 课程时间
 * @param {string} [props.lesson.schedule] - 课程安排（周期性课程）
 * @param {string} [props.lesson.startDate] - 开始日期（周期性课程）
 * @param {string} [props.lesson.startTime] - 开始时间（周期性课程）
 * @param {number} props.lesson.duration - 课程时长（分钟）
 * @param {number} props.lesson.people - 参与人数
 * @param {Array<string>} props.lesson.skills - 重点技能列表
 * @param {boolean} props.lesson.needsEquipment - 是否需要教练提供设备
 * @param {number} [props.lesson.sessions] - 课时数量（周期性课程）
 * @param {string} [props.title='Lesson Details'] - 卡片标题
 * @param {string} [props.className=''] - 额外的CSS类名
 * @param {string} [props.skillTagClassName=''] - 技能标签的CSS类名
 * @returns {JSX.Element}
 */
const LessonDetailsCard = ({
  lesson,
  title = 'Lesson Details',
  className = '',
  skillTagClassName = 'bg-secondary-100 text-secondary-500'
}) => {
  // 判断是否为周期性课程
  const isRecurring = !!lesson.sessions;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <h4 className="font-medium text-primary-600 mb-3">{title}</h4>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Type:</span>
          <span className="font-medium text-gray-800">{lesson.type}</span>
        </div>
        
        {isRecurring ? (
          <>
            {/* 周期性课程信息 */}
            {lesson.sessions && (
              <div className="flex justify-between">
                <span className="text-gray-600">Sessions:</span>
                <span className="font-medium text-gray-800">{lesson.sessions} lessons</span>
              </div>
            )}
            
            {lesson.startDate && lesson.startTime && (
              <div className="flex justify-between">
                <span className="text-gray-600">Start:</span>
                <span className="font-medium text-gray-800">{lesson.startDate}, {lesson.startTime}</span>
              </div>
            )}
            
            {lesson.schedule && (
              <div className="flex justify-between">
                <span className="text-gray-600">Schedule:</span>
                <span className="font-medium text-gray-800">{lesson.schedule}</span>
              </div>
            )}
          </>
        ) : (
          <>
            {/* 单次课程信息 */}
            {lesson.date && lesson.time && (
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium text-gray-800">{lesson.date}, {lesson.time}</span>
              </div>
            )}
          </>
        )}
        
        {/* 共有信息 */}
        <div className="flex justify-between">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium text-gray-800">{lesson.duration} minutes{isRecurring ? ' each' : ''}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">People:</span>
          <span className="font-medium text-gray-800">{lesson.people}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Equipment:</span>
          <span className="font-medium text-gray-800">{lesson.needsEquipment ? 'Provided by coach' : 'Bringing my own'}</span>
        </div>
        
        {lesson.skills && lesson.skills.length > 0 && (
          <div className="border-t border-gray-100 pt-2">
            <span className="text-gray-600 block mb-2">Focus skills:</span>
            <div className="flex flex-wrap gap-1">
              {lesson.skills.map((skill, index) => (
                <span key={index} className={`px-2 py-0.5 text-xs rounded-full ${skillTagClassName}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetailsCard; 