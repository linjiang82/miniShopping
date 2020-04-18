import React from "react";
import { Link } from "react-router-dom";
import ConnectedNav from "./Nav";
import LoginConnected from "./Login";
import Searchbar from "./Searchbar";
import styles from "./Header.module.scss";

const Logo: React.FC = () => {
  return (
    <Link to='/'>
      <div className={styles.logo}></div>
    </Link>
  );
};
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <ConnectedNav></ConnectedNav>
      <Logo></Logo>
      <div className={styles.searchbar}>
        <Searchbar></Searchbar>
      </div>
      <div className={styles.login}>
        <LoginConnected></LoginConnected>
      </div>
      {/* <Account></Account> */}
      {/* <Cart></Cart> */}
    </header>
  );
};

export default Header;
