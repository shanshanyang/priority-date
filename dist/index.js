'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var cheerio = require('cheerio');
var request = require('request');
var Promise = require('bluebird');
var jsdom = require('jsdom');

jsdom.defaultDocumentFeatures = {
  FetchExternalResources: ['script'],
  ProcessExternalResources: ['script'],
  MutationEvents: '2.0',
  QuerySelector: false
};

var currentMonth = new Date().getUTCMonth() + 1,
    nextMonth = currentMonth + 1;

if (nextMonth > 12) nextMonth = 1;

var next = Object.assign({}, { 'month': nextMonth }),
    current = Object.assign({}, { 'month': currentMonth });

// request scrapper page
var priorityDate = exports.priorityDate = function priorityDate(params) {

  var options = Object.assign({
    url: 'http://travel.state.gov/content/visas/en/immigrate/immigrant-process/approved/checkdate.html'
  }, params);

  var defer = Promise.defer();

  request.get(options.url, function (error, response, body) {
    if (error || response.statusCode != 200) {
      defer.reject(error);
    } else {
      var $c = cheerio.load(body);
      var script = $c('script[charset=utf-8]')[0].toString();
      var window = jsdom.jsdom(script).defaultView;

      var nextData = window.upComingMonths;
      var currentData = window.thisMonths;
      console.log(nextData);

      next = Object.assign(next, nextData);
      current = Object.assign(current, currentData);
      defer.resolve({ current: current, next: next });
    }
  });

  return defer.promise;
};
