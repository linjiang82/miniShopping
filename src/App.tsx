import React from 'react';
import './App.css';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
const App: React.FC = () => {
  return (
<Router>
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Courses}></Route>
          <Route path='/detail/:id' exact component={CourseDetail}></Route>
          </Switch>
      </div>
    </Provider>
</Router>
  );
};

export default App;
