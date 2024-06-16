import React, { useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

interface LocationPickerProps {
  setLocation: (location: { lat: number; lng: number }) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  setLocation,
  searchTerm,
  setSearchTerm,
}) => {
  const defaultPosition: LatLngExpression = [51.505, -0.09];
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Create custom icon
  const customIcon = new L.Icon({
    iconUrl: '/assets/marker-icon.png',
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  const LocationMarker = () => {
    useMapEvents({
      click() {
        if (mapRef.current) {
          mapRef.current.locate();
        }
      },
      locationfound(e) {
        setPosition(e.latlng);
        setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
        if (mapRef.current) {
          mapRef.current.flyTo(e.latlng, mapRef.current.getZoom());
        }
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={customIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  const findUserLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const newPosition: LatLngExpression = [latitude, longitude];
        setPosition(newPosition);
        setLocation({ lat: latitude, lng: longitude });
        if (mapRef.current) {
          mapRef.current.flyTo(newPosition, mapRef.current.getZoom());
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleMapCreated = (mapInstance: L.Map) => {
    mapRef.current = mapInstance;
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on('markgeocode', function (e: any) {
        const bbox = e.geocode.bbox;
        const poly = L.polygon([
          bbox.getSouthEast(),
          bbox.getNorthEast(),
          bbox.getNorthWest(),
          bbox.getSouthWest(),
        ]);
        mapInstance.fitBounds(poly.getBounds());
        setPosition(e.geocode.center);
        setLocation({ lat: e.geocode.center.lat, lng: e.geocode.center.lng });
      })
      .addTo(mapInstance);
  };

  return (
    <div>
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        whenReady={ (target:any)  => handleMapCreated(target)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>

      <button
        onClick={findUserLocation}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Find My Location
      </button>
      <div className="mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2"
          placeholder="Search for location..."
        />
      </div>
    </div>
  );
};

export default LocationPicker;
