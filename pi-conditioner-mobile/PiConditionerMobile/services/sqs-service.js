import React from 'react';
import { Text } from 'react-native';
const AWS = require('aws-sdk');
const configJson = require('../appsettings.json')

const creds = new AWS.CognitoIdentityCredentials({region: 'east-us-2', RoleArn: configJson.RoleArn});
AWS.config.update({
    region: 'us-east-2', 
    accessKeyId: configJson.AccessKeyId,
    secretAccessKey: configJson.SecretAccessKey
    // credentials: creds,
});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const jsonConfig = require('../appsettings.json');

export default class sqsService {
    
    async sendSQSMessage() {
        const params = {
            DelaySeconds: 10,
            MessageBody: JSON.stringify({getStatus: true}),
            QueueUrl: jsonConfig.SQSQueueURL
          };

          sqs.sendMessage(params, function(err, data) {
            if (err) {
              console.log("Error", err);
            } else {
              console.log("Success", data.MessageId);
            }
          });
    }
}
