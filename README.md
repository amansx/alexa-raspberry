# Wemo Emulation Server
Emulates multiple devices using the ["Wemore"](https://github.com/dhleong/wemore) Library on RaspberryPi (or anything running Node.Js) as Wemo Switches and executes commands described in the configuration.

```javascript
// Example Configuration
{
	"Terminal A":{ 
		"oncommand": "/bin/chvt 1" 
	},

	"Display": { 
		"oncommand"  : "/opt/vc/bin/tvservice -p",
		"offcommand" : "/opt/vc/bin/tvservice -o"
	}

}
```

## Installation
```bash
# Install Globally
sudo npm install alexa-raspberry -g
```

## Execution
```bash
# Place devices.json in the execution path
alexa-raspberry
```
or

```bash
# Provide file path as
alexa-raspberry ./examples/devices.json
alexa-raspberry /etc/wemo/devices.json
```


## Usage
Use the alexa app on your cell phone/tablet to search for devices

```
Alexa search for devices
Alexa turn on 'Display'
```

## Start as a service on RaspberryPi
Use your favorite text editor to create the systemd config file and devices.json file

```bash
#@file: /etc/systemd/system/alexaraspberry.service

[Unit]
Description=Wemo emulation server for Alexa
After=network.target

[Service]
ExecStart=/usr/bin/alexa-raspberry /etc/alexa/devices.json
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=Alexa-Raspberry

[Install]
WantedBy=multi-user.target

```

```bash
#Enable the service
systemctl enable alexaraspberry.service
#Start the service
systemctl start alexaraspberry.service
```

