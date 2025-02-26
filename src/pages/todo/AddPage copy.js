import axios from "axios";
import React, { useState } from "react";

const AddPage = () => {
  const [form, setForm] = useState({
    work: "",
    name: "",
    tno: 0,
    completed: "",
  });
  const checkHandler = (e) => {
    const { value } = e.target;
    console.log(value);
    if (value == "on") {
      setForm({ ...form, [e.target.name]: true });
    }
  };
  const clickHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const addHandler = (e) => {
    e.preventDefault();
    const addData = async () => {
      const res = await axios.post("http://localhost:8080/todo/add", form, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
    };

    addData();
  };
  return (
    <div className="">
      <form onSubmit={addHandler}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          onChange={clickHandler}
        ></input>
        <input
          type="text"
          name="work"
          placeholder="할일"
          onChange={clickHandler}
        ></input>
        실행여부
        <input type="checkbox" name="completed" onChange={checkHandler}></input>
        <input type="submit" value={"제출"}></input>
      </form>
    </div>
  );
};

export default AddPage;
