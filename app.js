const express = require('express');
const app = express();
const port = 3000;
const piInterface = require('./pi-interface/on-off');

app.get('/', (req, res) => res.send('hello world'));

app.get('/on', function (req, res) {
  piInterface.turnLEDOn();
  res.send("turnedOn");
});

app.get('/off', function (req, res) {
  piInterface.turnLEDOff();
  	res.send("turnedOff");
});

app.listen(port, () => console.log('Listening'));
