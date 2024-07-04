const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const app = express();

// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));

// Set up JSON server
const apiRouter = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
app.use('/api', middlewares, apiRouter);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
