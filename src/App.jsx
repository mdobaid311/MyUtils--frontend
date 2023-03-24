import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import ImageToText from "./Components/Image-to-Text/ImageToText";
import Notes from "./Components/Notes/Notes";
import PDFToWord from "./Components/PDF-to-Word/PDFToWord";
import WordToPDF from "./Components/Word-to-PDF/WordToPDF";
import ChatGPT from "./Components/ChatGPT/ChatGPT";
import TodoList from "./Components/TodoList/TodoList";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route path="*" element={<Home />}>
        <Route path="todo-list" element={<TodoList />} />
        <Route path="codex" element={<ChatGPT />} />
        <Route path="notes" element={<Notes />} />
        <Route path="image-to-text" element={<ImageToText />} />
        <Route path="pdf-to-word" element={<PDFToWord />} />
        <Route path="word-to-pdf" element={<WordToPDF />} />
      </Route>
    </Routes>
  );
}

export default App;
