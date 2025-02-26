import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";
import axios from "axios";

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginparam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };
  const form = new FormData();
  form.append("username", loginparam.email);
  form.append("password", loginparam.pw);
  const res = await axios.post(`${host}/login`, form, header);
  return res.data;
};
