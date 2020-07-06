var Gpio = require('onoff').Gpio;
var LED = new Gpio(17,'out');
var tempSensor = require("node-dht-sensor");

module.exports = {
turnLEDOn: function () {

  const currentTemp = getTemperature();
  console.log(currentTemp.temperature);
  
  console.log('turning led on');
  if (LED.readSync() === 0) {
    console.log('turned led on');
    LED.writeSync(1);	
  }
 },

turnLEDOff: function () {
  console.log('turning led off');
  if (LED.readSync() === 1) {
    console.log('turned led off');
    LED.writeSync(0);	
  } 
 },

isOn: function() {
  return LED.readSync() === 1;
},

getTemperature: function() {
  tempSensor.read(11, 4, function(err, temperature, humidity) {
    if (err) {
      return "0.0"
    }
    return {temperature: temperature, humidity: humidity};
  });
}
}

