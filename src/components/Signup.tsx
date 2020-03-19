//Learnt React Hooks and put React.FC in practice
import * as React from 'react';
import {auth} from '../firebase/config';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';
import styles from './Signup.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
//import { MouseEvent } from 'react';
//import {TRootReducer, TLogin,LOGIN_OK, LOGOUT_OK, TLoginAction, TLogoutAction} from '../types/types'
//import {connect} from 'react-redux';
//import store from '../store'

const Signup: React.FC = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmPwRef = React.useRef<HTMLInputElement>(null);
  const userRef = React.useRef<HTMLInputElement>(null);
  const checkRef = React.useRef<HTMLInputElement>(null);
  const [isEyeOpen, setIsEyeOpen] = React.useState(false);
  auth.onAuthStateChanged(user => {
    console.log(user);
  });
  function handleSignUp(): void {
    if (
      emailRef.current !== null &&
     checkRef.current!==null &&
     checkRef.current.checked &&
      passwordRef.current !== null &&
      confirmPwRef.current !== null &&
      passwordRef.current.value === confirmPwRef.current.value
    ) {
      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value,
        )
        .then(user =>
          user.user?.updateProfile({
            displayName:
              userRef.current !== null ? userRef.current.value : null,
          }),
        )
        .catch(e => console.log(e));
      console.log(auth.currentUser);
    }
  }
  function handleShowPW(e: React.MouseEvent<SVGSVGElement>): void {
    setIsEyeOpen(!isEyeOpen);
  }
  return (
    <form className={styles.form}>
      <div className={styles.title}>CREATE ACCOUNT</div>
      <div>
        <input
          className={styles.input}
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Email"></input>
      </div>
      <div className={styles.eyeCtn}>
        <input
          className={styles.input}
          ref={passwordRef}
          type={isEyeOpen?"text":"password"}
          name="password"
          placeholder="Password"></input>
        <FontAwesomeIcon
          size="sm"
          onClick={handleShowPW}
          className={styles.eye}
          icon={isEyeOpen ? faEye : faEyeSlash}
        />
      </div>
      <div>
        <input
          className={styles.input}
          ref={confirmPwRef}
          type={isEyeOpen?"text":"password"}
          name="confirmPw"
          placeholder="Confirm Password"></input>
      </div>
      <div>
        <input
          className={styles.input}
          ref={userRef}
          type="text"
          name="user"
          placeholder="UserName"></input>
      </div>
      <div>
        <input ref={checkRef} type="checkbox"></input>
        <label className={styles.label}>
          I agree all terms in <a href="#">T&C</a>
        </label>
      </div>
      <div>
        <input
          className={styles.submit}
          onClick={handleSignUp}
          type="submit"
          value="SIGN UP"></input>
      </div>
      <div className={styles.redirectLogin}>
        Have already an account?<Link to="/login">Login here</Link>
      </div>
    </form>
  );
};

export default Signup;
