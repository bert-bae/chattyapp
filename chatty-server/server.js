const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening to port ${PORT}.`));

const wss = new SocketServer({ server });

const userColor = () => {
  const colors = ['#FF0000', '#FFA500', '#0000ff', '#3cb371', '#000000', '#A52A2A', '#DC143C', '#8B008B']
  return colors[Math.floor(Math.random() * colors.length)];
}

wss.on('connection', (ws) => {
  console.log('Client connected.');
  ws.color = userColor();
  ws.userName = 'Anonymous';
  ws.send(JSON.stringify({userColor: ws.color, type: 'initialColor'}));
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'newConnection',
        key: uuidv4(),
        userCount: wss.clients.size,
      }));
    }
  });

  ws.on('message', function incoming(data) {
    ws.userName = JSON.parse(data).currentUser;
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        let JSONData = JSON.parse(data);
        JSONData.id = uuidv4();
        client.send(JSON.stringify(JSONData));
      }
    });
  })

  ws.on('close', function close(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'userDisconnect',
          key: uuidv4(),
          userCount: wss.clients.size,
          userName: ws.userName,
        }));
      }
    });
    console.log('Closing websocket connection.');
  });
});