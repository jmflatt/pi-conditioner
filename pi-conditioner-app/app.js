const express = require('express');
const app = express();
const port = 3000;
const piInterface = require('./pi-interface/on-off');
const CronJob = require('cron').CronJob;

const job = new CronJob('* * * * *', function() {
 if (piInterface.isOn()) {
  piInterface.turnLEDOff();
 } else { 
  piInterface.turnLEDOn();
 }
}, null, true, 'America/Chicago');

app.get('/', (req, res) => res.send('hello world'));

app.get('/on', function (req, res) {
  piInterface.turnLEDOn();
  res.send("turnedOn");
});

app.get('/off', function (req, res) {
  piInterface.turnLEDOff();
  	res.send("turnedOff");
});

job.start();

app.listen(3000, '127.0.0.3', () => console.log('Listening'));

// app.listen(port, () => console.log('Listening'));
