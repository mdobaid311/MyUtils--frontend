import React from "react";
import { Outlet  } from "react-router-dom";
import Sidebar from "../Components/utilities/Sidebar";


const Home = () => {
  return (
    <div className="w-screen h-screen bg-slate-200 flex">
      <Sidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
