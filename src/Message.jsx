import React, {Component} from 'react';

class Message extends Component {
  render() {
    const msgData = this.props.message;
  
    // domain specific languages
    const modifications = (msgData) => {
      switch (msgData.modify) {
        case ('images'):
          const images = msgData.urls.map((url) => {
            return <img src={url} alt='image'/>;
          })
          return <span className="message-content">{msgData.content} <br/> {images} </span>
          break;
        case ('italics'):
          return <span className="message-content"><i>{msgData.content}</i></span>
          break;
        case ('bold'):
          return <span className="message-content"><b>{msgData.content}</b></span>
          break;
        default:
          return <span className="message-content">{msgData.content}</span>
          break;
      }
    }
    return (
      (msgData.type === 'incomingNotification') ?
      (<div className="message system">
        {msgData.content}
      </div>) :
      (<div className="message">
        <span className="message-username" style={{'color': msgData.color}}>{msgData.username}</span>
        {modifications(msgData)}
      </div>)
    )
  }
}

export default Message;