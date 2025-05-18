import React, { useState } from 'react';
import CoachSearchResults from '../components/104-CoachSearchResults';
import WelcomeScreen from '../components/301-WelcomeScreen';
import LearnerHomePage from '../components/101-LearnerHomePage';
import MessageNotificationSystem from '../components/103-MessageNotificationSystem';
import LocationManagement from '../components/102-LocationSelectionPage';
import CoachDetailPage from '../components/105-CoachDetailPage';
import FavoriteCoachesPage from '../components/122-FavoriteCoachesPage';
import BookingTypeSelection from '../components/106-BookingTypeSelection';
import SingleBookingTimeSelection from '../components/107-SingleBookingTimeSelection';
import SingleBookingDetails from '../components/108-SingleBookingDetails';
import SingleBookingConfirmation from '../components/109-SingleBookingConfirmation';
import RecurringBookingPackage from '../components/110-RecurringBookingPackage';
import RecurringBookingTimeSelection from '../components/111-RecurringBookingTimeSelection';
import RecurringBookingScheduleConfirmation from '../components/112-RecurringBookingScheduleConfirmation';
import RecurringBookingDetails from '../components/113-RecurringBookingDetails';
import RecurringBookingConfirmation from '../components/114-RecurringBookingConfirmation';
import PaymentPage from '../components/115-PaymentPage';
import LessonsPage from '../components/116-LessonsPage';
import PendingLessonCard from '../components/117-PendingLessonCard';
import ConfirmedLessonCard from '../components/118-ConfirmedLessonCard';
import CompletedLessonCard from '../components/119-CompletedLessonCard';
import DeclinedLessonCard from '../components/120-DeclinedLessonCard';
import StudentCancelLesson from '../components/121-StudentCancelLesson';
import LearnerProfilePage from '../components/123-LearnerProfilePage';
import SignUpPage from '../components/302-SignUpPage';
import LoginPage from '../components/303-LoginPage';
import AccountInformationPage from '../components/304-AccountInformationPage';
import ChangePasswordPage from '../components/305-ChangePasswordPage';
import PaymentMethodsPage from '../components/306-PaymentMethodsPage';
import NotificationSettingsPage from '../components/307-NotificationSettingsPage';
import CalendarSyncPage from '../components/308-CalendarSyncPage';
import PrivacySettingsPage from '../components/309-PrivacySettingsPage';
import SupportPage from '../components/310-SupportPage';
import AboutPage from '../components/311-AboutPage';
import RoleSwitcherScreen from '../components/312-RoleSwitcherScreen';
import GuideSystem from '../components/313-GuideSystem';
import GuideDetailPageExample from '../components/314-GuideDetailPage';
// 导入教练相关组件
import CoachOnboardingPage from '../components/201-教练主页-入职';
import CoachHomePage from '../components/202-教练主页-常态';
import VerifyIdentityPage from '../components/203-身份验证';
import DBSUploadPage from '../components/204-DBS认证';
import CertificationUploadPage from '../components/205-教练资格认证';
import BankDetailsPage from '../components/206-收款信息';
import CoachAvailabilityEntryPage from '../components/207-时间管理';
import TeachingTimeSettings from '../components/208-教学时间设置';
import CoachTimeOffPage from '../components/209-教练请假列表和设置';
import CoachLocationDirectory from '../components/210-教练场地目录页';
import CoachLocationAddPage from '../components/211-教练场地添加页';
import PricingLandingPage from '../components/212-价格设定入口';
import SingleLessonPricingPage from '../components/213-价格设定-单次课程';
import PackagePricingPage from '../components/214-价格设定-多次课程';
import CoachIntroPage from '../components/215-自我介绍';
import CoachPendingLessonDetail from '../components/216-教练端-Pending状态课程卡';
import CoachConfirmedLessonDetail from '../components/217-教练端-Confirm状态课程卡';
import CoachCompletedLessonDetail from '../components/218-教练端-Completed状态课程卡';
import CoachDeclinedLessonDetail from '../components/219-教练端-declined状态课程卡';
import CoachCancelLesson from '../components/220-教练取消课程';
// 新增教练相关组件
import CoachPerformanceOptimized from '../components/221-教练Performance';
import CoachIncomeSummaryPage from '../components/222-教练收入详情';
import CoachRatingsPage from '../components/223-教练评分';
import CoachProfilePage from '../components/224-教练用户页';
import CoachProfileSettingsPage from '../components/225-教练系统设置';
import CoachPromotePage from '../components/226-教练推广';
import CoachPauseAccountPage from '../components/227-教练暂停接单';
// 导入通用组件
import CoachInfoCard from '../components/common/CoachInfoCard';
import BottomNavigation from '../components/common/BottomNavigation';
import PageHeader from '../components/common/PageHeader';
import LessonDetailsCard from '../components/common/LessonDetailsCard';
import PriceDetailsCard from '../components/common/PriceDetailsCard';
import LocationCard from '../components/common/LocationCard';

