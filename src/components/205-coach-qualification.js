import React, { useState } from 'react';
import PageHeader from './common/PageHeader';

const CertificationUploadPage = () => {
  // 所有运动选项
  const sportOptions = [
    { id: 'tennis', name: 'Tennis', available: true },
    { id: 'padel', name: 'Padel', available: false },
    { id: 'squash', name: 'Squash', available: false },
    { id: 'pickleball', name: 'Pickleball', available: false },
    { id: 'badminton', name: 'Badminton', available: false },
    { id: 'tabletennis', name: 'Table tennis', available: false },
    { id: 'golf', name: 'Golf', available: false }
  ];
  
  // 网球认证类型
  const tennisCertifications = [
    { id: 'lta', name: 'LTA (Lawn Tennis Association)' },
    { id: 'ptr', name: 'PTR (Professional Tennis Registry)' },
    { id: 'itf', name: 'ITF (International Tennis Federation)' },
    { id: 'gptca', name: 'GPTCA (Global Professional Tennis Coach Association)' },
    { id: 'other', name: 'Other certification' }
  ];
  
  // 状态管理
  const [selectedSport, setSelectedSport] = useState(sportOptions[0]);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [file, setFile] = useState(null);
  const [showSportDropdown, setShowSportDropdown] = useState(false);
  const [showCertDropdown, setShowCertDropdown] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);
  
  // 处理运动选择
  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
    setShowSportDropdown(false);
    // 如果更换运动，重置证书选择
    setSelectedCertification(null);
  };
  
  // 处理证书类型选择
  const handleCertificationSelect = (cert) => {
    setSelectedCertification(cert);
    setShowCertDropdown(false);
  };
  
  // 处理文件选择
  const handleFileChange = (e) => {
    setError(null);
    setFileError(null);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // 检查文件类型
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(selectedFile.type)) {
        setFileError('Invalid file type. Please upload a PDF, JPG, or PNG file.');
        return;
      }
      
      // 检查文件大小 (10MB = 10 * 1024 * 1024 bytes)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setFileError('File is too large. Maximum size is 10MB.');
        return;
      }
      
      setFile(selectedFile);
    }
  };
  
  // 移除选择的文件
  const removeFile = () => {
    setFile(null);
    setFileError(null);
    setError(null);
  };
  
  // 处理文件上传
  const handleUpload = () => {
    if (!file || !selectedCertification) return;
    
    setUploading(true);
    setError(null);
    
    // 模拟上传过程
    setTimeout(() => {
      setUploading(false);
      
      // 模拟随机上传失败的情况（10%概率）
      const randomFailure = Math.random() < 0.1;
      if (randomFailure) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setUploadComplete(true);
        console.log(`${selectedCertification.name} certificate uploaded successfully for ${selectedSport.name}`);
      }
    }, 2000);
  };
  
  // 处理返回按钮点击
  const handleBack = () => {
    // 在实际应用中，这里会导航回上一页
    console.log('Navigate back');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <PageHeader title="Professional Certification" onBack={handleBack} />
      
      {/* 主要内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 pt-5">
        {/* 说明卡片 */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-5 border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="material-icons text-green-600">emoji_events</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Coaching Certification</h2>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Please upload your professional coaching certification to verify your coaching qualifications. This helps build trust with students and ensures high-quality coaching standards.
          </p>
          
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-green-600 font-bold">•</span>
                <span>Select your sport and certification type</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600 font-bold">•</span>
                <span>Upload a clear, legible scan or photo of your certification</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600 font-bold">•</span>
                <span>File must be in PDF, JPG, or PNG format (max 10MB)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-r-lg mb-5">
            <div className="flex">
              <span className="material-icons text-purple-600 mr-2">warning</span>
              <p className="text-sm text-purple-700">
                Currently only Tennis coaching is available. More sports will be added soon.
              </p>
            </div>
          </div>
        </div>
        
        {/* 选择和上传区域 */}
        {!uploadComplete ? (
          <div className="space-y-5">
            {/* 选择运动 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Select Sport
              </label>
              <div className="relative">
                <button 
                  className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-left text-sm text-gray-700 shadow-sm"
                  onClick={() => setShowSportDropdown(!showSportDropdown)}
                >
                  <div className="flex items-center">
                    {selectedSport.name}
                    {!selectedSport.available && (
                      <span className="ml-2 inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <span className="material-icons text-gray-400">expand_more</span>
                </button>
                
                {/* 运动下拉菜单 */}
                {showSportDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1 max-h-60 overflow-auto">
                    {sportOptions.map((sport) => (
                      <div 
                        key={sport.id}
                        className={`px-4 py-2.5 text-sm cursor-pointer ${selectedSport.id === sport.id ? 'bg-green-50 text-green-700' : 'text-gray-700'}`}
                        onClick={() => handleSportSelect(sport)}
                      >
                        <span>{sport.name}</span>
                        {!sport.available && (
                          <span className="ml-2 inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* 选择证书类型 - 只有当网球被选择时才启用 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Certification Type
              </label>
              <div className="relative">
                <button 
                  className={`w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-left text-sm shadow-sm
                    ${selectedSport.available 
                      ? 'text-gray-700' 
                      : 'text-gray-400 bg-gray-50 cursor-not-allowed'}`}
                  onClick={() => selectedSport.available && setShowCertDropdown(!showCertDropdown)}
                  disabled={!selectedSport.available}
                >
                  <span>
                    {selectedCertification ? selectedCertification.name : 'Select certification type'}
                  </span>
                  <span className="material-icons text-gray-400">expand_more</span>
                </button>
                
                {/* 证书类型下拉菜单 */}
                {showCertDropdown && selectedSport.available && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1 max-h-60 overflow-auto">
                    {tennisCertifications.map((cert) => (
                      <div 
                        key={cert.id}
                        className={`px-4 py-2.5 text-sm cursor-pointer ${selectedCertification && selectedCertification.id === cert.id ? 'bg-green-50 text-green-700' : 'text-gray-700'}`}
                        onClick={() => handleCertificationSelect(cert)}
                      >
                        {cert.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* 上传区域 - 只在选择了证书类型后启用 */}
            <div className={!selectedCertification ? 'opacity-50' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Upload Certificate
              </label>
              
              {/* 错误提示 */}
              {fileError && (
                <div className="bg-red-50 rounded-lg border border-red-200 p-3 mb-3 flex items-start">
                  <span className="material-icons text-red-600 mr-2">error</span>
                  <p className="text-sm text-red-700">{fileError}</p>
                </div>
              )}
              
              {/* 上传错误提示 */}
              {error && (
                <div className="bg-red-50 rounded-lg border border-red-200 p-3 mb-3 flex items-start">
                  <span className="material-icons text-red-600 mr-2">error</span>
                  <div>
                    <p className="text-sm font-medium text-red-700">Upload failed</p>
                    <p className="text-xs text-red-600">{error}</p>
                  </div>
                </div>
              )}
              
              {!file ? (
                <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center
                  ${!selectedCertification ? 'pointer-events-none' : 'cursor-pointer'}`}>
                  <input 
                    type="file" 
                    id="certFile" 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    className="hidden" 
                    onChange={handleFileChange}
                    disabled={!selectedCertification}
                  />
                  <label htmlFor="certFile" className={!selectedCertification ? 'cursor-default' : 'cursor-pointer'}>
                    <span className="material-icons text-gray-400 text-4xl mb-3">description</span>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {selectedCertification 
                        ? 'Tap to upload your certification' 
                        : 'Select a certification type first'}
                    </p>
                    <p className="text-xs text-gray-500">PDF, JPG or PNG (max. 10MB)</p>
                  </label>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <span className="material-icons text-purple-600">description</span>
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
                    </div>
                  </div>
                  <button 
                    className="p-1.5 rounded-full bg-gray-100"
                    onClick={removeFile}
                  >
                    <span className="material-icons text-gray-600" style={{ fontSize: '16px' }}>close</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* 上传按钮 */}
            <button 
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium
                ${!selectedCertification || !file || uploading || fileError
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-600 text-white'}`}
              onClick={handleUpload}
              disabled={!selectedCertification || !file || uploading || fileError}
            >
              {uploading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white mr-2"></div>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="material-icons mr-2">file_upload</span> Upload Certificate
                </span>
              )}
            </button>
          </div>
        ) : (
          <div>
            {/* 上传成功显示 */}
            <div className="bg-green-50 rounded-lg border border-green-200 p-4 mb-5">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="material-icons text-green-600">check</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Upload Successful!</p>
                  <p className="text-xs text-green-700">
                    Your {selectedCertification.name} certification has been submitted for review
                  </p>
                </div>
              </div>
            </div>
            
            {/* 成功后的继续按钮 */}
            <button 
              className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-medium flex items-center justify-center"
              onClick={() => console.log("Navigate back to onboarding")}
            >
              <span className="material-icons mr-1.5">check</span> Continue
            </button>
          </div>
        )}
        
        {/* 底部说明 */}
        <p className="text-xs text-gray-500 text-center mt-5">
          Having trouble? <a href="#" className="text-green-600">Contact support</a> for assistance.
        </p>
      </div>
    </div>
  );
};

export default CertificationUploadPage; 