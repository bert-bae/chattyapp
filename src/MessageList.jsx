import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const msgData = this.props.messages;
    const indMsgs = msgData.map((msg) => {
      return <Message message={msg} color={msg.color}/>
    })
    return (
      <main className="messages">
        {indMsgs}
        <div id='bottom-of-list'></div>
      </main>
    )
  }
}

export default MessageList;