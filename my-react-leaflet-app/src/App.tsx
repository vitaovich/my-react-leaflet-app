import React, { useState } from 'react';
import './App.css';
import LeafletMap from './components/LeafletMap/LeafletMap';


const GEOJSONFEATURE = [
  {
    "type": "Feature",
    "properties": {
      "name": "Coors Field",
      "amenity": "Baseball Stadium",
      "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-122.200241, 47.847838]
    }
  }
]

function App() {

  const [selectedMarker, setSelectedMarker] = useState<string>()
  const handleOnMarkerClick = (latlng: string | undefined) => {
    console.log(`Map was clicked at ${latlng}}!`)
    setSelectedMarker(latlng)
  }

  return (
    <div className="App">
      <div>
        <h1>Info</h1>
        {selectedMarker && <div>Marker: {selectedMarker}</div>}
      </div>
      <LeafletMap
        label='My Leaflet Map'
        geojson={GEOJSONFEATURE}
        onMarkerClick={handleOnMarkerClick}
      />
    </div>
  );
}

export default App;
