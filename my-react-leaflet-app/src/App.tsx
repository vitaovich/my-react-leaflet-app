import React, { useState } from 'react';
import './App.css';
import LeafletMap from './components/LeafletMap/LeafletMap';

function App() {

  const [selectedMarker, setSelectedMarker] = useState<string>() 
  const handleOnMarkerClick = (latlng: string | undefined) =>
  {
    console.log(`Map was clicked at ${latlng}}!`)
    setSelectedMarker(latlng)
  }

  return (
    <div className="App">
      <div>
        <h1>Info</h1>
        {selectedMarker && <div>Marker: {selectedMarker}</div>}
      </div>
      <LeafletMap label='My Leaflet Map' onMarkerClick={handleOnMarkerClick}></LeafletMap>
    </div>
  );
}

export default App;
