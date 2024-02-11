import React from 'react';
import './App.css';
import LeafletMap from './components/LeafletMap/LeafletMap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LeafletMap label='My Leaflet Map'></LeafletMap>
      </header>
    </div>
  );
}

export default App;
