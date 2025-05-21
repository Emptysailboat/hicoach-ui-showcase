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

// 导出选项配置
const ExportOptions = {
  FORMATS: {
    PDF: {
      id: 'pdf',
      name: 'PDF',
      description: 'Suitable for printing and archiving',
      icon: 'description'
    },
    CSV: {
      id: 'csv',
      name: 'CSV',
      description: 'Suitable for data analysis',
      icon: 'table_chart'
    },
    EXCEL: {
      id: 'excel',
      name: 'Excel',
      description: 'Suitable for detailed analysis',
      icon: 'table_view'
    }
  },
  
  TEMPLATES: {
    SIMPLE: {
      id: 'simple',
      name: 'Simple Report',
      description: 'Basic income information only'
    },
    DETAILED: {
      id: 'detailed',
      name: 'Detailed Report',
      description: 'Includes all transaction details'
    },
    TAX: {
      id: 'tax',
      name: 'Tax Report',
      description: 'Suitable for tax filing'
    }
  }
};

// 设计系统颜色
const Colors = {
  primary: {
    main: '#4CAF50',
    light: '#E8F5E9',
    dark: '#388E3C'
  },
  secondary: {
    main: '#2196F3',
    light: '#E3F2FD',
    dark: '#1976D2'
  },
  warning: {
    main: '#FFC107',
    light: '#FFF8E1',
    dark: '#FFA000'
  },
  error: {
    main: '#F44336',
    light: '#FFEBEE',
    dark: '#D32F2F'
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9E9E9E'
  },
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF'
  }
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
  { id: 'year_to_date', name: 'Year to Date (2025)' },
  { id: 'custom', name: 'Custom Range' }
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
const IncomeOverviewCard = memo(({ data }) => {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-gray-800">Monthly Overview</h3>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-600 mr-2">{data.currentMonth} {data.currentYear}</span>
          <button 
            className="p-1 rounded-full"
            onClick={() => setShowChart(!showChart)}
            aria-label={showChart ? "Hide chart" : "Show chart"}
          >
            <span className="material-icons text-gray-500">
              {showChart ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </div>
      
      {/* Income Data Cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <span className="material-icons text-green-600 mr-1">payments</span>
            <p className="text-xs text-green-700 font-medium">Expected Income</p>
          </div>
          <p className="text-xl font-bold text-gray-800">{data.expectedIncome}</p>
          <div className="flex items-center mt-1">
            <span className="material-icons text-green-600 text-sm mr-1">trending_up</span>
            <span className="text-xs text-green-600">+5% vs last month</span>
          </div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <span className="material-icons text-green-600 mr-1">account_balance</span>
            <p className="text-xs text-green-700 font-medium">Actual Income</p>
          </div>
          <p className="text-xl font-bold text-gray-800">{data.actualIncome}</p>
          <div className="flex items-center mt-1">
            <span className="material-icons text-green-600 text-sm mr-1">trending_up</span>
            <span className="text-xs text-green-600">+3% vs last month</span>
          </div>
        </div>
      </div>
      
      {/* Pending Income */}
      <div className="bg-purple-50 p-3 rounded-lg mb-4">
        <div className="flex items-center mb-1">
          <span className="material-icons text-purple-600 mr-1">schedule</span>
          <p className="text-xs text-purple-700 font-medium">Pending Income</p>
        </div>
        <p className="text-lg font-bold text-gray-800">{data.pendingIncome}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-500">Expected payout on {data.payoutDate}</p>
          <span className="text-xs text-purple-600">3 pending</span>
        </div>
      </div>
      
      {/* Chart Area */}
      {showChart && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-700">Income Trend</h4>
            <div className="flex space-x-2">
              <button className="text-xs text-gray-500">Week</button>
              <button className="text-xs text-green-600 font-medium">Month</button>
              <button className="text-xs text-gray-500">Year</button>
            </div>
          </div>
          <div className="h-32 flex items-end space-x-2">
            {[30, 45, 60, 75, 90, 85, 70].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-green-500 rounded-t"
                  style={{ height: `${value}%` }}
                />
                <span className="text-xs text-gray-500 mt-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Course Statistics */}
      <div className="border-t border-gray-100 pt-3 mt-2">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <span className="material-icons text-gray-500 mr-2">calendar_today</span>
            <span className="text-sm text-gray-700">Lessons this month</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-semibold text-gray-800 mr-2">{data.lessonCount}</span>
            <span className="text-xs text-green-600">+2</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-gray-500 mr-2">access_time</span>
            <span className="text-sm text-gray-700">Total hours taught</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-semibold text-gray-800 mr-2">{data.totalHours}</span>
            <span className="text-xs text-green-600">+3.5h</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <span className="material-icons text-gray-500 mr-2">attach_money</span>
            <span className="text-sm text-gray-700">Average rate per hour</span>
          </div>
          <span className="text-sm font-semibold text-gray-800">{data.avgRatePerHour}</span>
        </div>
      </div>
    </div>
  );
});

// 发票列表项组件
const InvoiceItem = memo(({ invoice }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm font-medium text-gray-800">{invoice.id}</p>
          <p className="text-xs text-gray-500">{invoice.date}</p>
        </div>
        <div className="flex items-center">
          <StatusBadge status={invoice.status} />
          <button 
            className="ml-2 p-1 rounded-full"
            onClick={() => setShowDetails(!showDetails)}
            aria-label={showDetails ? "Hide details" : "Show details"}
          >
            <span className="material-icons text-gray-500">
              {showDetails ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
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
      
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Lesson Length</p>
              <p className="text-sm text-gray-700">{invoice.lessonLength}</p>
            </div>
            {invoice.paymentDate && (
              <div>
                <p className="text-xs text-gray-500">Payment Date</p>
                <p className="text-sm text-gray-700">{invoice.paymentDate}</p>
              </div>
            )}
          </div>
          
          <div className="mt-3 flex justify-end space-x-2">
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg flex items-center">
              <span className="material-icons text-sm mr-1">receipt</span>
              View Invoice
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg flex items-center">
              <span className="material-icons text-sm mr-1">download</span>
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

// 付款列表项组件
const PayoutItem = memo(({ payout }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm font-medium text-gray-800">{payout.id}</p>
          <p className="text-xs text-gray-500">{payout.date}</p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="material-icons text-green-600 mr-1">check_circle</span>
            <span className="text-xs font-medium text-green-700">Completed</span>
          </div>
          <button 
            className="ml-2 p-1 rounded-full"
            onClick={() => setShowDetails(!showDetails)}
            aria-label={showDetails ? "Hide details" : "Show details"}
          >
            <span className="material-icons text-gray-500">
              {showDetails ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </div>
      
      <div className="bg-green-50 p-2 rounded-lg mt-2 mb-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Total Amount</span>
          <span className="text-base font-bold text-gray-800">{payout.amount}</span>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Period Covered</p>
              <p className="text-sm text-gray-700">{payout.periodCovered}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Payment Method</p>
              <p className="text-sm text-gray-700">{payout.method}</p>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-xs text-gray-500">Reference</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-700">{payout.reference}</p>
              <button className="text-green-600">
                <span className="material-icons">content_copy</span>
              </button>
            </div>
          </div>
          
          <div className="mt-3 flex justify-end space-x-2">
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg flex items-center">
              <span className="material-icons text-sm mr-1">receipt</span>
              View Details
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg flex items-center">
              <span className="material-icons text-sm mr-1">download</span>
              Download Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

// 下载模态框组件
const DownloadModal = memo(({ isOpen, onClose, downloadFormat, setDownloadFormat, downloadPeriod, setDownloadPeriod }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('simple');
  const [exportProgress, setExportProgress] = useState(0);
  const [exportHistory, setExportHistory] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setExportProgress(i);
    }
    
    // Add to history
    setExportHistory(prev => [...prev, {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      format: downloadFormat,
      template: selectedTemplate,
      period: downloadPeriod,
      customRange: downloadPeriod === 'custom' ? customDateRange : null,
      status: 'completed'
    }]);
    
    setIsExporting(false);
    onClose();
  };

  const handleEmailToMe = async () => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate email progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setExportProgress(i);
    }
    
    setIsExporting(false);
    onClose();
  };

  const handlePeriodSelect = (periodId) => {
    setDownloadPeriod(periodId);
    if (periodId === 'custom') {
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
    }
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
          <h3 className="text-lg font-semibold text-gray-800">Export Transactions</h3>
          <button 
            className="text-gray-500" 
            onClick={onClose}
            aria-label="Close"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        
        {/* Time Range Selection */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Select Time Range</p>
          <div className="bg-gray-50 rounded-lg border border-gray-200">
            {downloadPeriods.map((period, index) => (
              <div 
                key={period.id} 
                className={`px-4 py-3 cursor-pointer ${
                  downloadPeriod === period.id 
                    ? 'bg-green-50 border-l-4 border-green-600' 
                    : 'border-l-4 border-transparent'
                } ${index !== downloadPeriods.length - 1 ? 'border-b border-gray-200' : ''}`}
                onClick={() => handlePeriodSelect(period.id)}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                    downloadPeriod === period.id ? 'border-green-600' : 'border-gray-400'
                  }`}>
                    {downloadPeriod === period.id && (
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    )}
                  </div>
                  <span className={`text-sm ${
                    downloadPeriod === period.id ? 'text-gray-800 font-medium' : 'text-gray-600'
                  }`}>
                    {period.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Date Range Picker */}
        {showCustomDatePicker && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={customDateRange.startDate}
                  onChange={(e) => setCustomDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Date</label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={customDateRange.endDate}
                  onChange={(e) => setCustomDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                className="text-sm text-green-600 font-medium"
                onClick={() => {
                  setCustomDateRange({ startDate: '', endDate: '' });
                  setShowCustomDatePicker(false);
                  setDownloadPeriod('current_month');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {/* Export Format Selection */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Select Export Format</p>
          <div className="grid grid-cols-3 gap-3">
            {Object.values(ExportOptions.FORMATS).map(format => (
              <button 
                key={format.id}
                className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg border ${
                  downloadFormat === format.id 
                    ? 'bg-green-50 border-green-600 text-green-700' 
                    : 'border-gray-200 text-gray-700'
                }`}
                onClick={() => setDownloadFormat(format.id)}
              >
                <span className={`material-icons mb-1 ${
                  downloadFormat === format.id ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {format.icon}
                </span>
                <span className="text-sm font-medium">{format.name}</span>
                <span className="text-xs text-gray-500 mt-1">{format.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Report Template Selection */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Select Report Template</p>
          <div className="grid grid-cols-1 gap-2">
            {Object.values(ExportOptions.TEMPLATES).map(template => (
              <button
                key={template.id}
                className={`p-3 rounded-lg border text-left ${
                  selectedTemplate === template.id 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <p className="font-medium text-gray-800">{template.name}</p>
                <p className="text-sm text-gray-500">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Export Progress */}
        {isExporting && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Export Progress</span>
              <span>{exportProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Export History */}
        {exportHistory.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Recent Exports</p>
            <div className="space-y-2">
              {exportHistory.slice(0, 3).map(record => (
                <div key={record.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {ExportOptions.FORMATS[record.format].name}
                    </p>
                    <p className="text-xs text-gray-500">{record.date}</p>
                  </div>
                  <button className="text-green-600">
                    <span className="material-icons">download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            className="w-full bg-green-600 text-white rounded-lg py-3 font-medium flex items-center justify-center"
            onClick={handleEmailToMe}
            disabled={isExporting || (downloadPeriod === 'custom' && (!customDateRange.startDate || !customDateRange.endDate))}
          >
            <span className="material-icons mr-2">email</span>
            <span>Send to Email</span>
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
            className="text-gray-500" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="material-icons">close</span>
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
  
  // Download button as right element
  const rightElement = (
    <button 
      className="p-1 rounded-full"
      onClick={() => setShowDownloadModal(true)}
      aria-label="Download transactions"
    >
      <span className="material-icons text-gray-700">download</span>
    </button>
  );
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto overflow-hidden border border-gray-200 rounded-xl shadow-lg">
      {/* Top Bar */}
      <PageHeader 
        title="Income Summary" 
        onBack={() => console.log('Navigate back')}
        rightElement={rightElement}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Overview Section */}
        <div className="px-4 py-4">
          <IncomeOverviewCard data={incomeData} />
        </div>
        
        {/* Tab Navigation */}
        <div className="bg-white px-4 border-t border-b border-gray-200">
          <div className="flex space-x-4">
            <button 
              className={`py-3 px-1 font-medium text-sm border-b-2 ${selectedTab === 'invoices' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'}`}
              onClick={() => handleTabChange('invoices')}
            >
              Invoices
            </button>
            <button 
              className={`py-3 px-1 font-medium text-sm border-b-2 ${selectedTab === 'payouts' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'}`}
              onClick={() => handleTabChange('payouts')}
            >
              Payouts
            </button>
          </div>
        </div>
        
        {/* Invoices Tab */}
        {selectedTab === 'invoices' && (
          <div className="px-4 py-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-semibold text-gray-800">Invoices</h3>
              <button 
                className="p-1 rounded-full"
                onClick={() => setShowInvoiceInfo(true)}
                aria-label="Invoice information"
              >
                <span className="material-icons text-gray-500">info</span>
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
        
        {/* Payouts Tab */}
        {selectedTab === 'payouts' && (
          <div className="px-4 py-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-semibold text-gray-800">Payouts</h3>
              <button 
                className="p-1 rounded-full"
                onClick={() => setShowPayoutInfo(true)}
                aria-label="Payout information"
              >
                <span className="material-icons text-gray-500">info</span>
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
      
      {/* Download Modal */}
      <DownloadModal 
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        downloadFormat={downloadFormat}
        setDownloadFormat={setDownloadFormat}
        downloadPeriod={downloadPeriod}
        setDownloadPeriod={setDownloadPeriod}
      />
      
      {/* Invoice Info Modal */}
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
      
      {/* Payout Info Modal */}
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