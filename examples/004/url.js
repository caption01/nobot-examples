const url = require('url');
const querystring = require('querystring');

const args = process.argv.slice(2);

const [urlEntered] = args;

if (urlEntered === undefined) {
  console.error('Please provide this url: https://www.google.co.uk/search?q=stranger-things&name=bom');
  process.exit(0);
}

const {
  protocol, slashes, host, query, href
} = url.parse(urlEntered);

const queryParse = querystring.parse(query);

console.log(`Using Protocol: ${protocol}`);
console.log(`Using slashes: ${slashes}`);
console.log(`host: ${host}`);
console.log('queryParse', queryParse);
console.log(`href: ${href}`);
