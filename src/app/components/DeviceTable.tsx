"use client";

import { GetDeviceList } from "@/helpers/helpers";
import { ListDeviceData } from "@/types/types";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import ErrorMessage from "./Error";

export default function DeviceTable() {
  const {
    data: devices,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: GetDeviceList,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    const errorMessage = error.message;
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <table className="min-w-full text-start text-sm font-light text-surface">
      <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
        <tr className="text-left bg-gray-100 border rounded-md">
          <th className="p-2 border rounded-tl-md">
            <input className="border-2 opacity-50" type="checkbox" />
          </th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Device ID / Name</th>
          <th className="p-2 border">Last Report</th>
          <th className="p-2 border">Labels</th>
          <th className="p-2 border">Device Model</th>
        </tr>
      </thead>
      <tbody>
        {devices?.map((device: ListDeviceData) => (
          <tr
            key={device?.id}
            className="border-b border-neutral-200 dark:border-white/10"
          >
            <td className="p-2">
              <input type="checkbox" className="opacity-80" />
            </td>
            <td className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 -rotate-90 text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5h6.75V15H4.5v-4.5ZM3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"
                />
              </svg>
            </td>
            <td className="p-2">
              <Link href={`http://localhost:3000/${device?.id}`}>
                <p>{device?.name ?? "N/A"}</p>
                <small>{device?.id ?? "N/A"}</small>
              </Link>
            </td>
            <td className="p-2">{device?.lastReportTime ?? "N/A"}</td>
            <td className="p-2">
              <span className="inline-block bg-yellow-100 px-2 py-1 rounded-full text-[10px] font-bold text-yellow-700 mr-1">
                Label
              </span>
              <span className="inline-block bg-yellow-100 px-2 py-1 rounded-full text-[10px] font-bold text-yellow-700">
                Label
              </span>
            </td>
            <td className="p-2">{device?.model?.name ?? "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
