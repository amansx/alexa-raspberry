
var wemore = require('wemore');
var exec = require('child_process').exec;

var devices = {
	'lynx': 	{ oncommand: '/bin/chvt 2' },
	'IRC': 		{ oncommand: '/bin/chvt 3' },
	'Display': 	{ 
		oncommand: '/opt/vc/bin/tvservice -p',
		offcommand: '/opt/vc/bin/tvservice -o',
	},
};

var deviceRefs = [], i = 0;

for( var device in devices ){
	var dev = wemore.Emulate({ 
		friendlyName: device, 
		port: 9000 + i++
	});

	var devprop = devices[device];

	dev.on('listening', (function(device, devprop) {
		return function(){
			console.log( device + " Now online, Now listening on", this.port );
		}		
	})(device, devprop));

	dev.on('on', (function(device, devprop) {
		var command = devprop.oncommand;
		return function(){			
			console.log("Device", device, "recieved on" );
			if( command ){
				console.log( 'Executing command "', command, '"' );
				exec( command, function(error, stdout, stderr) {
					//console.log( arguments );
				});				
			}
		}
	})(device, devprop));

	dev.on('off', (function(device, devprop) {
		var command = devprop.offcommand;
		return function(){
			console.log("Device", device, "recieved off" );
			if( command ){
				console.log( 'Executing command "', command, '"');
				exec( command, function(error, stdout, stderr) {
					//console.log( arguments );
				});				
			}
		}
	})(device, devprop));
}