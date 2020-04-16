import React, { useState, useEffect, useRef } from "react";
import { passCatId, passKeyword } from "../actions/action";
import { useDispatch } from "react-redux";
import { db } from "../firebase/config";
import styles from "./Searchbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useFetchCat from "../utils/useFetchCat";

const Searchbar: React.FC = () => {
  const dispatch = useDispatch();
  const [catId, setCatId] = useState<string | null>(null);
  const categoryList = useFetchCat();
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const options: JSX.Element[] = [<option value='All'>All</option>];
  categoryList.map((cat: any): void => {
    options.push(<option value={cat.name}>{cat.name}</option>);
  });
  const doSearch = () => {
    db.collection("CategoryList")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) =>
          doc.data().name === selectRef.current?.value
            ? setCatId(doc.id)
            : selectRef.current?.value === "All"
            ? setCatId(null)
            : null
        );
      });
  };
  useEffect(() => {
    dispatch(passCatId(catId));
  }, [catId]);

  return (
    <div className={styles.searchbar}>
      <select
        ref={selectRef}
        onChange={() => inputRef.current?.focus()}
        className={styles.select}>
        {options}
      </select>
      <input ref={inputRef} type='text' className={styles.input}></input>
      <span className={styles.iconWrap}>
        <FontAwesomeIcon
          icon={faSearch}
          className={styles.icon}
          onClick={doSearch}></FontAwesomeIcon>
      </span>
    </div>
  );
};

export default Searchbar;
