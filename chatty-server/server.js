const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening to port ${PORT}.`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected.');

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(wss.clients.size);
    }
  });

  ws.on('message', function incoming(data) {
    console.log(data);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  })

  ws.on('close', () => {
    console.log('Closing websocket connection.');
  });
});