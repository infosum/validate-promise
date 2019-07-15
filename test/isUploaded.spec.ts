import { expect } from 'chai';

import validate, { isUploaded } from '../src/index';

describe('validates', () => {
  let res;
  let failed;

  const contract = [
    {
      key: 'upload',
      promises: [{
        rule: isUploaded
      }],
      msg: () => 'File not uploaded'
    }];
  describe('isUploaded file at 100%', () => {

    beforeEach((done) => {
      let data = {
        upload: {
          file1: '100',
        },
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

  describe('all files uploaded 100%', () => {

    beforeEach((done) => {
      let data = {
        upload: {
          file1: '100',
          file2: '100',
        },
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

  describe('file not uploaded ', () => {

    beforeEach((done) => {
      let data = {
        upload: {
          file1: '50',
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

    })
    it('fails the validation', () => {
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('upload');
      expect(failed.upload).to.be.an('array');
      expect(failed.upload[0]).to.equal('File not uploaded');
    });

  });

  describe('not all files uploaded ', () => {

    beforeEach((done) => {
      let data = {
        upload: {
          file1: '50',
          file2: '100',
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

    })
    it('fails the validation', () => {
      console.log('failed', failed);
      expect(failed).to.be.an('object');
      expect(failed).to.have.key('upload');
      expect(failed.upload).to.be.an('array');
      expect(failed.upload[0]).to.equal('File not uploaded');
    });

  });
});
