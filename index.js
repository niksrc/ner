'use strict';
const net = require('net');

class NER {
	/**
	 * @param  {Object}
	 * @property {String} host Host of NER server
	 * @property {Number} port Port of NER server
	 */
	constructor(opts) {
		this.opts = opts;
	}

	/**
	 * @param  {String} text to be processed
	 * @param  {Function} callback
	 * @return {Object}
	 * @property {Array} entities List of entitiy object
	 */
	get(text, callback) {
		this.socket = new net.Socket();

		this.socket.connect(this.opts.port, this.opts.host, () => {
			this.socket.setNoDelay(true);
			this.socket.write(text.replace(/\r?\n|\r|\t/g, ' ') + '\n');
		});

		this.socket.on('data', data => {
			const re = /<([A-Za-z]+?)>(.+?)<\/\1>/g;
			const str = data.toString();
			const res = {};
			res.raw = str;

			let m;
			const _entities = {};

			const _parsed = [];
			while ((m = re.exec(str)) !== null) {
				if (m.index === re.lastIndex) {
					re.lastIndex++;
				}
				_parsed.push(m);
				if (!_entities[m[1]]) {
					_entities[m[1]] = [];
				}
				_entities[m[1]].push(m[2]);
			}

			res._parsed = _parsed;
			res.entities = _entities;
			this.socket.destroy();
			callback(undefined, res);
		});

		this.socket.on('error', err => {
			callback(err, undefined);
		});
	}
}

module.exports = NER;
