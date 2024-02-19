import React, { useEffect, useRef, useState } from "react";
import "./LeafletMap.css";
import L, { LayerGroup, LeafletMouseEvent, Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface LeafletMapProps {
  label: string;
  onMarkerClick: (event: LeafletMouseEvent) => void
}

const LeafletMap = (props: LeafletMapProps) => {
  const mapRef = useRef<Map | null>(null);
  const [layerGroup, setLayerGroup] = useState<LayerGroup>(L.layerGroup());

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        if (!mapRef.current) {
          mapRef.current = L.map('map', {
            layers: [
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
              layerGroup
            ]
          })
            .setView([latitude, longitude], 13)

          mapRef.current.on('click', (e: any) => {
            const { lat, lng } = e.latlng;
            // Place a marker where the user clicked
            let marker = L.marker([lat, lng]);
            marker.bindPopup("You clicked here!").openPopup();
            marker.on('click', props.onMarkerClick)
            layerGroup.addLayer(marker)
          });
        }
      })
    }
    else {
      console.log('already initialized')
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // This properly cleans up the map instance
      }
    };
  }, [layerGroup]);

  return (
    <>
      <h3>{props.label}</h3>
      <div id="map" className="map-container" />
    </>
  )
};

export default LeafletMap;