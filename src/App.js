import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Menu from './components/navigation'
import Map from './components/MapDisplay'

function App() {
  return (
    <div className="App">
      <Menu />
      <Map />
    </div>
  );
}

export default App;
