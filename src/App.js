import Location from './components/location';
import Header from './components/header';
import Navbar from './components/nav';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Location />
    </div>
  );
}

export default App;
