import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, ChevronRight, BookOpen, X } from 'lucide-react';

// Modular Component: Guide Card for list view
const GuideCard = ({ guide, onClick, size = "medium" }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden cursor-pointer ${size === "small" ? "w-1/2" : "w-full"}`}
      onClick={() => onClick(guide)}
    >
      <div className={`${size === "small" ? "h-24" : "h-32"} bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center`}>
        <BookOpen className={`${size === "small" ? "w-10 h-10" : "w-12 h-12"} text-white`} />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-800 line-clamp-1">{guide.title}</h3>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
          {guide.description}
        </p>
      </div>
    </div>
  );
};

// Modular Component: Header
const Header = ({ title, onBack }) => {
  return (
    <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200">
      <button 
        onClick={onBack}
        className="p-1 mr-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>
      <h2 className="text-lg font-semibold flex-1 text-center">{title}</h2>
      <div className="w-5"></div> {/* Empty space for balance */}
    </div>
  );
};

// Modular Component: Search Bar
const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="px-4 py-2 border-b border-gray-200">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        {value && (
          <button 
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => onChange('')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Modular Component: Empty State
const EmptyState = ({ title, description, icon }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs">{description}</p>
    </div>
  );
};

// Modular Component: Category Pills
const CategoryPills = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="px-4 py-2 overflow-x-auto flex space-x-2 border-b border-gray-200">
      <button 
        className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => onSelectCategory('all')}
      >
        All Guides
      </button>
      {categories.map(category => (
        <button 
          key={category}
          className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Guide List Page Component
const GuideListPage = ({ guides, onSelectGuide, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Extract unique categories from guides
  const categories = [...new Set(guides.map(guide => guide.category))];
  
  // Filter guides based on search and category
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = 
      searchTerm === '' || 
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      guide.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Header 
        title="App Guides"
        onBack={onBack}
      />
      
      {/* Search Bar */}
      <SearchBar 
        placeholder="Search guides" 
        value={searchTerm}
        onChange={setSearchTerm}
      />
      
      {/* Category Pills */}
      <CategoryPills 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      {/* Guide List */}
      <div className="flex-1 overflow-auto p-4">
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredGuides.map(guide => (
              <GuideCard 
                key={guide.id}
                guide={guide}
                onClick={onSelectGuide}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No guides found"
            description={searchTerm ? "Try adjusting your search term or category filter" : "No guides available at the moment"}
            icon={<BookOpen className="w-10 h-10 text-gray-400" />}
          />
        )}
      </div>
    </div>
  );
};

// Guide Detail Page Component
const GuideDetailPage = ({ guide, onBack }) => {
  // Scroll to top when guide changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [guide]);
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Header 
        title={guide.title}
        onBack={onBack}
      />
      
      {/* Guide Content */}
      <div className="flex-1 overflow-auto">
        {/* Cover Image/Banner */}
        <div className="h-40 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-white" />
        </div>
        
        {/* Content Container */}
        <div className="p-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Guide Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-semibold text-gray-800">{guide.title}</h1>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {guide.category}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {guide.description}
              </p>
            </div>
            
            {/* Guide Body */}
            <div className="p-4 space-y-4">
              {guide.sections.map((section, index) => (
                <div key={index} className="space-y-2">
                  <h2 className="text-lg font-medium text-gray-800">{section.title}</h2>
                  <p className="text-sm text-gray-600">
                    {section.content}
                  </p>
                  {section.tips && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-md">
                      <h3 className="text-sm font-medium text-blue-800">Tips</h3>
                      <p className="text-xs text-blue-700 mt-1">{section.tips}</p>
                    </div>
                  )}
                  {section.warning && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-md">
                      <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                      <p className="text-xs text-yellow-700 mt-1">{section.warning}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Related Guides Section */}
              {guide.relatedGuides && guide.relatedGuides.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <h2 className="text-lg font-medium text-gray-800 mb-3">Related Guides</h2>
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {guide.relatedGuides.map(relatedGuide => (
                      <div 
                        key={relatedGuide.id}
                        className="flex-shrink-0 w-48 bg-gray-50 rounded-lg shadow-sm overflow-hidden border border-gray-200"
                      >
                        <div className="h-20 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <div className="p-2">
                          <h3 className="font-medium text-xs text-gray-800 line-clamp-1">{relatedGuide.title}</h3>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{relatedGuide.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer with Last Updated */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500">Last updated: {guide.lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// For the GuideDetailPage component, we will use the sample guide data for demonstration
const GuideDetailPageExample = () => {
  const sampleGuide = {
    id: 1,
    title: "How to Book a Lesson",
    description: "Learn how to find and book lessons with your favorite coaches.",
    category: "Booking",
    lastUpdated: "March 15, 2025",
    sections: [
      {
        title: "Finding Coaches",
        content: "You can find coaches by using the search function on the Coaches tab. Filter by location, sport type, or availability to find the perfect coach for your needs. Tap on a coach's profile to view their details, including experience, specialization, and reviews from other students."
      },
      {
        title: "Booking a Lesson",
        content: "Once you've found a coach you'd like to book, tap on their profile and select 'Book a Lesson'. Choose your preferred date and time from the available slots. You can also select the lesson duration and location before confirming your booking.",
        tips: "Book lessons at least 48 hours in advance to ensure availability."
      },
      {
        title: "Payment Options",
        content: "You can pay for your lessons using a credit card, PayPal, or through your account balance. Payment is usually required at the time of booking, but some coaches may offer a 'pay later' option for regular students.",
        warning: "Cancellations made less than 24 hours before the lesson may be subject to a cancellation fee."
      }
    ],
    relatedGuides: [
      {
        id: 2,
        title: "Payment Methods",
        description: "Discover all the available payment options for your lessons."
      },
      {
        id: 3,
        title: "Lesson Cancellation Policy",
        description: "Learn about our cancellation and rescheduling policies."
      }
    ]
  };
  
  const handleBack = () => {
    alert("Navigate back to guide list");
  };
  
  return (
    <div className="max-w-md mx-auto">
      <GuideDetailPage guide={sampleGuide} onBack={handleBack} />
    </div>
  );
};

export default GuideDetailPageExample; 