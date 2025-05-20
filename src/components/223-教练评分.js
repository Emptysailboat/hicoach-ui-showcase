import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

// 评分分布数据
const ratingStats = [
  { star: 5, count: 38 },
  { star: 4, count: 6 },
  { star: 3, count: 2 },
  { star: 2, count: 1 },
  { star: 1, count: 0 },
];

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
  },
];

const averageRating = 4.8;
const totalReviews = 47;

const PRIMARY = '#00B36F';
const SECONDARY = '#8B5CF6';
const GREY = '#E0E0E0';
const CARD_BG = '#F5FFFC';
const TEXT_MAIN = '#212121';
const TEXT_SUB = '#757575';

const CoachRatingsPage = () => {
  const [search, setSearch] = useState('');

  // 过滤评论（仅做关键词过滤，筛选功能可后续实现）
  const filteredReviews = reviews.filter((r) =>
    r.comment.toLowerCase().includes(search.toLowerCase()) ||
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  // 生成星星
  const renderStars = (rating, size = 'text-2xl') => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`material-icons-outlined ${size} ${i < rating ? 'text-purple-500' : 'text-gray-200'}`}
        >
          star
        </span>
      ))}
    </div>
  );

  // 评分分布条
  const renderRatingBars = () => {
    const max = Math.max(...ratingStats.map((r) => r.count));
    return ratingStats.map((r) => (
      <div key={r.star} className="flex items-center mb-2">
        <span className="text-base text-gray-600 w-4 mr-2">{r.star}</span>
        <span className="material-icons-outlined text-xl text-purple-500 mr-2">star</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
          <div
            className="h-2 bg-purple-500 rounded-full"
            style={{ width: `${(r.count / max) * 100}%` }}
          ></div>
        </div>
        <span className="text-base text-gray-600 w-6 text-right">{r.count}</span>
      </div>
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen max-w-md mx-auto border border-gray-200 rounded-lg shadow-sm flex flex-col h-screen">
      {/* 顶部栏 */}
      <PageHeader title="Ratings & Reviews" onBack={() => {}} />

      {/* 主要内容区 */}
      <div className="flex-1 overflow-y-auto pt-4">
        {/* 评分总览 */}
        <div className="px-4 mb-4">
          <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center mr-4">
                <span className="text-5xl font-bold text-gray-800 leading-none mb-2">4.8</span>
                <div className="flex text-purple-500">
                  <span className="material-icons-outlined">star</span>
                  <span className="material-icons-outlined">star</span>
                  <span className="material-icons-outlined">star</span>
                  <span className="material-icons-outlined">star</span>
                  <span className="material-icons-outlined">star</span>
                </div>
              </div>
              
              <div className="flex-1">
                {ratingStats.map((stat) => (
                  <div key={stat.star} className="flex items-center mb-2 last:mb-0">
                    <span className="text-base text-gray-600 w-4 mr-2">{stat.star}</span>
                    <span className="material-icons-outlined text-xl text-purple-500 mr-2">star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                      <div
                        className="h-2 bg-purple-500 rounded-full"
                        style={{ width: `${(stat.count / Math.max(...ratingStats.map(s => s.count))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-base text-gray-600 w-6 text-right">{stat.count}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col items-end ml-2">
                <span className="text-sm text-gray-500">Based on</span>
                <span className="text-lg font-semibold text-gray-800">{totalReviews} reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* 搜索与筛选 */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="material-icons-outlined absolute left-3 top-3 text-xl text-gray-400">search</span>
              <input
                type="text"
                className="w-full py-3 pl-10 pr-3 rounded-2xl border border-gray-200 bg-gray-100 text-base text-gray-800 outline-none h-12"
                placeholder="Search reviews..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search reviews"
              />
            </div>
            <button
              className="w-12 h-12 rounded-2xl border border-gray-200 bg-white flex items-center justify-center outline-none"
              aria-label="Filter reviews"
            >
              <span className="material-icons-outlined text-xl text-gray-500">filter_alt</span>
            </button>
          </div>
        </div>

        {/* 评论列表 */}
        <div className="px-4 pb-4">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 mb-4 p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="material-icons-outlined text-xl text-purple-500">person</span>
                  </div>
                  <div>
                    <div className="font-semibold text-base text-gray-800 mb-1">{r.name}</div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`material-icons-outlined text-lg ${i < r.rating ? 'text-purple-500' : 'text-gray-200'}`}
                        >
                          star
                        </span>
                      ))}
                      <span className="text-sm text-gray-500 ml-2">{r.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="inline-block bg-purple-100 text-purple-500 text-sm rounded-full px-3 py-1">
                    {r.lessons} lessons
                  </span>
                </div>
              </div>
              
              <p className="text-base text-gray-800 leading-relaxed mb-3">{r.comment}</p>
              
              <div className="flex justify-end">
                <button className="flex items-center text-sm text-gray-500 bg-transparent border-none outline-none">
                  <span className="material-icons-outlined text-lg text-purple-500 mr-1">thumb_up</span>
                  <span>Helpful ({r.helpful})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachRatingsPage; 