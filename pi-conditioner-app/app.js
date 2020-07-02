const express = require('express');
const app = express();
const port = 3000;
const piInterface = require('./pi-interface/on-off');
const CronJob = require('cron').CronJob;
const useCronJob = process.argv[2] == 'useCron';

if (useCronJob) {
  const job = new CronJob('* * * * *', function () {
    if ((!piInterface.isOn()) && piInterface.getTemperature() > 24) {
      piInterface.turnLEDOn();
    } else if ((piInterface.isOn()) && piInterface.getTemperature() < 20) {
      piInterface.turnLEDOff();
    }
  }, null, true, 'America/Chicago');
  job.start();
}

app.get('/', (req, res) => res.send('hello world'));

app.get('/on', function (req, res) {
  piInterface.turnLEDOn();
  var isOn = piInterface.isOn() ? 'on' : 'off';
  res.send(JSON.stringify({ success: true, status: isOn }));
});

app.get('/off', function (req, res) {
  piInterface.turnLEDOff();
  var isOn = piInterface.isOn() ? 'on' : 'off';
  res.send(JSON.stringify({ success: true, status: isOn }));
});

app.get('/status', function (req, res) {
  var isOn = piInterface.isOn() ? 'on' : 'off';
  var temp = piInterface.getTemperature();
  res.send(JSON.stringify({ temperature: temp.toString(), status: isOn }));
});

console.log(`cron job enabled: ${useCronJob}`);

app.listen('192.168.1.94', port, () => console.log('Listening'));

