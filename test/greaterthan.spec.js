import {expect} from 'chai';
import validate, {greaterthan} from '../src/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {key: 'age',
        promises: [greaterthan],
        msg: (value, row, arg) => 'age greater than ' + arg,
        arg: 18
      }];
  describe('greater than success', done => {
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

    it('pass the validation', () => {
      expect(res).to.equal(true);
    });
  });

  describe('greater than failed', done => {
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

    it('fail the validation', () => {
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('age');
      expect(failed.age).to.be.an('array');
      expect(failed.age[0]).to.equal('age greater than 18');
    });
  });
});

