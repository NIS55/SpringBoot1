import React, { useEffect, useState } from "react";
import { deleteOne, putOne } from "../../api/todoApi";

const ModifyComponent = ({ tno }) => {
  const initState = {
    tno: tno,
    title: "modify로 바꿈",
    writer: "바꿈",
    dueDate: null,
    complete: false,
  };
  const [todo, setTodo] = useState({ ...initState });
  const handleDelete = () => {
    deleteOne(todo.tno).then((data) => {
      console.log(data);
    });
  };
  const handleModify = () => {
    putOne(todo).then((data) => {
      setTodo(data);
    });
  };

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };
  const handleChangeTodoComplete = (e) => {
    const value = e.target.value;
    todo.complete = value === "Y";
    setTodo({ ...todo });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex  justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {todo.tno}
          </div>
        </div>
      </div>
      <div className="flex  justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">작성자</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md ">
            {todo.writer}
          </div>
        </div>
      </div>
      <div className="flex  justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제목</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="title"
            type={"text"}
            value={todo.title}
            onChange={handleChangeTodo}
          />
        </div>
      </div>
      <div className="flex  justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">만기일</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="dueDate"
            type={"text"}
            value={todo.dueDate}
            onChange={handleChangeTodo}
          />
        </div>
      </div>
      <div className="flex  justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">완료여부</div>
          <select
            name="status"
            className="border-solid border-2 rounded m-1 p-2"
            onChange={handleChangeTodoComplete}
            value={todo.complete ? "Y" : "N"}
          >
            <option value="Y">완료</option>
            <option value="N">미 완성</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleDelete}
        >
          삭제
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleModify}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;
