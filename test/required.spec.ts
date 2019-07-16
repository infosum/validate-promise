import { expect } from 'chai';

import validate, {
  required,
  Validation,
} from '../src/index';

interface IDataCleanerRow {
  active: boolean;
  column: string | number;
  id: string;
  func: string;
  cutset?: string;
  prefix?: string;
  old?: string;
  new?: string;
  start?: string;
  end?: string;
}

const typedContract: Validation<IDataCleanerRow>[] = [
  {
    key: 'name',
    promises: [
      {
        rule: required,
      },
    ],
    msg: () => 'Name is required'
  }
];


describe('validates', () => {
  let res, failed,
    contract: Validation[] = [
      {
        key: 'name',
        promises: [
          {
            rule: required
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
    ],
    contractThree: Validation[] = [
      {
        key: 'name',
        promises: [{
          rule: required,
          msg: () => 'Custom error message'
        }],
        msg: () => 'Name is required'
      }
    ];

  describe('required success', () => {
    beforeEach((done) => {
      let contract: Validation[] = [
        {
          key: 'name',
          promises: [{
            rule: required
          }],
          msg: () => 'Name is required'
        }],
        data = {
          name: 'Rob'
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

  describe('required on typed validation contract', () => {
    beforeEach((done) => {
      let data = {
        name: 'heloo'
      };
      res = false;
      validate(typedContract, data)
        .then((data) => {
          res = data;
          done();
        })
        .catch((error) => {
          failed = error;
          done();
        });
    });
    it('passes validation', () => {
      expect(res).to.equal(true);
    })
  })

  describe('required - one fail and one success', () => {
    beforeEach((done) => {
      let data = {
        name: ''
      };

      validate(contractTwo, data)
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
      expect(failed).to.have.key('name');
      expect(failed.name).to.be.an('array');
      expect(failed.name[0]).to.equal('Name is required');
    });
  });

  describe('custom error message', () => {
    beforeEach((done) => {
      let data = {
        name: ''
      };

      validate(contractThree, data)
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
      expect(failed).to.have.key('name');
      expect(failed.name).to.be.an('array');
      expect(failed.name[0]).to.equal('Custom error message');
    });
  });

  describe('required failed', () => {
    beforeEach((done) => {
      let data = {
        name: ''
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
      expect(failed).to.have.key('name');
      expect(failed.name).to.be.an('array');
      expect(failed.name[0]).to.equal('Name is required');
    });
  });
});

