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
// Import coach related components
import CoachOnboardingPage from '../components/201-coach-home-onboarding';
import CoachHomePage from '../components/202-coach-home-regular';
import VerifyIdentityPage from '../components/203-identity-verification';
import DBSUploadPage from '../components/204-dbs-certification';
import CertificationUploadPage from '../components/205-coach-qualification';
import BankDetailsPage from '../components/206-payment-info';
import CoachAvailabilityEntryPage from '../components/207-time-management';
import TeachingTimeSettings from '../components/208-teaching-schedule';
import CoachTimeOffPage from '../components/209-coach-time-off';
import CoachLocationDirectory from '../components/210-coach-location-directory';
import CoachLocationAddPage from '../components/211-coach-location-add';
import PricingLandingPage from '../components/212-pricing-entry';
import SingleLessonPricingPage from '../components/213-pricing-single-lesson';
import PackagePricingPage from '../components/214-pricing-package';
import CoachIntroPage from '../components/215-self-introduction';
import CoachPendingLessonDetail from '../components/216-coach-pending-lesson';
import CoachConfirmedLessonDetail from '../components/217-coach-confirmed-lesson';
import CoachCompletedLessonDetail from '../components/218-coach-completed-lesson';
import CoachDeclinedLessonDetail from '../components/219-coach-declined-lesson';
import CoachCancelLesson from '../components/220-coach-cancel-lesson';
// 新增教练相关组件
// Import additional coach components
import CoachPerformanceOptimized from '../components/221-coach-performance';
import CoachIncomeSummaryPage from '../components/222-coach-income-details';
import CoachRatingsPage from '../components/223-coach-ratings';
import CoachProfilePage from '../components/224-coach-profile';
import CoachProfileSettingsPage from '../components/225-coach-settings';
import CoachPromotePage from '../components/226-coach-promotion';
import CoachPauseAccountPage from '../components/227-coach-pause-bookings';
// 导入通用组件
// Import common components
import CoachInfoCard from '../components/common/CoachInfoCard';
import BottomNavigation from '../components/common/BottomNavigation';
import PageHeader from '../components/common/PageHeader';
import LessonDetailsCard from '../components/common/LessonDetailsCard';
import PriceDetailsCard from '../components/common/PriceDetailsCard';
import LocationCard from '../components/common/LocationCard';
import ReviewsCard from '../components/common/ReviewsCard';
import LessonCard from '../components/common/LessonCard';
import ToggleSwitch from '../components/common/ToggleSwitch';

// 添加Material Icons字体引入
// Add Material Icons font
const MaterialIconsHead = () => {
  return (
    <React.Fragment>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
    </React.Fragment>
  );
};

// CoachInfoCard展示组件
// CoachInfoCard showcase component
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
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Standard Card</h2>
        <CoachInfoCard 
          coach={coachData}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Mini Card</h2>
        <CoachInfoCard 
          coach={coachData}
          isMiniCard={true}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Card Without Qualifications</h2>
        <CoachInfoCard 
          coach={coachData}
          showQualifications={false}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Card Without Location</h2>
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
// BottomNavigation showcase component
const BottomNavigationShowcase = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Bottom Navigation Bar</h2>
        <div className="relative h-80 border border-gray-200 rounded-lg">
          <div className="p-4 text-center text-gray-500">
            Page Content Area
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
// PageHeader showcase component
const PageHeaderShowcase = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Page Header with Back Button</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <PageHeader 
            title="Page Title"
            onBack={() => {}}
          />
          <div className="p-4 text-center text-gray-500">
            Page Content Area
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Page Header with Right Element</h2>
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
            Page Content Area
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Page Header with Title Only</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <PageHeader title="Page Title" />
          <div className="p-4 text-center text-gray-500">
            Page Content Area
          </div>
        </div>
      </div>
    </div>
  );
};

// LessonDetailsCard展示组件
// LessonDetailsCard showcase component
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
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Single Lesson Details</h2>
        <LessonDetailsCard 
          lesson={singleLessonData}
          title="Single Lesson Details"
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Package Lesson Details</h2>
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
// PriceDetailsCard showcase component
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
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Basic Price Details</h2>
        <PriceDetailsCard 
          {...standardPriceData}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Complete Price Details</h2>
        <PriceDetailsCard 
          {...complexPriceData}
          title="Package Price Details"
        />
      </div>
    </div>
  );
};

// LocationCard展示组件
// LocationCard showcase component
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
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Location Detail Card</h2>
        <LocationCard 
          location={locationData[0]}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Selectable Location Cards</h2>
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