// 添加Material Icons字体引入
const MaterialIconsHead = () => {
  return (
    <React.Fragment>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
    </React.Fragment>
  );
};

// CoachInfoCard展示组件
const CoachInfoCardShowcase = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const coachData = {
    id: 1,
    name: 'Sarah Parker',
    rating: 4.9,
    reviews: 41,
    price: 30,
    distance: 0.3,
    lessonsCompleted: 456,
    location: 'Wilton tennis club',
    qualifications: ['LTA-5', 'PTR-PRO'],
  };
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">标准卡片</h2>
        <CoachInfoCard 
          coach={coachData}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">迷你卡片</h2>
        <CoachInfoCard 
          coach={coachData}
          isMiniCard={true}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">无资质卡片</h2>
        <CoachInfoCard 
          coach={coachData}
          showQualifications={false}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">无位置信息卡片</h2>
        <CoachInfoCard 
          coach={coachData}
          showLocation={false}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
};

// BottomNavigation展示组件
const BottomNavigationShowcase = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">底部导航栏</h2>
        <div className="relative h-80 border border-gray-200 rounded-lg">
          <div className="p-4 text-center text-gray-500">
            页面内容区域
          </div>
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

// PageHeader展示组件
const PageHeaderShowcase = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">带返回按钮的页面标题</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <PageHeader 
            title="Page Title"
            onBack={() => {}}
          />
          <div className="p-4 text-center text-gray-500">
            页面内容区域
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">带右侧元素的页面标题</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <PageHeader 
            title="Page Title"
            onBack={() => {}}
            rightElement={
              <button className="p-1 rounded-full">
                <i className="material-icons-outlined text-gray-700" style={{ fontSize: '20px' }}>more_vert</i>
              </button>
            }
          />
          <div className="p-4 text-center text-gray-500">
            页面内容区域
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">仅标题的页面标题</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <PageHeader title="Page Title" />
          <div className="p-4 text-center text-gray-500">
            页面内容区域
          </div>
        </div>
      </div>
    </div>
  );
};

// LessonDetailsCard展示组件
const LessonDetailsCardShowcase = () => {
  const singleLessonData = {
    type: 'Private Lesson',
    date: 'Thu, 15 Jun',
    time: '10:00 - 11:00',
    duration: 60,
    people: 1,
    skills: ['Forehand', 'Backhand', 'Serve'],
    needsEquipment: true
  };
  
  const recurringLessonData = {
    type: 'Package Lesson',
    startDate: 'Mon, 3 Jul',
    startTime: '18:00 - 19:00',
    schedule: 'Every Monday',
    sessions: 8,
    duration: 60,
    people: 1,
    skills: ['Advanced Techniques', 'Match Strategy'],
    needsEquipment: false
  };
  
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">单次课程详情</h2>
        <LessonDetailsCard 
          lesson={singleLessonData}
          title="Single Lesson Details"
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">周期课程详情</h2>
        <LessonDetailsCard 
          lesson={recurringLessonData}
          title="Package Lesson Details"
          skillTagClassName="bg-primary-100 text-primary-600"
        />
      </div>
    </div>
  );
};

// PriceDetailsCard展示组件
const PriceDetailsCardShowcase = () => {
  const standardPriceData = {
    subtotal: 60,
    total: 60
  };
  
  const complexPriceData = {
    subtotal: 480,
    discount: 48,
    fees: [
      { name: 'Booking Fee', amount: 5 },
      { name: 'Equipment Rental', amount: 10 }
    ],
    total: 447
  };
  
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">基本价格详情</h2>
        <PriceDetailsCard 
          {...standardPriceData}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">完整价格详情</h2>
        <PriceDetailsCard 
          {...complexPriceData}
          title="Package Price Details"
        />
      </div>
    </div>
  );
};

