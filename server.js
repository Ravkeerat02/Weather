const express = require('express');
const path = require('path');
const app = express();

const buildPath = path.join(__dirname, 'Weather', 'build');

app.use(express.static(buildPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Add any other routes or middleware your app requires

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
