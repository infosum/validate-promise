import { expect } from 'chai';

import validate, { atleastOneRequired } from '../src/index';

describe('validates', () => {
  let res;
  let failed;

  const contract = [
    {
      key: 'name',
      keys: ['name', 'age'],
      promises: [{
        rule: atleastOneRequired
      }],
      msg: () => 'Name or age is required'
    }];
  describe('at least one atleastOneRequired success', () => {

    beforeEach((done) => {
      let data = {
        name: 'Rob',
        age: '',
      };

      validate(contract, data)
        .then((data) => {
          res = data;
          done();
        })
        .catch((error) => done());

    })
    it('passes the validation', () => {
      expect(res).to.equal(true);
    });

  });

  describe('at least one atleastOneRequired failure', () => {

    beforeEach((done) => {
      let data = {
        name: '',
        age: '',
      };

      validate(contract, data)
        .then((data) => {
          done();
        })
        .catch((error) => {
          failed = error;
          done();
        });

    })
    it('fails the validation', () => {
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('name');
      expect(failed.name).to.be.an('array');
      expect(failed.name[0]).to.equal('Name or age is required');
    });

  });
});
