const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

let requestData = {};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/endpoint', (req, res) => {
  const currentTime = new Date();
  const dateKey = currentTime.toISOString().split('T')[0];
  if (!requestData[dateKey]) {
    requestData[dateKey] = [];
  }
  requestData[dateKey].push(currentTime.toISOString());
  res.send('Data received at ' + currentTime.toISOString());
});

app.get('/data', (req, res) => {
  res.json(requestData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});