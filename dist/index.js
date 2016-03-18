'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cheerio = require('cheerio'),
    request = require('request'),
    Promise = require('bluebird'),
    jsdom = require('jsdom');

var createObjectKeys = function createObjectKeys() {
  var currentMonth = new Date().getUTCMonth() + 1,
      nextMonth = currentMonth === 12 ? 1 : currentMonth + 1,
      year = new Date().getFullYear();

  return [currentMonth + '-' + year, nextMonth + '-' + year];
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
  var window = jsdom.jsdom('<script>' + parseScript(body) + '</script>').defaultView,
      keys = createObjectKeys();

  return _ref = {}, _defineProperty(_ref, keys[1], window.upComingMonths), _defineProperty(_ref, keys[0], window.thisMonths), _ref;
};

var priorityDate = function priorityDate(params) {
  var _url = 'http://travel.state.gov/content/visas/en/immigrate/immigrant-process/approved/checkdate.html';
  var options = Object.assign({ url: _url }, params),
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
