export type AddDeviceDto = {
  name: string;
  mac: string;
  ipv4: string;
  firmwareVersion: string;
};

export type AddDeviceResponse = {
  token: string;
  name: string;
  mac: string;
  ipv4: string;
  id: number;
  firmwareVersion: string;
  uuid: string;
};

export type DeviceInfo = {
  name: string;
  ipv4: string;
  mac: string;
  uuid: string;
  firmwareVersion: string;
  createdAt: string;
};

export type DevicesReponse = Array<DeviceInfo>;

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type DeviceGeolocations = {
  Geolocations: Array<Coordinates>;
};

export type DeviceWithGeolocationResponse = {
  name: string;
  ipv4: string;
  mac: string;
  uuid: string;
  Geolocations: Array<Coordinates>;
};
