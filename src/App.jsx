import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
// import messageData from './sampledata.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: 'Anonymous',
      previousUser: 'Anonymous',
      userCount: 1,
      userColor: null,
    }
    this.socket = null;
  }

  // link with websocket and get updates here

  componentDidMount() {
    const Websocket = new WebSocket(
      'ws://localhost:3001'
    );
    this.socket = Websocket;
    console.log('Connected to websocket server');

    const element = document.getElementById('bottom-of-list');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const oldMessages = this.state.messages;
      switch(data.type) {
        case 'initialColor':
          this.setState({
            userColor: data.userColor,
          })
        case 'incomingMessage':
          const newMessages = oldMessages.concat(data);
          this.setState({
            messages: newMessages,
          })
          element.scrollIntoView({behavior: 'smooth'});
          break;
        case 'incomingNotification':
          const newNotification = oldMessages.concat(data);
          this.setState({
            messages: newNotification,
          })
          element.scrollIntoView({behavior: 'smooth'});
          break;
        case 'newConnection':
          const newUserMessage = oldMessages.concat({
            type: 'incomingNotification',
            key: data.key,
            content: `${this.state.currentUser} has connected.`
          })
          this.setState({
            messages: newUserMessage,
            userCount: data.userCount,
          })
          element.scrollIntoView({behavior: 'smooth'});
          break;
        default:
          const userDisconnected = oldMessages.concat({
            type: 'incomingNotification',
            key: data.key,
            content: `${data.userName} has disconnected.`
          })
          this.setState({
            messages: userDisconnected,
            userCount: data.userCount,
          })
          element.scrollIntoView({behavior: 'smooth'});
      }
    }
  }

  render() {
    // tracks changes to input areas (text box and usename)
    const changeContent = (event) => {
      let content = event.target.value;
      this.setState({
        msgContent: content,
      })
    }
    const changeUser = (event) => {
      let newUserMessage = event.target.value;
      this.setState({
        currentUser: newUserMessage,
      })
    }

    //triggers when username changes
    const userNameNotification = () => {
      if(this.state.previousUser !== this.state.currentUser) {
        const newMessages = {
          type: 'incomingNotification',
          currentUser: this.state.currentUser,
          content: `${this.state.previousUser} changed their name to ${this.state.currentUser}.`,
        };
        this.socket.send(JSON.stringify(newMessages));
      }
    }

    //triggers when sending message
    const submitChanges = (event) => {
      if(event.key === 'Enter') {
        const newMessages = {
          type: 'incomingMessage',
          username: this.state.currentUser,
          content: event.target.value,
          color: this.state.userColor,
        };
        event.target.value = '';
        this.socket.send(JSON.stringify(newMessages));
      }
    }

    return (
      <div>
        <NavBar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages} userColor={this.state.userColor}/>
        <ChatBar 
          currentUser={this.state.currentUser}
          messages={this.state.messages} 
          changeContent={changeContent}
          changeUser={changeUser}
          submitChanges={submitChanges}
          userNameNotification={userNameNotification}/>
      </div>
    );
  }
}
export default App;