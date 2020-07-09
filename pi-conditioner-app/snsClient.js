var configJson = require('./appsettings.json');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: configJson.SNSReqion});

module.exports = {
    
    sendSnsMessage: async function(temp, isOn) {
        const params = {
            Message: `Status: ${isOn}. Current Temperature: ${temp.temperature}. Current Humidity: ${temp.humidity}`, /* required */
            PhoneNumber: configJson.SMSPhoneNumber
          };
          var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31', region: configJson.SNSReqion}).publish(params).promise();

        publishTextPromise.then(
        function(data) {
            console.log("MessageID is " + data.MessageId);
        }).catch(
            function(err) {
            console.error(err, err.stack);
        });

        console.log(`Status: ${isOn}. Current Temperature: ${temp.temperature}. Current Humidity: ${temp.humidity}`);
    }
}