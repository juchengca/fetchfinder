const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const statics = path.join(__dirname, '/../client/dist');

app.use(express.static(statics));
app.use(express.json());

app.get('/dogs/search*', (req, res) => {
  res.sendFile(path.join(statics, 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(statics, 'index.html'));
});

app.listen(port, () => {
  console.log(`Fetch App listening on port ${port}`);
});