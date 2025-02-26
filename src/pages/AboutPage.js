import React from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import useCustomLogin from "../hooks/useCustomLogin";

const AboutPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  if (!isLogin) {
    return moveToLoginReturn();
  }

  return (
    <BasicLayout>
      <div>
        <Link to={"/"}>MainPage이동</Link>
      </div>
    </BasicLayout>
  );
};

export default AboutPage;
