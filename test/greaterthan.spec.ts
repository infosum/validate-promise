import { expect } from 'chai';

import validate, { greaterthan } from '../src/index';

describe('validates', () => {
  let res, failed, resReturnObject,
    contract = [
      {
        key: 'age',
        promises: [
          {
            rule: greaterthan,
            arg: () => 18
          }
        ],
        msg: (value, row, arg) => 'age greater than 18'
      }],

      contractReturnObject = [
        {
        key: 'age',
        promises: [
          {
            rule: greaterthan,
            arg: () => ({compare: 18, value: 19})
          }
        ],
        msg: (value, row, arg) => 'age (19) greater than 18'
      }];

  describe('greater than success', () => {
    beforeEach(done => {
      let data = {
        age: '19'
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

  describe('greater than success: return object', () => {
    beforeEach(done => {
      let data = {
        age: '19'
      };

      validate(contractReturnObject, data)
        .then(data => {
          resReturnObject = data;
          done();
        })
        .catch(error => done());
    });

    it('passes the validation', () => {
      expect(resReturnObject).to.equal(true);
    });
  });

  describe('greater than failed', () => {
    beforeEach(done => {
      let data = {
        age: '16'
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
      expect(failed.age[0]).to.equal('age greater than 18');
    });
  });
});

