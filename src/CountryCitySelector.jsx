import React, { useState, useEffect } from 'react';
import csc from 'countrycitystatejson';

const CountryCitySelector = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesList = await csc.getCountries();
        setCountries(countriesList);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (e) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    setSelectedState('');
    setSelectedCity('');
    setCities([]);

    if (countryName) {
      try {
        const countryInfo = countries.find(country => country.name === countryName);
        if (countryInfo) {
          const countryShortCode = countryInfo.shortName;
          const statesOfCountry = await csc.getStatesByShort(countryShortCode);
          setStates(statesOfCountry);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        setStates([]);
      }
    } else {
      setStates([]);
    }
  };

  const handleStateChange = async (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity('');
    setCities([]);

    if (stateName && selectedCountry) {
      try {
        const countryInfo = countries.find(country => country.name === selectedCountry);
        if (countryInfo) {
          const countryShortCode = countryInfo.shortName;
          const citiesOfState = await csc.getCities(countryShortCode, stateName);
          setCities(Array.isArray(citiesOfState) ? citiesOfState : []);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);
      }
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
       <h1>Solucion con: countrycitystatejson</h1>
       <h2> __________________________________________________________</h2>
      <h2>Select Country, State/Province, and City</h2>
      <div>
        <label htmlFor="country">Country: </label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {countries.map(country => (
            <option key={country.shortName} value={country.name}>{country.name}</option>
          ))}
        </select>
      </div>

      {states.length > 0 && (
        <div>
          <label htmlFor="state">State/Province: </label>
          <select id="state" value={selectedState} onChange={handleStateChange}>
            <option value="">Select a state/province</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      )}

      {cities.length > 0 && (
        <div>
          <label htmlFor="city">City: </label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">Select a city</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}

      {selectedCountry && selectedState && selectedCity && (
        <div>
          <p>Selected Country: {selectedCountry}</p>
          <p>Selected State/Province: {selectedState}</p>
          <p>Selected City: {selectedCity}</p>
        </div>
      )}
       <h2> __________________________________________________________</h2>

    </div>
  );
};

export default CountryCitySelector;
