import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import CoachInfoCard from "./common/CoachInfoCard";

const CoachDetailPage = () => {
  const [isStarred, setIsStarred] = useState(false);
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  // 模拟教练数据
  const coachData = {
    id: 1,
    name: "Coach Name1",
    rating: 4.9,
    reviews: 235,
    price: 30,
    distance: 0.3,
    lessonsCompleted: 456,
    location: "Wilton tennis club",
    qualifications: ["LTA-5", "PTR-PRO"],
    about:
      "I'm a certified tennis coach with over 10 years of experience teaching players of all levels. My coaching philosophy focuses on technical development while keeping sessions fun and engaging. I specialize in helping beginners build a solid foundation and intermediate players refine their skills.",
  };

  // 处理收藏状态变更
  const handleToggleFavorite = () => {
    setIsStarred(!isStarred);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center justify-between border-b border-gray-200">
        <button className="p-1 active:bg-gray-100 rounded-full">
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Coach Profile</h1>
        <div className="w-5"></div> {/* 占位元素，保持布局平衡 */}
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          {/* 使用CoachInfoCard组件展示教练基本信息 */}
          <CoachInfoCard
            coach={coachData}
            isFavorite={isStarred}
            onToggleFavorite={handleToggleFavorite}
          />

          {/* 关于教练 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-primary-600 mb-2">
                About
              </h3>
              <p className="text-gray-700 text-sm">{coachData.about}</p>
            </div>
          </div>

          {/* 教学地点 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-primary-600 mb-2">
                Locations
              </h3>

              {/* 主要地点 */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Main Location
                </h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary-600 mr-2 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-gray-800">
                        Wilton tennis club
                      </h5>
                      <p className="text-sm text-gray-600 mt-0.5">
                        28 Wilton Grove, London SW19 3QX
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 其他地点 */}
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                Other Locations
              </h4>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary-600 mr-2 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-gray-800">
                        Dundonald playground
                      </h5>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Dundonald Road, London SW19 3QH
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary-600 mr-2 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-gray-800">
                        Joseph Hood recreational playground
                      </h5>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Marina Avenue, London SW20 0YD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 评价 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-600">
                  Ratings & Reviews
                </h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-primary-600 fill-primary-600" />
                  <span className="ml-1 text-sm font-medium">5.0</span>
                  <span className="mx-1 text-gray-500">•</span>
                  <span className="text-sm text-gray-500">41 ratings</span>
                </div>
              </div>

              {/* 评分分布 */}
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <div className="w-16 text-sm text-gray-600">5 stars</div>
                  <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <div className="w-8 text-right text-sm text-gray-600">
                    100%
                  </div>
                </div>

                {[4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center mb-1">
                    <div className="w-16 text-sm text-gray-600">
                      {stars} stars
                    </div>
                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm text-gray-600">
                      0%
                    </div>
                  </div>
                ))}
              </div>

              {/* 用户评价 */}
              <div className="space-y-4 mt-6">
                <h4 className="font-medium text-gray-800">Recent Reviews</h4>

                {/* 评价1 */}
                <div className="pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-gray-800">Sarah M.</h5>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-primary-600 fill-primary-600" />
                      <Star className="h-3 w-3 text-primary-600 fill-primary-600" />
                      <Star className="h-3 w-3 text-primary-600 fill-primary-600" />
                      <Star className="h-3 w-3 text-primary-600 fill-primary-600" />
                      <Star className="h-3 w-3 text-primary-600 fill-primary-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Great coach! Very patient and knowledgeable. I've improved
                    my backhand significantly after just a few lessons.
                  </p>
                  <span className="text-xs text-gray-500">2 weeks ago</span>
                </div>

                {/* 评价2 */}
                <div className="pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-gray-800">John D.</h5>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-primary-600 fill-primary-600" />
                      <Star className="h-3 w-3 text-primary-600 fill-primary-600" />
                      <Star className="h-3 w-3 text-primary-600 fill-primary-600" />
                      <Star className="h-3 w-3 text-primary-600 fill-primary-600" />
                      <Star className="h-3 w-3 text-primary-600 fill-primary-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    My son loves his lessons. The coach makes learning fun while
                    still focusing on proper technique.
                  </p>
                  <span className="text-xs text-gray-500">1 month ago</span>
                </div>

                {/* 查看更多按钮 */}
                <button
                  className="flex items-center text-primary-600 text-sm font-medium mt-2 active:text-primary-700"
                  onClick={() => setShowMoreReviews(!showMoreReviews)}
                >
                  {showMoreReviews ? "Show less" : "Show all 41 reviews"}
                  {showMoreReviews ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="bg-white p-4 flex items-center justify-between gap-3 border-t border-gray-200 shadow-lg">
        <button className="flex items-center justify-center py-3 px-4 rounded-lg border border-gray-200 active:bg-gray-100 flex-1">
          <MessageCircle className="h-5 w-5 text-primary-600 mr-2" />
          <span className="text-primary-600 font-medium">Message</span>
        </button>

        <button className="flex items-center justify-center py-3 px-4 bg-primary-600 text-white font-medium rounded-lg text-center active:bg-primary-700 active:scale-99 transition-transform flex-1">
          Book Lessons
        </button>
      </div>
    </div>
  );
};

export default CoachDetailPage;
