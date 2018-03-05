import { expect } from 'chai';
import validate, { regex } from '../dist/index';

describe.only('validates', () => {
  const contract = [
    {
      key: 'string',
      promises: [
        {
          rule: regex,
          arg: () => '^[a-z]+$'
        }
      ],
      msg: (value, row, arg) => value + ' not formed of lowercase characters'
    }
  ];

  describe('regex success', () => {
    let res;

    beforeEach(done => {
      let data = {
        string: 'abc'
      };

      validate(contract, data)
        .then(data => {
          res = data;
          done();
        })
        .catch(done);
    });

    it('should validate', () => {
      expect(res).to.equal(true);
    })
  })

  describe('regex fail', () => {
    let res;

    beforeEach(done => {
      let data = {
        string: 'abc2'
      };

      validate(contract, data)
        .then(data => {
          res = data;
          done();
        })
        .catch((err) => {
          res = err;
          done()
        });
    });

    it('should invalidate', () => {
      expect(res).to.deep.equal({string: ['abc2 not formed of lowercase characters']});
    });
  });
 });
