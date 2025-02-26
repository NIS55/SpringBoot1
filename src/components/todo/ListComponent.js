import React, { useEffect, useState, useNavigate, useCallback } from "react";
import { getList, getOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import { Link, Navigate } from "react-router-dom";
import PageComponent from "../common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: {},
  prev: false,
  next: true,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, refresh } = useCustomMove();
  const [serverData, setSeverData] = useState(initState);
  const { moveToList, moveToRead } = useCustomMove();
  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setSeverData(data);
    });
  }, [page, size, refresh]);

  return (
    <div className=" border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.dtoList.map((i) => {
          return (
            <div
              key={i.tno}
              className="w-full min-w-[400px] p-2 m-2 rounded shadow-md bg-blue-100"
            >
              <div className="flex " onClick={() => moveToRead(i.tno)}>
                <div className="font-extrabold text-2xl p-2 w-1/12">
                  {i.tno}
                </div>

                <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                  {i.title}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {i.dueDate}
                </div>
              </div>
            </div>
          );
        })}
        <PageComponent
          serverData={serverData}
          movePage={moveToList}
        ></PageComponent>
      </div>
    </div>
  );
};
// const makeDiv = (title, value) => {
//   return (
//     <div className="flex justify-center">
//       <div className="relative mb-4 flex w-full f flex-wrap items-stretch">
//         <div className="w-1/5 p-6 text-right font-bold">{title}</div>
//         <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
//           {value}
//         </div>
//       </div>
//     </div>
//   );
// };

export default ListComponent;
