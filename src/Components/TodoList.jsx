import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsCheck2Square } from "react-icons/bs";
import axios from "axios";
import Button from "./utilities/Button";
import { ThreeDots } from "react-loader-spinner";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const getAllTodos = async () => {
    setLoading(true);
    const res = await fetch(
      "https://my-utils-backend.onrender.com/api/v1/todos"
    );
    const data = await res.json();
    setLoading(false);
    setTodos(data);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const updateTodo = async (_id) => {
    setLoading(true);
    const res = await axios.patch(
      "https://my-utils-backend.onrender.com/api/v1/todos",
      {
        _id,
      }
    );
    setLoading(false);
    getAllTodos();
  };

  const createTodo = async () => {
    setLoading(true);
    const res = await axios.post(
      "https://my-utils-backend.onrender.com/api/v1/todos",
      {
        label: inputRef.current.value,
      }
    );
    inputRef.current.value = "";
    setTodos((prev) => [...prev, res.data]);
    setLoading(false);
  };

  const deleteTodo = async (todoId) => {
    setLoading(true);
    const res = await axios.delete(
      `https://my-utils-backend.onrender.com/api/v1/todos/${todoId}`
    );
    getAllTodos();
    setLoading(false);
  };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-scroll overflow-x-hidden">
      <h1 className="text-[32px] font-semibold uppercase mb-10  ">Todo List</h1>
      <div className="w-full flex items-center bg-white rounded-md p-2">
        <input
          type="text"
          className="w-full px-5 rounded-md outline-none"
          placeholder="Add Todo..."
          ref={inputRef}
        />
        <Button
          label={
            loading ? (
              <ThreeDots color="white" height={20} width={20} />
            ) : (
              <IoMdAdd className="text-[30px] font-light" />
            )
          }
          onClick={createTodo}
        ></Button>
      </div>

      <div className="mt-5">
        {todos.map((todo, i) => {
          return (
            <div
              key={i}
              className="w-full flex justify-between items-center p-2 bg-white rounded-md mb-2"
            >
              <div>
                <span
                  className={`mr-5 ${
                    todo.completed ? "bg-green-300" : "bg-slate-300"
                  } p-1 rounded-md`}
                >
                  {i + 1}
                </span>
                <span className="">{todo.label}</span>
              </div>
              <div>
                <button onClick={() => updateTodo(todo._id, todo.completed)}>
                  <BsCheck2Square className="text-[30px] font-light p-1 mr-2 text-green-500" />
                </button>
                <button onClick={() => deleteTodo(todo._id)}>
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

export default TodoList;
