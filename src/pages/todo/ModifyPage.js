import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModifyComponent from "../../components/todo/ModifyComponent";

const ModifyPage = () => {
  const naviate = useNavigate();
  const { tno } = useParams();
  console.log(tno);
  const moveToRead = () => {
    naviate({ pathname: `/todo/read/${tno}` });
  };
  const moveToList = () => {
    naviate({ pathname: `/todo/list` });
  };
  const moveToAdd = () => {
    naviate({ pathname: `/todo/add` });
  };
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">Todo Modify Page</div>
      <ModifyComponent tno={tno} />
    </div>
  );
};

export default ModifyPage;
