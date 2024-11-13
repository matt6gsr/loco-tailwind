import Link from "next/link";
import React from "react";
import { ErrorMessageProps } from "@/types/types";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center h-96 flex-col">
      <h1 className="text-2xl font-bold text-center">Error:</h1>
      <h2 className="text-2xl text-center">{message}</h2>
      <Link href="/" className="mt-8">
        Back to Devices
      </Link>
    </div>
  );
}
