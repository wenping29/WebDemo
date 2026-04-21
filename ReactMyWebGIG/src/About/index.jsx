import React from 'react';

// import React from 'react';
// import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';

import Home from '../Home/HomeMain/index';
// import About1 from '../About/index';
import Contact from '../Contact/index';
import Dashboard from '../Dashboard/index';
import Profile from '../Profile/index';
import Settings from '../Settings/index';
// import User from './User';


class About extends React.Component {
    render() {

const NotFound = () => {
  return <h2>404 Page Not Found</h2>;
};

const CreateAbout = () => {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/user/1">User 12313213121</Link>
            </li>
            <li>
              <Link to="/user/2">User 2</Link>
            </li>
          </ul>
        </nav>
        
      </div>
    
  );
};
      return (
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          About------divdivdivdivdivdivdivdiv
          {CreateAbout()}
        </div>
      );
    }
  }
  export default About;