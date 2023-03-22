import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/UserSlice";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://my-utils-backend.onrender.com/api/v1/auth/login",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      console.log(res.data);
      dispatch(loginUser(res.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="hidden w-1/2 h-full bg-[#0064FE] sm:flex justify-center flex-col items-center">
        <div>
          {["the", "modern", "backpack"].map((el) => {
            return (
              <h1
                key={el}
                className=" uppercase italic text-[72px] sm:text-[60px] font-extrabold
      text-white "
              >
                {el}
              </h1>
            );
          })}
        </div>
      </div>
      <div className="w-full sm:w-1/2  h-full  flex justify-center items-center flex-col">
        <h1 className="text-[#0064FE] font-bold text-[28px] sm:hidden mb-6">
          THE MODERN BACKPACK
        </h1>
        <form
          className=" flex flex-col border-[3px] border-[#0064FE] p-10 rounded-md"
          onSubmit={loginHandler}
        >
          <h1 className="text-[32px] uppercase text-center mb-4 ">Login</h1>
          <input
            type="email"
            placeholder="Email"
            className="bg-slate-300 px-5 py-2 placeholder:text-black rounded-md my-2 outline-none"
            onChange={() => setError("")}
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-slate-300 px-5 py-2 placeholder:text-black rounded-md my-2 outline-none"
            onChange={() => setError("")}
            ref={passwordRef}
          />
          <button
            className="bg-[#0064FE] px-5 py-2 text-white rounded-md my-2 outline-none flex justify-center"
            onClick={loginHandler}
          >
            {loading ? (
              <ThreeDots color="white" height={20} width={20} />
            ) : (
              "Login"
            )}
          </button>
          <span className="text-sm text-center text-red-500">
            {error.message}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
