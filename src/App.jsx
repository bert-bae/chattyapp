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
      msgContent: '',
    }
  }
  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      const newMsg = {id: 10, username: 'Michelle', content: 'Hi there'};
      const messages = this.state.messages.concat(newMsg);
      this.setState({messages: messages})
    }, 3000);
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
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages}/>
        <ChatBar 
          currentUser={this.state.currentUser} 
          msgContent={this.state.msgContent} 
          changeContent={changeContent}
          changeUser={changeUser}/>
      </div>
    );
  }
}
export default App;