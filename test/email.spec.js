import {expect} from 'chai';
import validate, {email} from '../dist/index';

describe('validates', () => {
  let res, failed,
    contract = [
      {
        key: ['user', 'email'],
        promises: [
          {
            rule: email
          }
        ],
        msg: (value, row, arg) => value + ' is not an email'
      }];
  describe('email success?', (done) => {
    beforeEach((done) => {
      let data = {
        user: {
          email: 'test@test.com',
        },
      };

      validate(contract, data)
        .then((data) => {
          res = data;
          done();
        })
        .catch((error) => done());
    });

    it('passes the validation', () => {
      expect(res).to.equal(true);
    });
  });

  describe('email failed', (done) => {
    beforeEach((done) => {
      let data = {
        user: {
          email: 'dooo',
        },
      };

      validate(contract, data)
        .then((data) => {
          done();
        })
        .catch((error) => {
          failed = error;
          done();
        });
    });

    it('fails the validation', () => {
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('user');
      expect(failed.user).to.have.key('email');
      expect(failed.user.email[0]).to.equal('dooo is not an email');
    });
  });
});

