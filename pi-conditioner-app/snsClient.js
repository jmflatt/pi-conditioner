// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'east-us-2'});

module.exports = {
    
    sendSnsMessage: async function(temp, isOn) {
        const params = {
            Message: `Status: ${isOn}. Current Temperature: ${temp.temperature}. Current Humidity: ${temp.humidity}`, /* required */
            PhoneNumber: '+10015138335254',
          };
          var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

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