var cheerio = require('cheerio');
var request = require('request');
var Promise = require('bluebird');
var jsdom = require('jsdom');

const createID = (month, year) => {
	return `${month}-${year}`;
};

const parseData = body => {
  
	jsdom.defaultDocumentFeatures = {
	  FetchExternalResources: ['script'],
	  ProcessExternalResources: ['script'],
	  MutationEvents: '2.0',
	  QuerySelector: false
	}
	
  let currentMonth = new Date().getUTCMonth() + 1,
        nextMonth = currentMonth + 1;
  
  if (nextMonth > 12) nextMonth = 1;

	const year = new Date().getFullYear(),
	      script = cheerio.load(body)('script[charset=utf-8]')[0]
	                .children[0]
	                .data.match(/([^\*\/]*)(?=\/\*)/g)[1],
	      window = jsdom.jsdom(`<script>${script}</script>`).defaultView,
	      nextID = createID(nextMonth, year),
	      currentID = createID(currentMonth, year);
	
	return {
	  [nextID]: window.upComingMonths, 
	  [currentID]: window.thisMonths
	};
	
};

const priorityDate = params => {
  const options = Object.assign({
                      url: 'http://travel.state.gov/content/visas/en/immigrate/immigrant-process/approved/checkdate.html'
                  },params),
        defer = Promise.defer();
        
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
