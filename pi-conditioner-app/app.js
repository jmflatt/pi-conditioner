//import my stuff
const piInterface = require('./pi-interface/on-off');
const jsonConfig = require('./appsettings.json');
const snsClient = require('./snsClient');
//express stuff
const express = require('express');
const app = express();
const port = 3000;
//aws stuff
const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

const CronJob = require('cron').CronJob;
const useCronJob = process.argv[2] == 'useCron';

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queueURL = jsonConfig.SQSQueueURL;

const listener = Consumer.create({
  queueUrl: queueURL,
  handleMessage: async (message) => {
    var temp = piInterface.getTemperature();
    var isOn = piInterface.isOn() ? 'on' : 'off';
    snsClient.sendSnsMessage(temp, isOn);
  }
});

listener.start();

// if (useCronJob) {
//   const job = new CronJob('* * * * *', function () {
//     if ((!piInterface.isOn()) && piInterface.getTemperature() > 24) {
//       piInterface.turnLEDOn();
//     } else if ((piInterface.isOn()) && piInterface.getTemperature() < 20) {
//       piInterface.turnLEDOff();
//     }
//   }, null, true, 'America/Chicago');
//   job.start();
// }

app.get('/', (req, res) => res.send('hello world'));

app.get('/on', function (req, res) {
  console.log('api called to turn pi on');
  piInterface.turnLEDOn();
  var isOn = piInterface.isOn() ? 'on' : 'off';
  res.send(JSON.stringify({ success: true, status: isOn }));
});

app.get('/off', function (req, res) {
  console.log('api called to turn pi off');
  piInterface.turnLEDOff();
  var isOn = piInterface.isOn() ? 'on' : 'off';
  res.send(JSON.stringify({ success: true, status: isOn }));
});

app.get('/status', function (req, res) {
  var isOn = piInterface.isOn() ? 'on' : 'off';
  var temp = piInterface.getTemperature();
  res.send(JSON.stringify({ temperature: temp.temperature.toString(), humidity: temp.humidity.toString(), status: isOn }));
});

// console.log(`cron job enabled: ${useCronJob}`);

app.listen(port, '192.168.1.94',  () => console.log('Listening'));

