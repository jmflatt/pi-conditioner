//import my stuff
const piInterface = require('./pi-interface/on-off');
const jsonConfig = require('./appsettings.json');
const snsClient = require('./snsClient');
//express stuff
const express = require('express');
const app = express();
const port = 3000;
//aws stuff
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});


const CronJob = require('cron').CronJob;
const useCronJob = process.argv[2] == 'useCron';

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queueURL = jsonConfig.SQSQueueURL;

var params = {
  AttributeNames: [
     "SentTimestamp"
  ],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: [
     "All"
  ],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 20
 };

 sqs.receiveMessage(params, function(err, data) {
  if (err) {
    console.log("Received Error", err);
  } else if (data.Messages) {
    console.log(data.Messages[0].Body);

    if (JSON.parse(data.Messages[0].Body).getStatus) {
      snsClient.sendSnsMessage();
    }

    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };
    sqs.deleteMessage(deleteParams, function(err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }
});

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

