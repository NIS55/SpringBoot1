import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/productApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

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
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  const [serverData, setServerData] = useState(initState);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    getList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
        setFetching(false);
      })
      .catch((err) => exceptionHandle(err));
  }, [page, size, refresh]);

  return (
    <div className=" border-2 border-blue-100 mt-10 mr-2 ml-2">
      <h1>Products List component</h1>
      {fetching ? <FetchingModal /> : <></>}
      <div className="flex flex-wrap mx-auto p-6">
        {serverData.dtoList.map((i) => {
          return (
            <div
              key={i.pno}
              className="w-1/2 p-1 rounded shadow-md border-2"
              onClick={() => moveToRead(i.pno)}
            >
              <div className="flex flex-col h-full">
                <div className="font-extrabold text-2xl p-2 w-full">
                  {i.pno}
                </div>
                <div className="text-1xl m-1 p-2 w-full flex flex-col">
                  <div className="w-full overflow-hidden">
                    <img
                      alt="product"
                      className="m-auto rounded-md w-60"
                      src={`${API_SERVER_HOST}/api/products/view/s_${i.uploadFileNames[0]}`}
                    />
                  </div>
                  <div className="bottom-0 font-extrabold bg-white">
                    <div className="text-center p-1">이름: {i.pname}</div>
                    <div className=" text-center p-1">가격: {i.price}원</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default ListComponent;
