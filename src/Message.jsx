import React, {Component} from 'react';

class Message extends Component {
  render() {
    //handles accepting images or gifs
    const RegExp = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    let imgLinks = null;
    let msgData = this.props.message;
    let msgNoLink = msgData.content;
    if(RegExp.test(msgData.content)) {
      let match = msgData.content.match(RegExp);
      imgLinks = match.map((img) => {
        return <img src={img} alt={img} style={{'maxWidth': '350px', 'maxHeight': '200px'}}/>;
      })
      msgNoLink = msgData.content.replace(RegExp,'');
    }
    return (
      (msgData.type === 'incomingNotification') ?
      (<div className="message system">
        {msgData.content}
      </div>) :
      (<div className="message">
        <span className="message-username" style={{'color': this.props.userColor}}>{msgData.username}</span>
        <span className="message-content">{msgNoLink} <br/> {imgLinks}</span>
      </div>)
    )
  }
}

export default Message;