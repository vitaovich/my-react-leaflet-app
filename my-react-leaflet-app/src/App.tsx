import React, { useState } from 'react';
import './App.css';
import LeafletMap from './components/LeafletMap/LeafletMap';


const GEOJSONFEATURE = [
  {
    "type": "Feature",
    "properties": {
      "name": "Coors Field",
      "amenity": "Baseball Stadium",
      "popupContent": "This is where the Rockies play!",
      "group": "GroupA"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-122.200241, 47.847838]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "My Feature",
      "amenity": "Baseball Stadium",
      "popupContent": "Hello from my marker!",
      "group": "GroupB"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-122.2003, 47.847838]
    }
  }
]

function App() {
  const [selectedMarker, setSelectedMarker] = useState<string>()
  const [tool, setTool] = useState<string>('')
  const [dataGeoJson, setDataGeoJson] = useState<any[]>(GEOJSONFEATURE)
  const handleOnMarkerClick = (latlng: string | undefined) => {
    console.log(`Map was clicked at ${latlng}}!`)
    setSelectedMarker(latlng)
  }

  const handleExport = () =>
  {
    console.log('export map.')
  }

  const handleImport = () =>
  {
    console.log('import map.')
  }

  const handleToolBarSelect = (tool: string) =>
  {
    setTool(tool)
  }

  return (
    <div className="App">
      <LeafletMap
        label='My Leaflet Map'
        tool={tool}
        geojson={dataGeoJson}
        onMarkerClick={handleOnMarkerClick}
      />
      <div>
        <h1>Info</h1>
        {selectedMarker && <div>Marker: {selectedMarker}</div>}
        {tool && <div>Current Tool: {tool}</div>}
        <button onClick={() => handleToolBarSelect('place_marker')}>Place Marker</button>
        <button onClick={() => handleToolBarSelect('delete_marker')}>Delete</button>
        <button onClick={() => handleToolBarSelect('Import')}>Import</button>
        <button onClick={() => handleToolBarSelect('Export')}>Export</button>
      </div>
    </div>
  );
}

export default App;
