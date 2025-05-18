import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

const CoachIntroPage = () => {
  // 状态管理
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(
    "Hi, I'm Alex, a certified tennis coach with over 10 years of experience teaching players of all ages and abilities. I specialize in helping beginners develop solid fundamentals and working with intermediate players to refine their technique and strategy. My coaching style focuses on positive reinforcement and creating an enjoyable learning environment. I'm patient, supportive, and committed to helping you reach your tennis goals, whether that's learning the basics or preparing for competition."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // 字符数限制
  const bioLimit = 500;
  
  // 计算剩余字符数
  const bioCharsLeft = bioLimit - bio.length;
  
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
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  // 创建编辑按钮作为右侧元素
  const rightElement = !editMode ? (
    <button 
      className="p-1.5 text-gray-700 rounded-full"
      onClick={() => setEditMode(true)}
    >
      <span className="material-icons" style={{fontSize: '20px'}}>edit</span>
    </button>
  ) : null;
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <PageHeader title="About Me" onBack={handleBack} rightElement={rightElement} />
      
      {/* 成功提示消息 */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <span className="material-icons text-green-600" style={{fontSize: '20px'}}>check_circle</span>
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
                  <span className="material-icons mr-1.5" style={{fontSize: '16px'}}>save</span>
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
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 rounded-full p-1.5 mt-0.5">
                  <span className="material-icons text-purple-600" style={{fontSize: '16px'}}>info</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-purple-800">
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