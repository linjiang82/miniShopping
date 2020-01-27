import React from 'react';
import './App.css';
import Courses from './components/Courses';
import {Provider} from 'react-redux';
import store from './store';
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Courses></Courses>
      </div>
    </Provider>
  );
};

export default App;
