import React, { useEffect, useRef, useState } from "react";
import { deleteProduct, getOne, putProduct } from "../../api/productApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";
import { data } from "react-router-dom";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  delFlag: false,
  uploadFileNames: [],
};
const ModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const uploadRef = useRef();
  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);
  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };
  const deleteOldImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );
    product.uploadFileNames = resultFileNames;
    setProduct({ ...product });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    //other data
    formData.append("pno", pno);
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);
    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i]);
    }
    setFetching(true);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    putProduct(formData).then((i) => {
      setResult(i.result);
      setFetching(false);
    });
  };
  const [result, setResult] = useState(null);
  const { moveToRead, moveToList } = useCustomMove();
  const closeModal = () => {
    if (result === "수정성공") {
      moveToRead(pno);
    } else if (result === "삭제성공") {
      moveToList({ page: 1 });
    }
    setResult(null);
  };
  const handleClickDelete = () => {
    setFetching(true);
    deleteProduct(pno).then((data) => {
      setResult(data.result);
      setFetching(false);
    });
  };
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      ModifyComponent
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={`${result}!!!`}
          content={`${result} 처리완료되었습니다.`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className=" relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pname"
            type={`text`}
            value={product.pname}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Desc</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="pdesc"
            rows="4"
            value={product.pdesc}
            onChange={handleChangeProduct}
          >
            {product.pdesc}
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type={`number`}
            value={product.price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
          <select
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="delFlag"
            value={product.delFlag}
            onChange={handleChangeProduct}
          >
            <option value={false}>사용</option>
            <option value={true}>삭제</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            multiple={true}
            type={`file`}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Images</div>
          <div className="w-4/5 justify-center flex-wrap items-start">
            {product.uploadFileNames.map((imgFile, i) => {
              return (
                <div
                  className=" flex justify-center flex-col w-1/3 m-1 align-baseline"
                  key={i}
                >
                  <button
                    className=" bg-blue-500 text-3xl text-white"
                    onClick={() => deleteOldImages(imgFile)}
                  >
                    Delete
                  </button>
                  <img
                    alt="img"
                    src={`${API_SERVER_HOST}/api/products/view/s_${imgFile}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          onClick={handleClickDelete}
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={handleClickModify}
          className=" inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
        >
          Modify
        </button>
        <button
          type="button"
          onClick={moveToList}
          className=" inline-block rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
        >
          List
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;
