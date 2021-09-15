import { expect } from 'chai';

import validate, { excludes } from '../src/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {
        key: 'name',
        promises: [
          {
            rule: excludes,
            arg: () => [';']
          }
        ],
        msg: (value, row, arg) => value + ' not allowed'
      }];

  describe('exclude success', () => {
    beforeEach(done => {
      let data = {
        name: 'Bob'
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

  describe('exclude failed', () => {
    beforeEach(done => {
      let data = {
        name: 'test ; test'
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
      console.log('failed', failed);
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('name');
      expect(failed.name).to.be.an('array');
      expect(failed.name[0]).to.equal('test ; test not allowed');
    });

  });
});

