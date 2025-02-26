import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadPage = () => {
  const { tno } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const contentget = async () => {
      const res = await axios.get(`http://localhost:8080/todo/read?tno=${tno}`);
      setData(res.data);
    };
    contentget();
  }, []);

  return (
    <div className=" text-white text-3xl font-extrabold ">
      ReadPage 받아온 데이터는<br></br>
      {data.map((i) => {
        const ex = i.work + i.name + (i.completed ? true : false) + i.tno;

        return ex;
      })}
    </div>
  );
};
export default ReadPage;
