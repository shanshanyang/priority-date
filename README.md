# Green Card Priority Date

[![travis build](https://api.travis-ci.org/shanshanyang/priority-date.svg)](https://travis-ci.org/shanshanyang/priority-date)
[![version](https://img.shields.io/npm/v/priority-date.svg)](https://www.npmjs.com/package/priority-date)
[![Coverage Status](https://coveralls.io/repos/github/shanshanyang/priority-date/badge.svg?branch=master)](https://coveralls.io/github/shanshanyang/priority-date?branch=master)
[![dependencies](https://david-dm.org/shanshanyang/priority-date.svg)](https://david-dm.org/shanshanyang/priority-date#info=dependencies)
[![devDependencies](https://david-dm.org/shanshanyang/priority-date/dev-status.svg)](https://david-dm.org/shanshanyang/priority-date#info=devDependencies)
[![MIT License](https://img.shields.io/npm/l/priority-date.svg)](https://opensource.org/licenses/MIT)

> priority-date gives you all the most recent priority date data from the U.S. Visa website.

## Usage
```js
// ES6
import priorityDate from 'priority-date';
// CommonJS
// var priorityDate = require('priority-date').default;

priorityDate().then(function(result) {
  console.log(result); // Priority Date data
}, function(err) {
  console.log(err); // Error
});
```
