import React, { useState } from 'react';

const RecurringBookingPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  // 套餐选项
  const packageOptions = [
    { 
      id: 'beginner', 
      name: '4 Lessons Package', 
      sessions: 4, 
      duration: 60, 
      description: 'Perfect for beginners to learn the basics of tennis',
      price: 180, // 优惠价格
      regularPrice: 200, // 原价
      skills: ['Forehand', 'Backhand', 'Basic rules'],
      level: 'Beginner'
    },
    { 
      id: 'intermediate', 
      name: '8 Lessons Package', 
      sessions: 8, 
      duration: 60, 
      description: 'Improve your technique and game strategy',
      price: 350,
      regularPrice: 400,
      skills: ['Serve', 'Volley', 'Footwork', 'Game tactics'],
      level: 'Intermediate'
    },
    { 
      id: 'advanced', 
      name: '12 Lessons Package', 
      sessions: 12, 
      duration: 60, 
      description: 'Refine your skills and master advanced techniques',
      price: 590,
      regularPrice: 650,
      skills: ['Power serve', 'Advanced footwork', 'Match strategy', 'Shot placement'],
      level: 'Advanced'
    }
  ];
  
  // 选择套餐
  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1.5 rounded-full active:bg-gray-100">
          <span className="material-icons-round text-gray-700" style={{ fontSize: '24px' }}>
            arrow_back_ios_new
          </span>
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-gray-800">Select Package</h1>
        </div>
        <div className="w-5"></div>
      </div>
      
      {/* 进度指示器 */}
      <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-primary-600 text-white">
            1
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            2
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            3
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            4
          </div>
          <div className="h-0.5 w-6 bg-gray-200"></div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 text-gray-500">
            5
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Step 1/5
        </div>
      </div>
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto px-4 py-5">
        <p className="text-sm text-gray-600 mb-6">
          Select a package that matches your skill level and learning goals. All packages include a structured learning plan.
        </p>
      
        <div className="space-y-4 mb-6">
          {packageOptions.map((pkg) => (
            <div 
              key={pkg.id}
              className={`p-4 bg-white rounded-lg border-2 ${
                selectedPackage === pkg.id 
                  ? 'border-primary-600 bg-primary-50' 
                  : 'border-gray-200'
              } transition-colors cursor-pointer relative`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {/* 人气标签 - 只为中级套餐显示 */}
              {pkg.id === 'intermediate' && (
                <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1/2">
                  <div className="bg-purple-600 text-white text-xs font-medium py-1 px-3 rounded-full shadow-sm">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-medium text-gray-800">{pkg.sessions} Lessons Package</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{pkg.level} level</p>
                </div>
                
                {selectedPackage === pkg.id && (
                  <span className="material-icons-round text-primary-600" style={{ fontSize: '20px' }}>
                    check_circle
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-3">
                {pkg.skills.map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex items-start justify-between pt-2 border-t border-gray-200">
                <div>
                  <div className="flex items-center text-sm">
                    <span className="material-icons-round text-primary-600 mr-1.5" style={{ fontSize: '18px' }}>
                      menu_book
                    </span>
                    <span className="text-primary-600 font-semibold">{pkg.sessions} lessons</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <span className="material-icons-round text-gray-500 mr-1.5" style={{ fontSize: '18px' }}>
                      schedule
                    </span>
                    <span>{pkg.duration} min each</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-primary-600 font-medium">£{pkg.price}</div>
                  {pkg.regularPrice > pkg.price && (
                    <div className="text-xs text-gray-500">
                      <span className="line-through">£{pkg.regularPrice}</span>
                      <span className="ml-2 text-primary-600">Save {Math.round((pkg.regularPrice - pkg.price) / pkg.regularPrice * 100)}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 提示信息 */}
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 mb-6">
          <div className="flex">
            <span className="material-icons-round text-purple-600 mr-2 flex-shrink-0" style={{ fontSize: '20px' }}>
              info
            </span>
            <div>
              <p className="text-sm text-purple-700">
                Each package includes a structured learning plan designed to help you progress systematically.
              </p>
              <p className="text-sm text-purple-700 mt-1">
                You'll be able to adjust individual lesson times after booking if needed.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            className={`w-full px-5 py-3 rounded-lg font-medium ${
              selectedPackage 
                ? 'bg-primary-600 text-white active:bg-primary-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!selectedPackage}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecurringBookingPackage; 