// LocationCard展示组件
const LocationCardShowcase = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const locationData = [
    {
      id: '1',
      name: 'Wimbledon Tennis Club',
      address: '23 Tennis Road, Wimbledon, London',
      distance: '0.5 miles',
      facilities: ['Indoor Courts', 'Parking', 'Pro Shop']
    },
    {
      id: '2',
      name: "Queen's Club",
      address: "15 Queen's Road, West Kensington, London",
      distance: '1.2 miles',
      facilities: ['Clay Courts', 'Changing Rooms']
    }
  ];
  
  const handleSelect = (id) => {
    setSelectedLocation(id === selectedLocation ? null : id);
  };
  
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">场地详情卡片</h2>
        <LocationCard 
          location={locationData[0]}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">可选择的场地卡片</h2>
        <div className="space-y-4">
          {locationData.map(location => (
            <LocationCard 
              key={location.id}
              location={location}
              isSelectable={true}
              isSelected={selectedLocation === location.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ComponentShowcase = () => {
  const [activeComponent, setActiveComponent] = useState('welcome');
  
  const renderComponent = () => {
    switch(activeComponent) {
      case 'welcome':
        return <WelcomeScreen />;
      case '101-learnerHome':
        return <LearnerHomePage />;
      case '102-location':
        return <LocationManagement />;
      case '103-messageSystem':
        return <MessageNotificationSystem />;
      case '104-coachSearch':
        return <CoachSearchResults />;
      case '105-coachDetail':
        return <CoachDetailPage />;
      case '106-bookingType':
        return <BookingTypeSelection />;
      case '107-timeSelection':
        return <SingleBookingTimeSelection />;
      case '108-bookingDetails':
        return <SingleBookingDetails />;
      case '109-bookingConfirmation':
        return <SingleBookingConfirmation />;
      case '110-recurringPackage':
        return <RecurringBookingPackage />;
      case '111-recurringTimeSelection':
        return <RecurringBookingTimeSelection />;
      case '112-recurringSchedule':
        return <RecurringBookingScheduleConfirmation />;
      case '113-recurringDetails':
        return <RecurringBookingDetails />;
      case '114-recurringConfirmation':
        return <RecurringBookingConfirmation />;
      case '115-payment':
        return <PaymentPage />;
      case '116-lessonsPage':
        return <LessonsPage />;
      case '117-pendingLesson':
        return <PendingLessonCard />;
      case '118-confirmedLesson':
        return <ConfirmedLessonCard />;
      case '119-completedLesson':
        return <CompletedLessonCard />;
      case '120-declinedLesson':
        return <DeclinedLessonCard />;
      case '121-cancelLesson':
        return <StudentCancelLesson />;
      case '122-favoriteCoaches':
        return <FavoriteCoachesPage />;
      case '123-learnerProfile':
        return <LearnerProfilePage />;
      // 添加教练相关组件的渲染逻辑
      case '201-coachOnboarding':
        return <CoachOnboardingPage />;
      case '202-coachHome':
        return <CoachHomePage />;
      case '203-verifyIdentity':
        return <VerifyIdentityPage />;
      case '204-dbsUpload':
        return <DBSUploadPage />;
      case '205-certificationUpload':
        return <CertificationUploadPage />;
      case '206-bankDetails':
        return <BankDetailsPage />;
      case '207-timeManagement':
        return <CoachAvailabilityEntryPage />;
      case '208-教学时间设置':
        return <TeachingTimeSettings />;
      case '209-教练请假列表和设置':
        return <CoachTimeOffPage />;
      case '210-教练场地目录页':
        return <CoachLocationDirectory />;
      case '211-教练场地添加页':
        return <CoachLocationAddPage />;
      case '212-价格设定入口':
        return <PricingLandingPage />;
      case '213-价格设定-单次课程':
        return <SingleLessonPricingPage />;
      case '214-价格设定-多次课程':
        return <PackagePricingPage />;
      case '215-自我介绍':
        return <CoachIntroPage />;
      case '216-教练端-Pending状态课程卡':
        return <CoachPendingLessonDetail />;
      case '217-教练端-Confirm状态课程卡':
        return <CoachConfirmedLessonDetail />;
      case '218-教练端-Completed状态课程卡':
        return <CoachCompletedLessonDetail />;
      case '219-教练端-declined状态课程卡':
        return <CoachDeclinedLessonDetail />;
      case '220-教练取消课程':
        return <CoachCancelLesson />;
      // 新增教练相关组件渲染逻辑
      case '221-教练Performance':
        return <CoachPerformanceOptimized />;
      case '222-教练收入详情':
        return <CoachIncomeSummaryPage />;
      case '223-教练评分':
        return <CoachRatingsPage />;
      case '224-教练用户页':
        return <CoachProfilePage />;
      case '225-教练系统设置':
        return <CoachProfileSettingsPage />;
      case '226-教练推广':
        return <CoachPromotePage />;
      case '227-教练暂停接单':
        return <CoachPauseAccountPage />;
      case '302-signUp':
        return <SignUpPage />;
      case '303-login':
        return <LoginPage />;
      case '304-accountInfo':
        return <AccountInformationPage />;
      case '305-changePassword':
        return <ChangePasswordPage />;
      case '306-paymentMethods':
        return <PaymentMethodsPage />;
      case '307-notificationSettings':
        return <NotificationSettingsPage />;
      case '308-calendarSync':
        return <CalendarSyncPage />;
      case '309-privacySettings':
        return <PrivacySettingsPage />;
      case '310-support':
        return <SupportPage />;
      case '311-about':
        return <AboutPage />;
      case '312-roleSwitcher':
        return <RoleSwitcherScreen />;
      case '313-guideSystem':
        return <GuideSystem />;
      case '314-guideDetail':
        return <GuideDetailPageExample />;
      // 通用组件
      case 'common-coachInfoCard':
        return <CoachInfoCardShowcase />;
      case 'common-bottomNavigation':
        return <BottomNavigationShowcase />;
      case 'common-pageHeader':
        return <PageHeaderShowcase />;
      case 'common-lessonDetailsCard':
        return <LessonDetailsCardShowcase />;
      case 'common-priceDetailsCard':
        return <PriceDetailsCardShowcase />;
      case 'common-locationCard':
        return <LocationCardShowcase />;
      default:
        return <div className="flex items-center justify-center h-full">请选择一个组件进行展示</div>;
    }
  };
  
  const components = [
    { id: 'welcome', name: '301-欢迎页面', category: 'General' },
    { id: '101-learnerHome', name: '101-学员端主页', category: 'Learner' },
    { id: '102-location', name: '102-位置选择页', category: 'Learner' },
    { id: '103-messageSystem', name: '103-聊天通知页', category: 'Learner' },
    { id: '104-coachSearch', name: '104-教练搜索结果页', category: 'Learner' },
    { id: '105-coachDetail', name: '105-教练详细信息卡', category: 'Learner' },
    { id: '106-bookingType', name: '106-预订类型选择', category: 'Learner' },
    { id: '107-timeSelection', name: '107-单次预订-时间选择', category: 'Learner' },
    { id: '108-bookingDetails', name: '108-单次预订-详情', category: 'Learner' },
    { id: '109-bookingConfirmation', name: '109-单次预订-课程确认', category: 'Learner' },
    { id: '110-recurringPackage', name: '110-循环课程-套餐选择', category: 'Learner' },
    { id: '111-recurringTimeSelection', name: '111-循环课程-初始时间选择', category: 'Learner' },
    { id: '112-recurringSchedule', name: '112-循环课程-课程排课确认和修改', category: 'Learner' },
    { id: '113-recurringDetails', name: '113-循环预订-详情', category: 'Learner' },
    { id: '114-recurringConfirmation', name: '114-循环预订-确认', category: 'Learner' },
    { id: '115-payment', name: '115-支付页面', category: 'Learner' },
    { id: '116-lessonsPage', name: '116-课程页(状态切换和Filter)', category: 'Learner' },
    { id: '117-pendingLesson', name: '117-课程页-Pending状态课程卡', category: 'Learner' },
    { id: '118-confirmedLesson', name: '118-课程页-Confirmed状态课程卡', category: 'Learner' },
    { id: '119-completedLesson', name: '119-课程页-Completed状态课程卡', category: 'Learner' },
    { id: '120-declinedLesson', name: '120-课程页-Declined状态课程卡', category: 'Learner' },
    { id: '121-cancelLesson', name: '121-学员取消课程', category: 'Learner' },
    { id: '122-favoriteCoaches', name: '122-收藏教练页', category: 'Learner' },
    { id: '123-learnerProfile', name: '123-学员用户页', category: 'Learner' },
    // 添加教练相关组件到列表
    { id: '201-coachOnboarding', name: '201-教练主页-入职', category: 'Coach' },
    { id: '202-coachHome', name: '202-教练主页-常态', category: 'Coach' },
    { id: '203-verifyIdentity', name: '203-身份验证', category: 'Coach' },
    { id: '204-dbsUpload', name: '204-DBS认证', category: 'Coach' },
    { id: '205-certificationUpload', name: '205-教练资格认证', category: 'Coach' },
    { id: '206-bankDetails', name: '206-收款信息', category: 'Coach' },
    { id: '207-timeManagement', name: '207-时间管理', category: 'Coach' },
    { id: '208-教学时间设置', name: '208-教学时间设置', category: 'Coach' },
    { id: '209-教练请假列表和设置', name: '209-教练请假列表和设置', category: 'Coach' },
    { id: '210-教练场地目录页', name: '210-教练场地目录页', category: 'Coach' },
    { id: '211-教练场地添加页', name: '211-教练场地添加页', category: 'Coach' },
    { id: '212-价格设定入口', name: '212-价格设定入口', category: 'Coach' },
    { id: '213-价格设定-单次课程', name: '213-价格设定-单次课程', category: 'Coach' },
    { id: '214-价格设定-多次课程', name: '214-价格设定-多次课程', category: 'Coach' },
    { id: '215-自我介绍', name: '215-自我介绍', category: 'Coach' },
    { id: '216-教练端-Pending状态课程卡', name: '216-教练端-Pending状态课程卡', category: 'Coach' },
    { id: '217-教练端-Confirm状态课程卡', name: '217-教练端-Confirm状态课程卡', category: 'Coach' },
    { id: '218-教练端-Completed状态课程卡', name: '218-教练端-Completed状态课程卡', category: 'Coach' },
    { id: '219-教练端-declined状态课程卡', name: '219-教练端-declined状态课程卡', category: 'Coach' },
    { id: '220-教练取消课程', name: '220-教练取消课程', category: 'Coach' },
    // 新增教练相关组件到列表
    { id: '221-教练Performance', name: '221-教练业绩表现', category: 'Coach' },
    { id: '222-教练收入详情', name: '222-教练收入详情', category: 'Coach' },
    { id: '223-教练评分', name: '223-教练评分', category: 'Coach' },
    { id: '224-教练用户页', name: '224-教练用户页', category: 'Coach' },
    { id: '225-教练系统设置', name: '225-教练系统设置', category: 'Coach' },
    { id: '226-教练推广', name: '226-教练推广', category: 'Coach' },
    { id: '227-教练暂停接单', name: '227-教练暂停接单', category: 'Coach' },
    { id: '302-signUp', name: '302-注册页面', category: 'General' },
    { id: '303-login', name: '303-登录页面', category: 'General' },
    { id: '304-accountInfo', name: '304-用户页-账户信息', category: 'General' },
    { id: '305-changePassword', name: '305-用户页-修改密码', category: 'General' },
    { id: '306-paymentMethods', name: '306-用户页-付款方式', category: 'General' },
    { id: '307-notificationSettings', name: '307-用户页-通知设置', category: 'General' },
    { id: '308-calendarSync', name: '308-用户页-同步日历', category: 'General' },
    { id: '309-privacySettings', name: '309-用户页-隐私设置', category: 'General' },
    { id: '310-support', name: '310-用户页-支持', category: 'General' },
    { id: '311-about', name: '311-用户页-关于', category: 'General' },
    { id: '312-roleSwitcher', name: '312-用户页-切换身份', category: 'General' },
    { id: '313-guideSystem', name: '313-博客目录页', category: 'General' },
    { id: '314-guideDetail', name: '314-博客详情页', category: 'General' },
    // 通用组件
    { id: 'common-coachInfoCard', name: '教练信息卡组件', category: 'Common Components' },
    { id: 'common-bottomNavigation', name: '底部导航栏组件', category: 'Common Components' },
    { id: 'common-pageHeader', name: '页面标题组件', category: 'Common Components' },
    { id: 'common-lessonDetailsCard', name: '课程详情卡组件', category: 'Common Components' },
    { id: 'common-priceDetailsCard', name: '价格详情卡组件', category: 'Common Components' },
    { id: 'common-locationCard', name: '场地信息卡组件', category: 'Common Components' },
  ];
  
  // 按分类分组组件
  const groupedComponents = components.reduce((groups, component) => {
    const category = component.category || '其他';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(component);
    return groups;
  }, {});
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <MaterialIconsHead />
      <header className="bg-white shadow-md p-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-center text-primary-600">HiCoach UI Showcase</h1>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* 侧边栏导航 - 使用fixed height和overflow */}
        <div className="w-64 flex-shrink-0 bg-white shadow-md flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">UI组件</h2>
          </div>
          <div className="overflow-y-auto flex-1 p-4">
            {Object.entries(groupedComponents).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{category}</h3>
                <ul className="space-y-1">
                  {items.map(item => (
                    <li key={item.id}>
                      <button 
                        onClick={() => setActiveComponent(item.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm ${activeComponent === item.id ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* 组件展示区域 - 独立滚动区域 */}
        <div className="flex-1 flex flex-col h-full">
          <div className="p-6 overflow-y-auto flex-1">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="h-[85vh] overflow-y-auto">
                {renderComponent()}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-white p-4 shadow-md flex-shrink-0">
        <p className="text-center text-sm text-gray-500">
          HiCoach UI组件展示平台 | 基于React和Tailwind CSS构建
        </p>
      </footer>
    </div>
  );
};

export default ComponentShowcase; 