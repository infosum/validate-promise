import {expect} from 'chai';
import validate, {required} from '../dist/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {
        key: 'name',
        promises: [
          {
            rule: required,
          }
        ],
        msg: () => 'Name is required'
      }
    ],
    contractTwo = [
      contract[0],
      {
        key: 'name',
        promises: [
          {
            rule: () => Promise.resolve()
          }
        ],
        msg: () => 'Should pass'
      }
    ];

  describe('required success', done => {
    beforeEach(done => {
      let contract = [
        {
          key: 'name',
          promises: [{
            rule: required
          }],
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

  describe('required - one fail and one success', done => {
      beforeEach(done => {
        let data = {
          name: ''
        }

        validate(contractTwo, data)
        .then(data => {
          done();
        })
        .catch(error => {
          failed = error;
          console.log('.....failed', failed);
          done();
        });
      });

      it('fails the validation', () => {
        expect(failed).to.be.an('object');
        expect(failed).to.have.key('name');
        expect(failed.name).to.be.an('array');
        expect(failed.name[0]).to.equal('Name is required');
      });
  })

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

    it('fails the validation', () => {
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('name');
      expect(failed.name).to.be.an('array');
      expect(failed.name[0]).to.equal('Name is required');
    });
  });
});

