import { expect } from 'chai';
import { priorityDate } from './index';

describe('Priority-Date', function() {
    describe('general', function() {
        it('should not fail the request', function() {
           expect(true).to.be.true; 
        });
        
        it('currentMonth and nextMonth data should be different', function() {
            expect(priorityDate.current.familySponsered).to.not.equal(priorityDate.next.familySponsered);
        });
    });
    
    describe('current', function() {
        it('should be valid object', function() {
            expect(priorityDate.current).to.be.an('object');
        })
        
        it('should fetch current Month data', function() {
            var current_month = new Date().getUTCMonth() + 1;
            expect(priorityDate.current.month).to.equal(current_month);
        })
        
        it('familySponsered should have the required properties', function() {
           expect(priorityDate.current.familySponsered).have.all.keys('F1', 'F2a', 'F2b', 'F3', 'F4');
        })
        
        it('employmentBased should have the required properties', function() {
           expect(priorityDate.current.employmentBased).have.all.keys('first', 'second', 'third', 'otherWorkers', 'fourth', 'certainReligiousWorkers', 'fifth', 'fifthb');
        })
    });
   
   describe('next', function() {
        it('should be valid object', function() {
          expect(priorityDate.next).to.be.an('object');
        })
        
        it('should fetch next Month data', function() {
          var next_month = new Date().getUTCMonth() + 2;
          expect(priorityDate.next.month).to.equal(next_month);
        })
      
        it('familySponsered should have the required properties', function() {
           expect(priorityDate.next.familySponsered).have.all.keys('F1', 'F2a', 'F2b', 'F3', 'F4');
        })
        
        it('employmentBased should have the required properties', function() {
           expect(priorityDate.next.employmentBased).have.all.keys('first', 'second', 'third', 'otherWorkers', 'fourth', 'certainReligiousWorkers', 'fifth', 'fifthb');
        })
   });
});