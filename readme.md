# ner [![Build Status](https://travis-ci.org/niksrc/ner.svg?branch=master)](https://travis-ci.org/niksrc/ner)

> Client for STANFORD NER

## Requirements
	- Latest stable node & npm
	- [STANFORD NER](http://nlp.stanford.edu/software/CRF-NER.shtml)

## Starting up STANFORD NER
	- Use [ner-server.sh](ner-server.sh)

## Install

```
$ npm install --save ner
```


## Usage

```js
const ner = require('ner');

ner.init({
	port:8080,
	host:'localhost'
});

ner.get('Wikipedia is a free-access, free-content Internet encyclopedia, supported and hosted by the non-profit Wikimedia Foundation. Those who can access the site can edit most of its articles.[5] Wikipedia is ranked among the ten most popular websites,[4] and constitutes the Internets largest and most popular general', function(response){
	console.log(response);
	//=> { LOCATION: [ 'Wikipedia' ], ORGANIZATION: [ 'Wikimedia Foundation'] }
	ner.close();
	//=>closes the socket connection
});
```


## API

### ner.init(options)

#### options

##### port

Type: `integer`<br>

Port on which NER server is running.

##### host

Type: `string`<br>

HOST of the NER server eg. localhost .

### ner.get(text, callback)

#### options

##### text

Type: `string`<br>

Text to be tagged

##### callback

Type: `function`<br>

Callback function which recieves the response object.

### ner.close()

Destroyes the client.

## License

MIT © [Nikhil Srivastava](https://niksrc.github.io)
