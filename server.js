const { PeerServer } = require('peer');
const express = require('express');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

// Health check route (Render needs this)
app.get('/', (req, res) => {
  res.send('SecretMeet Signaling Server is running ✅');
});

// Allow CORS for all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const server = http.createServer(app);

// Mount PeerJS on /peerjs path
const peerServer = PeerServer({
  server,
  path: '/peerjs',
  allow_discovery: true,
});

peerServer.on('connection', (client) => {
  console.log(`[+] Peer connected: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
  console.log(`[-] Peer disconnected: ${client.getId()}`);
});

server.listen(PORT, () => {
  console.log(`SecretMeet server running on port ${PORT}`);
});
