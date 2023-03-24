import { RiTodoLine } from "react-icons/ri";
import { TbNotes } from "react-icons/tb";
import { GoHubot } from "react-icons/go";
import { MdOutlineImageSearch } from "react-icons/md";
import { AiOutlineFilePdf, AiOutlineFileWord } from "react-icons/ai";

export const tabs = [
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
