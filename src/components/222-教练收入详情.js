import React, { useState, useCallback, memo } from 'react';
import { 
  ChevronLeft, 
  ChevronDown, 
  Calendar, 
  Clock, 
  FileText, 
  Download,
  CreditCard,
  DollarSign,
  CheckCircle,
  Clock3,
  Info,
  X,
  Mail
} from 'lucide-react';
import PageHeader from './common/PageHeader';

// 常量定义
const INVOICE_STATUS = {
  PAID: 'paid',
  PENDING: 'pending',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

const PAYOUT_STATUS = {
  COMPLETED: 'completed',
  PROCESSING: 'processing',
  SENDING: 'sending',
  SENT: 'sent'
};

// 模拟数据
const incomeData = {
  expectedIncome: '£1,280.00',
  actualIncome: '£960.00',
  pendingIncome: '£320.00',
  lessonCount: 18,
  totalHours: 24.5,
  avgRatePerHour: '£52.24',
  payoutDate: 'May 15, 2025',
  currentMonth: 'May',
  currentYear: '2025'
};

const invoices = [
  {
    id: 'INV-2025-05-01',
    date: 'May 1, 2025',
    studentName: 'Alice L.',
    amount: '£60.00',
    status: INVOICE_STATUS.PAID,
    paymentDate: 'May 5, 2025',
    lessonLength: '1 hour'
  },
  {
    id: 'INV-2025-05-02',
    date: 'May 2, 2025',
    studentName: 'Bob R.',
    amount: '£120.00',
    status: INVOICE_STATUS.PAID,
    paymentDate: 'May 5, 2025',
    lessonLength: '2 hours'
  },
  {
    id: 'INV-2025-05-03',
    date: 'May 3, 2025',
    studentName: 'Charlie D.',
    amount: '£60.00',
    status: INVOICE_STATUS.PENDING,
    paymentDate: null,
    lessonLength: '1 hour'
  },
  {
    id: 'INV-2025-05-04',
    date: 'May 4, 2025',
    studentName: 'David K.',
    amount: '£90.00',
    status: INVOICE_STATUS.PENDING,
    paymentDate: null,
    lessonLength: '1.5 hours'
  }
];

const payouts = [
  {
    id: 'PAY-2025-05-01',
    date: 'May 5, 2025',
    amount: '£960.00',
    periodCovered: 'May 1-4, 2025',
    method: 'Bank Transfer',
    reference: 'REF123456',
    status: PAYOUT_STATUS.COMPLETED
  }
];

const downloadPeriods = [
  { id: 'current_month', name: 'Current Month (May 2025)' },
  { id: 'last_month', name: 'Last Month (April 2025)' },
  { id: 'last_3_months', name: 'Last 3 Months' },
  { id: 'year_to_date', name: 'Year to Date (2025)' }
];

// 状态标签组件
const StatusBadge = memo(({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case INVOICE_STATUS.PAID:
      case PAYOUT_STATUS.COMPLETED:
        return 'bg-green-100 text-green-800';
      case INVOICE_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case INVOICE_STATUS.FAILED:
        return 'bg-red-100 text-red-800';
      case INVOICE_STATUS.CANCELLED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case INVOICE_STATUS.PAID:
        return 'Paid';
      case INVOICE_STATUS.PENDING:
        return 'Pending';
      case INVOICE_STATUS.FAILED:
        return 'Failed';
      case INVOICE_STATUS.CANCELLED:
        return 'Cancelled';
      case PAYOUT_STATUS.COMPLETED:
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <span className={`${getStatusStyle()} text-xs px-2 py-0.5 rounded-full font-medium`}>
      {getStatusText()}
    </span>
  );
});

// 收入概览卡片组件
const IncomeOverviewCard = memo(({ data }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-base font-semibold text-gray-800">Monthly Overview</h3>
      <span className="text-sm font-medium text-gray-600">{data.currentMonth} {data.currentYear}</span>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-green-50 p-3 rounded-lg">
        <div className="flex items-center mb-1">
          <DollarSign className="w-4 h-4 text-green-600 mr-1" />
          <p className="text-xs text-green-700 font-medium">Expected Income</p>
        </div>
        <p className="text-xl font-bold text-gray-800">{data.expectedIncome}</p>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg">
        <div className="flex items-center mb-1">
          <CreditCard className="w-4 h-4 text-blue-600 mr-1" />
          <p className="text-xs text-blue-700 font-medium">Actual Income</p>
        </div>
        <p className="text-xl font-bold text-gray-800">{data.actualIncome}</p>
      </div>
    </div>
    
    <div className="bg-yellow-50 p-3 rounded-lg mb-4">
      <div className="flex items-center mb-1">
        <Clock3 className="w-4 h-4 text-yellow-600 mr-1" />
        <p className="text-xs text-yellow-700 font-medium">Pending Income</p>
      </div>
      <p className="text-lg font-bold text-gray-800">{data.pendingIncome}</p>
      <p className="text-xs text-gray-500 mt-1">Expected payout on {data.payoutDate}</p>
    </div>
    
    <div className="border-t border-gray-100 pt-3 mt-2">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-700">Lessons this month</span>
        </div>
        <span className="text-sm font-semibold text-gray-800">{data.lessonCount}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Clock className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-700">Total hours taught</span>
        </div>
        <span className="text-sm font-semibold text-gray-800">{data.totalHours}</span>
      </div>
    </div>
  </div>
));

// 发票列表项组件
const InvoiceItem = memo(({ invoice }) => (
  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
    <div className="flex justify-between items-start mb-2">
      <div>
        <p className="text-sm font-medium text-gray-800">{invoice.id}</p>
        <p className="text-xs text-gray-500">{invoice.date}</p>
      </div>
      <StatusBadge status={invoice.status} />
    </div>
    
    <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
      <div>
        <p className="text-xs text-gray-500">Student</p>
        <p className="text-sm font-medium text-gray-800">{invoice.studentName}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">Amount</p>
        <p className="text-sm font-bold text-gray-800">{invoice.amount}</p>
      </div>
    </div>
    
    <div className="flex justify-between items-center mt-2">
      <div>
        <p className="text-xs text-gray-500">Lesson Length</p>
        <p className="text-sm text-gray-700">{invoice.lessonLength}</p>
      </div>
      {invoice.paymentDate && (
        <div className="text-right">
          <p className="text-xs text-gray-500">Paid On</p>
          <p className="text-sm text-gray-700">{invoice.paymentDate}</p>
        </div>
      )}
    </div>
  </div>
));

// 付款列表项组件
const PayoutItem = memo(({ payout }) => (
  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
    <div className="flex justify-between items-start mb-2">
      <div>
        <p className="text-sm font-medium text-gray-800">{payout.id}</p>
        <p className="text-xs text-gray-500">{payout.date}</p>
      </div>
      <div className="flex items-center">
        <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
        <span className="text-xs font-medium text-green-700">Completed</span>
      </div>
    </div>
    
    <div className="bg-green-50 p-2 rounded-lg mt-2 mb-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">Total Amount</span>
        <span className="text-base font-bold text-gray-800">{payout.amount}</span>
      </div>
    </div>
    
    <div className="mt-2">
      <p className="text-xs text-gray-500">Period Covered</p>
      <p className="text-sm text-gray-700">{payout.periodCovered}</p>
    </div>
    
    <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
      <div>
        <p className="text-xs text-gray-500">Payment Method</p>
        <p className="text-sm text-gray-700">{payout.method}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">Reference</p>
        <p className="text-sm text-gray-700">{payout.reference}</p>
      </div>
    </div>
  </div>
));

// 下载模态框组件
const DownloadModal = memo(({ isOpen, onClose, downloadFormat, setDownloadFormat, downloadPeriod, setDownloadPeriod }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    console.log(`Downloading ${downloadFormat} for period: ${downloadPeriod}`);
    onClose();
  };

  const handleEmailToMe = () => {
    console.log(`Emailing ${downloadFormat} for period: ${downloadPeriod}`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-11/12 max-w-md p-4" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Download Transactions</h3>
          <button 
            className="text-gray-500 hover:text-gray-700" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Select Time Period</p>
          <div className="bg-gray-50 rounded-lg border border-gray-200">
            {downloadPeriods.map((period, index) => (
              <div 
                key={period.id} 
                className={`px-4 py-3 cursor-pointer ${downloadPeriod === period.id ? 'bg-green-50 border-l-4 border-green-600' : 'border-l-4 border-transparent'} ${index !== downloadPeriods.length - 1 ? 'border-b border-gray-200' : ''}`}
                onClick={() => setDownloadPeriod(period.id)}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${downloadPeriod === period.id ? 'border-green-600' : 'border-gray-400'}`}>
                    {downloadPeriod === period.id && (
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    )}
                  </div>
                  <span className={`text-sm ${downloadPeriod === period.id ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                    {period.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Select Format</p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              className={`flex items-center justify-center px-4 py-2 rounded-lg border ${downloadFormat === 'pdf' ? 'bg-green-50 border-green-600 text-green-700' : 'border-gray-200 text-gray-700'}`}
              onClick={() => setDownloadFormat('pdf')}
            >
              <FileText className={`w-4 h-4 mr-2 ${downloadFormat === 'pdf' ? 'text-green-600' : 'text-gray-500'}`} />
              <span className="text-sm font-medium">PDF</span>
            </button>
            <button 
              className={`flex items-center justify-center px-4 py-2 rounded-lg border ${downloadFormat === 'csv' ? 'bg-green-50 border-green-600 text-green-700' : 'border-gray-200 text-gray-700'}`}
              onClick={() => setDownloadFormat('csv')}
            >
              <FileText className={`w-4 h-4 mr-2 ${downloadFormat === 'csv' ? 'text-green-600' : 'text-gray-500'}`} />
              <span className="text-sm font-medium">CSV</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <button 
            className="w-full bg-green-600 text-white rounded-lg py-3 font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            <span>Download {downloadFormat.toUpperCase()}</span>
          </button>
          
          <button 
            className="w-full bg-gray-600 text-white rounded-lg py-3 font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
            onClick={handleEmailToMe}
          >
            <Mail className="w-4 h-4 mr-2" />
            <span>Email to me</span>
          </button>
        </div>
      </div>
    </div>
  );
});

// 信息模态框组件
const InfoModal = memo(({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-11/12 max-w-md p-4 max-h-[90vh] overflow-y-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button 
            className="text-gray-500 hover:text-gray-700" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});

// 主组件
const CoachIncomeSummaryPage = () => {
  const [selectedTab, setSelectedTab] = useState('invoices');
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showInvoiceInfo, setShowInvoiceInfo] = useState(false);
  const [showPayoutInfo, setShowPayoutInfo] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [downloadPeriod, setDownloadPeriod] = useState('current_month');
  
  const handleTabChange = useCallback((tab) => {
    setSelectedTab(tab);
  }, []);
  
  // 下载按钮作为右侧元素
  const rightElement = (
    <button 
      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
      onClick={() => setShowDownloadModal(true)}
      aria-label="Download transactions"
    >
      <Download className="w-5 h-5 text-gray-700" />
    </button>
  );
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* 顶部栏 */}
      <PageHeader 
        title="Income Summary" 
        onBack={() => console.log('Navigate back')}
        rightElement={rightElement}
      />
      
      {/* 主要内容区 */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* 概览区域 */}
        <div className="px-4 py-4">
          <IncomeOverviewCard data={incomeData} />
        </div>
        
        {/* 选项卡导航 */}
        <div className="bg-white px-4 border-t border-b border-gray-200">
          <div className="flex space-x-4">
            <button 
              className={`py-3 px-1 font-medium text-sm border-b-2 ${selectedTab === 'invoices' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleTabChange('invoices')}
            >
              Invoices
            </button>
            <button 
              className={`py-3 px-1 font-medium text-sm border-b-2 ${selectedTab === 'payouts' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleTabChange('payouts')}
            >
              Payouts
            </button>
          </div>
        </div>
        
        {/* 发票选项卡 */}
        {selectedTab === 'invoices' && (
          <div className="px-4 py-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-semibold text-gray-800">Invoices</h3>
              <button 
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setShowInvoiceInfo(true)}
                aria-label="Invoice information"
              >
                <Info className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Invoices sent to students after completed lessons.</p>
            
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <InvoiceItem key={invoice.id} invoice={invoice} />
              ))}
            </div>
          </div>
        )}
        
        {/* 付款选项卡 */}
        {selectedTab === 'payouts' && (
          <div className="px-4 py-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-semibold text-gray-800">Payouts</h3>
              <button 
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setShowPayoutInfo(true)}
                aria-label="Payout information"
              >
                <Info className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Payments from the platform to your account.</p>
            
            <div className="space-y-3">
              {payouts.map((payout) => (
                <PayoutItem key={payout.id} payout={payout} />
              ))}
              
              {payouts.length === 0 && (
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">No payouts made this month yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* 下载模态框 */}
      <DownloadModal 
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        downloadFormat={downloadFormat}
        setDownloadFormat={setDownloadFormat}
        downloadPeriod={downloadPeriod}
        setDownloadPeriod={setDownloadPeriod}
      />
      
      {/* 发票信息模态框 */}
      <InfoModal
        isOpen={showInvoiceInfo}
        onClose={() => setShowInvoiceInfo(false)}
        title="How Invoices Work"
      >
        <div className="space-y-4">
          <div>
            <h4 className="text-base font-medium text-gray-800 mb-1">Invoice Timeline</h4>
            <p className="text-sm text-gray-600">
              After each lesson, an invoice is automatically created and sent to the student for payment.
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-medium text-gray-800 mb-1">Invoice Status</h4>
            <div className="space-y-2 mt-2">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <StatusBadge status={INVOICE_STATUS.PENDING} />
                  <span className="text-sm font-medium text-gray-700 ml-2">Student hasn't paid yet</span>
                </div>
                <p className="text-xs text-gray-500">
                  The invoice has been sent but payment has not been processed yet.
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <StatusBadge status={INVOICE_STATUS.PAID} />
                  <span className="text-sm font-medium text-gray-700 ml-2">Payment received</span>
                </div>
                <p className="text-xs text-gray-500">
                  Payment has been successfully processed and will be included in your next payout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </InfoModal>
      
      {/* 付款信息模态框 */}
      <InfoModal
        isOpen={showPayoutInfo}
        onClose={() => setShowPayoutInfo(false)}
        title="How Payouts Work"
      >
        <div className="space-y-4">
          <div>
            <h4 className="text-base font-medium text-gray-800 mb-1">Payment Timeline</h4>
            <p className="text-sm text-gray-600">
              Payouts typically arrive in your bank account 3-5 business days after a student pays for a lesson.
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-medium text-gray-800 mb-1">Bulk Payouts</h4>
            <p className="text-sm text-gray-600">
              If you have multiple lessons paid in a single day, you'll receive a bulk payout for those lessons.
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-medium text-gray-800 mb-1">Payout Schedule</h4>
            <p className="text-sm text-gray-600">
              Payouts are processed daily, and you can track their status in the Payouts tab.
            </p>
          </div>
        </div>
      </InfoModal>
    </div>
  );
};

export default CoachIncomeSummaryPage; 