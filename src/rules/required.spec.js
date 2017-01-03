import {expect} from 'chai';
import validate, {required} from '../../src/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {
        key: 'name',
        promises: [required],
        msg: () => 'Name is required'
      }
    ];
  describe('required success', done => {
    beforeEach(done => {
      let contract = [
        {
          key: 'name',
          promises: [required],
          msg: () => 'Name is required'
        }
        ],
        data = {
          name: 'Rob'
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

  describe('required failed', done => {
    beforeEach(done => {
      let data = {
        name: ''
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
      expect(failed).to.have.key('name');
      expect(failed.name).to.be.an('array');
      expect(failed.name[0]).to.equal('Name is required');
    });
  });
});

