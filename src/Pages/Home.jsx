import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoList from "../Components/TodoList";
import ChatGPT from "../Components/ChatGPT";
import Sidebar from "../Components/utilities/Sidebar";
import ImageToText from "../Components/Image-to-Text/ImageToText";
import Notes from "../Components/Notes/Notes";
import PDFToWord from "../Components/PDF-to-Word/PDFToWord";
import WordToPDF from "../Components/Word-to-PDF/WordToPDF";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-slate-200 flex">
      <Sidebar />
      <div className="w-full">
        <Routes>
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/codex" element={<ChatGPT />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/image-to-text" element={<ImageToText />} />
          <Route path="/pdf-to-word" element={<PDFToWord />} />
          <Route path="/word-to-pdf" element={<WordToPDF />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
