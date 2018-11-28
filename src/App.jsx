import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import uuidv4 from 'uuid/v4';
// import messageData from './sampledata.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: 'Anonymous',
      previousUser: 'Anonymous',
      userCount: 1,
    }
    this.socket = null;
  }

  componentDidMount() {
    const Websocket = new WebSocket(
      'ws://localhost:3001'
    );
    this.socket = Websocket;
    console.log('Connected to websocket server');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch(data.type) {
        case 'incomingMessage':
          const oldMessages = this.state.messages;
          const newMessages = oldMessages.concat(data);
          this.setState({
            messages: newMessages,
          })
          break;
        case 'incomingNotification':
          const oldNotification = this.state.messages;
          const newNotification = oldNotification.concat(data);
          this.setState({
            messages: newNotification,
          })
          break;
        default:
          this.setState({
            userCount: data,
          })
      }
    }
  }
  render() {
    const changeContent = (event) => {
      let content = event.target.value;
      this.setState({
        msgContent: content,
      })
    }
    const changeUser = (event) => {
      let newUser = event.target.value;
      this.setState({
        currentUser: newUser,
      })
    }
    const userNameNotification = () => {
      if(this.state.previousUser !== this.state.currentUser) {
        const oldMessages = this.state.messages;
        const newMessages = oldMessages.concat({
          id: uuidv4(),
          type: 'incomingNotification',
          content: `${this.state.previousUser} changed their name to ${this.state.currentUser}.`,
        });
        this.setState({
          messages: newMessages,
          previousUser: this.state.currentUser,
        })
        this.socket.send(JSON.stringify(newMessages[newMessages.length - 1]));
      }
    }
    const submitChanges = (event) => {
      if(event.key === 'Enter') {
        const oldMessages = this.state.messages;
        const newMessages = oldMessages.concat({
          type: 'incomingMessage',
          id: uuidv4(),
          username: this.state.currentUser,
          content: event.target.value});
        this.setState({
          messages: newMessages,
        })
        event.target.value = '';
        this.socket.send(JSON.stringify(newMessages[newMessages.length - 1]));
      }
    }

    return (
      <div>
        <NavBar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages}/>
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