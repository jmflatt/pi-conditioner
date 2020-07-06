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
  console.log('here');
  return tempSensor.read(11, 4, function(err, temperature, humidity) {
    console.log('here 2');
    if (err) {
      console.log(err)
      return {temperature: 0.0, humidity: 0.0};
    }
    console.log(temperature);
    return {temperature: temperature, humidity: humidity};
  });
}
}

