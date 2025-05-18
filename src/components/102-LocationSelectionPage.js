import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, MapPin, Plus, Navigation, Search, Target, X, CheckCircle } from 'lucide-react';
import PageHeader from './common/PageHeader';

// Modular Component: Button
const Button = ({ children, onClick, variant = "primary", className = "", fullWidth = false, disabled = false }) => {
  const baseClasses = "font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: `bg-primary-600 ${!disabled ? 'active:bg-primary-700' : 'opacity-70'} text-white focus:ring-primary-500 shadow-md`,
    secondary: `bg-gray-100 ${!disabled ? 'active:bg-gray-200' : 'opacity-70'} text-gray-700 focus:ring-gray-400`,
    text: `text-primary-600 ${!disabled ? 'active:text-primary-700 active:bg-primary-50' : 'opacity-70'} focus:ring-primary-500`
  };
  
  const sizeClasses = fullWidth ? "w-full" : "";
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Modular Component: Location Item
const LocationItem = ({ location, isSelected, onSelect }) => {
  return (
    <div 
      className="py-4 px-4 border-b border-gray-200 flex items-center active:bg-gray-50 cursor-pointer"
      onClick={() => onSelect(location.id)}
    >
      <div className="flex-shrink-0 mr-3">
        {location.isCurrentLocation ? (
          <Navigation className="w-6 h-6 text-primary-600" />
        ) : (
          <MapPin className="w-6 h-6 text-gray-500" />
        )}
      </div>
      <div className="flex-1">
        {location.name && <h3 className="font-medium text-gray-800">{location.name}</h3>}
        <p className="text-sm text-gray-600 mt-0.5">{location.address}</p>
        {location.postcode && <p className="text-sm text-gray-500 mt-0.5">{location.postcode}</p>}
      </div>
      <div 
        className={`w-6 h-6 rounded-full border flex items-center justify-center ${
          isSelected 
            ? 'bg-primary-600 border-primary-600' 
            : 'border-gray-300'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(location.id);
        }}
        role="radio"
        aria-checked={isSelected}
      >
        {isSelected && <div className="w-3 h-3 bg-white rounded-full"></div>}
      </div>
    </div>
  );
};

// Modular Component: Add Location Button
const AddLocationButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center py-4 px-4 text-primary-600 active:bg-primary-50 w-full"
    >
      <Plus className="w-5 h-5 mr-3" />
      <span className="font-medium">Add new address</span>
    </button>
  );
};

// Toast Notification Component
const Toast = ({ message, visible }) => {
  if (!visible) return null;
  
  return (
    <div className="fixed top-14 left-0 right-0 mx-auto w-full max-w-md bg-primary-600 text-white py-3 px-4 flex items-center justify-center shadow-lg z-30">
      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
      <p className="font-medium">{message}</p>
    </div>
  );
};

// Page Component: Locations List
const LocationsList = ({ locations, selectedLocationId, onBack, onAddNew, onSelectLocation }) => {
  const [showToast, setShowToast] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const handleSelectLocation = (id) => {
    const location = locations.find(loc => loc.id === id);
    setSelectedLocation(location);
    onSelectLocation && onSelectLocation(id);
  };
  
  const handleUpdate = () => {
    // In a real app, this would update the user's location in the backend
    setShowToast(true);
    
    // Provide haptic feedback if available
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
    
    // Hide toast after 2.5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PageHeader title="Choose Location" onBack={onBack} />
      
      {/* Toast Notification */}
      <Toast 
        message={`Location updated to ${selectedLocation ? selectedLocation.name : "Current Location"}`}
        visible={showToast} 
      />
      
      <div className="flex-1 overflow-auto">
        <div className="py-4">
          <AddLocationButton onClick={onAddNew} />
        </div>
        
        <div className="bg-white mb-6 shadow-sm">
          {locations.map(location => (
            <LocationItem 
              key={location.id}
              location={location}
              isSelected={selectedLocationId === location.id}
              onSelect={handleSelectLocation}
            />
          ))}
        </div>
        
        {/* Update Button */}
        <div className="px-4 pb-6">
          <Button 
            onClick={handleUpdate}
            fullWidth 
            className="py-3.5 text-base"
          >
            Update Location
          </Button>
        </div>
      </div>
    </div>
  );
};

// Map Search Component
const MapSearch = ({ onBack, onConfirmLocation, onAddManually }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Wimbledon Tennis Club", address: "Church Road, London SW19 5AG" },
    { id: 2, name: "All England Club", address: "Church Road, Wimbledon, London SW19 5AE" },
    { id: 3, name: "Wilton Tennis Club", address: "Wimbledon, London SW19 3QX" }
  ]);
  
  const handleConfirm = () => {
    // In a real app, this would use the selected location
    const mockLocation = {
      id: 999,
      name: "Current Location",
      address: "Wimbledon, London SW19",
      isCurrentLocation: true
    };
    onConfirmLocation(mockLocation);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PageHeader title="Choose Location" onBack={onBack} />
      
      {/* Search Bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm"
            placeholder="Search for a location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>
      
      {/* Map Area (Placeholder) */}
      <div className="relative flex-1 bg-gray-200 flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-gray-500 mb-2">Map would be displayed here</p>
          <div className="w-10 h-10 mx-auto rounded-full bg-primary-600 flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {/* Current Location Button */}
        <button 
          className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg"
          onClick={() => {}}
        >
          <Target className="w-5 h-5 text-primary-600" />
        </button>
      </div>
      
      {/* Search Results */}
      {searchTerm && (
        <div className="absolute top-[105px] left-0 right-0 bg-white shadow-lg max-h-64 overflow-auto z-10">
          {searchResults.map(result => (
            <div 
              key={result.id} 
              className="p-3 border-b border-gray-100 active:bg-gray-50"
              onClick={() => setSearchTerm(result.name)}
            >
              <h3 className="font-medium text-gray-800">{result.name}</h3>
              <p className="text-sm text-gray-500">{result.address}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Bottom Actions */}
      <div className="bg-white p-4 shadow-lg">
        <Button 
          onClick={handleConfirm}
          fullWidth 
          className="mb-3 py-3"
        >
          Confirm Location
        </Button>
        <Button 
          onClick={onAddManually}
          variant="secondary"
          fullWidth
          className="py-3"
        >
          Add Address Manually
        </Button>
      </div>
    </div>
  );
};

// Address Form Component
const AddressForm = ({ onBack, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: 'London',
    postcode: '',
    country: 'United Kingdom'
  });
  
  const handleConfirm = () => {
    // In a real app, this would validate and save the address
    const newLocation = {
      id: Date.now(),
      name: formData.name,
      address: `${formData.address}, ${formData.city}`,
      postcode: formData.postcode,
      isCurrentLocation: false
    };
    onConfirm(newLocation);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const isFormValid = () => {
    return formData.address.trim() !== '' && formData.postcode.trim() !== '';
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PageHeader title="Add New Address" onBack={onBack} />
      
      <div className="flex-1 overflow-auto p-4">
        <form className="space-y-5">
          {/* Location Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Location Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Home, Work"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Street address"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Postcode */}
          <div>
            <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
              Postcode
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              placeholder="e.g. SW19 5AG"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              value={formData.postcode}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </div>
      
      {/* Bottom Action */}
      <div className="bg-white p-4 shadow-lg">
        <Button 
          onClick={handleConfirm}
          fullWidth 
          className="py-3"
          disabled={!isFormValid()}
        >
          Save Address
        </Button>
      </div>
    </div>
  );
};

// Main Component
const LocationManagement = () => {
  const [currentView, setCurrentView] = useState('list');
  const [locations, setLocations] = useState([
    { id: 1, name: "Current Location", address: "Wimbledon, London SW19", isCurrentLocation: true },
    { id: 2, name: "Home", address: "123 Main Street, London", postcode: "SW1 1AA" },
    { id: 3, name: "Work", address: "456 Office Park, London", postcode: "EC1 2BB" }
  ]);
  const [selectedLocationId, setSelectedLocationId] = useState(1);
  
  // Navigation Handlers
  const handleBack = () => {
    // In a real app, this would navigate back or close the modal
    if (currentView !== 'list') {
      setCurrentView('list');
    } else {
      alert("Going back to previous screen");
    }
  };
  
  const handleAddNew = () => {
    setCurrentView('map');
  };
  
  const handleAddManually = () => {
    setCurrentView('form');
  };
  
  const handleConfirmLocation = (location) => {
    // Add new location to the list
    setLocations([...locations, location]);
    setSelectedLocationId(location.id);
    setCurrentView('list');
  };
  
  // Render appropriate view
  const renderView = () => {
    switch (currentView) {
      case 'map':
        return (
          <MapSearch 
            onBack={handleBack}
            onConfirmLocation={handleConfirmLocation}
            onAddManually={handleAddManually}
          />
        );
      case 'form':
        return (
          <AddressForm 
            onBack={handleBack}
            onConfirm={handleConfirmLocation}
          />
        );
      default:
        return (
          <LocationsList 
            locations={locations}
            selectedLocationId={selectedLocationId}
            onBack={handleBack}
            onAddNew={handleAddNew}
            onSelectLocation={setSelectedLocationId}
          />
        );
    }
  };
  
  return (
    <>
      {renderView()}
    </>
  );
};

export default LocationManagement; 