import React from 'react';
import './App.css';
import CountryCitySelector from './CountryCitySelector';
import CountryCitySelectorFromJson from './CountryCitySelectorFromJson';

function App() {
  return (
    <div className="App">
      <CountryCitySelector />
      <CountryCitySelectorFromJson />
    </div>
  );
}

export default App;
