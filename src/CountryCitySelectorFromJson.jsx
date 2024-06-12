import React, { useState } from 'react';
import countriesData from '../countries.json'; // Asegúrate de la ruta correcta al archivo

const CountryCitySelectorFromJson = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [citiesOfSelectedCountry, setCitiesOfSelectedCountry] = useState([]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);

    // Filtrar ciudades únicas del país seleccionado
    const cities = new Set(countriesData[country] || []);
    setCitiesOfSelectedCountry(Array.from(cities));
    setSelectedCity('');
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  return (
    <div>
      <h1>Solucion con archivo JSON</h1>
      <h2>Select Country and City from JSON</h2>

      <div>
        <label htmlFor="country">Country: </label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {Object.keys(countriesData).map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {citiesOfSelectedCountry.length > 0 && (
        <div>
          <label htmlFor="city">City: </label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">Select a city</option>
            {citiesOfSelectedCountry.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}

      {selectedCountry && selectedCity && (
        <div>
          <p>Country: {selectedCountry}</p>
          <p>City: {selectedCity}</p>
        </div>
      )}
    </div>
  );
};

export default CountryCitySelectorFromJson;
