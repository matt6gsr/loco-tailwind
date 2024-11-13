"use client";

import { GetDeviceDataParams, Label } from "../../types/types";
import { GetDeviceData } from "../../helpers/helpers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { differenceInCalendarMonths, format } from "date-fns";
import Loading from "../components/Loading";
import ErrorMessage from "../components/Error";

export default function Device() {
  const params = useParams();
  const id = params.deviceId as GetDeviceDataParams["deviceId"];

  const {
    data: deviceData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["device", id],
    queryFn: GetDeviceData,
  });

  const lastReportMonthsAgo = differenceInCalendarMonths(
    new Date(),
    new Date(deviceData?.lastReportTime ?? new Date())
  );
  const nextReportMonthsAgo = differenceInCalendarMonths(
    new Date(),
    new Date(deviceData?.nextReportTime ?? new Date())
  );

  if (isLoading) return <Loading />;
  if (isError) {
    const errorMessage = error.message;
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <>
      <div className="breadcrumb bg-gray-100 w-full p-4 flex justify-between">
        <a href="http://localhost:3000" className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <span>Back To Device List</span>
        </a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </div>
      <nav className="px-4 border-b mt-4">
        <ul className="flex">
          <li>
            <a
              className="block py-4 px-8 transition-all border-b-2 border-gray-700 hover:border-gray-700"
              href="#"
            >
              Overview
            </a>
          </li>
          <li>
            <a
              className="block py-4 px-8 transition-all border-b-2 border-transparent hover:border-gray-700"
              href="#"
            >
              History
            </a>
          </li>
          <li>
            <a
              className="block py-4 px-8 transition-all border-b-2 border-transparent hover:border-gray-700"
              href="#"
            >
              Reports & Audit
            </a>
          </li>
          <li>
            <a
              className="block py-4 px-8 transition-all border-b-2 border-transparent hover:border-gray-700"
              href="#"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              className="block py-4 px-8 transition-all border-b-2 border-transparent hover:border-gray-700"
              href="#"
            >
              Technical Information
            </a>
          </li>
          <li>
            <a
              className="block py-4 px-8 transition-all border-b-2 border-transparent hover:border-gray-700"
              href="#"
            >
              Subscriptions
            </a>
          </li>
        </ul>
      </nav>
      <main className="flex h-[calc(100vh-8rem)]">
        <aside className="w-1/5 p-4 flex flex-col justify-between">
          <section>
            <h3 className="text-2xl">Summary</h3>
            <div className="mt-4">
              <small className="text-gray-400">Product</small>
              <p>{deviceData?.model.product ?? "N/A"}</p>
            </div>
            <div className="mt-4">
              <small className="text-gray-400">Device ID</small>
              <p>{deviceData?.id ?? "N/A"}</p>
            </div>
            <div className="mt-4">
              <small className="text-gray-400">Device Name</small>
              <p>{deviceData?.name ?? "N/A"}</p>
            </div>
            <div className="mt-4">
              <small className="text-gray-400">Model Name</small>
              <p>{deviceData?.model.name ?? "N/A"}</p>
            </div>
            <div className="mt-4">
              <small className="text-gray-400">Model Family</small>
              <p>{deviceData?.model.family ?? "N/A"}</p>
            </div>

            <h3 className="mt-8 text-2xl">SIM Information</h3>
            <div className="mt-4">
              <small className="text-gray-400">Product</small>
              <p>{deviceData?.model.product ?? "N/A"}</p>
            </div>
            <div className="mt-4">
              <small className="text-gray-400">Device ID</small>
              <p>{deviceData?.id ?? "N/A"}</p>
            </div>
            <div className="mt-4">
              <small className="text-gray-400">Device Name</small>
              <p>{deviceData?.name ?? "N/A"}</p>
            </div>
            <div className="mt-4">
              <small className="text-gray-400">Model Name</small>
              <p>{deviceData?.model.name ?? "N/A"}</p>
            </div>
            <div className="mt-4">
              <small className="text-gray-400">Model Family</small>
              <p>{deviceData?.model.family ?? "N/A"}</p>
            </div>
          </section>
        </aside>
        <section className="w-4/5 p-4">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl">Status</h3>

              <div className="mt-4">
                <small className="text-gray-400">Battery Level</small>
                <p>{deviceData?.statusIndicators.battery ?? "Unknown"}</p>
              </div>

              <div className="mt-4">
                <small className="text-gray-400">Battery Charging</small>
                <p>
                  {deviceData?.statusIndicators.charging
                    ? "Yes"
                    : !deviceData?.statusIndicators.charging
                    ? "No"
                    : "Unknown"}
                </p>
              </div>

              <div className="mt-4">
                <small className="text-gray-400">
                  Currently In Flight Mode
                </small>
                <p>
                  {deviceData?.statusIndicators.flightMode
                    ? "Yes"
                    : !deviceData?.statusIndicators.flightMode
                    ? "No"
                    : "Unknown"}
                </p>
              </div>

              <div className="mt-4">
                <small className="text-gray-400">GPS Status</small>
                {!deviceData?.statusIndicators?.gpsFailure ? (
                  <p className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
                      />
                    </svg>
                    <span>GPS OK</span>
                  </p>
                ) : (
                  <p className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-red-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
                      />
                    </svg>
                    <span>GPS FAIL</span>
                  </p>
                )}
              </div>

              <div className="mt-4">
                <small className="text-gray-400">Last Report</small>
                <p>
                  {lastReportMonthsAgo
                    ? `${lastReportMonthsAgo} months ago`
                    : "Unknown"}
                </p>
                <small>
                  {format(
                    new Date(deviceData?.lastReportTime ?? new Date()),
                    "PPPppp"
                  ) ?? "Unknown"}
                </small>
                <a
                  className="block mt-2 font-bold text-xs text-violet-500"
                  href="#"
                >
                  View Report
                </a>
              </div>
              <div className="mt-4">
                <small className="text-gray-400">Next Report Due</small>
                <p>
                  {nextReportMonthsAgo
                    ? `${nextReportMonthsAgo} months ago`
                    : "Unknown"}
                </p>
                <small>
                  {format(
                    new Date(deviceData?.nextReportTime ?? new Date()),
                    "PPPppp"
                  ) ?? "Unknown"}
                </small>
              </div>

              <div className="mt-4">
                <small className="text-gray-400">Firmware</small>
                <p>{deviceData?.firmware?.current ?? "Unknown"}</p>
              </div>

              <h3 className="mt-8 text-2xl">Labels</h3>
              <div className="mt-4">
                {!!deviceData?.labels.length ? (
                  deviceData.labels.map((label: Label) => (
                    <span
                      key={label.id}
                      className="inline-block bg-yellow-100 px-4 py-2 rounded-md text-xs font-bold text-yellow-700 "
                    >
                      {label.name}
                    </span>
                  ))
                ) : (
                  <span>No Labels</span>
                )}
              </div>
            </div>

            <div className="col-span-2 ">
              <h3 className="text-2xl">Postion</h3>
              <div className="mt-4">
                <iframe
                  width="100%"
                  height="500px"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    (deviceData?.lastKnownLocation.global.lon ?? 0) - 0.5
                  }%2C${
                    (deviceData?.lastKnownLocation?.global?.lat ?? 0) - 0.5
                  }%2C${
                    (deviceData?.lastKnownLocation.global.lon ?? 0) + 0.5
                  }%2C${(deviceData?.lastKnownLocation?.global?.lat ?? 0) + 0.5}
                  &marker=${deviceData?.lastKnownLocation.global.lat},${
                    deviceData?.lastKnownLocation.global.lon
                  }
                    &amp;layer=mapnik`}
                  className="rounded-xl overflow-clip"
                ></iframe>
                <br />
                <small>
                  <a
                    href={`https://www.openstreetmap.org/#map=6/${deviceData?.lastKnownLocation.global.lon}/${deviceData?.lastKnownLocation.global.lat}`}
                  >
                    View Larger Map
                  </a>
                </small>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mt-4">
                    <small className="text-gray-400">Summary</small>
                    <p>{deviceData?.lastKnownLocation.summary ?? "Unknown"}</p>
                  </div>
                  <div className="mt-4">
                    <small className="text-gray-400">Time</small>
                    <p>
                      {lastReportMonthsAgo
                        ? `${lastReportMonthsAgo} months ago`
                        : "Unknown"}
                    </p>
                    <small>
                      {" "}
                      {format(
                        new Date(deviceData?.lastReportTime ?? new Date()),
                        "PPPppp"
                      ) ?? "Unknown"}
                    </small>
                  </div>

                  <div className="mt-4">
                    <small className="text-gray-400">Long / Lat</small>

                    <a
                      className="block mt-2 font-bold text-xs text-violet-500"
                      href="#"
                    >
                      {deviceData?.lastKnownLocation.global.lon ?? "Unknown"},{" "}
                      {deviceData?.lastKnownLocation.global.lat ?? "Unknown"}
                    </a>
                  </div>
                </div>
                <div>
                  <div className="mt-4">
                    <small className="text-gray-400 block">Position Type</small>

                    <span className="inline-block p-1 border">GPS </span>
                    <span>~20m Accuracy</span>
                  </div>

                  <div className="mt-4">
                    <small className="text-gray-400">Zones</small>

                    <a
                      className="block mt-2 font-bold text-xs text-violet-500"
                      href="#"
                    >
                      {deviceData?.lastKnownLocation.global.lon ?? "Unknown"},{" "}
                      {deviceData?.lastKnownLocation.global.lat ?? "Unknown"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl">Sensor Data</h3>

              <div className="mt-4">
                <small className="text-gray-400">Temperature</small>
                <p>normal</p>
              </div>

              <div className="mt-4">
                <small className="text-gray-400">Status Messages</small>
                <p className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>

                  <span>Sunny</span>
                </p>
              </div>

              <div className="mt-4">
                <small className="text-gray-400">Light Level</small>
                <p className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>

                  <span>1</span>
                </p>
              </div>

              <div className="mt-4">
                <small className="text-gray-400">Humidity</small>
                <p className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
                    />
                  </svg>

                  <span>50%</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
