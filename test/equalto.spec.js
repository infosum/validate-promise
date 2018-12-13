import {expect} from 'chai';
import validate, {equalto} from '../dist/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {
        key: 'equalto',
        promises: [
          {
            rule: equalto,
            arg: () => 'test'
          }
        ],
        msg: (value, row, arg) => value + ' is not equal'
      }];
  describe('equal to success', (done) => {
    beforeEach((done) => {
      let data = {
        test: 'hello',
        equalto: 'test'
      };

      validate(contract, data)
        .then((data) => {
          res = data;
          done();
        })
        .catch((error) => console.log(error) || done());
    });

    it('passes the validation', () => {
      expect(res).to.equal(true);
    });
  });

  describe('equal to failed', (done) => {
    beforeEach((done) => {
      let data = {
        test: 'goodbye',
        equalto: 'hello'
      };

      validate(contract, data)
        .then((data) => done())
        .catch((error) => {
          failed = error;
          done();
        });
    });

    it('fails the validation', () => {
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('equalto');
      expect(failed.equalto).to.be.an('array');
      expect(failed.equalto[0]).to.equal('hello is not equal');
    });
  });
});

