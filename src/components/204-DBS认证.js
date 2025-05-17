import React, { useState } from 'react';
import { ArrowLeft, FileText, Shield, AlertTriangle, CheckCircle, Upload, X, Check, AlertCircle } from 'lucide-react';

const DBSUploadPage = () => {
  // 状态用于跟踪文件上传
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);
  
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
    if (!file) return;
    
    setUploading(true);
    setError(null);
    
    // 模拟上传过程，有20%的概率失败（用于演示错误处理）
    setTimeout(() => {
      setUploading(false);
      
      // 模拟随机上传失败的情况
      const randomFailure = Math.random() < 0.2;
      if (randomFailure) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setUploadComplete(true);
        console.log("DBS Certificate uploaded successfully");
      }
    }, 2000);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-200 shadow-sm h-14">
        <div className="flex items-center">
          <button className="p-1 rounded-full hover:bg-gray-100 mr-2 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">DBS Certificate Upload</h1>
        </div>
      </div>
      
      {/* 主要内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 pt-5">
        {/* 说明卡片 */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-5 border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">DBS Certificate Upload</h2>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            To ensure the safety of our students, we require all coaches to upload a valid DBS (Disclosure and Barring Service) certificate. This will be reviewed directly by the HiCoach team.
          </p>
          
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-green-600 font-bold">•</span>
                <span>Enhanced DBS check certificate issued within the last 12 months</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600 font-bold">•</span>
                <span>Clear, legible scan or photo of the entire document</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600 font-bold">•</span>
                <span>File must be in PDF, JPG, or PNG format (max 10MB)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg mb-5">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mr-2" />
              <p className="text-sm text-yellow-700">
                Your certificate will be securely stored and only accessed by authorized HiCoach staff for verification purposes.
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
              <span>Typically verified within 1-2 business days</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
              <span>You'll be notified once verification is complete</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
              <span>We'll remind you when renewal is needed</span>
            </div>
          </div>
        </div>
        
        {/* 文件上传区域 */}
        {!uploadComplete ? (
          <div className="mb-5">
            {/* 文件类型错误提示 */}
            {fileError && (
              <div className="bg-red-50 rounded-lg border border-red-200 p-3 mb-3 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mr-2 mt-0.5" />
                <p className="text-sm text-red-700">{fileError}</p>
              </div>
            )}
            
            {/* 上传错误提示 */}
            {error && (
              <div className="bg-red-50 rounded-lg border border-red-200 p-3 mb-3 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-700">Upload failed</p>
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              </div>
            )}
            
            {!file ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                <input 
                  type="file" 
                  id="dbsFile" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <label htmlFor="dbsFile" className="cursor-pointer">
                  <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">Tap to upload your DBS certificate</p>
                  <p className="text-xs text-gray-500">PDF, JPG or PNG (max. 10MB)</p>
                </label>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
                  </div>
                </div>
                <button 
                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={removeFile}
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-green-50 rounded-lg border border-green-200 p-4 mb-5">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Upload Successful!</p>
                <p className="text-xs text-green-700">Your DBS certificate has been submitted for review</p>
              </div>
            </div>
          </div>
        )}
        
        {/* 操作按钮 */}
        {!uploadComplete ? (
          <button 
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium transition-colors 
              ${!file || uploading || fileError
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'}`}
            onClick={handleUpload}
            disabled={!file || uploading || fileError}
          >
            {uploading ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white mr-2"></div>
                Uploading...
              </span>
            ) : (
              <span className="flex items-center">
                <Upload className="mr-2 h-5 w-5" /> Upload Certificate
              </span>
            )}
          </button>
        ) : (
          <button 
            className="w-full py-3 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 
            active:bg-green-800 font-medium transition-colors flex items-center justify-center"
            onClick={() => console.log("Navigate back to onboarding")}
          >
            <Check className="mr-1.5 h-5 w-5" /> Continue
          </button>
        )}
        
        {/* 底部说明 */}
        <p className="text-xs text-gray-500 text-center mt-5">
          Having trouble? <a href="#" className="text-green-600 hover:underline">Contact support</a> for assistance.
        </p>
      </div>
    </div>
  );
};

export default DBSUploadPage; 