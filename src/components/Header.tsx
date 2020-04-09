import React from "react";
import ConnectedNav from "./Nav";
import LoginConnected from "./Login";
import Searchbar from "./Searchbar";
import styles from "./Header.module.scss";

const Logo: React.FC = () => {
  return <div className={styles.logo}></div>;
};
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <ConnectedNav></ConnectedNav>
      <Logo></Logo>
      <LoginConnected></LoginConnected>
      <Searchbar></Searchbar>
      {/* <Account></Account> */}
      {/* <Cart></Cart> */}
    </header>
  );
};

export default Header;
