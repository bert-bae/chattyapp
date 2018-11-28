import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p style={{float: 'right'}}><i>Users connected: {this.props.userCount}</i></p>
      </nav>
    )
  }
}

export default NavBar;