var Gpio = require('onoff').Gpio;
var LED = new Gpio(17, 'out');
const tempSensor = require('node-dht-sensor');

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
    if (currentTemp.temperature < 24) {
      console.log('PiInterface: current temp not warm enough to need AC');
      return;
    }
    console.log(currentTemp.temperature);
    console.log('PiInterface: turning led on');
    if (LED.readSync() === 0) {
      console.log('PiInterface: turned led on');
      LED.writeSync(1);
    }
  },

  turnLEDOff: function () {
    console.log('PiInterface: turning led off');
    if (LED.readSync() === 1) {
      console.log('PiInterface: turned led off');
      LED.writeSync(0);
    }
  },

  isOn: function () {
    return LED.readSync() === 1;
  },


}

