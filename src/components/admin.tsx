import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchAPI } from "../utils/useFetchCat";

const ProductList: React.FC = () => {
  //Define State
  const [res, setRes] = useState<any[] | null>(null);
  const [catList, setCatList] = useState<string[] | null>(null);
  const [catJSX, setCatJSX] = useState<JSX.Element[] | null>(null);
  const [itemJSX, setItemJSX] = useState<JSX.Element[] | null>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetchAPI("", setCatList);
    fetchAPI("products", setRes);
  }, []);
  useEffect(() => {
    if (catList) {
      setCatJSX(
        catList.map((item) => (
          <option value={item.toLowerCase()}>{item}</option>
        ))
      );
    }
    if (res) {
      setItemJSX(
        res.map((item, index) => (
          <tr>
            <td>{index}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>{item.stock}</td>
            <Link to={`/admin/edit/${selectRef.current?.value}/${item._id}`}>
              <span id={item._id}>edit</span>
            </Link>
            <span id={item._id} onClick={handleDelete}>
              delete
            </span>
          </tr>
        ))
      );
    }
  }, [catList, res, selectRef]);
  const handleEdit = (e: React.MouseEvent) => {};
  const handleDelete = async (e: React.MouseEvent) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch("http://localhost:3001/" + selectRef.current?.value, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: e.currentTarget.id }),
      });
      if (selectRef.current) fetchAPI(selectRef.current.value, setRes);
    }
  };
  const handleSelect = () => {
    if (selectRef.current)
      fetchAPI(selectRef.current.value, setRes, { method: "GET" });
  };

  return (
    <div>
      <select ref={selectRef} onChange={handleSelect}>
        {catJSX}
      </select>
      <span>Add</span>
      <table>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
        {itemJSX}
      </table>
    </div>
  );
};

export default ProductList;
