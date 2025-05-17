import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  MessageCircle, 
  PhoneOutgoing,
  Star,
  FileText,
  CheckCircle,
  ExternalLink,
  MoreVertical
} from 'lucide-react';

const CoachCompletedLessonDetail = () => {
  // 状态管理
  const [showMenu, setShowMenu] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // 打开/关闭操作菜单
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  
  // 关闭菜单
  const closeMenu = () => {
    setShowMenu(false);
  };
  
  // 打开评价表单
  const openReviewForm = () => {
    setShowMenu(false);
    setShowReviewForm(true);
  };
  
  // 关闭评价表单
  const closeReviewForm = () => {
    setShowReviewForm(false);
  };
  
  // 处理评星
  const handleRating = (value) => {
    setRating(value);
  };
  
  // 处理鼠标悬停在星星上
  const handleRatingHover = (value) => {
    setHoveredRating(value);
  };
  
  // 处理鼠标离开星星
  const handleRatingLeave = () => {
    setHoveredRating(0);
  };
  
  // 提交学员评价
  const submitReview = () => {
    if (rating === 0) {
      return; // 需要至少选择一颗星
    }
    
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setShowReviewForm(false);
      setShowSuccess(true);
      
      // 3秒后隐藏成功消息
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  // 添加课程笔记
  const handleAddNotes = () => {
    setShowMenu(false);
    // 在实际应用中，这里会导航到笔记编辑页面
    console.log('Navigate to notes editor');
  };
  
  // 发送消息
  const handleSendMessage = () => {
    setShowMenu(false);
    // 在实际应用中，这里会导航到消息页面
    console.log('Navigate to message screen');
  };
  
  // 渲染星级
  const renderStars = (currentRating, onStarClick, onStarHover, onStarLeave) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(value => (
          <button
            key={value}
            type="button"
            onClick={() => onStarClick && onStarClick(value)}
            onMouseEnter={() => onStarHover && onStarHover(value)}
            onMouseLeave={() => onStarLeave && onStarLeave()}
            className="p-1 focus:outline-none"
          >
            <Star 
              className={`h-7 w-7 ${value <= (hoveredRating || currentRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          </button>
        ))}
      </div>
    );
  };
  
  // 渲染菜单
  const renderMenu = () => {
    if (!showMenu) return null;
    
    return (
      <div className="fixed inset-0 z-50" onClick={closeMenu}>
        <div className="absolute top-12 right-4 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-56 py-1">
            <button 
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={openReviewForm}
            >
              <Star className="h-4 w-4 mr-3 text-gray-500" />
              Review Student
            </button>
            <button 
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={handleAddNotes}
            >
              <FileText className="h-4 w-4 mr-3 text-gray-500" />
              Add Lesson Notes
            </button>
            <button 
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={handleSendMessage}
            >
              <MessageCircle className="h-4 w-4 mr-3 text-gray-500" />
              Message Student
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染评价表单
  const renderReviewForm = () => {
    if (!showReviewForm) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Review Student</h3>
              <button 
                className="p-1.5 text-gray-500 rounded-full hover:bg-gray-100"
                onClick={closeReviewForm}
                disabled={isSubmitting}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Rate your experience with Alex Thompson and provide feedback to help other coaches.
            </p>
          </div>
          
          <div className="mb-4">
            <div className="flex flex-col items-center mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                How was your teaching experience?
              </p>
              {renderStars(rating, handleRating, handleRatingHover, handleRatingLeave)}
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Share your experience (optional)
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share details about your lesson with this student..."
                className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
                disabled={isSubmitting}
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium"
              onClick={closeReviewForm}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              className={`py-2 px-4 ${rating > 0 ? 'bg-green-600' : 'bg-gray-400'} text-white rounded-lg text-sm font-medium flex items-center`}
              onClick={submitReview}
              disabled={rating === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染成功消息
  const renderSuccessMessage = () => {
    if (!showSuccess) return null;
    
    return (
      <div className="fixed top-5 inset-x-0 flex justify-center z-50 px-4">
        <div className="bg-white rounded-lg shadow-lg p-3 flex items-center max-w-md">
          <div className="bg-green-100 rounded-full p-1 mr-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <span className="text-sm text-gray-800">Review submitted successfully</span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-gray-800">Lesson Details</h1>
        </div>
        <button 
          className="p-1.5 rounded-full hover:bg-gray-100"
          onClick={toggleMenu}
        >
          <MoreVertical className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      
      {/* 成功消息提示 */}
      {renderSuccessMessage()}
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto">
        {/* 状态条 */}
        <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-blue-800">Completed</h2>
              <p className="text-xs text-blue-700 mt-0.5">
                This lesson was completed on March 15, 2025
              </p>
            </div>
          </div>
        </div>
        
        {/* 课程详情 */}
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-3">Tennis Lesson with Alex</h2>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">Saturday, March 15, 2025</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Completed • 2:00 PM - 3:00 PM
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">Wimbledon Tennis Club</p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    30 Somerset Road, London, SW19 5JU
                  </p>
                  <button className="text-xs text-purple-600 font-medium flex items-center mt-1">
                    <ExternalLink className="h-3 w-3 mr-1" /> View Map
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 收入信息 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-3">Payment Details</h2>
            
            <div className="bg-green-50 p-3 rounded-lg mb-4 border border-green-100">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Payment Complete</p>
                  <p className="text-xs text-green-700">
                    £34.00 has been added to your balance
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Lesson type:</span>
                <span className="text-sm text-gray-800 font-medium">Single lesson (60 min)</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Lesson price:</span>
                <span className="text-sm text-gray-800 font-medium">£40.00</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Service fee:</span>
                <span className="text-sm text-red-600">-£6.00</span>
              </div>
              
              <div className="border-t border-gray-200 my-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 font-medium">You received:</span>
                  <span className="text-sm text-green-600 font-medium">£34.00</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 学员信息 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-3">Student Information</h2>
            
            <div className="flex items-start">
              <div className="h-12 w-12 bg-gray-200 rounded-full flex-shrink-0 mr-3">
                {/* 学员头像 */}
                <User className="h-12 w-12 text-gray-400" />
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Alex Thompson</p>
                <p className="text-xs text-gray-500 mt-0.5">Beginner • First-time student</p>
                
                <div className="flex space-x-2 mt-2">
                  <button className="py-1.5 px-3 bg-purple-600 text-white rounded-lg text-sm font-medium flex items-center">
                    <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                    Message
                  </button>
                  <button className="py-1.5 px-3 border border-purple-600 text-purple-600 rounded-lg text-sm font-medium flex items-center"
                    onClick={openReviewForm}
                  >
                    <Star className="h-3.5 w-3.5 mr-1.5" />
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 备注信息 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-2">Notes from Student</h2>
            <p className="text-sm text-gray-700">
              I'm a complete beginner and have never played tennis before. I'd like to learn the basics and eventually be able to play with friends. I have my own racket but not sure if it's the right one.
            </p>
          </div>
          
          {/* 教练笔记（可选） */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-medium text-gray-800">Your Notes</h2>
              <button 
                className="text-xs text-purple-600 font-medium"
                onClick={handleAddNotes}
              >
                Edit
              </button>
            </div>
            <p className="text-sm text-gray-700">
              Alex showed good enthusiasm and coordination for a beginner. We focused on basic grip, stance, and forehand technique. Next lesson plan: continue with forehand practice, introduce backhand basics and work on ball tracking.
            </p>
          </div>
          
          {/* 下次课程提示（如果适用） */}
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Next Lesson</p>
                <p className="text-xs text-blue-700 mt-1">
                  Alex has not booked another lesson with you yet. Send them a message to encourage booking their next session.
                </p>
                <button 
                  className="mt-2 py-1.5 px-3 bg-blue-600 text-white rounded-lg text-xs font-medium"
                  onClick={handleSendMessage}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 操作菜单 */}
      {renderMenu()}
      
      {/* 评价表单 */}
      {renderReviewForm()}
    </div>
  );
};

export default CoachCompletedLessonDetail; 