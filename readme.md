# ner

> Client for Stanford NER

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/UozgfSN2pxKtzVMwLa6GdfMR/niksrc/ner'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/UozgfSN2pxKtzVMwLa6GdfMR/niksrc/ner.svg' />
</a>

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
const ner = require('ner');

ner.get({
	port:8080,
	host:'localhost'
}, 'Wikipedia is a free-access, free-content Internet encyclopedia, supported and hosted by the non-profit Wikimedia Foundation. Those who can access the site can edit most of its articles.[5] Wikipedia is ranked among the ten most popular websites,[4] and constitutes the Internets largest and most popular general', function(err, res){
	console.log(res.entities);
	//=> { LOCATION: [ 'Wikipedia' ], ORGANIZATION: [ 'Wikimedia Foundation'] }
});
```


## API

### ner.get(options, text, callback)

#### options

##### port

Type: `integer`<br>

Port on which NER server is running.

##### host

Type: `string`<br>

HOST of the NER server eg. localhost .

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