// ReviewsCard展示组件
// ReviewsCard showcase component
const ReviewsCardShowcase = () => {
  // 模拟评论数据
  const reviewsData = {
    rating: 4.8,
    totalRatings: 24,
    ratingDistribution: {
      5: 85,
      4: 10,
      3: 5,
      2: 0,
      1: 0
    },
    reviews: [
      {
        name: "Emily W.",
        rating: 5,
        comment: "Excellent coach who really knows how to adapt to different skill levels. I've learned so much in just a few sessions.",
        timeAgo: "1 week ago"
      },
      {
        name: "Michael T.",
        rating: 5,
        comment: "Very professional and punctual. The lessons are well-structured and fun.",
        timeAgo: "2 weeks ago"
      },
      {
        name: "Sophia L.",
        rating: 4,
        comment: "Great teaching style, though sometimes sessions can run a bit longer than scheduled. Overall very good experience.",
        timeAgo: "1 month ago"
      }
    ]
  };
  
  // 没有评论的示例数据
  const noReviewsData = {
    rating: 0,
    totalRatings: 0,
    ratingDistribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    },
    reviews: []
  };
  
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Reviews Card with Data</h2>
        <ReviewsCard 
          rating={reviewsData.rating}
          totalRatings={reviewsData.totalRatings}
          ratingDistribution={reviewsData.ratingDistribution}
          reviews={reviewsData.reviews}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Reviews Card with No Reviews</h2>
        <ReviewsCard 
          rating={noReviewsData.rating}
          totalRatings={noReviewsData.totalRatings}
          ratingDistribution={noReviewsData.ratingDistribution}
          reviews={noReviewsData.reviews}
        />
      </div>
    </div>
  );
};

// LessonCard展示组件
// LessonCard showcase component
const LessonCardShowcase = () => {
  const lessonData = {
    type: 'Private Lesson',
    status: 'confirmed',
    paymentStatus: 'Paid',
    date: 'Mon, 15 Jun 2023',
    time: '10:00 - 11:00',
    location: 'Wilton Tennis Club',
    price: '£30',
    student: 'Sarah Parker'
  };
  
  const pendingLessonData = {
    type: 'Package Lesson (1 of 8)',
    status: 'pending',
    paymentStatus: 'Pending',
    date: 'Wed, 17 Jun 2023',
    time: '18:00 - 19:00',
    location: 'Dundonald Playground',
    price: '£25',
    student: 'Michael Brown'
  };
  
  const cancelledLessonData = {
    type: 'Private Lesson',
    status: 'cancelled',
    paymentStatus: 'Refunded',
    date: 'Fri, 19 Jun 2023',
    time: '14:00 - 15:00',
    location: 'Joseph Hood Recreational Playground',
    price: '£30',
    student: 'James Wilson'
  };
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Confirmed Lesson Card</h2>
        <LessonCard 
          {...lessonData}
          onClick={() => console.log('Confirmed lesson clicked')}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Pending Lesson Card</h2>
        <LessonCard 
          {...pendingLessonData}
          onClick={() => console.log('Pending lesson clicked')}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Cancelled Lesson Card</h2>
        <LessonCard 
          {...cancelledLessonData}
          onClick={() => console.log('Cancelled lesson clicked')}
        />
      </div>
    </div>
  );
};

