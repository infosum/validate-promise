# validate-promise
Promised based validation library

## Installation

```
npm install validate-promise
```

## Usage

Validates an object against a specified validation contract

```javascript
import validate, {int} from 'validate-promise';

var contract = [
  {
    key: 'age', // index to validate in data
    promises: [{
      rule: int,
      arg: (value: any, row: Object) => 5,
      condition: (value: any: row: Object) => true,
    }], // array of validations
    msg: (value: any, row: Object, arg) => value + ' not an int',
  }
];

var data = {
  age: '11'
};

validate(contract, data)
  .then(() => {
    // The validations have passed...
  })
  .catch((error: Record<string, string[]>) => {
    // Validations failed - error is an object keyed on data keys, and containing an array of error messages.
  });


  try {
    validate(contract, data);
  } catch (error: Record<string, string[]>) {
    // Validation failed
  }
```

* `condition` an optional function which applies its associated validation rule when it returns true.
* `arg` an optional function which can be used to supply form data values to the associated validation rule.


# Custom error messages per validation

Each validation promise object can have a custom msg function. If supplied this is used in preference to the default msg() function

```javascript
import validate, {int} from 'validation-promise';

var contract = [
  {
    key: 'age', // index to validate in data
    promises: [{
      rule: int,
      arg: (value: any, row: Object) => 5,
      msg: (value: any, row: Object, arg) => value + ' IS REALLY NOT AN INT'
    }], // array of validations
    msg: (value: any, row: Object, arg) => value + ' not an int',

  }
];

var data = {
  age: 'CHICKEN'
};

validate(contract, data)
  .then(() => {
    // The validations have passed...
  })
  .catch((error: string[]) => {
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
        arg: (value: any, row: Object) => '3 Jan 2016'
      }
    ],
    msg: (value: any, row: Object, arg) => value + ' not after 3 Jan 2016'
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
      arg: (value: any, row: Object) => '3 Jan 2016'
    }
    ],
    msg: (value: any, row: Object, arg) => value + ' not before 3 Jan 2016'
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
        arg: (value: any, row: Object) => ['17', 'abc', 'foo']
      }
    ],
    msg: (value: any, row: Object, arg) => value + ' not allowed'
  }];
```

## Domains

```javascript
const domains = ['abc.com'];
contract = [
  {
    key: 'domains',
    promises: [
      {
        rule: domain(domains),
      }
    ],
    msg: (value: any, row: Object, arg) => arg.type === 'INCORRECT' ? 'Invalid format' : 'Domain already exists',
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
        arg: (value: any, row: Object) => '17'
      }
    ],
    msg: (value: any, row: Object, arg) => value + ' is not 17'
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
        arg: (value: any, row: Object) => 'other_age'
      }
    ],
    msg: (value: any, row: Object, arg) => value + ' is not the same as other_age'
  }];
```
Validate that the supplied value matches the data's key value (supplied by the arg function)

### Excludes

```javascript
contract = [
  {
    key: 'name',
    promises: [
      {
        rule: excldues,
        arg: (value: any, row: Object) => [';']
      }
    ],
    msg: (value: any, row: Object, arg) => value + ' is not the same as other_age'
  }];
```
Validate that the supplied value does not contain any of the supplied arguments.

#### Failed validation
```javascript
await validate(contract, {name: ' test ; '});
```


### Not Equals

```javascript
contract = [
  {
    key: 'age',
    promises: [
      {
        rule: notEquals,
        arg: (value: any, row: Object) => '17'
      }
    ],
    msg: (value: any, row: Object, arg) => value + ' is 17'
  }];
```

Validate that the supplied value is is loosely not equal to the argument.

### Float

```javascript
import {float} from 'validate-promise';

contract = [
  {
    key: 'age',
    promises: [
      {
        rule: float,
        arg: (value: any, row: Object) => ({min: 18, max: 55})
      }
    ],
    msg: (value: any, row: Object, arg) => value + ' not a float'
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
        arg: (value: any, row: Object) => 0
      }
    ],
    msg: (value: any, row: Object, arg) => 'Sales must be greater than 0'
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
        arg: (value: any, row: Object) => ({compare: 0, value: 10})
      }
    ],
    msg: (value: any, row: Object, arg) => 'Sales must be greater than 0'
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
        arg: (value: any, row: Object) => ({min: 18, max: 55})
      }
    ],
    msg: (value: any, row: Object, arg) => value + ' not an int'
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
        arg: (value: any, row: Object) => 18
      }
    ],
    msg: (value: any, row: Object, arg) => 'age less than 18'
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
        arg: (value: any, row: Object) => ({compare: 0, value: 10})
      }
    ],
    msg: (value: any, row: Object, arg) => 'Age must be greater than 0'
  }]
```

This tests if value (10) is less than than the compare (0) value.


### Longer Than

```javascript
import { longerThan } from 'validate-promise';

contract = [
  {
    key: 'name',
    promises: [
      {
        rule: longerThan,
        arg: (value: any, row: Object) => ({min: 18, max: 55})
      }
    ],
    msg: (value, row, arg) => value + ' has fewer than 10 characters'
  }]
```
Tests to ensure the length of the string you are validating is longer than the value supplied in 
the contract's arg. 


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
    msg: (value: any, row: Object, arg) => 'Name is required'
  }
];
```

### Shorter Than

```javascript
import {shorterThan} from 'validate-promise';

contract = [
  {
    key: 'name',
    promises: [
      {
        rule: shorterThan,
        arg: (value: any, row: Object) => ({min: 18, max: 55})
      }
    ],
    msg: (value, row, arg) => value + ' has more than 10 characters'
  }]
```
Tests to ensure the length of the string you are validating is less than the value supplied in 
the contract's arg. 


### Url

```javascript
contract = [
  {
    key: 'url',
    promises: [
      {
        rule: url,
      }
    ],
    msg: (value: any, row: Object, arg) => value + ' is not a valid url'
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
        arg: (value: any, row: Object) => ['17', 'abc', 'foo']
      }
    ],
    msg: (value: any, row: Object, arg) => value + ' not allowed'
  }];
```

Validate that the supplied value is contained within the argument whitelist.

### At least one required

```javascript
contract = [
  {
    key: 'age', // ingored in this case
    keys: ['age', 'name']
    promises: [
      {
        rule: atleastOneRequired,
      }
    ],
    msg: (value: any, row: Object, arg) => 'Age or name is required'
  }];
```

Validates that all the supplied `keys` have data.

### isUpload

```javascript
 const contract = [
    {
      key: 'upload',
      promises: [{
        rule: isUploaded
      }],
      msg: () => 'File not uploaded'
    }];
```

Expects the form's upload property to be a `Record<string, number>` type. Successfully validates if all
of its values are 100.
