import React, { useState } from 'react';

const LoginPage = () => {
  // State management
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // Error states
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    auth: false
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Clear field errors
    if (errors[id]) {
      setErrors({...errors, [id]: false});
    }
    
    // Clear auth errors
    if (errors.auth && (id === 'email' || id === 'password')) {
      setErrors({...errors, auth: false});
    }
  };

  // Password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    let formErrors = {};
    let hasError = false;
    
    if (!formData.email) {
      formErrors.email = true;
      hasError = true;
    }
    
    if (!formData.password) {
      formErrors.password = true;
      hasError = true;
    }
    
    if (hasError) {
      setErrors({...errors, ...formErrors});
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log("Login attempt", formData);
      
      // Simulate authentication error (in a real app, this would be based on API response)
      // This is just to show the error state UI
      if (formData.email === 'error@example.com') {
        setErrors({...errors, auth: true});
        setIsSubmitting(false);
        return;
      }
      
      setIsSubmitting(false);
      // In a real app, this would navigate to home or previous page
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto overflow-auto">
      {/* Top navigation bar */}
      <div className="sticky top-0 bg-white px-5 h-16 flex items-center border-b border-gray-100 shadow-sm z-10">
        <button 
          className="p-2 rounded-full active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50" 
          aria-label="Back"
        >
          <span className="material-icons-round text-gray-700">arrow_back</span>
        </button>
        <h1 className="ml-4 text-xl font-semibold text-gray-800">Log In</h1>
      </div>

      {/* Form content */}
      <form onSubmit={handleSubmit} className="flex-1 px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Log in to HiCoach to continue</p>
        </div>

        {/* Authentication error alert */}
        {errors.auth && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start">
            <span className="material-icons-round text-red-500 mt-0.5 mr-3 flex-shrink-0">error</span>
            <p className="text-red-600 text-sm">
              Incorrect email or password. Please try again.
            </p>
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-gray-400">email</span>
            </div>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className={`block w-full pl-12 pr-4 py-3 border ${errors.email || errors.auth ? 'border-red-500' : 'border-gray-200'} rounded-2xl bg-white text-gray-800 focus:outline-none focus:ring-2 ${errors.email || errors.auth ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-500 focus:border-primary-500'} shadow-sm`}
              required
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-red-600 text-sm flex items-center">
              <span className="inline-block w-1 h-1 rounded-full bg-red-600 mr-2"></span>
              Please enter your email
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-gray-400">lock</span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className={`block w-full pl-12 pr-12 py-3 border ${errors.password || errors.auth ? 'border-red-500' : 'border-gray-200'} rounded-2xl bg-white text-gray-800 focus:outline-none focus:ring-2 ${errors.password || errors.auth ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-500 focus:border-primary-500'} shadow-sm`}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 focus:outline-none p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-icons-round">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="mt-2 text-red-600 text-sm flex items-center">
              <span className="inline-block w-1 h-1 rounded-full bg-red-600 mr-2"></span>
              Please enter your password
            </p>
          )}
        </div>

        {/* Forgot password */}
        <div className="flex justify-end items-center mb-10">
          <a href="#" className="text-sm font-medium text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded px-2 py-1">
            Forgot password?
          </a>
        </div>

        {/* Login button */}
        <button 
          type="submit"
          className="w-full h-14 bg-primary-600 text-white font-medium rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 mb-8 relative"
          disabled={isSubmitting}
          aria-live="polite"
        >
          {isSubmitting ? (
            <>
              <span className="opacity-0">Log In</span>
              <span className="material-icons-round text-white absolute inset-0 m-auto animate-spin">sync</span>
            </>
          ) : (
            "Log In"
          )}
        </button>

        {/* Social login divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-500 text-sm">Or log in with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social login buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            type="button"
            className="h-14 flex items-center justify-center border border-gray-200 rounded-2xl bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Log in with Apple"
          >
            <span className="material-icons-round mr-2">apple</span>
            Apple
          </button>
          <button 
            type="button"
            className="h-14 flex items-center justify-center border border-gray-200 rounded-2xl bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Log in with Google"
          >
            <span className="mr-2 flex items-center justify-center w-5 h-5">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="currentColor"
                  d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                />
              </svg>
            </span>
            Google
          </button>
        </div>

        {/* Sign up link */}
        <div className="text-center mb-8">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <a href="#" className="text-primary-600 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded px-2 py-1">
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage; 