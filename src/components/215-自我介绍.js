import React, { useState } from 'react';
import { ChevronLeft, Save, Pencil, CheckCircle } from 'lucide-react';

const CoachIntroPage = () => {
  // 状态管理
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(
    "Hi, I'm Alex, a certified tennis coach with over 10 years of experience teaching players of all ages and abilities. I specialize in helping beginners develop solid fundamentals and working with intermediate players to refine their technique and strategy. My coaching style focuses on positive reinforcement and creating an enjoyable learning environment. I'm patient, supportive, and committed to helping you reach your tennis goals, whether that's learning the basics or preparing for competition."
  );
  const [teachingStyle, setTeachingStyle] = useState(
    "My teaching approach combines technical instruction with game-based learning. I believe in breaking down complex skills into manageable parts, using clear demonstrations, and providing constructive feedback. I adapt my coaching style to each student's learning preferences and goals, making each lesson personalized and effective. I emphasize not just how to hit the ball, but understanding the 'why' behind each technique and strategy."
  );
  const [qualifications, setQualifications] = useState(
    "• LTA Level 3 Coaching Qualification\n• PTR Professional Certification\n• First Aid Certified\n• Former collegiate player at University of Birmingham\n• Completed mentorship program with former ATP professional"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // 字符数限制
  const bioLimit = 500;
  const styleLimit = 500;
  const qualificationsLimit = 300;
  
  // 计算剩余字符数
  const bioCharsLeft = bioLimit - bio.length;
  const styleCharsLeft = styleLimit - teachingStyle.length;
  const qualificationsCharsLeft = qualificationsLimit - qualifications.length;
  
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setEditMode(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-gray-800">About Me</h1>
        </div>
        {!editMode ? (
          <button 
            className="p-1.5 text-gray-700 rounded-full hover:bg-gray-100"
            onClick={() => setEditMode(true)}
          >
            <Pencil className="h-5 w-5" />
          </button>
        ) : (
          <div className="w-8"></div> /* 占位元素，平衡布局 */
        )}
      </div>
      
      {/* 成功提示消息 */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-gray-800 font-medium">Profile updated successfully</span>
          </div>
        </div>
      )}
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto p-4">
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-base font-medium text-gray-800 mb-1">Coach Bio</h2>
              <p className="text-sm text-gray-500 mb-3">
                Introduce yourself and your coaching background.
              </p>
              <div className="relative">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={6}
                  maxLength={bioLimit}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tell students about yourself, your experience, and your approach to coaching..."
                  required
                ></textarea>
                <div className={`text-xs mt-1 text-right ${bioCharsLeft < 50 ? 'text-red-500' : 'text-gray-500'}`}>
                  {bioCharsLeft} characters left
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-base font-medium text-gray-800 mb-1">Teaching Style</h2>
              <p className="text-sm text-gray-500 mb-3">
                Describe your coaching methods and approach.
              </p>
              <div className="relative">
                <textarea
                  value={teachingStyle}
                  onChange={(e) => setTeachingStyle(e.target.value)}
                  rows={5}
                  maxLength={styleLimit}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Explain your teaching philosophy, methods, and what students can expect in your lessons..."
                  required
                ></textarea>
                <div className={`text-xs mt-1 text-right ${styleCharsLeft < 50 ? 'text-red-500' : 'text-gray-500'}`}>
                  {styleCharsLeft} characters left
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-base font-medium text-gray-800 mb-1">Qualifications & Achievements</h2>
              <p className="text-sm text-gray-500 mb-3">
                List your certifications, experience, and accolades.
              </p>
              <div className="relative">
                <textarea
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  rows={4}
                  maxLength={qualificationsLimit}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="List your coaching qualifications, certifications, playing achievements, etc..."
                  required
                ></textarea>
                <div className={`text-xs mt-1 text-right ${qualificationsCharsLeft < 30 ? 'text-red-500' : 'text-gray-500'}`}>
                  {qualificationsCharsLeft} characters left
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Tip: Use bullet points (• ) to create a clear list
              </p>
            </div>
            
            <button
              type="submit"
              className="w-full py-2.5 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1.5" />
                  Save Profile
                </>
              )}
            </button>
          </form>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-800">Coach Bio</h2>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 whitespace-pre-line">{bio}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-800">Teaching Style</h2>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 whitespace-pre-line">{teachingStyle}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-800">Qualifications & Achievements</h2>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 whitespace-pre-line">{qualifications}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-1.5 mt-0.5">
                  <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800">
                    Students will see this information on your profile page. A complete profile
                    helps attract more bookings.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoachIntroPage; 