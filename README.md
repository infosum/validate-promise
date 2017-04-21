# validate-promise
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

# Custom error messages per validation

Each validation promise object can have a custom msg function. If supplied this is used in preference to the default msg() function

```javascript
import validate, {int} from 'validation-promise';

var contract = [
  {
    key: 'age', // index to validate in data
    promises: [{
      rule: int,
      arg: (value, row) => 5,
      msg: (value, row, arg) => value + ' is REALLY NOT AN INT'
    }], // array of validations
    msg: (value, row, arg) => value + ' not an int',

  }
];

var data = {
  age: 'CHICKEN'
};

validate(contract, data)
  .then(() => {
    // The validations have passed...
  })
  .catch(error: string[] => {
    // Will be :
    // ['CHICKEN IS REALLY NOT AN INT']
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

### Equals

```javascript
contract = [
  {
    key: 'age',
    promises: [
      {
        rule: equals,
        arg: () => '17'
      }
    ],
    msg: (value, row, arg) => value + ' is not 17'
  }];
```

Validate that the supplied value is is loosely equal to the argument.

### Equal to

```javascript
contract = [
  {
    key: 'age',
    promises: [
      {
        rule: equalto,
        arg: () => 'other_age'
      }
    ],
    msg: (value, row, arg) => value + ' is not the same as other_age'
  }];
```
Validate that the supplied value matches the data's key value (supplied by the arg function)

### Float

```javascript
import {float} from 'validate-promise';

contract = [
  {
    key: 'age',
    promises: [
      {
        rule: float,
        arg: () => ({min: 18, max: 55})
      }
    ],
    msg: (value, row, arg) => value + ' not a float'
  }]
```
Tests if value can be coerced to a float. Optionally you can supply a
min/max object from the arg function. If supplied the float must fall within this range to be valid.

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
Tests a value is greater than the supplied argument.
Alternatively you can compare two arbitrary values with the following contract:

```javascript
contract = [
  {
    key: 'sales',
    promises: [
      {
        rule: greaterthan,
        arg: (value, row) => ({compare: 0, value: 10})
      }
    ],
    msg: (value, row, arg) => 'Sales must be greater than 0'
  }]
```

This tests if value (10) is greater than the compare (0) value.

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
Alternatively you can compare two arbitrary values with the following contract:

```javascript
contract = [
  {
    key: 'age',
    promises: [
      {
        rule: lessthan,
        arg: (value, row) => ({compare: 0, value: 10})
      }
    ],
    msg: (value, row, arg) => 'Age must be greater than 0'
  }]
```

This tests if value (10) is less than than the compare (0) value.

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
