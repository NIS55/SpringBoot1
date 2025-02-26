import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListPage = () => {
  //여기서 axios 로 백엔드 연결
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8080/todo/list");
      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 w-full bg-orange-200">
      <div className="text-3xl font-extrabold">
        {data.map((i, index) => {
          const ex =
            i.work + "  " + i.name + "  " + (i.completed ? true : false);
          return (
            <p key={index}>
              <Link to={`/todo/read/${index}`}>{ex}</Link>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ListPage;
