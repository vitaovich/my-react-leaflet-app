import React, { useEffect, useRef } from "react";
import "./LeafletMap.css";
import L, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface LeafletMapProps {
  label: string;
}

const LeafletMap = (props: LeafletMapProps) => {
  const mapRef = useRef<Map>();

  useEffect(() => {
    if(!mapRef.current)
    {
      console.log('initializing leaflet.')
      mapRef.current = L.map('map', {
        layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        ]
      })
      .setView([51.505, -0.09], 13)
    }
    else
    {
      console.log('already initialized')
    }

  }, []);

  return (
    <>
      <h3>{props.label}</h3>
      <div id="map" className="map-container"/>
    </>
  )
};

export default LeafletMap;