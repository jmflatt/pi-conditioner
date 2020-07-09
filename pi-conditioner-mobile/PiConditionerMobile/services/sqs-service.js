import React from 'react';
import { Text } from 'react-native';
const AWS = require('aws-sdk');
const configJson = require('../appsettings.json')

const creds = new AWS.CognitoIdentityCredentials({region: configJson.SQSRegion, RoleArn: configJson.RoleArn});
AWS.config.update({
    region: configJson.SQSRegion, 
    accessKeyId: configJson.AccessKeyId,
    secretAccessKey: configJson.SecretAccessKey
    // credentials: creds,
});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

export default class sqsService {
    
    async sendSQSMessage() {
        const params = {
            DelaySeconds: 5,
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
