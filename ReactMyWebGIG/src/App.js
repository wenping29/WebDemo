import React from 'react';
import logo from './logo.svg';
import Home from './Home/index'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Login from './Login/index';
import Main from './Main/index';
import About from './About/index';
import Contact from './Contact/index';
import Dashboard from './Dashboard/index';
import Profile from './Profile/index';
import Settings from './Settings/index';
import Register from "./Register/index";
import User from './User/index';
import './App.css';
// import "./css/bootstrap.min.css";
import loginimg from "./p_big3.jpg";
class App extends React.Component {
  render(){
    return (
      <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Main" element={<Main />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/user/:userId" element={<User />} />
            </Routes>
          
        </Router>
    );
  }
}
export default App;