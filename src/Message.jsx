import React, {Component} from 'react';

class Message extends Component {
  render() {
    const msgData = this.props.message;
    
    //handles accepting images or gifs
    const imgCheck = () => {
      const RegExp = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
      let imgMsgData = {
        imgLinks: null,
        msgContent: msgData.content,
      }
      if(RegExp.test(msgData.content)) {
        let match = msgData.content.match(RegExp);
        imgMsgData.imgLinks = match.map((img) => {
          return <img src={img} alt={img} style={{'maxWidth': '350px', 'maxHeight': '200px'}}/>;
        })
        imgMsgData.msgContent = msgData.content.replace(RegExp,'');
      }
      return imgMsgData;
    }

    return (
      (msgData.type === 'incomingNotification') ?
      (<div className="message system">
        {msgData.content}
      </div>) :
      (<div className="message">
        <span className="message-username" style={{'color': this.props.userColor}}>{msgData.username}</span>
        <span className="message-content">{imgCheck().msgContent} <br/> {imgCheck().imgLinks}</span>
      </div>)
    )
  }
}

export default Message;