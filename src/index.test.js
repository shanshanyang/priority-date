import { expect } from 'chai';
import priorityDate from './index';
let chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const month = new Date().getUTCMonth() + 1;
const year = new Date().getFullYear();
const keys = [`${month}-${year}`, `${month+1}-${year}`];
let result, current_familySponsered, current_employmentBased,next_familySponsered,next_employmentBased;
chai.use(chaiAsPromised);

describe('Priority-Date', function() {
    before(function() {
        result = priorityDate();
        current_familySponsered = priorityDate().then(function(obj) {
            return obj[keys[0]].familySponsered;
        });
        current_employmentBased = priorityDate().then(function(obj) {
            return obj[keys[0]].employmentBased;
        });
        next_familySponsered = priorityDate().then(function(obj) {
            return obj[keys[1]].familySponsered;
        });
        next_employmentBased = priorityDate().then(function(obj) {
            return obj[keys[1]].employmentBased;
        });
    });

    describe('General validation', function() {

				it('should return an object', function(done) {
						done();
						return expect(result).to.eventually.be.an('object');
				});

        it('should match the object keys', function(done) {
						done();
            return expect(result).to.eventually.have.all.keys(keys);
        });

        it('familySponsered currentMonth and nextMonth data should be different', function(done) {
						done();
						return expect(current_familySponsered).to.eventually.not.deep.equal(next_familySponsered);
        });

        it('employmentBased currentMonth and nextMonth data should be different', function(done) {
						done();
						return expect(current_employmentBased).to.eventually.not.deep.equal(next_employmentBased);
        });
    });

    describe('Current Month Data Validation', function() {
        it('familySponsered should have the required properties', function(done) {
						done();
						return expect(current_familySponsered).to.eventually.have.all.keys('F1', 'F2a', 'F2b', 'F3', 'F4');
        })

        it('employmentBased should have the required properties', function(done) {
						done();
						return expect(current_employmentBased).to.eventually.have.all.keys('first', 'second', 'third', 'otherWorkers', 'fourth', 'certainReligiousWorkers', 'fifth', 'fifthb');
        })
    });

   describe('Next Month Data Validation', function() {

        it('familySponsered should have the required properties', function(done) {
           done();
					 return expect(next_familySponsered).to.eventually.have.all.keys('F1', 'F2a', 'F2b', 'F3', 'F4');
        })

        it('employmentBased should have the required properties', function(done) {
           done();
					 return expect(next_employmentBased).to.eventually.have.all.keys('first', 'second', 'third', 'otherWorkers', 'fourth', 'certainReligiousWorkers', 'fifth', 'fifthb');
        })
   });
});
