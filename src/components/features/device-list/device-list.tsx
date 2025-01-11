"use client";

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const DeviceList = () => {
  return (
    <MapContainer
      center={[50.062332, 19.937573]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-[calc(100vh-56px-2*16px)] rounded-3xl z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[50.062332, 19.937573]}
        icon={new Icon({ iconUrl: "/marker-icon.png", iconSize: [30, 30] })}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default DeviceList;
