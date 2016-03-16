import { cheerio } from 'cheerio';
import { requestPromise } from 'request-promise';

let currentMonth = new Date().getUTCMonth() + 1,
      nextMonth = currentMonth + 1;
      
if (nextMonth > 12) nextMonth = 1;

let next = Object.assign({}, {'month': nextMonth}), 
    current = Object.assign({}, {'month': currentMonth});
    
const parseData = (matchString, $) => {
  
  const upcomingmonth = $(`script:contains(${matchString})`)
                          .eq(1).text()
                          .replace('thisMonths = {}', '')
                          .replace(/,\s*}/g, '}') // remove the comma after last property of object
                          .replace(/(\r\n|\n|\r)/gm, "")
                          .split(';')[1]
                          .split('\t\t\t')
                          .join('')
                          .split('\n\t')
                          .join('')
                          .split('upComingMonths');
      
  // clean up the data
  let familysponsored = upcomingmonth[1]
                        .replace('.', '')
                        .replace('=', ':');
  let employmentBased = upcomingmonth[2]
                        .replace('.', '')
                        .replace('=', ':');
                        
  // add double quote to all words
  var regex = /\w+(?= :)/g;
  
  var addQuote = function(match) {
    return '"' + match + '"';
  };
  
  familysponsored = JSON.parse('{' + familysponsored.replace(regex, addQuote) + '}');
  employmentBased = JSON.parse('{' + employmentBased.replace(regex, addQuote) + '}');
  
  return Object.assign(familysponsored, employmentBased);

};

// request scrapper page
export const priorityDate = ownOptions => {
   
  var options = {
      uri: 'http://travel.state.gov/content/visas/en/immigrate/immigrant-process/approved/checkdate.html',
      transform: function (body) {
          return cheerio.load(body);
      }
  };
   
  requestPromise(options)
    .then(function ($) {
        // Process html like you would with jQuery... 
      const nextData = parseData('upComingMonths', $),
            currentData = parseData('thisMonths', $);
            
      next = Object.assign(next, nextData);
      current = Object.assign(current, currentData);
      console.log(current);
      return {'current': current, 'next': next};
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked... 
        console.warn(err);
    });
};