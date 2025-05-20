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
  const renderStars = (rating, size = 20) => (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="material-icons-round"
          style={{
            fontSize: size,
            color: i < rating ? SECONDARY : GREY,
            verticalAlign: 'middle',
            marginRight: i < 4 ? 2 : 0,
          }}
        >
          star
        </span>
      ))}
    </span>
  );

  // 评分分布条
  const renderRatingBars = () => {
    const max = Math.max(...ratingStats.map((r) => r.count));
    return ratingStats.map((r) => (
      <div key={r.star} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: TEXT_SUB, width: 16 }}>{r.star}</span>
        <span className="material-icons-round" style={{ fontSize: 16, color: SECONDARY, margin: '0 4px' }}>star</span>
        <div style={{ flex: 1, height: 8, background: GREY, borderRadius: 4, margin: '0 8px', position: 'relative' }}>
          <div
            style={{
              height: 8,
              background: SECONDARY,
              borderRadius: 4,
              width: `${(r.count / max) * 100}%`,
              transition: 'width 0.3s',
            }}
          ></div>
        </div>
        <span style={{ fontSize: 12, color: TEXT_SUB, width: 24, textAlign: 'right' }}>{r.count}</span>
      </div>
    ));
  };

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', maxWidth: 420, margin: '0 auto', border: '1px solid #EEEEEE', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 顶部栏 */}
      <PageHeader title="Ratings & Reviews" onBack={() => {}} />

      {/* 主要内容区 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0 0 0' }}>
        {/* 评分总览 */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ background: CARD_BG, borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', border: '1px solid #E0E0E0', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 64 }}>
                <span style={{ fontSize: 40, fontWeight: 700, color: TEXT_MAIN, lineHeight: 1 }}>{averageRating.toFixed(1)}</span>
                <div style={{ marginTop: 4 }}>{renderStars(Math.round(averageRating), 20)}</div>
              </div>
              <div style={{ flex: 1 }}>{renderRatingBars()}</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: 80 }}>
                <span style={{ fontSize: 13, color: TEXT_SUB }}>Based on</span>
                <span style={{ fontSize: 18, fontWeight: 600, color: TEXT_MAIN }}>{totalReviews} reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* 搜索与筛选 */}
        <div style={{ padding: '16px 16px 0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span className="material-icons-round" style={{ position: 'absolute', left: 12, top: 12, fontSize: 20, color: GREY }}>search</span>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  borderRadius: 12,
                  border: `1px solid ${GREY}`,
                  background: '#F5F5F5',
                  fontSize: 15,
                  color: TEXT_MAIN,
                  outline: 'none',
                  height: 44,
                  boxSizing: 'border-box',
                }}
                placeholder="Search reviews..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search reviews"
              />
            </div>
            <button
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: `1px solid ${GREY}`,
                background: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: 'none',
                padding: 0,
              }}
              aria-label="Filter reviews"
            >
              <span className="material-icons-round" style={{ fontSize: 22, color: TEXT_SUB }}>filter_alt</span>
            </button>
          </div>
        </div>

        {/* 评论列表 */}
        <div style={{ padding: '16px 16px 0 16px' }}>
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              style={{
                background: CARD_BG,
                borderRadius: 16,
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                border: '1px solid #E0E0E0',
                marginBottom: 16,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-icons-round" style={{ fontSize: 22, color: SECONDARY }}>person</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: TEXT_MAIN }}>{r.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                      {renderStars(r.rating, 16)}
                      <span style={{ fontSize: 12, color: TEXT_SUB }}>{r.date}</span>
                      <span style={{ marginLeft: 8, background: '#F5F3FF', color: SECONDARY, fontSize: 12, borderRadius: 8, padding: '2px 8px' }}>{r.lessons} lessons</span>
                    </div>
                  </div>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 4, color: TEXT_SUB, background: 'none', border: 'none', fontSize: 13, cursor: 'pointer', outline: 'none', padding: 0 }}>
                  <span className="material-icons-round" style={{ fontSize: 18, color: SECONDARY }}>thumb_up</span>
                  <span style={{ fontWeight: 500 }}>Helpful ({r.helpful})</span>
                </button>
              </div>
              <div style={{ fontSize: 15, color: TEXT_MAIN, marginTop: 2, lineHeight: 1.6 }}>{r.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachRatingsPage; 