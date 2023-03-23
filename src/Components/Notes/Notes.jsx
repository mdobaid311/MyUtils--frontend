import React, { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Button from "../utilities/Button";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const Notes = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [edit, setEdit] = useState(false);
  const [updatingNoteId, setUpdatingNoteId] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllNotes = async () => {
    setLoading(true);
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/notes`);
    setNotes(await res.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const onOpenModal = () => {
    setTitle("");
    setText("");
    setOpen(true);
  };
  const onCloseModal = () => {
    setTitle("");
    setText("");
    setEdit(false);
    setOpen(false);
  };

  const addNoteHandler = async () => {
    setLoading(true);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/notes`,
      {
        title: title,
        note: text,
      }
    );
    getAllNotes();
    setOpen(false);
    setTitle("");
    setText("");
    setLoading(false);
  };

  const deleteNoteHandler = async (noteId) => {
    setLoading(true);

    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/v1/notes/${noteId}`
    );
    getAllNotes();
    setLoading(false);
  };

  const updateNote = async (noteId) => {
    setLoading(true);

    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/v1/notes/${noteId}`,
      { title: title, note: text }
    );
    setEdit(false);
    setOpen(false);
    setTitle("");
    setText("");
    getAllNotes();
    setLoading(false);
  };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-scroll overflow-x-hidden">
      <h1 className="text-[32px] font-semibold uppercase mb-10  ">Notes</h1>
      <div className="w-full flex items-center rounded-md ">
        <Button
          label={
            loading ? (
              <ThreeDots color="white" height={20} width={20} />
            ) : (
              "Create"
            )
          }
          onClick={onOpenModal}
        />
      </div>
      <Modal open={open} onClose={onCloseModal} showCloseIcon={false}>
        <div className="flex flex-col">
          <div className="w-full">
            <input
              type="text"
              className="w-full outline-none border-[1px] border-gray-300 py-2 px-5 mb-2"
              value={title}
              placeholder="Title..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="note"
              cols="30"
              rows="10"
              className="w-full outline-none border-[1px] border-gray-300 p-5"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your note..."
            >
              {text}
            </textarea>
            <div className="w-full flex justify-end mt-2">
              <Button
                label={
                  loading ? (
                    <ThreeDots color="white" height={20} width={20} />
                  ) : (
                    "Create"
                  )
                }
                onClick={() => {
                  if (edit) {
                    updateNote(updatingNoteId);
                  } else {
                    addNoteHandler();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Modal>

      <div className="mt-5">
        {notes.map((note, i) => {
          return (
            <div
              key={i}
              className="hover:brightness-95 cursor-pointer w-full flex justify-between items-center p-2 bg-white rounded-md mb-2"
              onDoubleClick={() => {
                setUpdatingNoteId(note._id);
                setTitle(note.title);
                setText(note.note);
                setEdit(true);
                setOpen(true);
              }}
            >
              <span className={`mr-5 bg-slate-300 p-1 rounded-md`}>
                {i + 1}
              </span>
              <span className="flex-1">{note.title}</span>
              <div className="flex">
                <button
                  onClick={() => {
                    setUpdatingNoteId(note._id);
                    setTitle(note.title);
                    setText(note.note);
                    setEdit(true);
                    setOpen(true);
                  }}
                >
                  <BsFillPencilFill className="text-[30px] font-light p-1 mr-2 text-green-500" />
                </button>
                <button onClick={() => deleteNoteHandler(note._id)}>
                  <RiDeleteBin5Fill className="text-[30px] font-light p-1 text-red-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
