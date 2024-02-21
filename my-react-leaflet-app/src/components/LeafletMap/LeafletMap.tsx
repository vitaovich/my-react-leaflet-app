import React, { useEffect, useRef, useState } from "react";
import "./LeafletMap.css";
import L, { LayerGroup, LeafletMouseEvent, Map } from 'leaflet';

export interface LeafletMapProps {
  label: string,
  geojson?: any,
  tool: string,
  onMarkerClick: (latlng: string | undefined) => void,
}

const LeafletMap = (props: LeafletMapProps) => {
  const mapRef = useRef<Map | null>(null);
  const [layerGroup, setLayerGroup] = useState<LayerGroup>(L.layerGroup());
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  const handleMapExport = () => {

  }

  const handleOnClick = (event: LeafletMouseEvent) => {
    switch (props.tool) {
      case "place_marker":
        console.log('place marker')
        break
      default:
        console.log('no tool selected')
        break
    }
  }

  const handleOnMarkerClick = (event: LeafletMouseEvent) => {
    console.log(`Marker was clicked at ${event.latlng}}!`, event)
    const latlng = event.latlng.toString()

    props.onMarkerClick(latlng.toString())
  }

  const handleOnMapClick = (event: LeafletMouseEvent) => {
    console.log(`Map was clicked at ${event.latlng}}!`, event)
    props.onMarkerClick(undefined)
  }

  const onEachFeature = (feature: any, layer: L.Layer) => {
    if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(feature.properties.popupContent);
      layer.on('click', handleOnMarkerClick)
    }
  }

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

          if (props.geojson) {
            console.log('Adding GeoJSON')
            L.geoJSON(props.geojson, { onEachFeature: onEachFeature }).addTo(mapRef.current)
          }

          mapRef.current.on('dblclick', (e: any) => {
            const { lat, lng } = e.latlng;
            // Place a marker where the user clicked
            let marker = L.marker([lat, lng]);
            marker.bindPopup("You clicked here!").openPopup();
            marker.on('click', handleOnMarkerClick)
            layerGroup.addLayer(marker)
          });

          mapRef.current.on('click', handleOnMapClick)
          mapRef.current.on('click', handleOnClick)
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
  }, []);

  return (
    <>
      <div id="map" className="map-container" />
      <div>Tool:{props.tool}</div>
    </>
  )
};

export default LeafletMap;