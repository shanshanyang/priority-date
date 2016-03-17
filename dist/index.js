'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cheerio = require('cheerio');
var request = require('request');
var Promise = require('bluebird');
var jsdom = require('jsdom');

var createID = function createID(month, year) {
  return month + '-' + year;
};

var parseScript = function parseScript(body) {
  return cheerio.load(body)('script[charset=utf-8]')[0].children[0].data.match(/([^\*\/]*)(?=\/\*)/g)[2];
};

var getData = function getData(body) {
  var _ref;

  jsdom.defaultDocumentFeatures = {
    FetchExternalResources: ['script'],
    ProcessExternalResources: ['script'],
    MutationEvents: '2.0',
    QuerySelector: false
  };

  var currentMonth = new Date().getUTCMonth() + 1,
      nextMonth = currentMonth + 1;

  if (nextMonth > 12) nextMonth = 1;

  var year = new Date().getFullYear(),
      window = jsdom.jsdom('<script>' + parseScript(body) + '</script>').defaultView,
      nextID = createID(nextMonth, year),
      currentID = createID(currentMonth, year);

  return _ref = {}, _defineProperty(_ref, nextID, window.upComingMonths), _defineProperty(_ref, currentID, window.thisMonths), _ref;
};

var priorityDate = function priorityDate(params) {
  var options = Object.assign({
    url: 'http://travel.state.gov/content/visas/en/immigrate/immigrant-process/approved/checkdate.html'
  }, params),
      defer = Promise.defer();

  request.get(options.url, function (error, response, body) {
    if (error || response.statusCode != 200) {
      defer.reject(error);
    } else {
      defer.resolve(getData(body));
    }
  });

  return defer.promise;
};

exports.default = priorityDate;