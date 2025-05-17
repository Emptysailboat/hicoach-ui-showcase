import React from 'react';
import { 
  User, 
  Lock, 
  CreditCard, 
  Bell, 
  Calendar, 
  Shield, 
  HelpCircle, 
  Info, 
  RefreshCw, 
  LogOut, 
  Home, 
  BookOpen, 
  ChevronRight, 
  UserCircle, 
  DollarSign, 
  TrendingUp, 
  PauseCircle,
  Clock,
  BarChart2
} from 'lucide-react';

const CoachProfilePage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto border border-gray-200 rounded-md overflow-hidden">
      {/* 顶部标题栏 */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-center border-b border-gray-200 shadow-sm h-14">
        <h1 className="text-lg font-semibold text-gray-800">Profile</h1>
      </div>
      
      {/* 主要内容区 - 可滚动 */}
      <div className="flex-1 overflow-y-auto pb-16">
        {/* 个人信息区域 - 简约现代设计 */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-800 mr-3">Alex S</h2>
            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
              Coach
            </span>
          </div>
        </div>
        <div className="w-full h-px bg-gray-200 mb-4"></div>
        
        {/* 账户与安全部分 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Account & Security</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <User className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Account Details</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Change Password</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* 教练设置部分 - 移除了Chat Templates */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Coaching Setup</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <UserCircle className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Coach Profile</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Bank Details</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Promote Yourself</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <PauseCircle className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Pause Account</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* 偏好设置部分 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Preferences</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Payment Methods</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Notifications</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Sync Calendar</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Privacy Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* 应用信息部分 */}
        <div className="px-4 mb-5">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">App</h3>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <Info className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">About</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="border-t border-gray-100"></div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-800 font-medium">Switch Role</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* 登出按钮 */}
        <div className="px-4 mb-5">
          <button className="w-full flex items-center justify-center p-3.5 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 active:bg-red-100 transition-colors">
            <LogOut className="w-5 h-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* 底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 grid grid-cols-5 shadow-md max-w-md mx-auto">
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Home className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-xs font-medium text-gray-500 mt-0.5">Home</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-xs font-medium text-gray-500 mt-0.5">Lessons</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Clock className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-xs font-medium text-gray-500 mt-0.5">Availability</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-xs font-medium text-gray-500 mt-0.5">Performance</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-xs font-medium text-green-600 mt-0.5">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default CoachProfilePage; 