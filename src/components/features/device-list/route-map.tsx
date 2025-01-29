"use client";

import { Icon } from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useFetchDevicesGeolocations } from "@/api/hooks/devices/useFetchDevicesGeolocations";

const RouteMap = ({ deviceUuid }: { deviceUuid: string | null }) => {
  const { data } = useFetchDevicesGeolocations(deviceUuid);

  return (
    <MapContainer
      center={[52.160455, 19.533691]}
      zoom={6}
      scrollWheelZoom={true}
      className="w-full h-[calc(100vh-56px-2*16px)] rounded-lg border z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data && data.Geolocations && (
        <>
          {data.Geolocations[0] && (
            <Marker
              position={[
                data.Geolocations[0].latitude,
                data.Geolocations[0].longitude,
              ]}
              icon={
                new Icon({ iconUrl: "/marker-icon.png", iconSize: [30, 30] })
              }
            ></Marker>
          )}
          <Polyline
            positions={data.Geolocations.map(({ latitude, longitude }) => [
              latitude,
              longitude,
            ])}
          />
        </>
      )}
    </MapContainer>
  );
};

export default RouteMap;
