import React, { useState, useEffect } from 'react';

const WelcomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { 
      title: "HiCoach",
      subtitle: "Find the Perfect Coach",
      description: "Browse certified tennis coaches near you"
    },
    {
      title: "Easy Booking",
      subtitle: "Simple Scheduling",
      description: "Book lessons with just a few taps"
    },
    {
      title: "Quick Progress",
      subtitle: "Track Your Progress",
      description: "Monitor your skill improvement with detailed feedback"
    }
  ];
  
  // Handle touch swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - next slide
      setActiveSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1));
    }
    
    if (touchEnd - touchStart > 75) {
      // Swipe right - previous slide
      setActiveSlide((prev) => (prev === 0 ? prev : prev - 1));
    }
  };
  
  // Auto-carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  // Handle manual slide change
  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <div 
      className="flex flex-col h-screen bg-gradient-to-b from-primary-500 to-primary-700 max-w-md mx-auto overflow-hidden rounded-xl shadow-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main content area - vertically and horizontally centered, swipeable content */}
      <div className="flex-1 flex items-center justify-center text-white overflow-hidden">
        {/* Sliding content area - horizontally arranging all slides */}
        <div 
          className="flex transition-transform duration-500 ease-out w-full h-full"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full w-full h-full flex-shrink-0 flex flex-col items-center justify-center px-8">
              {/* Logo area */}
              <div className="w-24 h-24 bg-white rounded-full shadow-lg mb-10 flex items-center justify-center relative overflow-hidden">
                {/* Tennis ball icon */}
                <div className="w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-white opacity-40"></div>
                  
                  {/* Add racket icon */}
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-primary-700 relative" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 5.25C8 3.45 9.46 2 11.25 2C13.05 2 14.5 3.46 14.5 5.25C14.5 7.05 13.04 8.5 11.25 8.5" />
                    <path d="M11 14L20 5" />
                    <path d="M15.5 8.5L19 5" />
                    <path d="M16 16L12 12" />
                    <path d="M11.25 8.5C9.46 8.5 8 7.04 8 5.25" />
                    <path d="M6 20C7.5 16 11 15 15 13.5C17 12.5 20.5 9.5 21.5 8L19 5.5C17.5 6.5 14.5 10 13.5 12C12 16 11 19.5 7 21" />
                    <path d="M11 14C9.5 14.5 6.4 15.5 5 20" />
                  </svg>
                </div>
              </div>
              
              {/* App name */}
              <h1 className="text-4xl font-bold mb-3 text-center">{slide.title}</h1>
              
              {/* Tagline */}
              <h2 className="text-2xl font-medium mb-4 text-center">{slide.subtitle}</h2>
              
              {/* Description text */}
              <p className="text-center text-lg mb-12 max-w-xs opacity-90">
                {slide.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Page indicators */}
      <div className="flex justify-center space-x-3 mb-8">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full ${
              activeSlide === index 
                ? "w-6 h-2 bg-white" 
                : "w-2 h-2 bg-white bg-opacity-50 hover:bg-opacity-70"
            }`}
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Bottom buttons area - white background */}
      <div className="px-8 pb-12 pt-10 space-y-4 bg-white rounded-t-3xl shadow-inner">
        <button 
          className="w-full h-14 flex items-center justify-center bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-medium rounded-2xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transform active:scale-[0.98]"
          aria-label="Log In"
        >
          <span className="mr-1">Log In</span>
          {/* ChevronRight icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 opacity-80">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
        
        <button 
          className="w-full h-14 flex items-center justify-center bg-white hover:bg-gray-50 active:bg-gray-100 text-primary-600 font-medium rounded-2xl shadow-sm transition-all border-2 border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transform active:scale-[0.98]"
          aria-label="Sign Up"
        >
          <span className="mr-1">Sign Up</span>
          {/* ChevronRight icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 opacity-80">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WelcomePage; 