module.exports = {
    sendSnsMessage: async function(temp, isOn) {
        console.log(`Status: ${isOn}. Current Temperature: ${temp.temperature}. Current Humidity: ${temp.humidity}`);
    }
}