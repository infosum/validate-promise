# validation-promise
Promised based validation library

## Installation

```
npm install validate-promise
```

## Usage

Validates an object against a specified validation contract

```javascript
import validate, {int} from 'validation-promise';

var contract = [
  {
    key: 'age', // index to validate in data
    promises: [{
      rule: int,
      arg: (value, row) => 5
    }], // array of validations
    msg: (value, row, arg) => value + ' not an int',

  }
];

var data = {
  age: '11'
};

validate(contract, data)
  .then(() => {
    // The validations have passed...
  })
  .catch(error => {
    // Validations failed - error is an object keyed on data keys, and containing an array of error messages.
  });
```

## Validations

### After

```javascript
contract = [
  {
    key: 'age',
    promises: [
      {
        rule: after,
        arg: () => '3 Jan 2016'
      }
    ],
    msg: (value, row, arg) => value + ' not after 3 Jan 2016'
  }];

```
Determines if a date value is earlier than the supplied argument.
The rule's arg should return a string compatible with Date.parse()

### Before

```javascript
contract = [
  {
    key: 'age',
    promises: [{
      rule: before,
      arg: () => '3 Jan 2016'
    }
    ],
    msg: (value, row, arg) => value + ' not before 3 Jan 2016'
  }];
```

Determines if a date value is later than the supplied argument.
The rule's arg should return a string compatible with Date.parse()

### Blacklist

```javascript
contract = [
  {
    key: 'age',
    promises: [
      {
        rule: blacklist,
        arg: () => ['17', 'abc', 'foo']
      }
    ],
    msg: (value, row, arg) => value + ' not allowed'
  }];
```

Validate that the supplied value is not contained within the argument black list.

### Greaterthan

```javascript
contract = [
  {
    key: 'sales',
    promises: [
      {
        rule: greaterthan,
        arg: () => 0
      }
    ],
    msg: (value, row, arg) => 'Sales must be greater than 0'
  }]
```
Tests a value is greater than the supplied argument

### Int

```javascript
contract2 = [
  {
    key: 'age',
    promises: [
      {
        rule: int,
        arg: () => ({min: 18, max: 55})
      }
    ],
    msg: (value, row, arg) => value + ' not an int'
  }]
```
Tests if value can be coerced to an integer. Optionally you can supply a
min/max object from the arg function. If supplied the integer must fall within this range to be valid.

### Lessthan

```javascript
contract = [
  {
    key: 'age',
    promises: [
      {
        rule: lessthan,
        arg: () => 18
      }
    ],
    msg: (value, row, arg) => 'age less than 18'
  }];
```
Test a value is less than the supplied argument.

### Required

```javascript
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
];
```

### Whitelist

```javascript
contract = [
  {
    key: 'age',
    promises: [
      {
        rule: whitelist,
        arg: () => ['17', 'abc', 'foo']
      }
    ],
    msg: (value, row, arg) => value + ' not allowed'
  }];
```

Validate that the supplied value is contained within the argument whitelist.
