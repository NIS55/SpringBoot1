import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";

const init = {
  dtoList: [],
  pageRequestDTO: {},
  totalCount: 0,
  pageNumList: [],
  prev: false,
  next: false,
  prevPage: 0,
  nextPage: 0,
  totalpage: 0,
  current: 0,
};
const Prj = ({ v }) => {
  const [data, setData] = useState(init);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [num, setNum] = useState(0);
  const changeP = (e) => {
    setPage(e.target.value);
  };
  const changeS = (e) => {
    setSize(e.target.value);
  };
  const clickHandle = () => {
    setNum(num + 1);
  };

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/products/list?page=${page}&size=${size}`
      );
      setData(res.data);
    };
    f();
  }, [num]);
  return (
    <div>
      Prj
      <hr />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>pno</th>
            <th>상품명</th>
            <th>가격</th>
            <th>상품설명</th>
            <th>상품이미지</th>
          </tr>
        </thead>
        <tbody>
          {data.dtoList.map((i) => {
            return (
              <tr>
                <td>{i.pno}</td>
                <td>{i.pname}</td>
                <td>{i.price}</td>
                <td>{i.pdesc}</td>
                <td>{i.uploadFileNames[0]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">현재페이지</InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          onChange={changeP}
        />
      </InputGroup>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">
          페이지 사이즈
        </InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          onChange={changeS}
        />
      </InputGroup>
      <br></br>
      <Button variant="primary" onClick={clickHandle}>
        제출
      </Button>
    </div>
  );
};

export default Prj;
