import React, { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Button from "../utilities/Button";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";

const Notes = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [edit, setEdit] = useState(false);
  const [updatingNoteId, setUpdatingNoteId] = useState("");

  const getAllNotes = async () => {
    const res = await axios.get(
      "https://my-utils-backend.onrender.com/api/v1/notes"
    );
    setNotes(await res.data);
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const addNoteHandler = async () => {
    const res = await axios.post(
      "https://my-utils-backend.onrender.com/api/v1/notes",
      {
        title: title,
        note: text,
      }
    );
    getAllNotes();
    setOpen(false);
    setTitle("");
    setText("");
  };

  const deleteNoteHandler = async (noteId) => {
    const res = await axios.delete(
      `https://my-utils-backend.onrender.com/api/v1/notes/${noteId}`
    );
    getAllNotes();
  };

  const updateNote = async (noteId) => {
    const res = await axios.patch(
      `https://my-utils-backend.onrender.com/api/v1/notes/${noteId}`,
      { title: title, note: text }
    );
    setEdit(false);
    setOpen(false);
    setTitle("");
    setText("");
    getAllNotes();
  };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-scroll overflow-x-hidden">
      <h1 className="text-[32px] font-semibold uppercase mb-10  ">Notes</h1>
      <div className="w-full flex items-center rounded-md ">
        <Button label="Create" onClick={onOpenModal} />
      </div>
      <Modal
        open={open}
        onClose={onCloseModal}
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
        showCloseIcon={false}
      >
        <div className="flex flex-col">
          <div className="w-full ">
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
                label={edit ? "Update" : "Save"}
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
              className="w-full flex justify-between items-center p-2 bg-white rounded-md mb-2"
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
