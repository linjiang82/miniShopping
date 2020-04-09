import React, { useState, useEffect } from "react";
import styles from "./Searchbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useFetchCat from "../utils/useFetchCat";

const Searchbar: React.FC = () => {
  const categoryList = useFetchCat();
  const options: JSX.Element[] = [];
  categoryList.map((cat: any): void => {
    options.push(<option value={cat.name}>{cat.name}</option>);
  });

  return (
    <div>
      <select>{options}</select>
      <input type='text'></input>
      <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
    </div>
  );
};

export default Searchbar;
