// import React from 'react';
// import { render } from '@testing-library/react';
import Courses from "./components/Courses";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import fetchMock from "fetch-mock";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "@testing-library/react";

afterEach(cleanup);
describe("<Course />", () => {
  test("renders 1 app", async () => {
    const props = {
      store: store
    };
    // const div = document.createElement("div");
    // ReactDOM.render(<Courses {...props} />, div);
    const { debug, asFragment } = render(<Courses {...props} />);
    expect(asFragment()).toMatchSnapshot();
    debug();
  });
});
const fetchdata = async () => {
  const res = await fetch("https://2");
  const final = await res.json();
  return final;
};
fetchMock.get("https://2", { id: 3 });
test("async with async", async () => {
  const data = await fetchdata();
  const id = data.id;
  expect(id).toBe(3);
});
test("async with promise", () => {
  return fetchdata().then(data => expect(data.id).toBe(3));
});
