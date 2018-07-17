'use strict';
var net = require('net');

class NER {
	////////////// options //////////////
	// port NUMBER
	// host string
	// entities object of the entities
	/////////////////////////////////////
	constructor(opts) {
		this.opts = opts
	}

	get(text, callback) {
		this.socket = new net.Socket()

		this.socket.connect(this.opts.port, this.opts.host,  ()  => {
			this.socket.setNoDelay(true);
			this.socket.write(text.replace(/\r?\n|\r|\t/g, ' ') + '\n')
		});

		this.socket.on('data', (data) => {
			let re = /<([A-Za-z\-]+?)>(.+?)<\/\1>/g
			let str = data.toString()
			let res = {};
			res.raw = str;

			let m;
			let _entities = {}

			let _parsed = [];
			while ((m = re.exec(str)) !== null) {
				if (m.index === re.lastIndex) {
					re.lastIndex++;
				}
				_parsed.push(m);
				if (!_entities[m[1]]) _entities[m[1]] = []
				_entities[m[1]].push(m[2]);
			}

			res._parsed = _parsed;
			res.entities = _entities;
			this.socket.destroy();
			callback(undefined, res);
		});

		this.socket.on('error', (err) => {
			callback(err, undefined);
		});
	}
}

module.exports = NER
