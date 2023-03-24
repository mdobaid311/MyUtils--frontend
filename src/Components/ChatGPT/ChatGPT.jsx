import axios from "axios";
import React, { useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import Loading from "../utilities/Loading";
import Button from "../utilities/Button";

const ChatGPT = () => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef();

  const resultHandler = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/codex`,
        {
          prompt: inputRef.current.value,
        }
      );
      setLoading(false);
      setSaved(false);
      setError(false);
      setAnswer(await res.data.chatGPTResponse.trim());
    } catch (error) {
      setLoading(false);
      setSaved(false);
      setError(true);
    }
  };

  const addNoteHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/notes`,
        {
          title: inputRef.current.value,
          note: answer.trim(),
        }
      );
      setSaved(true);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-scroll overflow-x-hidden scrollbar-hide">
      <h1 className="text-[32px] font-semibold uppercase mb-10  ">Ask Codex</h1>
      <div className="w-full flex items-center bg-white rounded-md p-2">
        <input
          type="text"
          className="w-full px-5 rounded-md outline-none"
          placeholder="Ask Codex..."
          ref={inputRef}
        />
        <button onClick={resultHandler}>
          <MdSend className="text-[30px] font-light p-1" />
        </button>
      </div>
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
      {answer && !loading && (
        <>
          <div className="w-full h-full mt-10 bg-white p-5 flex justify-center items-center overflow-scroll overflow-x-hidden scrollbar-hide">
            <div className="w-full h-full whitespace-pre-wrap ">
              <p className="">{answer}</p>
            </div>
          </div>
          <div className="w-full my-2 flex justify-end items-center">
            <Button
              label={saved ? "Saved" : "Save"}
              Icon={AiOutlineSave}
              onClick={() => {
                if (!saved) {
                  addNoteHandler();
                }
              }}
            />
          </div>
        </>
      )}
      <span className="text-center text-red-500">
        {error && " Something went wrong. Please try again."}
      </span>
    </div>
  );
};

export default ChatGPT;
