import { priorityDate } from './index';

priorityDate().then(function(result) {
  console.log(result);
}, function(err) {
  console.log(err); // Error: "It broke"
});