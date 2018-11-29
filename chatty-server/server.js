const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');

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
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'newConnection',
        userCount: wss.clients.size,
        userColor: ws.color,
      }));
    }
  });

  ws.on('message', function incoming(data) {
    ws.userName = JSON.parse(data).currentUser;
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  })

  ws.on('close', function close(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'userDisconnect',
          userCount: wss.clients.size,
          userName: ws.userName,
        }));
      }
    });
    console.log('Closing websocket connection.');
  });
});