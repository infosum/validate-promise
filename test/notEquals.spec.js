import { expect } from 'chai';
import validate, { notEquals } from '../dist/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {
        key: 'age',
        promises: [
          {
            rule: notEquals,
            arg: () => '17'
          }
        ],
        msg: (value, row, arg) => value + ' is equal to 17'
      }];
  describe('not equals success', done => {
    beforeEach(done => {
      let data = {
        age: '18'
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

  describe('not equals failed', done => {
    beforeEach(done => {
      let data = {
        age: '17'
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
      expect(failed.age[0]).to.equal('17 is equal to 17');
    });
  });
});

