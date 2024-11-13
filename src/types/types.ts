export interface ListDeviceData {
  id: number;
  name: string;
  model: {
    name: string;
    family: string;
    product: string;
  };
  lastReportTime: string;
  nextReportTime: string;
}

export interface ListDeviceDataResponse {
  results: ListDeviceData[];
}

export interface Label {
  id: number;
  name: string;
}
export interface DeviceData extends ListDeviceData {
  labels: Label[];
  owner: {
    id: number;
    name: string;
  };
  lastKnownLocation: {
    summary: string;
    global: {
      lat: number;
      lon: number;
      cep: number;
    };
    zones: string[];
  };
  firmware: {
    current: string;
    pending: string;
  };
  statusIndicators: {
    battery: string;
    moving: boolean;
    gpsFailure: boolean;
    lowSignal: boolean;
    charging: boolean;
    externalPower: boolean;
    flightMode: boolean;
    pendingSettings: boolean;
  };
}

export interface DeviceDataResponse {
  results: DeviceData[];
}

export interface GetDeviceDataParams {
  deviceId: string;
}

export interface DeviceIdPageProps {
  params: GetDeviceDataParams;
}

export interface ErrorMessageProps {
  message: string;
}
