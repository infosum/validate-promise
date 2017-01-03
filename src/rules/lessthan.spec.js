import {expect} from 'chai';
import validate, {lessthan} from '../../src/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {key: 'age',
        promises: [lessthan],
        msg: (value, row, arg) => 'age less than ' + arg,
        arg: 18
      }];
  describe('less than success', done => {
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

    it('pass the validation', () => {
      expect(res).to.equal(true);
    });
  });

  describe('less than failed', done => {
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

    it('fail the validation', () => {
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('age');
      expect(failed.age).to.be.an('array');
      expect(failed.age[0]).to.equal('age less than 18');
    });
  });
});

