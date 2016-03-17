'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cheerio = require('cheerio');
var request = require('request');
var Promise = require('bluebird');
var jsdom = require('jsdom');

var currentMonth = new Date().getUTCMonth() + 1,
    nextMonth = currentMonth + 1;

if (nextMonth > 12) nextMonth = 1;

var year = new Date().getFullYear();
var next = {},
    current = {};

var createID = function createID(month, year) {
				return month + '-' + year;
};
// request scrapper page
var parseData = function parseData(body) {
				var _ref;

				jsdom.defaultDocumentFeatures = {
								FetchExternalResources: ['script'],
								ProcessExternalResources: ['script'],
								MutationEvents: '2.0',
								QuerySelector: false
				};
				var $c = cheerio.load(body);
				var script = $c('script[charset=utf-8]')[0].children[0].data;
				// need to stip out the closure code for jsdom defaultView to work
				var regex = /([^\*\/]*)(?=\/\*)/g;
				script = script.match(regex)[1];

				var window = jsdom.jsdom('<script>' + script + '</script>').defaultView;

				var nextData = window.upComingMonths;
				var currentData = window.thisMonths;

				next = Object.assign(next, nextData);
				current = Object.assign(current, currentData);
				var nextID = createID(nextMonth, year);
				var currentID = createID(currentMonth, year);
				return _ref = {}, _defineProperty(_ref, nextID, next), _defineProperty(_ref, currentID, current), _ref;
};

var priorityDate = function priorityDate(params) {
				// check params type
				var options = Object.assign({
								url: 'http://travel.state.gov/content/visas/en/immigrate/immigrant-process/approved/checkdate.html'
				}, params);

				var defer = Promise.defer();
				request.get(options.url, function (error, response, body) {
								if (error || response.statusCode != 200) {
												defer.reject(error);
								} else {
												defer.resolve(parseData(body));
								}
				});
				return defer.promise;
};

exports.default = priorityDate;
