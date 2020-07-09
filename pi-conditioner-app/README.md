# pi-conditioner
simple raspberry pi project

****************************************************************************************

To install node: 

from root: 
> curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
>sudo apt-get install -y nodejs

****************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////
****************************************************************************************

To Pull App and install dependencies:

from desired directory run 
> git clone https://github.com/jmflatt/pi-conditioner
> cd pi-conditioner/pi-conditioner-app
> npm install 

****************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////
****************************************************************************************

To input your configuration

Create an appsettings.json at the same level as this readme with the following config: 

{
    "SQSQueueURL": "the url of your sqs queue",
    "SMSPhoneNumber": "YourPhoneNumber in the format +16145559999",
    "SQSRegion": "the region your sqs queue is in",
    "SNSRegion": "the reguion your sns queue is in. not all regions support sns",
    "TurnOnTemp": Int the max temp the room can be before turning on the AC,
    "TurnOffTemp": Int the temp the room needs to be before the AC will turn off,
    "NetworkAddress": "IP address that the pi server will run e.g. 192.168.1.94"
}

****************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////
****************************************************************************************

COMING SOON: wiring and parts diagram for setting up the pi with the AC and the Temp/Humidity sensor. need to finalize parts and stuff first. 

****************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////
****************************************************************************************

To start the app

run 
> node app.js

****************************************************************************************



