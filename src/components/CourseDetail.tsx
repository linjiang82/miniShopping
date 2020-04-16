import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TDetail, TRootReducer, TCourse } from "../types/types";
import { fetchCourses, fetchDetail } from "../actions/action";
import { RouteComponentProps } from "react-router-dom";
import { db } from "../firebase/config";
import store from "../store";
import styles from "./CourseDetail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

interface stateProps {
  detail: TDetail | null;
  courses: TCourse[];
}
type ComboProps = stateProps & RouteComponentProps<{ id: string }>;

const CourseDetail: React.FC<ComboProps> = props => {
  const [amount, setAmount] = useState<number>(1);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [currentImgURL, setCurrentImgURL] = useState<string | undefined>(
    undefined
  );
  const closeMoreImg = () => {
    setShowPopover(false);
  };
  const changeURL = (e:React.MouseEvent<HTMLImageElement>) => {
    setCurrentImgURL(e.currentTarget.src);
  };
  useEffect(
    //below to load data from remote when user visit via direct link
    () => {
      if (props.courses.length === 0)
        db.collection("Courses")
          .get()
          .then(snapshot =>
            snapshot.forEach(doc =>
              store.dispatch(fetchCourses({ ...doc.data(), id: doc.id }))
            )
          )
          .catch(e => console.log("error" + e));
      ////
      db.collection("Courses")
        .doc(props.match.params.id)
        .collection("detail")
        .get()
        .then(snapshot => {
          if (snapshot.docs.length > 0)
            snapshot.forEach(doc => store.dispatch(fetchDetail(doc.data())));
        })
        .catch(e => console.log("error" + e));
      // (async ()=> { const data = await db.collection('Courses').get();
      //             const items = await data.forEach(doc=>{console.log(doc.data())})})()
    },
    [props.match.params.id, props.courses.length]
  );
  let course = props.courses.filter(c => c.id === props.match.params.id);

  if (props.detail) {
    const { name, author, rate, thumbURL } = course[0];
    const { Content, Tuition, Prerequisite, MorePics } = props.detail;
    let images: JSX.Element[] = [];
    images.push(
      <li>
        <img src={thumbURL} alt='moreimg' className={styles.moreimg} onClick={changeURL}></img>
      </li>
    );
    MorePics.map(i => {
      images.push(
        <li>
          <img src={i} alt='moreimg' className={styles.moreimg}onClick={changeURL}></img>
        </li>
      );
    }
    );
    const openMoreImg = () => {
      setShowPopover(true);
      setCurrentImgURL(thumbURL);
      setAmount(images.length);
    };
    return (
      <div className={styles.parent}>
        {showPopover && (
          <div className={styles.popover}>
            <div className={styles.moreImgCtn}>
              <div className={styles.moreImgTitle}>
                <span className={styles.title}>Images({amount})</span>
                <FontAwesomeIcon
                  icon={faWindowClose}
                  onClick={closeMoreImg}
                  className={styles.icon}></FontAwesomeIcon>
              </div>
              <div className={styles.moreImgContent}>
                <img src={currentImgURL} alt='currentImg' className={styles.currentImg}></img>
                <div className={styles.rhs}>
                  <ul className={styles.moreImgList}>{images}</ul>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={styles.gridCtn}>
          <div className={styles.name}>{name}</div>
          <div>
            <img
              className={styles.image}
              src={thumbURL}
              alt='mainImg'
              onClick={openMoreImg}></img>
            <img
              className={styles.smallImage}
              src={thumbURL}
              alt='moreImg'></img>
            {MorePics.map(i => (
              <img className={styles.smallImage} src={i} alt='moreImg'></img>
            ))}
          </div>
          <div className={styles.author}> Author: {author}</div>
          <div className={styles.rate}> Rate: {rate}</div>
          <div className={styles.tuition}> Price: ${Tuition}</div>
          <ul className={styles.content}>
            Content:{" "}
            {Content.map(i => (
              <li>{i}</li>
            ))}
          </ul>
          <div className={styles.prerequisite}>
            Prerequistie: {Prerequisite}
          </div>
        </div>
      </div>
    );
  } else return <div>Loading</div>;
};
// class CourseDetail extends React.Component<ComboProps>{
//   constructor(props){
//     super(props);
//   }
//   showMoreImg(){

//   }
// }

const mapStateToProps = (state: TRootReducer): stateProps => {
  return {
    detail: state.detail,
    courses: state.courses
  };
};

export default connect(mapStateToProps)(CourseDetail);
