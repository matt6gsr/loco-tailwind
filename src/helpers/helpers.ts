import {
  DeviceData,
  ListDeviceData,
  ListDeviceDataResponse,
} from "@/types/types";
import axios from "axios";

const baseUrl =
  "https://pzv500llz9.execute-api.eu-west-2.amazonaws.com/production/";

export function GetDeviceList() {
  return axios
    .get<ListDeviceDataResponse>(`${baseUrl}listDevices`)
    .then((res) => res.data)
    .then((data) => {
      return data.results as ListDeviceData[];
    });
}

export const GetDeviceData = async ({ queryKey }: { queryKey: string[] }) => {
  const deviceId = queryKey[1];
  return axios
    .get<DeviceData>(`${baseUrl}device/${deviceId}`)
    .then((res) => res.data)
    .then((data) => {
      return data as DeviceData;
    });
};
