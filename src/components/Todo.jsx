import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleTodo from "./SingleTodo";

export default function Todo() {
  const [isLoading, setisLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [error, seterror] = useState("");
  const [total, settotal] = useState(null);
  const [limit, setlimit] = useState(6);
  const [pageNumber, setpageNumber] = useState(0);

  const handelchange = (e) => {
    setlimit(e.target.value);
  };

  useEffect(() => {
    setisLoading(true);

    axios
      .get(`http://localhost:3030/?pageNumber=${pageNumber}&limit=${limit}`)
      .then((res) => {
        setisLoading(false);
        setdata(res.data.data);
        settotal(res.data.total);
        seterror("");
      })
      .catch((e) => {
        setisLoading(false);
        seterror("this is error", e);
      });
  }, [limit, pageNumber]);

  const pages = Math.ceil(total / limit);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="container m-auto">
      {error && <h1>error</h1>}

      <h1>page : {Math.ceil(total / limit)} </h1>
      <h1>current page {pageNumber} </h1>
      <h1 className="text-center text-danger h1 ">Mern Pagination </h1>
      <h2>{total} </h2>
      <div className="row">
        {data?.map((todo) => (
          <div key={todo._id} className="col col-lg-4 col-sm-12 col-md-6 mb-2">
            <SingleTodo todo={todo} />
          </div>
        ))}
      </div>

      <select
        className="form-select "
        value={limit}
        name="page"
        id="page"
        onChange={handelchange}
      >
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="9">9</option>
        <option value="12">12</option>
      </select>

      {pages === pageNumber ? null : (
        <button
          className="btn btn-primary"
          onClick={() => setpageNumber((pre) => pre + 1)}
        >
          next
        </button>
      )}

      {pageNumber === 0 ? null : (
        <button
          className="btn btn-danger"
          onClick={() => setpageNumber((pre) => pre - 1)}
        >
          pre
        </button>
      )}
    </div>
  );
}
