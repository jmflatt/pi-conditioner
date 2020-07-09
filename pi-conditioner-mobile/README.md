from the PiConditionerMobile directory:

create appsettings.json file with the following configuration:
{
    "SQSQueueURL": "your sqs queue url",
    "AccessKeyId": "your IAM access key id",
    "SecretAccessKey": "your IAM queue url secret",
    "RoleArn": "your IAM arn",
    "SQSRegion": "sqs queue region",
    "APIUrl": "the network address of your api e.g. http://192.168.1.94:3000/"
}

run 
> npm install

if running for IOS 
> cd ios
> pod install
> cd .. 

if running for Android
you're on your own. a quick google likely has what youre looking for

to run locally on emulator (assuming you have xcode or other tools for emulator if Android)

> npx react-native run-ios