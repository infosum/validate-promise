module.exports = {
  "extends": "google",
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true,
          experimentalObjectRestSpread: true
      }
  },
  "plugins": ["flowtype"],
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    "semi": 2,
    "indent": ["error", 2],
    "quotes": [2, "single"],
    "one-var": ["error", "always"],
    "strict": 0,
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 1,
    "no-useless-escape": 0,
    "camelcase": 0,
    "flowtype/boolean-style": [
      2,
      "boolean"
    ],
    "flowtype/define-flow-type": 1,
    "flowtype/delimiter-dangle": [
      2,
      "never"
    ],
    "flowtype/generic-spacing": [
      2,
      "never"
    ],
    "flowtype/no-primitive-constructor-types": 2,
    "flowtype/no-weak-types": 2,
    "flowtype/object-type-delimiter": [
      2,
      "comma"
    ],
    "flowtype/require-parameter-type": 2,
    "flowtype/require-return-type": [
      2,
      "always",
      {
        "annotateUndefined": "never"
      }
    ],
    "flowtype/require-valid-file-annotation": 2,
    "flowtype/semi": [
      2,
      "always"
    ],
    "flowtype/space-after-type-colon": [
      2,
      "always"
    ],
    "flowtype/space-before-generic-bracket": [
      2,
      "never"
    ],
    "flowtype/space-before-type-colon": [
      2,
      "never"
    ],
    "flowtype/type-id-match": [
      2,
      "^([A-Z][a-z0-9]+)+Type$"
    ],
    "flowtype/union-intersection-spacing": [
      2,
      "always"
    ],
    "flowtype/use-flow-type": 1,
    "flowtype/valid-syntax": 1,
    "flowtype/no-weak-types": [2, {
        "any": false,
        "Object": false,
        "Function": false
    }]
  }

}
