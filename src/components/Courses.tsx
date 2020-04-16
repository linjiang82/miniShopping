/*
1.used useSelector instead of connect for React FC.courses
*/

import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Course from "./Course";
import { useSelector } from "react-redux";
import { TCourse, TSearch, TRootReducer } from "../types/types";
import { db } from "../firebase/config";
import { fetchCourses } from "../actions/action";
import store from "../store";
import styles from "./Courses.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import StarRate from "./StarRate";

// interface myProps {
//   courses: TCourse[];
//   search: TSearch;
// }

const Courses: React.FC = () => {
  const popOver = useRef<HTMLDivElement>(null);
  const coursesState: TCourse[] = useSelector(
    (state: TRootReducer) => state.courses
  );
  const searchState: TSearch = useSelector(
    (state: TRootReducer) => state.search
  );
  console.log(searchState);
  const [courseState, setCourse] = useState<undefined | TCourse>(undefined);
  const [quicklookId, setQuicklookId] = useState<null | string>(null);
  const handleQuicklook = (e: React.MouseEvent<HTMLDivElement>): void => {
    setQuicklookId(e.currentTarget.id);
    // if(popOver.current)
    // popOver.current.classList.add(styles.showPopover)
  };
  const closeQuicklook = () => {
    setCourse(undefined);
    setQuicklookId(null); //add this so useEffect will run again, otherwise due to quicklookId doesnot change, so the below useeffect
  };
  let courses: JSX.Element[] = [];
  coursesState.map((course) => {
    console.log(searchState.catId);
    if (searchState.catId === null)
      courses.push(
        <Course
          key={course.id}
          handleQuicklook={handleQuicklook}
          data={course}></Course>
      );
    else if (course.category.id === searchState.catId)
      courses.push(
        <Course
          key={course.id}
          handleQuicklook={handleQuicklook}
          data={course}></Course>
      );
  });
  useEffect(() => {
    setCourse(coursesState.find((i) => i.id === quicklookId));
  }, [coursesState, quicklookId]);
  useEffect(() => {
    db.collection("Courses")
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) =>
          store.dispatch(fetchCourses({ ...doc.data(), id: doc.id }))
        )
      )
      .catch((e) => console.log("error" + e));
  }, []);
  return (
    <div className={styles.courses}>
      {courseState !== undefined && (
        <div ref={popOver} className={styles.popover}>
          <div className={styles.quicklook}>
            <div className={styles.lhs}>
              <img
                className={styles.avatar}
                src={courseState.thumbURL}
                alt='avatar'></img>
            </div>
            <div className={styles.rhs}>
              <div className={styles.author}>{courseState.author}</div>
              <div className={styles.name}>{courseState.name}</div>
              <div className={styles.rate}>
                <StarRate rate={courseState.rate}></StarRate>
              </div>
              <div className={styles.price}>${courseState.price}</div>
              <Link to={`detail/${quicklookId}`}>
                <button className={styles.btn}>See Product Details</button>
              </Link>
            </div>
            <FontAwesomeIcon
              icon={faWindowClose}
              onClick={closeQuicklook}
              className={styles.icon}></FontAwesomeIcon>
          </div>
        </div>
      )}
      <div className={styles.flexCtn}>{courses}</div>
    </div>
  );
};

// const mapStateToProps = (state: TRootReducer): myProps => {
//   return {
//     courses: state.courses,
//     search: state.search,
//   };
// };

// export default connect(mapStateToProps)(Courses);
export default Courses;
