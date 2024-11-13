import axios from "axios";
import { GetDeviceList, GetDeviceData } from "../../helpers/helpers";
import { ListDeviceDataResponse, DeviceData } from "@/types/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API Helpers", () => {
  describe("GetDeviceList", () => {
    it("should fetch the device list", async () => {
      const mockResponse: ListDeviceDataResponse = {
        results: [
          {
            id: 1,
            name: "Device 1",
            model: {
              name: "Model 1",
              family: "Family 1",
              product: "Product 1",
            },
            lastReportTime: "2022-01-01T00:00:00Z",
            nextReportTime: "2022-01-01T00:00:00Z",
          },
          {
            id: 2,
            name: "Device 2",
            model: {
              name: "Model 2",
              family: "Family 2",
              product: "Product 2",
            },
            lastReportTime: "2022-01-01T00:00:00Z",
            nextReportTime: "2022-01-01T00:00:00Z",
          },
        ],
      };

      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const result = await GetDeviceList();
      expect(result).toEqual(mockResponse.results);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://pzv500llz9.execute-api.eu-west-2.amazonaws.com/production/listDevices"
      );
    });
  });

  describe("GetDeviceData", () => {
    it("should fetch device data by ID", async () => {
      const mockDeviceData: DeviceData = {
        id: 1,
        name: "Device 1",
        model: {
          name: "Model 1",
          family: "Family 1",
          product: "Product 1",
        },
        lastReportTime: "2022-01-01T00:00:00Z",
        nextReportTime: "2022-01-01T00:00:00Z",
        labels: [
          {
            id: 1,
            name: "Label 1",
          },
        ],
        owner: {
          id: 1,
          name: "Owner 1",
        },
        lastKnownLocation: {
          summary: "Location 1",
          global: {
            lat: 1,
            lon: 1,
            cep: 1,
          },
          zones: ["Zone 1"],
        },
        firmware: {
          current: "1",
          pending: "1",
        },
        statusIndicators: {
          battery: "1",
          moving: true,
          gpsFailure: true,
          lowSignal: true,
          charging: true,
          externalPower: true,
          flightMode: true,
          pendingSettings: true,
        },
      };

      mockedAxios.get.mockResolvedValue({ data: mockDeviceData });

      const result = await GetDeviceData({ queryKey: ["device", "1"] });
      expect(result).toEqual(mockDeviceData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://pzv500llz9.execute-api.eu-west-2.amazonaws.com/production/device/1"
      );
    });
  });
});
