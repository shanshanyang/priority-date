# Green Card Priority Dates

[![travis build](https://api.travis-ci.org/shanshanyang/priority-date.svg)](https://travis-ci.org/shanshanyang/priority-date)
[![version](https://img.shields.io/npm/v/priority-date.svg)](https://www.npmjs.com/package/priority-date)
[![MIT License](https://img.shields.io/npm/l/priority-date.svg)](https://opensource.org/licenses/MIT)

> priority-date gives you all the most recent priority date data from the U.S. Visa website.

## Usage
```js
import priorityDate from 'priority-date';

priorityDate().then(function(result) {
  console.log(result); // Priority Date data
}, function(err) {
  console.log(err); // Error
});
```
