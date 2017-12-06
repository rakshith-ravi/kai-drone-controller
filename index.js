var SerialPort = require('serialport');
var readline = require('readline');
var exec = require('child_process').exec;

var reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

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
	console.log("Found connections: " + JSON.stringify(result));

	reader.question("Enter full COM port ('Eg: COM1'", answer => {
		serialport = new SerialPort(answer, {
			autoOpen: false,
			baudRate: 115200
		});
		serialport.on('data', dataRecieved);
		serialport.open();
	});
}

function dataRecieved(input) {
	console.log(input.toString());
}

//exec('ls', function(err, stdout, stderr) {
//	console.log(stdout);
//});

connect();