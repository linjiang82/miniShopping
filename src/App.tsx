import React from "react";
import "./App.css";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import Signup from "./components/Signup";
import Admin from "./components/admin";
import ProductEdit from "./components/ProductEdit";
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
          <Switch>
            <Route path='/admin' exact component={Admin}></Route>
            <Route
              path='/admin/edit/:category/:id'
              exact
              component={ProductEdit}></Route>
            ()=>
            {
              <div>
                <Header></Header>
                <Route path='/' exact component={Courses}></Route>
                <Route
                  path='/detail/:id'
                  exact
                  component={CourseDetail}></Route>

                <Route path='/login' exact component={LoginPage}></Route>
                <Route path='/signup' exact component={Signup}></Route>
              </div>
            }
          </Switch>
        </div>
      </Provider>
    </Router>
  );
};

export { App as default };
