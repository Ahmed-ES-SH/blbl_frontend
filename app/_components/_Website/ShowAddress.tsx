"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// إنشاء أيقونة مخصصة للمؤشر
const customIcon = L.divIcon({
  html: `<div style="display: flex; justify-content: center; align-items: center; width: 32px; height: 32px;">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.866 12 22 12 22C12 22 18 11.866 18 8C18 4.68629 15.3137 2 12 2ZM12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11Z" fill="black"/>
           </svg>
         </div>`,
  className: "custom-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// دالة للحصول على العنوان من الإحداثيات
const getAddressFromLatLng = async (lat: number, lng: number) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=ar`
    );
    return response.data.display_name;
  } catch (error) {
    console.error("Error fetching address:", error);
    return "موقع غير معروف";
  }
};

// المكون الرئيسي لعرض الخريطة
export default function Showaddress({ setLocation, initialLocation }: any) {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>(
    initialLocation
      ? [initialLocation.latitude, initialLocation.longitude]
      : [24.7136, 46.6753] // Default to Riyadh if no initial location
  );

  useEffect(() => {
    if (initialLocation) {
      setMarkerPosition([initialLocation.latitude, initialLocation.longitude]);
    }
  }, [initialLocation]);

  // التعامل مع تحديث الموقع
  const handleLocation = async (lat: number, lng: number) => {
    const address = await getAddressFromLatLng(lat, lng);
    setLocation({ address: address, latitude: lat, longitude: lng });
    setMarkerPosition([lat, lng]);
  };

  // المكون الفرعي للتعامل مع أحداث الخريطة
  const MapView = () => {
    useMapEvents({
      locationfound(e) {
        const { lat, lng } = e.latlng;
        handleLocation(lat, lng);
      },
      click(e) {
        const { lat, lng } = e.latlng;
        handleLocation(lat, lng);
      },
    });

    return (
      <Marker position={markerPosition} icon={customIcon}>
        <Popup>{markerPosition ? "موقعك الحالي." : "حدد موقعك."}</Popup>
      </Marker>
    );
  };

  return (
    <div style={{ padding: "10px" }}>
      <MapContainer
        center={markerPosition}
        zoom={13}
        style={{
          height: "60vh",
          width: "100%",
          margin: "20px auto 0",
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapView />
      </MapContainer>
    </div>
  );
}
