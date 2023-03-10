import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsCheck2Square } from "react-icons/bs";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  const getAllTodos = async () => {
    const res = await fetch("https://my-utils-backend.onrender.com/api/v1/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const updateTodo = async (_id) => {
    const res = await axios.patch("https://my-utils-backend.onrender.com/api/v1/todos", {
      _id,
    });

    getAllTodos();
  };

  const createTodo = async () => {
    const res = await axios.post("https://my-utils-backend.onrender.com/api/v1/todos", {
      label: inputRef.current.value,
    });
    inputRef.current.value = "";
    setTodos((prev) => [...prev, res.data]);
  };

  const deleteTodo = async (todoId) => {
    const res = await axios.delete(
      `https://my-utils-backend.onrender.com/api/v1/todos/${todoId}`
    );
    getAllTodos();
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
        <button onClick={createTodo}>
          <IoMdAdd className="text-[30px] font-light p-1" />
        </button>
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
