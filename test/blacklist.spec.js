import {expect} from 'chai';
import validate, {blacklist} from '../dist/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {key: 'age',
        promises: [
          {
            rule: blacklist,
            arg: () => ['17']
          }
        ],
        msg: (value, row, arg) => value + ' not allowed'
      }];
  describe('blacklist success', done => {
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

    it('pass the validation', () => {
      expect(res).to.equal(true);
    });
  });

  describe('blacklist failed', done => {
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

    it('fail the validation', () => {
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('age');
      expect(failed.age).to.be.an('array');
      expect(failed.age[0]).to.equal('17 not allowed');
    });
  });
});

