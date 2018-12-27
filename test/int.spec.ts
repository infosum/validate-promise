import { expect } from 'chai';

import validate, { int } from '../src/index';

describe('validates', () => {
  let res, resMin, failed, failedMin,
    contract = [
      {key: 'age',
        promises: [{
          rule: int
        }],
        msg: (value, row, arg) => value + ' not an int'
      }],
    contract2 = [
      {key: 'age',
        promises: [
          {
            rule: int,
            arg: () => ({min: 18, max: 55})
          }
        ],
        msg: (value, row, arg) => value + ' not an int'
      }];
  describe('int success', () => {
    beforeEach(done => {
      let data = {
        age: '11'
      };

      validate(contract, data)
        .then(data => {
          res = data;
          done();
        })
        .catch(error => done());
    });

    it('passes the validation', () => {
      expect(res).to.equal(true);
    });
  });

  describe('int success passes min text', () => {
    beforeEach(done => {
      let data = {
        age: '19'
      };

      validate(contract2, data)
        .then(data => {
          resMin = data;
          done();
        })
        .catch(error => done());
    });

    it('passes the validation', () => {
      expect(resMin).to.equal(true);
    });
  });

  describe('int failed', () => {
    beforeEach(done => {
      let data = {
        age: 'abc'
      };

      validate(contract, data)
        .then(data => {
          done();
        })
        .catch(error => {
          failed = error;
          done();
        });
    });

    it('fails the validation', () => {
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('age');
      expect(failed.age).to.be.an('array');
      expect(failed.age[0]).to.equal('abc not an int');
    });
  });

  describe('int min test failed', () => {
    beforeEach(done => {
      let data = {
        age: '7'
      };

      validate(contract2, data)
        .then(data => {
          done();
        })
        .catch(error => {
          failedMin = error;
          done();
        });
    });

    it('fails the validation', () => {
      expect(failedMin).to.be.an('object');
      expect(failedMin).to.have.key('age');
      expect(failedMin.age).to.be.an('array');
      expect(failedMin.age[0]).to.equal('7 not an int');
    });
  });
});

