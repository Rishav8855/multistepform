import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    occupation: '',
    qualification: '',
    diet: '',
  });

  const countries = ['USA', 'India', 'UK']; // gave the name of countries
  const statesByCountry = {
    USA: ['New York', 'California', 'Texas'],
    India: ['Arunachal Pradesh', 'Rajasthan', 'Gujrat'], //states under country
    UK: ['England', 'Scotland', 'Wales'],
  };

  const citiesByState = {
    'New York': ['New York City', 'Buffalo', 'Rochester', 'Yonkers'],
    California: ['Los Angeles', 'San Diego', 'San Francisco', 'San Jose'],
    Texas: ['Houston', 'San Antonio', 'Dallas', 'Austin'],
    'Arunachal Pradesh': ['Itanagar', 'Dirang', 'Ziro', 'Tawang'],
    Rajasthan: ['Udaipur', 'Kota', 'Jaipur', 'Jodhpur'],
    Gujrat: ['Ahmedabad', 'Surat', 'Rajkot', 'Vadodara'],
    England: ['London', 'Birmingham', 'Manchester', 'Liverpool'], //cities under state under country
    Scotland: ['Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee'],
    Wales: ['Cardiff', 'Swansea', 'Newport', 'Bangor'],
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCountryChange = event => {
    const country = event.target.value;
    setFormData(prevState => ({
      ...prevState,
      country,
      state: '', // Reset state when country changes
      city: '', // Reset city when country changes
    }));
  };

  const handleStateChange = event => {
    const state = event.target.value;
    setFormData(prevState => ({
      ...prevState,
      state,
      city: '', // Reset city when state changes
    }));
  };

  const handleSubmitPart1 = event => {
    event.preventDefault();
    
    if (formData.name && formData.email && formData.phone && formData.address) {
      setStep(2);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleSubmitPart2 = event => {
    event.preventDefault();
    
    if (formData.country && formData.state) {
      setStep(3);
    } else {
      alert('Please fill in country and state');
    }
  };

  const handleSubmitPart3 = event => {
    event.preventDefault();
    
    console.log(formData);
    setFormData({ 
      name: '',
      email: '',
      phone: '',
      address: '',
      country: '',
      state: '',
      city: '',
      gender: '',
      occupation: '',
      qualification: '',
      diet: '',
    });
    setStep(1); // Go back to the first tab
    navigate('/'); // Navigate back to the initial form after submission
  };

  return (
    <div className="multistep-form">
      {step === 1 && (
        <form onSubmit={handleSubmitPart1} className="step-form">
          <h2>Basic Information</h2>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="phone">Phone:</label>
          <div className="phone-input-container">
  <select
    id="countryCode"
    name="countryCode"
    value={formData.countryCode}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Country Code</option>
    <option value="+1">+1 (USA)</option>
    <option value="+91">+91 (India)</option>
    <option value="+44">+44 (UK)</option>
    {/* Add more options as needed */}
  </select>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="Enter phone number"
          />
          </div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Next</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmitPart2} className="step-form">
          <h2>Origin</h2>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            required
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <label htmlFor="state">State:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleStateChange}
            required
          >
            <option value="">Select State</option>
            {formData.country && statesByCountry[formData.country].map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <label htmlFor="city">City:</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          >
            <option value="">Select City</option>
            {formData.state && citiesByState[formData.state].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <button type="submit">Next</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmitPart3} className="step-form">
          <h2>Work</h2>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="qualification">Qualification:</label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="diet">Diet (Veg/Non-veg):</label>
          <input
            type="text"
            id="diet"
            name="diet"
            value={formData.diet}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default MultiStepForm;
