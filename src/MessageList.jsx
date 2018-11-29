import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const msgData = this.props.messages;
    const indMsgs = msgData.map((msg) => {
      return <Message message={msg} userColor={this.props.userColor}/>
    })
    return (
      <main className="messages">
        {indMsgs}
      </main>
    )
  }
}

export default MessageList;