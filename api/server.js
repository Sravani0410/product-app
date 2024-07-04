const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Serve your API endpoints
server.use('/api', router);

// Serve your React application from the build directory
server.use(express.static(path.join(__dirname, '../build')));

// Handle React routing, return all requests to React app
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