// ToggleSwitch展示组件
// ToggleSwitch showcase component
const ToggleSwitchShowcase = () => {
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(true);
  
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Basic Toggle Switch</h2>
        <div className="flex items-center space-x-4">
          <ToggleSwitch 
            isOn={isEnabled1}
            onToggle={() => setIsEnabled1(!isEnabled1)}
          />
          <span className="text-sm text-gray-700">
            {isEnabled1 ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Pre-enabled Toggle Switch</h2>
        <div className="flex items-center space-x-4">
          <ToggleSwitch 
            isOn={isEnabled2}
            onToggle={() => setIsEnabled2(!isEnabled2)}
          />
          <span className="text-sm text-gray-700">
            {isEnabled2 ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-primary-600 mb-3">Disabled Toggle Switch</h2>
        <div className="flex items-center space-x-4">
          <ToggleSwitch 
            isOn={true}
            onToggle={() => {}}
            disabled={true}
          />
          <span className="text-sm text-gray-700">Always Enabled (Disabled)</span>
        </div>
        
        <div className="flex items-center space-x-4 mt-4">
          <ToggleSwitch 
            isOn={false}
            onToggle={() => {}}
            disabled={true}
          />
          <span className="text-sm text-gray-700">Always Disabled (Disabled)</span>
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
      // Add rendering logic for coach related components
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
      case '208-teachingSchedule':
        return <TeachingTimeSettings />;
      case '209-coachTimeOff':
        return <CoachTimeOffPage />;
      case '210-coachLocationDirectory':
        return <CoachLocationDirectory />;
      case '211-coachLocationAdd':
        return <CoachLocationAddPage />;
      case '212-pricingEntry':
        return <PricingLandingPage />;
      case '213-pricingSingleLesson':
        return <SingleLessonPricingPage />;
      case '214-pricingPackage':
        return <PackagePricingPage />;
      case '215-selfIntroduction':
        return <CoachIntroPage />;
      case '216-coachPendingLesson':
        return <CoachPendingLessonDetail />;
      case '217-coachConfirmedLesson':
        return <CoachConfirmedLessonDetail />;
      case '218-coachCompletedLesson':
        return <CoachCompletedLessonDetail />;
      case '219-coachDeclinedLesson':
        return <CoachDeclinedLessonDetail />;
      case '220-coachCancelLesson':
        return <CoachCancelLesson />;
      // 新增教练相关组件渲染逻辑
      // Add rendering logic for additional coach components
      case '221-coachPerformance':
        return <CoachPerformanceOptimized />;
      case '222-coachIncomeDetails':
        return <CoachIncomeSummaryPage />;
      case '223-coachRatings':
        return <CoachRatingsPage />;
      case '224-coachProfile':
        return <CoachProfilePage />;
      case '225-coachSettings':
        return <CoachProfileSettingsPage />;
      case '226-coachPromotion':
        return <CoachPromotePage />;
      case '227-coachPauseBookings':
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
      // Common components
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
      case 'common-reviewsCard':
        return <ReviewsCardShowcase />;
      case 'common-lessonCard':
        return <LessonCardShowcase />;
      case 'common-toggleSwitch':
        return <ToggleSwitchShowcase />;
      default:
        return <div className="flex items-center justify-center h-full">Please select a component to display</div>;
    }
  };
  
  const components = [
    { id: 'welcome', name: '301-Welcome Page', category: 'General' },
    { id: '101-learnerHome', name: '101-Learner Home Page', category: 'Learner' },
    { id: '102-location', name: '102-Location Selection Page', category: 'Learner' },
    { id: '103-messageSystem', name: '103-Message Notification System', category: 'Learner' },
    { id: '104-coachSearch', name: '104-Coach Search Results', category: 'Learner' },
    { id: '105-coachDetail', name: '105-Coach Detail Page', category: 'Learner' },
    { id: '106-bookingType', name: '106-Booking Type Selection', category: 'Learner' },
    { id: '107-timeSelection', name: '107-Single Booking Time Selection', category: 'Learner' },
    { id: '108-bookingDetails', name: '108-Single Booking Details', category: 'Learner' },
    { id: '109-bookingConfirmation', name: '109-Single Booking Confirmation', category: 'Learner' },
    { id: '110-recurringPackage', name: '110-Recurring Booking Package', category: 'Learner' },
    { id: '111-recurringTimeSelection', name: '111-Recurring Booking Time Selection', category: 'Learner' },
    { id: '112-recurringSchedule', name: '112-Recurring Booking Schedule Confirmation', category: 'Learner' },
    { id: '113-recurringDetails', name: '113-Recurring Booking Details', category: 'Learner' },
    { id: '114-recurringConfirmation', name: '114-Recurring Booking Confirmation', category: 'Learner' },
    { id: '115-payment', name: '115-Payment Page', category: 'Learner' },
    { id: '116-lessonsPage', name: '116-Lessons Page', category: 'Learner' },
    { id: '117-pendingLesson', name: '117-Pending Lesson Card', category: 'Learner' },
    { id: '118-confirmedLesson', name: '118-Confirmed Lesson Card', category: 'Learner' },
    { id: '119-completedLesson', name: '119-Completed Lesson Card', category: 'Learner' },
    { id: '120-declinedLesson', name: '120-Declined Lesson Card', category: 'Learner' },
    { id: '121-cancelLesson', name: '121-Student Cancel Lesson', category: 'Learner' },
    { id: '122-favoriteCoaches', name: '122-Favorite Coaches Page', category: 'Learner' },
    { id: '123-learnerProfile', name: '123-Learner Profile Page', category: 'Learner' },
    // 添加教练相关组件到列表
    // Add coach related components to the list
    { id: '201-coachOnboarding', name: '201-Coach Home Onboarding', category: 'Coach' },
    { id: '202-coachHome', name: '202-Coach Home Regular', category: 'Coach' },
    { id: '203-verifyIdentity', name: '203-Identity Verification', category: 'Coach' },
    { id: '204-dbsUpload', name: '204-DBS Certification', category: 'Coach' },
    { id: '205-certificationUpload', name: '205-Coach Qualification', category: 'Coach' },
    { id: '206-bankDetails', name: '206-Payment Info', category: 'Coach' },
    { id: '207-timeManagement', name: '207-Time Management', category: 'Coach' },
    { id: '208-teachingSchedule', name: '208-Teaching Schedule', category: 'Coach' },
    { id: '209-coachTimeOff', name: '209-Coach Time Off', category: 'Coach' },
    { id: '210-coachLocationDirectory', name: '210-Coach Location Directory', category: 'Coach' },
    { id: '211-coachLocationAdd', name: '211-Coach Location Add', category: 'Coach' },
    { id: '212-pricingEntry', name: '212-Pricing Entry', category: 'Coach' },
    { id: '213-pricingSingleLesson', name: '213-Pricing Single Lesson', category: 'Coach' },
    { id: '214-pricingPackage', name: '214-Pricing Package', category: 'Coach' },
    { id: '215-selfIntroduction', name: '215-Self Introduction', category: 'Coach' },
    { id: '216-coachPendingLesson', name: '216-Coach Pending Lesson', category: 'Coach' },
    { id: '217-coachConfirmedLesson', name: '217-Coach Confirmed Lesson', category: 'Coach' },
    { id: '218-coachCompletedLesson', name: '218-Coach Completed Lesson', category: 'Coach' },
    { id: '219-coachDeclinedLesson', name: '219-Coach Declined Lesson', category: 'Coach' },
    { id: '220-coachCancelLesson', name: '220-Coach Cancel Lesson', category: 'Coach' },
    // 新增教练相关组件到列表
    // Add additional coach components to the list
    { id: '221-coachPerformance', name: '221-Coach Performance', category: 'Coach' },
    { id: '222-coachIncomeDetails', name: '222-Coach Income Details', category: 'Coach' },
    { id: '223-coachRatings', name: '223-Coach Ratings', category: 'Coach' },
    { id: '224-coachProfile', name: '224-Coach Profile', category: 'Coach' },
    { id: '225-coachSettings', name: '225-Coach Settings', category: 'Coach' },
    { id: '226-coachPromotion', name: '226-Coach Promotion', category: 'Coach' },
    { id: '227-coachPauseBookings', name: '227-Coach Pause Bookings', category: 'Coach' },
    { id: '302-signUp', name: '302-Sign Up Page', category: 'General' },
    { id: '303-login', name: '303-Login Page', category: 'General' },
    { id: '304-accountInfo', name: '304-Account Information Page', category: 'General' },
    { id: '305-changePassword', name: '305-Change Password Page', category: 'General' },
    { id: '306-paymentMethods', name: '306-Payment Methods Page', category: 'General' },
    { id: '307-notificationSettings', name: '307-Notification Settings Page', category: 'General' },
    { id: '308-calendarSync', name: '308-Calendar Sync Page', category: 'General' },
    { id: '309-privacySettings', name: '309-Privacy Settings Page', category: 'General' },
    { id: '310-support', name: '310-Support Page', category: 'General' },
    { id: '311-about', name: '311-About Page', category: 'General' },
    { id: '312-roleSwitcher', name: '312-Role Switcher Screen', category: 'General' },
    { id: '313-guideSystem', name: '313-Guide System', category: 'General' },
    { id: '314-guideDetail', name: '314-Guide Detail Page', category: 'General' },
    // 通用组件
    // Common components
    { id: 'common-coachInfoCard', name: 'Coach Info Card Component', category: 'Common Components' },
    { id: 'common-bottomNavigation', name: 'Bottom Navigation Component', category: 'Common Components' },
    { id: 'common-pageHeader', name: 'Page Header Component', category: 'Common Components' },
    { id: 'common-lessonDetailsCard', name: 'Lesson Details Card Component', category: 'Common Components' },
    { id: 'common-priceDetailsCard', name: 'Price Details Card Component', category: 'Common Components' },
    { id: 'common-locationCard', name: 'Location Card Component', category: 'Common Components' },
    { id: 'common-reviewsCard', name: 'Reviews Card Component', category: 'Common Components' },
    { id: 'common-lessonCard', name: 'Lesson Card Component', category: 'Common Components' },
    { id: 'common-toggleSwitch', name: 'Toggle Switch Component', category: 'Common Components' },
  ];
  
  // 按分类分组组件
  // Group components by category
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
        {/* Sidebar navigation - using fixed height and overflow */}
        <div className="w-64 flex-shrink-0 bg-white shadow-md flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">UI Components</h2>
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
        {/* Component display area - independent scrolling area */}
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
          HiCoach UI Component Showcase | Built with React and Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default ComponentShowcase; 