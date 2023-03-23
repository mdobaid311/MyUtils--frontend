import {Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
   return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
