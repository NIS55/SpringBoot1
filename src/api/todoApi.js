import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/todo`;
export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${prefix}/read/${tno}`);
  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, { params: { page, size } });
  return res.data;
};

export const postData = async (todo) => {
  const res = await jwtAxios.post(`${prefix}/add`, todo);
  return res.data;
};

export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/delete/${tno}`);
  return res.data;
};

export const putOne = async (todo) => {
  console.log(todo.tno);
  const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo);

  return res.data;
};
