import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Menu from './components/Navigation'
import Dungeon from './components/Dungeon/Dungeon'

function App() {
  return (
    <div className="App">
      <Menu />
      <Dungeon />
    </div>
  );
}

export default App;
