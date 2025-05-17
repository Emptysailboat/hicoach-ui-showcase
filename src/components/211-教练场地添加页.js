import React, { useState } from 'react';
import { ChevronLeft, Camera, MapPin, Upload, CheckCircle, X } from 'lucide-react';

const CoachLocationAddPage = () => {
  // 表单状态
  const [locationName, setLocationName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [locationType, setLocationType] = useState('public'); // 'public' or 'private'
  const [courts, setCourts] = useState('1');
  const [amenities, setAmenities] = useState({
    parking: false,
    showers: false,
    changing_rooms: false,
    cafe: false,
    pro_shop: false,
    disabled_access: false,
    spectator_seating: false,
    indoor_courts: false
  });
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // 在实际应用中，这里会导航回位置列表页面
      setTimeout(() => {
        console.log('Navigate to locations list');
        // resetForm(); // 重置表单（如果需要）
      }, 1500);
    }, 1000);
  };
  
  // 处理复选框变化
  const handleAmenityChange = (amenity) => {
    setAmenities(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };
  
  // 处理照片上传
  const handlePhotoUpload = () => {
    // 在实际应用中，这里会打开文件选择器
    // 模拟文件上传
    const newPhoto = {
      id: Date.now(),
      url: 'https://via.placeholder.com/100x100'
    };
    setPhotos([...photos, newPhoto]);
  };
  
  // 删除照片
  const handlePhotoDelete = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };
  
  // 渲染成功状态
  if (showSuccess) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Location Added!</h2>
          <p className="text-gray-600 text-center mb-6">
            Your new teaching location has been added successfully.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3.5 flex items-center border-b border-gray-200">
        <button className="p-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-gray-800">Add New Location</h1>
        </div>
        <div className="w-6"></div> {/* 平衡左侧图标 */}
      </div>
      
      {/* 表单内容 */}
      <div className="flex-1 overflow-auto p-4">
        <form onSubmit={handleSubmit}>
          {/* 位置信息部分 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-3">Location Details</h2>
            
            {/* 位置名称 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="E.g. Wimbledon Tennis Club"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            
            {/* 地址 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="Street address"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postcode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="Postcode"
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            {/* 地图展示区（模拟） */}
            <div className="bg-gray-100 rounded-lg h-40 mb-4 flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <MapPin className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Map preview will appear here</p>
              </div>
            </div>
            
            <button
              type="button"
              className="w-full py-2 border border-purple-500 text-purple-600 rounded-lg text-sm font-medium"
            >
              Verify Location
            </button>
          </div>
          
          {/* 场地类型与设施 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-base font-medium text-gray-800 mb-3">Facility Information</h2>
            
            {/* 场地类型 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Type <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="locationType"
                    value="public"
                    checked={locationType === 'public'}
                    onChange={() => setLocationType('public')}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">Public Facility</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="locationType"
                    value="private"
                    checked={locationType === 'private'}
                    onChange={() => setLocationType('private')}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">Private/Home Court</span>
                </label>
              </div>
            </div>
            
            {/* 球场数量 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Courts <span className="text-red-500">*</span>
              </label>
              <select
                value={courts}
                onChange={(e) => setCourts(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="1">1 Court</option>
                <option value="2">2 Courts</option>
                <option value="3">3 Courts</option>
                <option value="4">4 Courts</option>
                <option value="5">5 Courts</option>
                <option value="6+">6+ Courts</option>
              </select>
            </div>
            
            {/* 设施 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities Available
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.parking}
                    onChange={() => handleAmenityChange('parking')}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mr-2"
                  />
                  <span className="text-sm text-gray-700">Parking</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.showers}
                    onChange={() => handleAmenityChange('showers')}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mr-2"
                  />
                  <span className="text-sm text-gray-700">Showers</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.changing_rooms}
                    onChange={() => handleAmenityChange('changing_rooms')}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mr-2"
                  />
                  <span className="text-sm text-gray-700">Changing Rooms</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.cafe}
                    onChange={() => handleAmenityChange('cafe')}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mr-2"
                  />
                  <span className="text-sm text-gray-700">Cafe/Refreshments</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.pro_shop}
                    onChange={() => handleAmenityChange('pro_shop')}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mr-2"
                  />
                  <span className="text-sm text-gray-700">Pro Shop</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.disabled_access}
                    onChange={() => handleAmenityChange('disabled_access')}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mr-2"
                  />
                  <span className="text-sm text-gray-700">Disabled Access</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.spectator_seating}
                    onChange={() => handleAmenityChange('spectator_seating')}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mr-2"
                  />
                  <span className="text-sm text-gray-700">Spectator Seating</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.indoor_courts}
                    onChange={() => handleAmenityChange('indoor_courts')}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mr-2"
                  />
                  <span className="text-sm text-gray-700">Indoor Courts</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* 场地照片 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-base font-medium text-gray-800 mb-3">Location Photos</h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">
                Add photos of the facility to help students find the courts (optional).
              </p>
              
              <div className="grid grid-cols-3 gap-3">
                {/* 已上传照片 */}
                {photos.map(photo => (
                  <div key={photo.id} className="relative">
                    <img 
                      src={photo.url} 
                      alt="Location" 
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <button 
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-100 rounded-full p-1"
                      onClick={() => handlePhotoDelete(photo.id)}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}
                
                {/* 添加照片按钮 */}
                {photos.length < 6 && (
                  <button
                    type="button"
                    className="h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50"
                    onClick={handlePhotoUpload}
                  >
                    <Camera className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                  </button>
                )}
              </div>
              
              {photos.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  {photos.length}/6 photos added
                </p>
              )}
            </div>
          </div>
          
          {/* 提交按钮 */}
          <button
            type="submit"
            className="w-full py-2.5 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Adding Location...
              </>
            ) : (
              'Add Location'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoachLocationAddPage; 