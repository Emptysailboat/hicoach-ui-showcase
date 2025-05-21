import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

const ReviewsCard = ({ 
  rating = 5.0, 
  totalRatings = 0, 
  ratingDistribution = { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 }, 
  reviews = [], 
  maxInitialReviews = 2 
}) => {
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  
  // 计算显示的评论数量
  const displayedReviews = showMoreReviews ? reviews : reviews.slice(0, maxInitialReviews);
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-600">Ratings & Reviews</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-primary-600 fill-primary-600" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="mx-1 text-gray-500">•</span>
            <span className="text-sm text-gray-500">{totalRatings} ratings</span>
          </div>
        </div>
        
        {/* 评分分布 */}
        <div className="mb-4">
          {[5, 4, 3, 2, 1].map(stars => (
            <div key={stars} className="flex items-center mb-1">
              <div className="w-16 text-sm text-gray-600">{stars} stars</div>
              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 rounded-full" 
                  style={{ width: `${ratingDistribution[stars] || 0}%` }}
                ></div>
              </div>
              <div className="w-8 text-right text-sm text-gray-600">{ratingDistribution[stars] || 0}%</div>
            </div>
          ))}
        </div>
        
        {/* 用户评价 */}
        {reviews.length > 0 && (
          <div className="space-y-4 mt-6">
            <h4 className="font-medium text-gray-800">Recent Reviews</h4>
            
            <div className="space-y-4">
              {displayedReviews.map((review, index) => (
                <div key={index} className="pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-gray-800">{review.name}</h5>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < review.rating ? 'text-primary-600 fill-primary-600' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
                  <span className="text-xs text-gray-500">{review.timeAgo}</span>
                </div>
              ))}
            </div>
            
            {/* 当评论数量大于初始显示数量时显示查看更多按钮 */}
            {reviews.length > maxInitialReviews && (
              <button 
                className="flex items-center text-primary-600 text-sm font-medium mt-2 active:text-primary-700"
                onClick={() => setShowMoreReviews(!showMoreReviews)}
              >
                {showMoreReviews ? 'Show less' : `Show all ${reviews.length} reviews`}
                {showMoreReviews ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
            )}
          </div>
        )}
        
        {/* 无评论时显示提示 */}
        {reviews.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">No reviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsCard; 