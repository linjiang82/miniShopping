import React, { useState, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import { fetchAPI } from "../utils/useFetchCat";

var reqBody: any = {};
const ProductEdit: React.FC<RouteComponentProps<{
  category: string;
  id: string;
}>> = (props) => {
  const [counter, setCounter] = useState<number>(0);
  const inputRefArr = useRef<(HTMLInputElement | null)[]>([]);
  const [res, setRes] = useState<any>(null);
  const [arrJSX, setArrJSX] = useState<JSX.Element[] | null>(null);
  let category = props.match.params.category;
  let id = props.match.params.id;

  useEffect(() => {
    console.log(counter);
    if (arrJSX !== null)
      setArrJSX([
        ...arrJSX.slice(),
        <div>
          <input
            type='text'
            placeholder='Required'
            ref={(el) => (inputRefArr.current[(counter - 1) * 2] = el)}></input>
          <input
            type='text'
            placeholder='Required'
            ref={(el) => (inputRefArr.current[(counter - 1) * 2 + 1] = el)}
            onChange={() => {
              console.log(inputRefArr.current[0]?.value);
            }}></input>
        </div>,
      ]);
  }, [counter]);
  const handleAddAttribute = async () => {
    setCounter(counter + 1);
    // reqBody = { ...reqBody, customProps: { lname: "jiang" } };
    console.log(reqBody);
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/${category}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      console.log(await response.json());
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let key = e.currentTarget.id;
    if (reqBody.hasOwnProperty(key)) {
      reqBody[key] = e.currentTarget.value;
    } else
      Object.defineProperty(reqBody, key, {
        value: e.currentTarget.value,
        writable: true,
        enumerable: true, //without this property, the json stringify will return {}
      });
  };

  useEffect(() => {
    fetchAPI(`${category}/${id}`, setRes);
  }, []);
  useEffect(() => {
    let tempArr = [];
    if (res !== null) {
      for (let key in res) {
        if (key !== "_id" && key !== "__v")
          if (key === "customProps") {
            for (let subkey in res[key]) {
              tempArr.push(
                <div key={subkey}>
                  <span>{subkey}</span>
                  <input
                    id={key}
                    type='text'
                    defaultValue={res[key][subkey]}
                    onChange={handleChange}></input>
                </div>
              );
            }
          } else
            tempArr.push(
              <div key={key}>
                <span>
                  <span>*</span>
                  {key}
                </span>
                <input
                  id={key}
                  type='text'
                  defaultValue={res[key]}
                  onChange={handleChange}></input>
              </div>
            );
      }
      setArrJSX(tempArr);
    }
  }, [res]);
  return (
    <div>
      <div>{arrJSX}</div>
      <button onClick={handleAddAttribute}>Add New Attribute</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ProductEdit;
