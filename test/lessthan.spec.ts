import { expect } from 'chai';

import validate, { lessthan } from '../src/index';

describe('validates', () => {
  let res, failed, resLessThanSuccess,
    contract = [
      {key: 'age',
        promises: [
          {
            rule: lessthan,
            arg: () => 18
          }
        ],
        msg: (value, row, arg) => 'age less than 18'
      }],

       contractReturnObject = [
        {
        key: 'age',
        promises: [
          {
            rule: lessthan,
            arg: () => ({compare: 21, value: 19})
          }
        ],
        msg: (value, row, arg) => 'age (19) less than 21'
      }];

  describe('less than success', () => {
    beforeEach(done => {
      let data = {
        age: '17'
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

  describe('less than success: return object', () => {
    beforeEach(done => {
      let data = {
        age: '17'
      };

      validate(contractReturnObject, data)
        .then(data => {
          resLessThanSuccess = data;
          done();
        })
        .catch(error => done());
    });

    it('passes the validation', () => {
      expect(resLessThanSuccess).to.equal(true);
    });
  });

  describe('less than failed', () => {
    beforeEach(done => {
      let data = {
        age: '19'
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
      expect(failed.age[0]).to.equal('age less than 18');
    });
  });
});

