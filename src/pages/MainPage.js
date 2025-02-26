import React from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {
  return (
    <BasicLayout>
      <div className="flex">
        <Link to={"/about"}>AboutPage이동</Link>
      </div>
      <div className="text-3xl">MainPage</div>
    </BasicLayout>
  );
};

export default MainPage;
