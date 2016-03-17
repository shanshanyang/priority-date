var cheerio = require('cheerio');
var request = require('request');
var Promise = require('bluebird');
var jsdom = require('jsdom');

let currentMonth = new Date().getUTCMonth() + 1,
      nextMonth = currentMonth + 1;

if (nextMonth > 12) nextMonth = 1;

const year = new Date().getFullYear();
let next = {},
    current = {};

const createID = (month, year) => {
	return `${month}-${year}`;
}
// request scrapper page
const parseData = (body) => {
	jsdom.defaultDocumentFeatures = {
	  FetchExternalResources: ['script'],
	  ProcessExternalResources: ['script'],
	  MutationEvents: '2.0',
	  QuerySelector: false
	}
	const $c = cheerio.load(body);
	let script = $c('script[charset=utf-8]')[0].children[0].data;
	// need to stip out the closure code for jsdom defaultView to work
	const regex = /([^\*\/]*)\/\*/g;
	script = script.match(regex)[1].replace('/*','');

	const window = jsdom.jsdom(`<script>${script}</script>`).defaultView;

	const nextData = window.upComingMonths;
	const currentData = window.thisMonths;

	next = Object.assign(next, nextData);
	current = Object.assign(current, currentData);
	const nextID = createID(nextMonth, year);
	const currentID = createID(currentMonth, year);
	return {[nextID]: next, [currentID]: current};
}

const priorityDate = params => {
// check params type
  var options = Object.assign({
      url: 'http://travel.state.gov/content/visas/en/immigrate/immigrant-process/approved/checkdate.html'
  },params);

  const defer = Promise.defer();
  request.get(options.url,
      function (error, response, body) {
        if(error || response.statusCode != 200) {
          defer.reject(error);
        } else {
          defer.resolve(parseData(body));
        }
    });
    return defer.promise;
};

export default priorityDate;
