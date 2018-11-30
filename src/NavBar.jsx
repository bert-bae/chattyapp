import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Woofers</a>
        <p style={{float: 'right'}}><i>Woofs connected: {this.props.userCount}</i></p>
      </nav>
    )
  }
}

export default NavBar;