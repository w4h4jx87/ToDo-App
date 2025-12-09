import React, { use, useEffect, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import Todo_items from "./Todo_items";

const Todo = () => {
  const [todolist, settodolist] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputvalue = React.useRef();
  const add = () => {
    const inputText = inputvalue.current.value.trim();
    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isCompleted: false,
    };
    settodolist((prev) => [...prev, newTodo]);
    inputvalue.current.value = "";
  };
  const deleteTodo = (id) => {
    settodolist((prevTodo) => {
      return prevTodo.filter((Todo) => Todo.id !== id);
    });
  };
  const Toggle = (id) => {
    settodolist((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    });
  };
  useEffect(() => {
    console.log(todolist);
  }, [todolist]);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);
  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* TItle */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="font-semibold text-3xl ">To-Do List</h1>
      </div>
      {/* Input */}
      <div className="flex mt-7 gap-2">
        <input
          ref={inputvalue}
          className="flex-1 border-2 border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:border-stone-500 transition-all"
          type="text"
          placeholder="Add a new task"
        />
        <button
          onClick={add}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-all"
        >
          Add
        </button>
      </div>
      {/* To-Do List */}
      <div className="flex-1 mt-7 overflow-y-auto">
        {todolist.length === 0 ? (
          <p className="text-center text-stone-400">No tasks added yet.</p>
        ) : (
          todolist.map((item, index) => (
            <Todo_items
              key={index}
              text={item.text}
              id={item.id}
              isCompleted={item.isCompleted}
              deleteTodo={deleteTodo}
              Toggle={Toggle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
