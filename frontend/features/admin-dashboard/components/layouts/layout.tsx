import React from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router";
import Header from "../Header";

const layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 ">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default layout;
