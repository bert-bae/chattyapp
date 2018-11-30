import React, {Component} from 'react';
import 'emoji-mart/css/emoji-mart.css';
import data from 'emoji-mart/data/messenger.json';
import {Emoji, NimblePicker} from 'emoji-mart';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerState: 'none',
    }
  }
  render() {
    const togglePicker = () => {
      if (this.state.pickerState === 'none') {
        this.setState({
          pickerState: 'block',
        })
      } else {
        this.setState({
          pickerState: 'none',
        })
      }
    };
    return (
      <div>
        <footer className="chatbar">
          <input 
            className="chatbar-username" 
            placeholder="Your Name (Optional)" 
            value={this.props.currentUser} 
            onChange={(event) => this.props.changeUser(event)}
            onBlur={() => this.props.userNameNotification()}/>
          <input 
            className="chatbar-message" 
            placeholder="Type a message and hit ENTER" 
            value={this.props.msgContent} 
            onChange={(event) => this.props.changeContent(event)}
            onKeyPress={(event) => this.props.submitChanges(event)}/>  
          <Emoji emoji=':smile::skin-tone-3:' size={45} onClick={togglePicker}/>
          <NimblePicker set='messenger' data={data} onSelect={(event) => this.props.changeContent(event)} style={{position: 'absolute', bottom: 65, right: 10, display: this.state.pickerState}}/>
        </footer>
        <div id='bottom-of-list'></div>
      </div>
    )
  }
}
export default ChatBar;