import React, { useState } from "react";
import { loginPost } from "../../api/memberApi";
import { loginPostAsync } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";

const init = {
  email: "",
  pw: "",
};
const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...init });
  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };
  const handleClickLogin = (e) => {
    //dipatch(login(loingParam)) 동기화된 호출
    //아래는 비동기 호출
    dispatch(loginPostAsync(loginParam))
      .unwrap()
      .then((data) => {
        console.log("after unwrap..");
        console.log(data);
        if (data.error) {
          alert("이메일과 패스워드를 다시 확인하세요");
        } else {
          alert("로그인 성공!");
          moveToPath("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { doLogin, moveToPath } = useCustomLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
          Login components
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Email</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="email"
            type={"text"}
            value={loginParam.email}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">PassWord</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="pw"
            type={"password"}
            value={loginParam.pw}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
              className="rounded p-4 w-full bg-blue-500 text-xl text-white"
              onClick={handleClickLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <KakaoLoginComponent></KakaoLoginComponent>
    </div>
  );
};

export default LoginComponent;
