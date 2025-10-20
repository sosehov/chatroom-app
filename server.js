const express = require("express");
const app = express();

// Define a simple route
app.get("/", (req, res) => {
  res.send("Welcome to my chatroom");
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});