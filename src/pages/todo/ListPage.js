import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ListComponent from "../../components/todo/ListComponent";

const ListPage = () => {
  const [queryParams] = useSearchParams();
  console.log(queryParams);
  const page = queryParams.get("page") || 1;
  const size = queryParams.get("size") || 10;
  const [data, setData] = useState({});

  useEffect(() => {
    const connetion = async () => {
      const res = await axios.get(
        `http://localhost:8080/todo/list?page=1&size=10`
      );
      setData(res.data);
    };
    connetion();
  }, []);

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        <ListComponent />
      </div>
    </div>
  );
};

export default ListPage;
