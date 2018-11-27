import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          value={this.props.currentUser} 
          onChange={(event) => this.props.changeUser(event)}/>
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          value={this.props.messages.content} 
          onChange={(event) => this.props.changeContent(event)}
          onKeyPress={(event) => this.props.submitChanges(event)}/>
      </footer>
    )
  }
}
export default ChatBar;