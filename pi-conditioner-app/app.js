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
AWS.config.update({ region: jsonConfig.SQSRegion });
//other requires
var moment = require('moment');
const CronJob = require('cron').CronJob;
const useCronJob = process.argv[2] == 'useCron';

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const queueURL = jsonConfig.SQSQueueURL;

const listener = Consumer.create({
  queueUrl: queueURL,
  region: 'us-east-2',
  handleMessage: async (message) => {
    var temp = piInterface.getTemperature();
    var isOn = piInterface.isOn() ? 'on' : 'off';
    snsClient.sendSnsMessage(temp, isOn);
  }
});

listener.start();

if (useCronJob) {
  console.log(`cron job enabled`);
  const job = new CronJob('*/5 * * * *', function () {
    const dateTime = moment().format('MM/DD/YYYY:HH:mm:ss');
    console.log(`Cron: kicking off ac temp check ${dateTime}`);
    const temp = piInterface.getTemperature();
    if ((!piInterface.isOn()) && temp.temperature > jsonConfig.TurnOnTemp) {
      console.log(`Cron: temp check recorded: ${temp.temperature} turning ac on`);
      piInterface.turnLEDOn();
    } else if ((piInterface.isOn()) && temp.temperature < jsonConfig.TurnOffTemp) {
      console.log(`Cron: temp check recorded: ${temp.temperature} turning ac off`);
      piInterface.turnLEDOff();
    }
  }, null, true, 'America/Chicago');
  job.start();
}

app.get('/', (req, res) => res.send('hello world'));


app.get('/on', function (req, res) {
  console.log('API: called to turn pi on');
  var isOn = piInterface.isOn() ? 'on' : 'off';
  if (isOn === 'on') {
    res.send(JSON.stringify({ success: true, status: isOn }));
    return;
  }
  piInterface.toggleAcPowerOn();
  isOn = piInterface.isOn() ? 'on' : 'off';
  res.send(JSON.stringify({ success: true, status: isOn }));
});

app.get('/off', function (req, res) {
  console.log('API: called to turn pi off');
  piInterface.toggleAcPowerOff();
  var isOn = piInterface.isOn() ? 'on' : 'off';
  if (isOn === 'on') {
    piInterface.toggleAcPowerOff();
    isOn = piInterface.isOn() ? 'on' : 'off';
  }
  res.send(JSON.stringify({ success: true, status: isOn }));
});

app.get('/status', function (req, res) {
  var isOn = piInterface.isOn() ? 'on' : 'off';
  var temp = piInterface.getTemperature();
  res.send(JSON.stringify({ temperature: temp.temperature.toString(), humidity: temp.humidity.toString(), status: isOn }));
});


const startupTime = moment().format('MM/DD/YYYY:HH:mm:ss');
app.listen(port, jsonConfig.NetworkAddress, () => console.log(`Started Listening - ${startupTime}`));

