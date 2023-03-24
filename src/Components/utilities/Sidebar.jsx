import React from "react";

import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/UserSlice";
import { tabs } from "../../constants/tabs";

const Sidebar = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="w-[15%]  sm:w-[20%] h-full bg-[#0064FE] flex flex-col items-center justify-between sm:p-5 p-2 text-white">
      <div className="w-full flex flex-col items-center">
        <div className="w-full  flex items-center bg-[#1973FE]  m-5 rounded-md flex-col p-2">
          <img
            src="https://mohammedobaid.vercel.app/static/media/profile.752b27221834fd107014.webp"
            alt=""
            className="w-[64px] bg-[#0064FE]   rounded-md sm:m-2  "
          />
          <span className="hidden sm:block lg:block md:hidden text-center ">
            Mohammed Obaid
          </span>
        </div>
        <div className="w-full flex flex-col items-center">
          {tabs.map((tab, i) => {
            const { Icon, label } = tab;
            return (
              <Link
                key={i}
                to={tab.link}
                className="w-full flex items-center bg-[#1973FE]  my-2 rounded-md p-2 hover:brightness-110"
              >
                <Icon className="text-[30px] sm:mr-2 " color="" />
                <span className="hidden sm:block">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div
        className="w-full flex items-center bg-[#1973FE] my-5 rounded-md p-2 cursor-pointer hover:brightness-110"
        onClick={logoutHandler}
      >
        <button>
          <BiLogOut className="text-[30px] sm:mr-2 " color="" />
        </button>
        <span className="hidden sm:block lg:block md:block text-center">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
