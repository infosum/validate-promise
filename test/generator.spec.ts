import { expect } from 'chai';

import {
  email,
  required,
} from '../src';
import { generateContract } from '../src/generator';

describe('generates a contract', () => {
  it('creates a contract', () => {
    const res = generateContract([
      { key: 'abc', rule: required, msg: '* Really required' },
      { key: 'fileName', rule: email, msg: '* Really required email' },
    ]);
    expect(res[0].key).to.equal('abc')
    expect(res[1].key).to.equal('fileName')

    if (typeof res[0].promises[0].msg === 'function') {
      expect(res?.[0]?.promises[0].msg()).to.equal('* Really required')
    } else {
      expect.fail(0, 1, 'message 0 should be a function');
    }
    if (typeof res[1].promises[0].msg === 'function') {
      expect(res[1].promises[0].msg()).to.equal('* Really required email')
    } else {
      expect.fail(0, 1, 'message 1 should be a function');
    }
  })

});

