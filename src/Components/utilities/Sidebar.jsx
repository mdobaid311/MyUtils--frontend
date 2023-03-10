import React from "react";
import { RiTodoLine } from "react-icons/ri";
import { TbNotes } from "react-icons/tb";
import { GoHubot } from "react-icons/go";
import { MdOutlineImageSearch } from "react-icons/md";
import { AiOutlineFilePdf, AiOutlineFileWord } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const tabs = [
    { Icon: RiTodoLine, label: "Todo List", link: "/todo-list" },
    { Icon: TbNotes, label: "Notes", link: "/notes" },
    { Icon: GoHubot, label: "ChatGPT", link: "/codex" },
    {
      Icon: MdOutlineImageSearch,
      label: "Image-to-Text",
      link: "/image-to-text",
    },
    { Icon: AiOutlineFileWord, label: "PDF-to-Word", link: "/pdf-to-word" },
    { Icon: AiOutlineFilePdf, label: "Word-to-PDF", link: "/word-to-pdf" },
  ];

  return (
    <div className="w-[15%]  sm:w-[20%] h-full bg-[#0064FE] flex flex-col items-center sm:p-5 p-2 text-white">
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
              className="w-full flex items-center bg-[#1973FE]  my-2 rounded-md p-2"
            >
              <Icon className="text-[30px] mr-2 " color="" />
              <span className="hidden sm:block">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
