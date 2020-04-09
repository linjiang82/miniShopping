import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TRootReducer, TLogin } from "../types/types";
import { db } from "../firebase/config";
import useFetchCat from "../utils/useFetchCat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faUser,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Nav.module.scss";
import { CSSTransition } from "react-transition-group";
import fade from "./fade.module.scss";

interface Iprops {
  login: TLogin;
}
const Nav: React.FC<Iprops> = (props) => {
  const categoryList = useFetchCat();
  const [isCatShown, setIsCatShown] = useState(false);
  let CatArry: any[] = [];
  categoryList.map((cat) => {
    CatArry.push(
      <a className={styles.category} href={`/category/${cat.url}`}>
        {cat.name}
      </a>
    );
  });
  const showCategory = () => {
    setIsCatShown(!isCatShown);
  };
  return (
    <React.Fragment>
      <FontAwesomeIcon
        className={styles.navIcon}
        icon={faList}
        onClick={showCategory}></FontAwesomeIcon>
      {isCatShown && <div className={styles.popover}></div>}
      <CSSTransition
        in={isCatShown}
        unmountOnExit
        timeout={300}
        classNames={fade}>
        <nav className={styles.navbar}>
          <div className={styles.header}>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            <span>
              Hello {props.login.isLogin ? props.login.user?.displayName : null}
            </span>
            <FontAwesomeIcon
              icon={faWindowClose}
              onClick={showCategory}
              className={styles.windowClose}></FontAwesomeIcon>
          </div>
          <span className={styles.category}>Category</span>
          <hr></hr>
          {CatArry}
        </nav>
      </CSSTransition>
    </React.Fragment>
  );
};
const mapStateToProps = (state: TRootReducer) => {
  return { login: state.login };
};
const ConnectedNav = connect(mapStateToProps)(Nav);
export default ConnectedNav;
