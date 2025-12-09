import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import Delete from "../assets/delete.png";

const Todo_items = ({ text, id, isCompleted, deleteTodo, Toggle }) => {
  return (
    <div className="flex items-center justify-between border-b-2 border-stone-200 py-3 px-2">
      <div
        onClick={() => {
          Toggle(id);
        }}
        className="flex items-center flex-1 cursor-pointer"
      >
        <img className="w-7" src={isCompleted ? tick : not_tick} alt="" />
        <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isCompleted ? "line-through" : ""}`}>{text}</p>
      </div>
      <img
        onClick={() => {
          deleteTodo(id);
        }}
        className="w-3.5 cursor-pointer"
        src={Delete}
        alt=""
      />
    </div>
  );
};

export default Todo_items;
