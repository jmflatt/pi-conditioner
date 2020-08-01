var Gpio = require('onoff').Gpio;
var AC = new Gpio(18, 'high');
var ACIsOnPin = new Gpio(21, 'in');
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

  toggleAcPowerOn: async function () {
    const currentTemp = this.getTemperature();
    if (currentTemp.temperature < jsonConfig.TurnOnTemp) {
      console.log('PiInterface: current temp not warm enough to need AC. Configured with TurnOnTemp in appsettings');
      return;
    }
    console.log(currentTemp.temperature);
    console.log('PiInterface: turning led on');
    console.log('PiInterface: Send Power');
    AC.writeSync(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    AC.writeSync(1)
    console.log('PiInterface: Cut Power');
    console.log('PiInterface: turned led on');
  },

  toggleAcPowerOff: async function () {
    const currentTemp = this.getTemperature();
    console.log(currentTemp.temperature);
    console.log('PiInterface: turning led on');
    console.log('PiInterface: Send Power');
    AC.writeSync(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    AC.writeSync(1)
    console.log('PiInterface: Cut Power');
    console.log('PiInterface: turned led on');
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
    if (AC.readSync() === 1) {
      console.log('PiInterface: turned led on');
      AC.writeSync(0);
    }
  },

  turnLEDOff: function () {
    console.log('PiInterface: turning led off');
    if (AC.readSync() === 0) {
      console.log('PiInterface: turned led off');
      AC.writeSync(1);
    }
  },

  isOn: function () {
    return ACIsOnPin.readSync() === 1;
  },


}

