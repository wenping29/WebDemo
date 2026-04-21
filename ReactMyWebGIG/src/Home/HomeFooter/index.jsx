import React from 'react';
//import '../home.css';
// import Button from 'react-bootstrap/Button';

// or less ideally
import { header, main, aside, ol, blockquote } from 'react-bootstrap';
class HomeFooter extends React.Component {
  render() {
    return (
      <footer className="mastfoot mt-auto">
        <div className="inner">
          <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
        </div>
      </footer>
    )
  }
}

export default HomeFooter;