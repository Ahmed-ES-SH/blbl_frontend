import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

// تغيير الأيقونات الافتراضية
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Routing = ({ location1, location2 }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return; // تأكد من أن الخريطة موجودة

    // إضافة خدمة التوجيه لرسم الطريق بين النقطتين
    const control = L.Routing.control({
      waypoints: [
        L.latLng(location1.latitude, location1.longitude),
        L.latLng(location2.latitude, location2.longitude),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }],
      },
      createMarker: () => null, // إخفاء العلامات بين النقطتين
      showAlternatives: false, // إخفاء البدائل
      routeWhileDragging: false, // عدم التحديث أثناء السحب
      draggableWaypoints: false,
      addWaypoints: false,
    }).addTo(map);

    // إخفاء واجهة المستخدم الخاصة بالتفاصيل
    control.on("routesfound", function (e) {
      const routes = e.routes;
      routes.forEach((route) => {
        route.instructions = []; // إفراغ التعليمات لمنع ظهور القائمة
      });
    });

    return () => {
      map.removeControl(control);
    };
  }, [map, location1, location2]);

  return null;
};

const MapWithRouting = ({ location1, location2 }) => {
  return (
    <MapContainer
      center={[30.5, 31.2]}
      zoom={7}
      style={{ height: "70vh", width: "95%" }}
      className=""
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[location1.latitude, location1.longitude]} />
      <Marker position={[location2.latitude, location2.longitude]} />
      <Routing location1={location1} location2={location2} />
    </MapContainer>
  );
};

export default MapWithRouting;
