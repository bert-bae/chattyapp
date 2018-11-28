import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import messageData from './sampledata.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: messageData,
      currentUser: 'Anonymous',
      previousUser: 'Anonymous',
    }
    this.socket = null;
  }

  componentDidMount() {
    const Websocket = new WebSocket(
      'ws://localhost:3001'
    );
    this.socket = Websocket;
    console.log('Connected to websocket server');

    // console.log('componentDidMount <App />');
    // setTimeout(() => {
    //   const newMsg = {id: 10, username: 'Michelle', content: 'Hi there'};
    //   const messages = this.state.messages.concat(newMsg);
    //   this.setState({messages: messages})
    // }, 3000);
  }
  render() {
    function randomId() {
      const idVariables = '0123456789';
      let id = '';
      for (let i = 0; i < 6; i++) {
        id += idVariables[(Math.floor(Math.random() * idVariables.length))]
      }
      return id;
    }
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
          id: randomId(),
          type: 'incomingNotification',
          content: `${this.state.previousUser} changed their name to ${this.state.currentUser}.`,
        });
        this.setState({
          messages: newMessages,
          previousUser: this.state.currentUser,
        })
        this.socket.send(JSON.stringify(this.state.messages));
      }
    }
    const submitChanges = (event) => {
      if(event.key === 'Enter') {
        const oldMessages = this.state.messages;
        const newMessages = oldMessages.concat({
          type: 'incomingMessage',
          id: randomId(),
          username: this.state.currentUser,
          content: event.target.value});
        this.setState({
          messages: newMessages,
        })
        event.target.value = '';
        this.socket.send(JSON.stringify(this.state.messages));
      }
    }

    return (
      <div>
        <NavBar />
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