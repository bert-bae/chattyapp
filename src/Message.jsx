import React, {Component} from 'react';

class Message extends Component {
  render() {
    let msgData = this.props.messages;
    return (
      (msgData.type === 'incomingNotification') ?
      (<div className="message system">
        {msgData.content}
      </div>) :
      (<div className="message">
        <span className="message-username">{msgData.username}</span>
        <span className="message-content">{msgData.content}</span>
      </div>)
    )
  }
}

export default Message;