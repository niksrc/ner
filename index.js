'use strict';
var net = require('net');

module.exports = {
	get: get
};

function get(opts, text, callback) {
	var socket = new net.Socket();

	socket.connect(opts.port, opts.host, function () {
		socket.setNoDelay(true);
		socket.write(text.replace(/\r?\n|\r|\t/g, ' ') + '\n');
	});

	socket.on('data', function (data) {
		var re = /<([A-Z]+?)>(.+?)<\/\1>/g;
		var str = data.toString();

		var res = {};
		res.raw = str;

		var m;
		var entities = {
			LOCATION: [],
			ORGANIZATION: [],
			DATE: [],
			MONEY: [],
			PERSON: [],
			PERCENT: [],
			TIME: []
		};

		var _parsed = [];
		while ((m = re.exec(str)) !== null) {
			if (m.index === re.lastIndex) {
				re.lastIndex++;
			}
			_parsed.push(m);
			entities[m[1]].push(m[2]);
		}

		res._parsed = _parsed;
		res.entities = entities;
		socket.destroy();
		callback(undefined, res);
	});

	socket.on('error', function (err) {
		callback(err, undefined);
	});
}
