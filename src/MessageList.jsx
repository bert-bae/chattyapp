import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const msgData = this.props.messages;
    const indMsgs = msgData.map((msg) => {
      return <Message messages={msg} key={msg.id}/>
    })
    return (
      <main className="messages">
        {indMsgs}
      </main>
    )
  }
}

export default MessageList;