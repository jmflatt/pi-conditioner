var Gpio = require('onoff').Gpio;
var LED = new Gpio(4,'out');

module.exports = {
turnLEDOn: function () {
  if (LED.readSync() === 0) {
    console.log('turning led on');
    LED.writeSync(1);	
  }
 },
turnLEDOff: function () {
  if (LED.readSync() === 1) {
    console.log('turn led off');
    LED.writeSync(0);	
  } 
 },
isOn: function() {
  return LED.readSync() === 1;
},

getTemperature: function() {
  const min = Math.ceil(18);
  const max = Math.floor(32);
  const temp = Math.floor(Math.random() * (max - min)) + min;
  console.log(temp);
  return temp;
}
}

