import { expect } from 'chai';

import validate, { url } from '../src/index';

describe('validates', () => {
  const contract = [
    {
      key: 'string',
      promises: [
        {
          rule: url
        }
      ],
      msg: (value, row, arg) => value + ' not a valid url'
    }
  ];

  describe('url http success', () => {
    let res;

    beforeEach(done => {
      let data = {
        string: 'http://validurl.com'
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

  describe('url https success', () => {
    let res;

    beforeEach(done => {
      let data = {
        string: 'https://validurl.com'
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

  describe('url no http(s) success', () => {
    let res;

    beforeEach(done => {
      let data = {
        string: 'validurl.com'
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

  describe('url with upper case valid', () => {
    let res;

    beforeEach(done => {
      let data = {
        string: 'VALID-url.com'
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

  describe('url success when empty', () => {
    let res;

    beforeEach(done => {
      let data = {
        string: ''
      };

      validate(contract, data)
        .then(data => {
          res = data;
          done();
        })
        .catch(done);
    });

    it('should validate when empty', () => {
      expect(res).to.equal(true);
    })
  })

  describe('url fail', () => {
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
      expect(res).to.deep.equal({ string: ['abc2 not a valid url'] });
    });
  });
});
