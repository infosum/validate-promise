import {expect} from 'chai';
import validate, {after} from '../dist/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {key: 'age',
        promises: [
          {
            rule: after,
            arg: () => '3 Jan 2016'
          }
        ],
        msg: (value, row, arg) => value + ' not after 3 Jan 2016'
      }];
  describe('isafter than success', done => {
    beforeEach(done => {
      let data = {
        age: '4 Jan 2016'
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

  describe('isafter than failed', done => {
    beforeEach(done => {
      let data = {
        age: '1 Jan 2016'
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
      expect(failed.age[0]).to.equal('1 Jan 2016 not after 3 Jan 2016');
    });
  });
});

