var SerialPort = require('serialport');
var exec = require('child_process').exec;

async function connect() {
	var result = await SerialPort.list();
	result = result.filter(val => {	
		var available = true;
		var rport = /usb|acm|^com/i;
		if (!rport.test(val.comName)) {
			available = false;
		}
		return available;
	});
	if(result.length == 0) {
		console.log("0 inputs found");
		return;
	}
	
	serialport = new SerialPort(result[0].comName, {
		baudRate: 115200
	});
	serialport.on('data', dataRecieved);
	serialport.open();
}

function dataRecieved(input) {
	console.log(input.toString());
}

//exec('ls', function(err, stdout, stderr) {
//	console.log(stdout);
//});

connect();