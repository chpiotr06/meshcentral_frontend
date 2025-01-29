"use client";

import { useFetchDevicesWithGeolocation } from "@/api/hooks/devices/useFetchDevicesWithGeolocation";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const AllDevices = () => {
  const { data } = useFetchDevicesWithGeolocation();
  return (
    <MapContainer
      center={[52.160455, 19.533691]}
      zoom={6}
      scrollWheelZoom={true}
      className="w-full h-[calc(100vh-56px-2*16px)] rounded-3xl z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data &&
        data.map((device) => {
          const geolocations = device.Geolocations[0];
          return (
            <Marker
              position={[geolocations.latitude, geolocations.longitude]}
              icon={
                new Icon({ iconUrl: "/marker-icon.png", iconSize: [30, 30] })
              }
              key={device.uuid}
            >
              <Popup>{device.name}</Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default AllDevices;
