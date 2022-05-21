const querystring = require('querystring');

const url = 'http://www.opencanvas.co.uk?myName=Shaun&myAge=28&comment=Yes+I+am+getting+old';

const queryString = url.substring(url.indexOf('?') + 1);

const parsedUrl = querystring.parse(queryString);

