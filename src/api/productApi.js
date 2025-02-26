
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/products`;

export const postAdd = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.post(`${host}/add`, product, header);
  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${host}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${host}/${tno}`);
  return res.data;
};

export const putProduct = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/`, product, header);
  return res.data;
};

export const deleteProduct = async (pno) => {
  const res = await jwtAxios.delete(`${host}/${pno}`);
  return res.data;
};
