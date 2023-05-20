const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Route all requests to 'index.html' for React Router to handle
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.js'));
});

// Start the server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
