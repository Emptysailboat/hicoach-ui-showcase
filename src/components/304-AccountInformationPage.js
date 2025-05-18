import React, { useState, useRef } from 'react';
import PageHeader from './common/PageHeader';

const AccountInformationPage = () => {
  // 模拟用户数据
  const [userData, setUserData] = useState({
    firstName: "Tom",
    lastName: "Turner",
    shortName: "Tom T.",
    email: "yufguo@aaa.com",
    phone: "+44 7410 958186"
  });
  
  // 编辑状态
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({...userData});
  
  // 头像相关状态
  const [avatar, setAvatar] = useState(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const fileInputRef = useRef(null);
  
  // 处理返回按钮点击事件
  const handleBack = () => {
    console.log('Back button clicked');
    // 在实际应用中，这里应该是导航回上一页
  };
  
  // 处理编辑状态的切换
  const toggleEditing = () => {
    if (isEditing) {
      // 保存更改
      const updatedData = {...tempData};
      // 更新shortName以反映新的姓名
      updatedData.shortName = `${tempData.firstName} ${tempData.lastName.charAt(0)}.`;
      setUserData(updatedData);
      setIsEditing(false);
    } else {
      // 进入编辑模式
      setTempData({...userData});
      setIsEditing(true);
    }
  };
  
  // 处理输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value
    });
  };
  
  // 处理头像上传
  const handleAvatarClick = () => {
    if (isEditing) {
      setShowAvatarModal(true);
    }
  };
  
  // 处理文件选择
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target) {
          setAvatar(e.target.result);
          setShowAvatarModal(false);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  // 头像模态框
  const AvatarModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-5 w-80 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Change Profile Photo</h3>
          <button 
            className="p-1 rounded-full active:bg-gray-200"
            onClick={() => setShowAvatarModal(false)}
          >
            <span className="material-icons-round text-gray-500">close</span>
          </button>
        </div>
        
        <div className="space-y-3">
          <button 
            className="w-full py-3 flex items-center justify-center bg-primary-50 text-primary-600 rounded-lg font-medium"
            onClick={() => fileInputRef.current.click()}
          >
            <span className="material-icons-round mr-2">upload</span>
            Upload Photo
          </button>
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleFileSelect}
          />
          
          {avatar && (
            <button 
              className="w-full py-3 flex items-center justify-center bg-red-50 text-red-600 rounded-lg font-medium active:bg-red-200"
              onClick={() => setAvatar(null)}
            >
              Remove Current Photo
            </button>
          )}
          
          <button 
            className="w-full py-3 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg font-medium"
            onClick={() => setShowAvatarModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // 编辑/保存按钮组件
  const EditButton = () => (
    <button 
      className="p-1 rounded-full active:bg-gray-200"
      onClick={toggleEditing}
      aria-label={isEditing ? "Save changes" : "Edit profile"}
    >
      {isEditing ? 
        <span className="material-icons-outlined text-primary-600" style={{fontSize: "20px"}}>check</span> : 
        <span className="material-icons-outlined text-primary-600" style={{fontSize: "20px"}}>edit</span>
      }
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto overflow-auto">
      {/* 使用PageHeader组件替换原有顶部标题栏 */}
      <div className="sticky top-0 z-10 shadow-sm">
        <PageHeader
          title="Account Details"
          onBack={handleBack}
          rightElement={<EditButton />}
        />
      </div>
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto bg-white">
        {/* 用户简称和头像 */}
        <div className="px-5 py-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">{userData.shortName}</h2>
          <div 
            className="relative cursor-pointer"
            onClick={handleAvatarClick}
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-primary-50 flex items-center justify-center text-primary-600 text-lg font-bold">
                  {userData.firstName.charAt(0)}
                </div>
              )}
            </div>
            {isEditing && (
              <button 
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAvatarModal(true);
                }}
              >
                <span className="material-icons-round text-gray-600 text-xs">photo_camera</span>
              </button>
            )}
          </div>
        </div>
        
        {/* 信息列表 */}
        <div className="px-5">
          {/* First name */}
          <div className="py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <label className="text-base font-medium text-gray-700">First name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={tempData.firstName}
                  onChange={handleInputChange}
                  className="w-3/5 p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-right"
                />
              ) : (
                <p className="text-base text-gray-800">{userData.firstName}</p>
              )}
            </div>
          </div>
          
          {/* Surname */}
          <div className="py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <label className="text-base font-medium text-gray-700">Surname</label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={tempData.lastName}
                  onChange={handleInputChange}
                  className="w-3/5 p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-right"
                />
              ) : (
                <p className="text-base text-gray-800">{userData.lastName}</p>
              )}
            </div>
          </div>
          
          {/* 邮箱 */}
          <div className="py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <label className="text-base font-medium text-gray-700">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={tempData.email}
                  onChange={handleInputChange}
                  className="w-3/5 p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-right"
                />
              ) : (
                <p className="text-base text-gray-800">{userData.email}</p>
              )}
            </div>
          </div>
          
          {/* 手机号码 */}
          <div className="py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <label className="text-base font-medium text-gray-700">Mobile Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={tempData.phone}
                  onChange={handleInputChange}
                  className="w-3/5 p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-right"
                />
              ) : (
                <p className="text-base text-gray-800">{userData.phone}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* 底部空间 */}
        <div className="h-20"></div>
      </div>
      
      {/* 头像修改模态框 */}
      {showAvatarModal && <AvatarModal />}
    </div>
  );
};

export default AccountInformationPage; 