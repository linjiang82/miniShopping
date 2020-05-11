//To dynamically generate ref object, pass an array into useRef([])
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
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
    if (arrJSX !== null)
      setArrJSX([
        ...arrJSX.slice(),
        <div key={counter}>
          <input
            type='text'
            placeholder='Required'
            ref={(el) => (inputRefArr.current[(counter - 1) * 2] = el)}></input>
          <input
            type='text'
            placeholder='Required'
            id={counter.toString()}
            ref={(el) => (inputRefArr.current[(counter - 1) * 2 + 1] = el)}
            onChange={handleNewAttrChange}></input>
        </div>,
      ]);
  }, [counter]);

  const handleAddAttribute = async () => {
    setCounter(counter + 1);

    // reqBody = { ...reqBody, customProps: { lname: "jiang" } };
    console.log(reqBody);
  };

  const handleNewAttrChange = (e: ChangeEvent) => {
    let id = parseInt(e.currentTarget.id);
    let key = inputRefArr.current[(id - 1) * 2]?.value;
    let value = inputRefArr.current[(id - 1) * 2 + 1]?.value;
    if (key === "" || key?.trim() === "") console.log("sc required");
    if (value === "" || value?.trim() === "") console.log("required");
    else if (key !== undefined) {
      //the condition below is for the case when there is no custom props from database
      if (reqBody.hasOwnProperty("customProps"))
        reqBody.customProps[key] = value;
      else
        Object.defineProperty(reqBody, "customProps", {
          value: {},
          writable: true,
          enumerable: true,
        });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    obj: { [key: string]: any }
  ): void => {
    let key = e.currentTarget.id;
    if (obj.hasOwnProperty(key)) {
      obj[key] = e.currentTarget.value;
    } else
      Object.defineProperty(obj, key, {
        value: e.currentTarget.value,
        writable: true,
        enumerable: true, //without this property, the json stringify will return {}
      });
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

  useEffect(() => {
    fetchAPI(`${category}/${id}`, setRes);
  }, []);
  useEffect(() => {
    let tempArr = [];
    if (res !== null) {
      for (let key in res) {
        if (key !== "_id" && key !== "__v")
          if (key === "customProps") {
            //if the response has custom props, copy it to reqbody otherwise the data will lose when update the database
            Object.defineProperty(reqBody, "customProps", {
              value: {},
              writable: true,
              enumerable: true,
            });
            for (let subkey in res[key]) {
              tempArr.push(
                <div key={subkey}>
                  <span>{subkey}</span>
                  <input
                    id={subkey}
                    type='text'
                    defaultValue={res[key][subkey]}
                    onChange={(e) =>
                      handleChange(e, reqBody.customProps)
                    }></input>
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
                  onChange={(e) => handleChange(e, reqBody)}></input>
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
