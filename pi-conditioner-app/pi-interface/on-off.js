var Gpio = require('onoff').Gpio;
var LED = new Gpio(17,'out');
const tempSensor = require('node-dht-sensor');

module.exports = {
getTemperature: function() {
    tempSensor.initialize(22, 4);
  
    var readout = tempSensor.read(22, 4);
    console.log('getting temperature');
    console.log(`current Temp: ${readout.temperature}. Current Humidity: ${readout.humidity}`);
    return {temperature: readout.temperature.toFixed(1), humidity: readout.humidity.toFixed(1)};
  
    // tempSensor.read(22, 4, function(err, temperature, humidity) {
    //   if (err) {
    //     console.log(err)
    //     return {temperature: 0.0, humidity: 0.0};
    //   }
    //   console.log(temperature);
    //   return {temperature: temperature, humidity: humidity};
    // });
  },
turnLEDOn: function () {
  const currentTemp = getTemperature();
  if (currentTemp.temperature < 24) 
  {
   console.log(`Current Temp ${currentTemp.temperature.toFixed(1)} is Low enough, not turning on`);
    return;
  }
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


}

