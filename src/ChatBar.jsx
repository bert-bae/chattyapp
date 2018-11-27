import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const submitChanges = (event) => {
      if(event.key === 'Enter') {
        console.log('submit made');
      }
    }
    console.log(this.props);
    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          value={this.props.currentUser} 
          onChange={(event) => this.props.changeUser(event)}
          onKeyPress={submitChanges}/>
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          value={this.props.msgContent} 
          onChange={(event) => this.props.changeContent(event)}
          onKeyPress={submitChanges}/>
      </footer>
    )
  }
}
export default ChatBar;