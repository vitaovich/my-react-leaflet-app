import React from 'react';
import './App.css';
import LeafletMap from './components/LeafletMap/LeafletMap';
import { LeafletMouseEvent } from 'leaflet';

function App() {

  const handleOnMarkerClick = (event: LeafletMouseEvent) =>
  {
    console.log(`Marker was clicked at ${event.latlng}}!`, event)
  }

  return (
    <div className="App">
      <header className="App-header">
        <LeafletMap label='My Leaflet Map' onMarkerClick={handleOnMarkerClick}></LeafletMap>
      </header>
    </div>
  );
}

export default App;
