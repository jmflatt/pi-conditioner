const express = require('express');
const app = express();
const port = 3000;
const piInterface = require('./pi-interface/on-off');
const CronJob = require('cron').CronJob;

const job = new CronJob('* * * * *', function() {
 if ((!piInterface.isOn()) && piInterface.getTemperature() > 24) {
  piInterface.turnLEDOn();
 } else if ((piInterface.isOn()) && piInterface.getTemperature() < 20) { 
  piInterface.turnLEDOff();
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

app.get('/status', function (req, res) {
  var isOn = piInterface.isOn() ? 'on' : 'off';
  res.send(JSON.stringify({temperature: '30', status: isOn}));
});


job.start();

app.listen(port, () => console.log('Listening'));

