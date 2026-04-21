import React from 'react';
import './home.css';
// import Button from 'react-bootstrap/Button';

// or less ideally
// import { header, main, aside, ol, blockquote } from 'react-bootstrap';

import HomeMain from './HomeMain/index'

import HomeTop from './HomeTop/index'

import HomeFooter from './HomeFooter/index'

class Home extends React.Component {
  render() {
    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <HomeTop></HomeTop>
        <HomeMain></HomeMain>
        <HomeFooter></HomeFooter>
      </div>
    );
  }
}
export default Home;
