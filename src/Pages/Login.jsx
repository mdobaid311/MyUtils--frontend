import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/UserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://my-utils-backend.onrender.com/api/v1/auth/login", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    console.log(res.data);
    dispatch(loginUser(res.data));
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="hidden sm:block w-1/2 h-full bg-[#0064FE] sm:flex justify-center flex-col items-center">
        <div>
          {["the", "modern", "backpack"].map((el) => {
            return (
              <h1
                key={el}
                className=" uppercase italic text-[72px] font-extrabold
      text-white "
              >
                {el}
              </h1>
            );
          })}
        </div>
      </div>
      <div className="w-full sm:w-1/2  h-full  flex justify-center items-center">
        <form className=" flex flex-col border-[3px] border-[#0064FE] p-10 rounded-md">
          <h1 className="text-[32px] uppercase text-center mb-4 ">Login</h1>
          <input
            type="text"
            placeholder="Email"
            className="bg-slate-300 px-5 py-2 placeholder:text-black rounded-md my-2 outline-none"
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-slate-300 px-5 py-2 placeholder:text-black rounded-md my-2 outline-none"
            ref={passwordRef}
          />
          <button
            className="bg-[#0064FE] px-5 py-2 text-white rounded-md my-2 outline-none"
            onClick={loginHandler}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
