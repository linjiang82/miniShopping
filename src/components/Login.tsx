//Learnt React Hooks and put React.FC in practice
import * as React from "react";
import firebase from "firebase";
import { auth } from "../firebase/config";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import styles from "./Login.module.scss";
import { MouseEvent } from "react";
import {
  TRootReducer,
  TLogin,
  LOGIN_OK,
  LOGOUT_OK,
  TLoginAction,
  TLogoutAction
} from "../types/types";
import { connect } from "react-redux";
import store from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserCircle,
  faEnvelope,
  faLock
} from "@fortawesome/free-solid-svg-icons";

interface IProps {
  login: TLogin;
}
const mapStateToProps = (state: TRootReducer): IProps => {
  return {
    login: state.login
  };
};
const Login: React.FC<IProps & RouteComponentProps> = props => {
  console.log(props);
  function gotoLoginPage() {
    if (auth.currentUser !== null) {
      auth.signOut();
      store.dispatch({ type: LOGOUT_OK });
    } else props.history.push("/login");
  }

  return (
    <button className={styles.loginBtn} onClick={gotoLoginPage}>
      {props.login.isLogin ? "Logout" : "Login/SignUp"}
    </button>
  );
};
const LoginConnected = withRouter(connect(mapStateToProps)(Login));

const LoginPage: React.FC<RouteComponentProps> = props => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  auth.onAuthStateChanged(user => {
    if (user) {
      store.dispatch({ type: LOGIN_OK, user: user });
      props.history.push("/");
    } else console.log("please login");
  });
  function handleLogin(e: MouseEvent<HTMLButtonElement>): void {
    if (emailRef.current !== null && passwordRef.current !== null) {
      auth
        .signInWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .catch(e => console.log(e));
    }
  }
  function onEnter(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.keyCode === 13) {
      if (emailRef.current !== null && passwordRef.current !== null) {
        auth
          .signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
          )
          .catch(e => console.log(e));
      }
    }
  }
  return (
    <div>
      <div className={styles.form}>
        <div className={styles.title}>LOGIN</div>
        <div className={styles.inputWrapper}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <input
            className={styles.input}
            ref={emailRef}
            name='txtEmail'
            type='email'
            placeholder='Email'></input>
        </div>
        <div className={styles.inputWrapper}>
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
          <input
            className={styles.input}
            ref={passwordRef}
            name='txtPW'
            type='password'
            placeholder='Password'
            onKeyDown={onEnter}></input>
        </div>
        <div className={styles.checkboxWrapper}>
          <input type='checkBox'></input>
          <span className={styles.checkbox}>Remember me</span>
        </div>
        <button onClick={handleLogin} className={styles.btn}>
          LOGIN
        </button>
        <div className={styles.signupWrapper}>
          Not a member yet,{" "}
          <Link to='/signup' className={styles.signuplink}>
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
};

export { LoginConnected as default, LoginPage };
