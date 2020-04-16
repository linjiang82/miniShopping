import { useState, useEffect } from "react";
import { db } from "../firebase/config";

const useFetchCat = () => {
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const fetchCategory = async () => {
    let CatArry: any[] = [];
    db.collection("CategoryList")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          CatArry.push(doc.data());
        });
        setCategoryList(CatArry);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return categoryList;
};

export default useFetchCat;
