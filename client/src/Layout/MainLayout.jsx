import React from "react";
import { Outlet } from "react-router";
import Header from "../pages/Header";

const MainLayout = () => {
  return (
    <div className="p-4 flex flex-col min-h-screen ">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
