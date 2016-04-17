'use strict';
var net = require('net');
var socket = new net.Socket();

module.exports = {
	init: init,
	get: get,
	close: close
};

function init(opts) {
	if (typeof opts.host !== 'string') {
		throw new TypeError('Expected a string');
	}

	socket.connect(opts.port, opts.host);
}

function close() {
	socket.destroy();
}

function get(text, callback) {
	socket.on('connect', function () {
		socket.on('data', function (response) {
			var re = /<([A-Z]+?)>(.+?)<\/\1>/g;
			var str = response.toString();
			var m;
			var result = {
				LOCATION: [],
				ORGANIZATION: [],
				DATE: [],
				MONEY: [],
				PERSON: [],
				PERCENT: [],
				TIME: []
			};

			while ((m = re.exec(str)) !== null) {
				if (m.index === re.lastIndex) {
					re.lastIndex++;
				}
				result[m[1]].push(m[2]);
			}

			callback(result);
		});

		socket.write(text + '\n');
	});
}
