import React from "react";
import "./App.css";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import Signup from "./components/Signup";
import { LoginPage } from "./components/Login";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <div className='App'>
          <Header></Header>
          <Switch>
            <Route path='/' exact component={Courses}></Route>
            <Route path='/detail/:id' exact component={CourseDetail}></Route>
            <Route path='/login' exact component={LoginPage}></Route>
            <Route path='/signup' exact component={Signup}></Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
};

function add(x: number, y: number) {
  return x + y;
}

export { App as default, add };
