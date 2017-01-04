import {expect} from 'chai';
import validate, {lessthan} from '../dist/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {key: 'age',
        promises: [
          {
            rule: lessthan,
            arg: () => 18
          }
        ],
        msg: (value, row, arg) => 'age less than 18'
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

    it('passes the validation', () => {
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

    it('fails the validation', () => {
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('age');
      expect(failed.age).to.be.an('array');
      expect(failed.age[0]).to.equal('age less than 18');
    });
  });
});

