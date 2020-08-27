import { expect } from 'chai';

import validate, { longerThan } from '../src/index';

describe('longer than', () => {
  let res, failed,
    contract = [
      {
        key: 'name',
        promises: [
          {
            rule: longerThan,
            arg: () => '10'
          }
        ],
        msg: (value, row, arg) => value + ' has less characters than 10'
      }];

  describe('success', () => {
    beforeEach(done => {
      let data = {
        name: '12345678901'
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

  describe('failed', () => {
    beforeEach(done => {
      let data = {
        name: '123456789'
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
      expect(failed).to.have.key('name');
      expect(failed.name).to.be.an('array');
      expect(failed.name[0]).to.equal('123456789 has less characters than 10');
    });
  });
});

