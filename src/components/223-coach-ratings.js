import React, { useState } from 'react';
import PageHeader from './common/PageHeader';
import { Star, Search, Filter, ThumbsUp, ChevronDown, ChevronUp, User } from 'lucide-react';

// 评分分布数据
const ratingStats = {
  5: 38,
  4: 6,
  3: 2,
  2: 1,
  1: 0
};

// 计算总评分数和平均分
const totalRatings = Object.values(ratingStats).reduce((sum, count) => sum + count, 0);
const totalStars = Object.entries(ratingStats).reduce((sum, [star, count]) => sum + (Number(star) * count), 0);
const averageRating = totalRatings > 0 ? (totalStars / totalRatings).toFixed(1) : 0;

// 计算百分比分布
const ratingDistribution = {};
Object.entries(ratingStats).forEach(([star, count]) => {
  ratingDistribution[star] = totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;
});

// 评论数据
const reviews = [
  {
    id: 1,
    name: 'Alice L.',
    rating: 5,
    date: 'April 3, 2025',
    lessons: 5,
    comment:
      'Tom is an excellent coach! He helped me improve my backhand technique which has always been my weakness. Very patient and knowledgeable.',
    helpful: 3,
    timeAgo: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Robert K.',
    rating: 5,
    date: 'March 28, 2025',
    lessons: 8,
    comment:
      'Great coach, very attentive to details. He quickly identified issues with my serve and provided practical drills to fix them. Highly recommend!',
    helpful: 5,
    timeAgo: '3 weeks ago'
  },
  {
    id: 3,
    name: 'Sarah J.',
    rating: 4,
    date: 'March 20, 2025',
    lessons: 3,
    comment:
      'Tom is very professional and punctual. He has a structured approach to teaching which I appreciate. The only reason for 4 stars is that sometimes the lessons feel a bit rushed.',
    helpful: 1,
    timeAgo: '1 month ago'
  },
  {
    id: 4,
    name: 'David M.',
    rating: 3,
    date: 'March 15, 2025',
    lessons: 2,
    comment:
      'Decent coaching but I expected more personalised feedback. Good technical knowledge but could improve on communication.',
    helpful: 0,
    timeAgo: '1 month ago'
  },
];

const CoachRatingsPage = () => {
  const [search, setSearch] = useState('');
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const maxInitialReviews = 2;

  // 过滤评论
  const filteredReviews = reviews.filter((r) =>
    r.comment.toLowerCase().includes(search.toLowerCase()) ||
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  // 计算显示的评论数量
  const displayedReviews = showMoreReviews ? filteredReviews : filteredReviews.slice(0, maxInitialReviews);

  // 生成星星 - 不再使用这个函数，直接在每个评论中渲染星星

  return (
    <div className="bg-gray-50 min-h-screen max-w-md mx-auto border border-gray-200 rounded-lg shadow-sm flex flex-col h-screen">
      {/* 顶部栏 */}
      <PageHeader title="Ratings & Reviews" onBack={() => {}} />

      {/* 主要内容区 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* 评分概览卡片 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-purple-600">Ratings Overview</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-purple-600 fill-purple-600" />
                  <span className="ml-1 text-sm font-medium">{averageRating}</span>
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
                        className="h-full bg-purple-600 rounded-full" 
                        style={{ width: `${ratingDistribution[stars] || 0}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm text-gray-600">{ratingStats[stars] || 0}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 搜索与筛选 */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full py-3 pl-10 pr-3 rounded-lg border border-gray-200 bg-white text-base text-gray-800 outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-600"
                  placeholder="Search reviews..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search reviews"
                />
              </div>
              <button
                className="h-12 w-12 rounded-lg border border-gray-200 bg-white flex items-center justify-center outline-none hover:bg-purple-50"
                aria-label="Filter reviews"
              >
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* 用户评价 */}
          {filteredReviews.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">All Reviews</h4>
                  
                  <div className="space-y-6">
                    {displayedReviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b border-gray-100 last:border-b-0">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="text-lg font-medium text-gray-800">{review.name}</h5>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-5 w-5 ${i < review.rating ? 'text-purple-600 fill-purple-600' : 'text-gray-200'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-base text-gray-700 mb-2">{review.comment}</p>
                        <span className="text-sm text-gray-500">{review.timeAgo}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* 当评论数量大于初始显示数量时显示查看更多按钮 */}
                  {filteredReviews.length > maxInitialReviews && (
                    <button 
                      className="flex items-center text-purple-600 text-sm font-medium mt-2 hover:text-purple-700"
                      onClick={() => setShowMoreReviews(!showMoreReviews)}
                    >
                      {showMoreReviews ? 'Show less' : `Show all ${filteredReviews.length} reviews`}
                      {showMoreReviews ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4 text-center">
              <p className="text-gray-500">No reviews found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachRatingsPage; 