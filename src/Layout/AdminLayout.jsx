import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
