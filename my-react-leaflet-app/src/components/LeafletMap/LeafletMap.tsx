import React, { useEffect, useRef } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import './LeafletMap.css';

export interface LeafletMapProps {
  label: string;
  geojson?: any;
  tool: string;
  onMarkerClick: (latlng?: string) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ geojson, tool, onMarkerClick }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const handleOnMarkerClick = (event: LeafletMouseEvent) => {
    console.log(`Marker was clicked at ${event.latlng}}!`, event)
    const latlng = event.latlng.toString()

    onMarkerClick(latlng.toString())
  }

  const handleMapClick = (event: LeafletMouseEvent) => {
    console.log(`Map was clicked at ${event.latlng}!`);

    if (tool === 'place_marker') {
      console.log('Placing marker');
      const marker = L.marker(event.latlng).addTo(mapRef.current as L.Map);
      marker.bindPopup('You clicked here!').openPopup();
      marker.on('click', () => onMarkerClick(event.latlng.toString()));
    } else {
      console.log('clicked map but no tool selected');
    }
  };

  const handleMapDoubleClick = (event: LeafletMouseEvent) => {
    onMarkerClick();
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      console.log('Initializing map')
      // Initialize the map only when the div is available and the map hasn't been initialized
      mapRef.current = L.map(mapContainerRef.current).setView([0, 0], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);

      // Attempt to use geolocation
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current?.setView([latitude, longitude], 13);
      });
    }

    // Cleanup function to remove the map on component unmount
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (mapRef.current) {
      // Set up event listeners
      mapRef.current.on('click', handleMapClick);
      mapRef.current.on('dblclick', handleMapDoubleClick);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool]); // Re-run this effect if tool prop changes

  useEffect(() => {
    if (mapRef.current && geojson) {
      // Add GeoJSON layer
      L.geoJSON(geojson, {
        onEachFeature: (feature, layer) => {
          if (feature.properties?.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
            layer.on('click', handleOnMarkerClick);
          }
        },
      }).addTo(mapRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geojson]); // Re-run this effect if geojson prop changes

  return (
    <>
      {tool && <div>Current Tool: {tool}</div>}
      {!tool && <div>Current Tool: None</div>}
      <div ref={mapContainerRef} className="map-container" />
    </>
  );
};

export default LeafletMap;
