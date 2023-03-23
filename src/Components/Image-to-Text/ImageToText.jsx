import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import Button from "../utilities/Button";
import Loading from "../utilities/Loading";
import axios from "axios";
import { AiOutlineSave } from "react-icons/ai";

const ImageToText = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [saved, setSaved] = useState(false);

  const convertHandler = async () => {
    setLoading(true);
    Tesseract.recognize(image, "eng", { logger: (m) => console.log(m) }).then(
      ({ data: { text } }) => {
        setText(text);
        setSaved(false);
        setLoading(false);
      }
    );
  };

  const addNoteHandler = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/notes`,
      {
        title: text,
        note: text,
      }
    );
    setSaved(true);
  };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-scroll overflow-x-hidden scrollbar-hide">
      <h1 className="text-[32px] font-semibold uppercase mb-10 ">
        Image-to-Text
      </h1>
      <div className="bg-white flex items-center justify-between p-2 rounded-md">
        <input
          type="file"
          name="image"
          className="w-full bg-slate-200 mx-4"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
        />
        <Button label="Convert" onClick={convertHandler} />
      </div>
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
      {text && (
        <>
          <div className="w-full h-full  mt-10 p-5 flex">
            <div
              className="w-1/2 bg-white p-5
            "
            >
              <p>{text}</p>
            </div>
            <div className="w-1/2 flex justify-center items-center p-5 bg-white ml-1">
              <img src={image} className="w-full" />
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
    </div>
  );
};

export default ImageToText;
