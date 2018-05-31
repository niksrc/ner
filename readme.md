# ner

> Client for Stanford NER

## Requirements
[Stanford NER](http://nlp.Stanford.edu/software/CRF-NER.shtml)

## Starting up Stanford NER
Use [ner-server.sh](ner-server.sh)

## Install

```
$ npm install --save ner
```


## Usage

```js
const NER = require('ner');

const ner = new NER({
	port:8080,
	host:'172.17.0.2'
})

ner.get('Wikipedia is a free-access, free-content Internet encyclopedia, supported and hosted by the non-profit Wikimedia Foundation. Those who can access the site can edit most of its articles.[5] Wikipedia is ranked among the ten most popular websites,[4] and constitutes the Internets largest and most popular general', (err, res) => {
	console.log(res.entities);
});
```


## API

### new instance

#### options

##### port

Type: `integer`<br>

Port on which NER server is running.

##### host

Type: `string`<br>

HOST of the NER server eg. localhost .

### ner.get(text, callback)

#### parms

#### text

Type: `string`<br>

Text to be tagged

#### callback(err, response)

Type: `function`<br>

Callback function which recieves the response object.

##### response.entities

Parsed entities from the xml server response.

##### response.raw

Raw xml response from server

##### response._parsed

Internal parser representation (regex matches)

## License

MIT © [Nikhil Srivastava](https://niksrc.github.io)
