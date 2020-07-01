var Gpio = require('onoff').Gpio;
var LED = new Gpio(4,'out');

module.exports = {
turnLEDOn: function () {
  if (LED.readSync() === 0) {
    LED.writeSync(1);	
  } else {
    LED.writeSync(0);
  }
 },
turnLEDOff: function () {
  if (LED.readSync() === 1) {
    LED.writeSync(0);	
  } else {
    LED.writeSync(1);
  }
 }
}

