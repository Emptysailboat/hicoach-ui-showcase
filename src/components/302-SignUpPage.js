import React, { useState } from 'react';

const SignUpPage = () => {
  // State management
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('Student');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePromo, setAgreePromo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  // Error states
  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
    terms: false
  });
  
  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0, // 0-4, 0 weakest, 4 strongest
    message: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Clear field errors
    if (id in errors) {
      setErrors({...errors, [id]: false});
    }
    
    // Check password strength
    if (id === 'password') {
      checkPasswordStrength(value);
    }
  };
  
  // Password strength check
  const checkPasswordStrength = (password) => {
    // Simple password strength assessment
    let score = 0;
    let message = '';
    
    if (password.length === 0) {
      setPasswordStrength({ score: 0, message: '' });
      return;
    }
    
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    switch(score) {
      case 0:
      case 1:
        message = 'Weak';
        break;
      case 2:
        message = 'Fair';
        break;
      case 3:
        message = 'Good';
        break;
      case 4:
        message = 'Strong';
        break;
      default:
        message = '';
    }
    
    setPasswordStrength({ score, message });
  };
  
  // Validate password consistency
  React.useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setErrors({...errors, confirmPassword: true});
    } else {
      setErrors({...errors, confirmPassword: false});
    }
  }, [formData.password, formData.confirmPassword]);

  // Password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  // Role selection handler
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate terms agreement
    if (!agreeTerms) {
      setErrors({...errors, terms: true});
      return;
    }
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrors({...errors, confirmPassword: true});
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log("Form submitted", formData);
      setIsSubmitting(false);
      // In a real app, this would navigate to the next page
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto overflow-auto">
      {/* Top navigation bar */}
      <div className="sticky top-0 bg-white px-5 h-16 flex items-center border-b border-gray-100 shadow-sm z-10">
        <button className="p-2 rounded-full active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50">
          <span className="material-icons-round text-gray-700">arrow_back</span>
        </button>
        <h1 className="ml-4 text-xl font-semibold text-gray-800">Sign Up</h1>
      </div>

      {/* Form content */}
      <form onSubmit={handleSubmit} className="flex-1 px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-gray-600">Join our community</p>
        </div>

        {/* First name and last name */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-icons-round text-gray-400">person</span>
              </div>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Smith"
              className="block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
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
              className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
              required
            />
          </div>
        </div>

        {/* Phone number */}
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-gray-400">phone</span>
            </div>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 123 456 7890"
              className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-2">
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
              className={`block w-full pl-12 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-2xl bg-white text-gray-800 focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-500 focus:border-primary-500'} shadow-sm`}
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
        </div>
        
        {/* Password strength indicator */}
        {formData.password && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex flex-1 space-x-1.5">
                {[1, 2, 3, 4].map((level) => (
                  <div 
                    key={level}
                    className={`h-1.5 flex-1 rounded-full ${
                      passwordStrength.score >= level 
                        ? passwordStrength.score >= 3 
                          ? 'bg-primary-500' 
                          : passwordStrength.score === 2 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              {passwordStrength.message && (
                <span className={`text-xs font-medium ml-2 ${
                  passwordStrength.score >= 3 
                    ? 'text-primary-600' 
                    : passwordStrength.score === 2 
                      ? 'text-yellow-600' 
                      : 'text-red-600'
                }`}>
                  {passwordStrength.message}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Use 8+ characters with a mix of letters, numbers & symbols
            </p>
          </div>
        )}

        {/* Confirm password */}
        <div className="mb-2">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-gray-400">lock</span>
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="••••••••"
              className={`block w-full pl-12 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-2xl bg-white text-gray-800 focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-500 focus:border-primary-500'} shadow-sm`}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="text-gray-400 focus:outline-none p-1"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <span className="material-icons-round">
                  {showConfirmPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Password mismatch alert */}
        {errors.confirmPassword && (
          <div className="mb-6 flex items-center text-red-600 text-sm mt-2">
            <span className="material-icons-round text-red-600 mr-2 text-sm">error</span>
            <span>Passwords don't match</span>
          </div>
        )}

        {/* Role selection */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-2">I am a</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleRoleChange('Student')}
              className={`h-14 flex items-center justify-center rounded-2xl border-2 font-medium ${
                role === 'Student'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('Coach')}
              className={`h-14 flex items-center justify-center rounded-2xl border-2 font-medium ${
                role === 'Coach'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              Coach
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            You can switch roles anytime in the app to access different features
          </p>
        </div>

        {/* Terms agreement */}
        <div className="space-y-3 mb-8">
          <div className={errors.terms ? "p-4 bg-red-50 rounded-xl mb-3" : ""}>
            <label className="flex items-center">
              <div 
                className={`w-6 h-6 flex items-center justify-center rounded border ${
                  agreeTerms 
                    ? 'bg-primary-600 border-primary-600' 
                    : errors.terms
                      ? 'border-red-500 bg-white'
                      : 'border-gray-300 bg-white'
                }`}
                onClick={() => {
                  setAgreeTerms(!agreeTerms);
                  if (errors.terms) setErrors({...errors, terms: false});
                }}
              >
                {agreeTerms && <span className="material-icons-round text-white text-sm">check</span>}
              </div>
              <span className="ml-2 text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">Privacy Policy</a>
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-600 text-sm mt-1 ml-8 flex items-center">
                <span className="inline-block w-1 h-1 rounded-full bg-red-600 mr-2"></span>
                You must agree to the terms to continue
              </p>
            )}
          </div>
          
          <label className="flex items-center">
            <div 
              className={`w-6 h-6 flex items-center justify-center rounded border ${
                agreePromo ? 'bg-primary-600 border-primary-600' : 'border-gray-300 bg-white'
              }`}
              onClick={() => setAgreePromo(!agreePromo)}
            >
              {agreePromo && <span className="material-icons-round text-white text-sm">check</span>}
            </div>
            <span className="ml-2 text-gray-700">
              I agree to receive promotional messages
              <span className="text-gray-500 text-sm ml-1">(optional)</span>
            </span>
          </label>
        </div>

        {/* Create account button */}
        <button 
          type="submit"
          className="w-full h-14 bg-primary-600 text-white font-medium rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 mb-8 relative"
          disabled={errors.confirmPassword || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="opacity-0">Create Account</span>
              <span className="material-icons-round text-white absolute inset-0 m-auto animate-spin">sync</span>
            </>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Social login divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-500 text-sm">Or sign up with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social login buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            type="button"
            className="h-14 flex items-center justify-center border border-gray-200 rounded-2xl bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Sign up with Apple"
          >
            <span className="material-icons-round mr-2">apple</span>
            Apple
          </button>
          <button 
            type="button"
            className="h-14 flex items-center justify-center border border-gray-200 rounded-2xl bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Sign up with Google"
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

        {/* Login link */}
        <div className="text-center mb-8">
          <p className="text-gray-700">
            Already have an account?{' '}
            <a href="#" className="text-primary-600 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded px-2 py-1">
              Log In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage; 