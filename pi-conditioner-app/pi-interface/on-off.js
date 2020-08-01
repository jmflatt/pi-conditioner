var Gpio = require('onoff').Gpio;
var LED = new Gpio(18, 'high');
const tempSensor = require('node-dht-sensor');
const jsonConfig = require('../appsettings.json');


module.exports = {

  getTemperature: function () {
    tempSensor.initialize(22, 4);
    var readout = tempSensor.read(22, 4);

    console.log('PiInterface: getting temperature');
    console.log(`PiInterface: Current Temp: ${readout.temperature}. Current Humidity: ${readout.humidity}`);

    return { temperature: readout.temperature.toFixed(1), humidity: readout.humidity.toFixed(1) };
  },

  turnLEDOn: function () {
    console.log("PiInterface: checking current temp before turning on");
    const currentTemp = this.getTemperature();
    if (currentTemp.temperature < jsonConfig.TurnOnTemp) {
      console.log('PiInterface: current temp not warm enough to need AC. Configured with TurnOnTemp in appsettings');
      return;
    }
    console.log(currentTemp.temperature);
    console.log('PiInterface: turning led on');
    if (LED.readSync() === 1) {
      console.log('PiInterface: turned led on');
      LED.writeSync(0);
    }
  },

  turnLEDOff: function () {
    console.log('PiInterface: turning led off');
    if (LED.readSync() === 0) {
      console.log('PiInterface: turned led off');
      LED.writeSync(1);
    }
  },

  isOn: function () {
    return LED.readSync() === 1;
  },


}

