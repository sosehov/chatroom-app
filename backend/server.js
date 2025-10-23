const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "../frontend/public")));

/*
 Helper function (for future implementation)
function safeParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}
*/

/* 
Simple heartbeat to detect broken connections (for future implementation)
function noop(){}
function heartbeat() {
  this.isAlive = true;
} 
*/

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Listen for messages from the client
  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    //Broadcast message to all connected clients except the sender
    wss.clients.forEach((client) => {
      if(client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  // Placeholder for heartbeat (ping/pong)
});

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

server.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});