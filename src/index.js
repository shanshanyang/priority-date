var cheerio = require('cheerio');
var request = require('request');
var Promise = require('bluebird');
var jsdom = require('jsdom');

jsdom.defaultDocumentFeatures = {
  FetchExternalResources: ['script'],
  ProcessExternalResources: ['script'],
  MutationEvents: '2.0',
  QuerySelector: false
}

let currentMonth = new Date().getUTCMonth() + 1,
      nextMonth = currentMonth + 1;
      
if (nextMonth > 12) nextMonth = 1;

let next = Object.assign({}, {'month': nextMonth}), 
    current = Object.assign({}, {'month': currentMonth});
   
// request scrapper page
export const priorityDate = params => {
   
  var options = Object.assign({
      url: 'http://travel.state.gov/content/visas/en/immigrate/immigrant-process/approved/checkdate.html'
  },params);
  
  const defer = Promise.defer();
   
  request.get(options.url, 
      function (error, response, body) {
        if(error || response.statusCode != 200) {
          defer.reject(error);
        } else {
          const $c = cheerio.load(body);
          const script = $c('script[charset=utf-8]')[0].toString();
          const window = jsdom.jsdom(script).defaultView;

          const nextData = window.upComingMonths;
          const currentData = window.thisMonths;
          console.log(nextData)
                  
          next = Object.assign(next, nextData);
          current = Object.assign(current, currentData);
          defer.resolve({current,next});
        }
    });
    
    return defer.promise;
};