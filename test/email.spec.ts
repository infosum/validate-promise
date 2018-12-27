import { expect } from 'chai';

import validate, { email } from '../src/index';

describe('validates', () => {
  let success, failed,
    contract = [
      {
        key: ['user', 'email'],
        promises: [
          {
            rule: email
          }
        ],
        msg: (value, row, arg) => value + ' is not an email'
      },
      {
        key: ['user', 'email2'],
        promises: [
          {
            rule: email
          }
        ],
        msg: (value, row, arg) => value + ' is not an email'
      },
    ];
  describe('email success?', () => {
    beforeEach((done) => {
      let data = {
        user: {
          email: 'test@test.com',
          email2: 'doo@test.com',
        },
      };

      validate(contract, data)
        .then((res) => {
          success = res;
          done();
        })
        .catch((error) => done());
    });

    it('passes the validation', () => {
      expect(success).to.equal(true);
    });
  });

  describe('email failed', () => {
    beforeEach((done) => {
      let data = {
        user: {
          email: 'dooo',
          email2: 'test'
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
      expect(failed.user).to.have.property('email');
      expect(failed.user.email[0]).to.equal('dooo is not an email');
    });
  });
});

