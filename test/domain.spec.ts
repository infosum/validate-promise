import {
  expect,
  use,
} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import validate, {
  domain,
  Validation,
} from '../src';

use(chaiAsPromised);

const domains = ['abc.com', 'infosum.com', 'bah.humbug'];

const contract: Array<Validation<any>> = [
  {
    key: 'domains',
    promises: [
      {
        rule: domain(domains),
      }
    ],
    msg: (value, row, arg) => value + ' is not a valid domain: ' + arg.type,
  }];

describe('domain validation', () => {
  it('validates a good domain', async () => {
    await expect(validate(contract, { domains: ['test.com'] })).to.eventually.equal(true);
  });

  it('validates a good domain', async () => {
    await expect(validate(contract, { domains: 'test.com' })).to.eventually.equal(true);
  });

  it('invalidates a domain with @ symbol', async () => {
    await expect(validate(contract, { domains: ['test@test.com'] })).to.be.rejected;
  });

  it('invalidates a domain with two full stops', async () => {
    await expect(validate(contract, { domains: ['test.com.bah'] })).to.be.rejected;
  });

  it('invalidates a domain which already exists regardless of case', async () => {
    await expect(validate(contract, { domains: ['abC.com'] })).to.be.rejected;
  });
});
