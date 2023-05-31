import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../zcomponents/Footer";
import Navbar from "../zcomponents/Navbar";

const GeneralUserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[75vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default GeneralUserLayout;
