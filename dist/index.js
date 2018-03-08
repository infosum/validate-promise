(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("validate-promise", [], factory);
	else if(typeof exports === 'object')
		exports["validate-promise"] = factory();
	else
		root["validate-promise"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.whitelist = exports.required = exports.regex = exports.notEqual = exports.lessthan = exports.int = exports.greaterthan = exports.float = exports.equalto = exports.equals = exports.email = exports.blacklist = exports.before = exports.after = undefined;

	var _after = __webpack_require__(2);

	var _after2 = _interopRequireDefault(_after);

	var _before = __webpack_require__(3);

	var _before2 = _interopRequireDefault(_before);

	var _blacklist = __webpack_require__(4);

	var _blacklist2 = _interopRequireDefault(_blacklist);

	var _email = __webpack_require__(5);

	var _email2 = _interopRequireDefault(_email);

	var _equals = __webpack_require__(7);

	var _equals2 = _interopRequireDefault(_equals);

	var _equalto = __webpack_require__(8);

	var _equalto2 = _interopRequireDefault(_equalto);

	var _float = __webpack_require__(9);

	var _float2 = _interopRequireDefault(_float);

	var _greaterthan = __webpack_require__(10);

	var _greaterthan2 = _interopRequireDefault(_greaterthan);

	var _int = __webpack_require__(11);

	var _int2 = _interopRequireDefault(_int);

	var _lessthan = __webpack_require__(12);

	var _lessthan2 = _interopRequireDefault(_lessthan);

	var _notEqual = __webpack_require__(13);

	var _notEqual2 = _interopRequireDefault(_notEqual);

	var _regex = __webpack_require__(14);

	var _regex2 = _interopRequireDefault(_regex);

	var _required = __webpack_require__(15);

	var _required2 = _interopRequireDefault(_required);

	var _whitelist = __webpack_require__(16);

	var _whitelist2 = _interopRequireDefault(_whitelist);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Iterates over an array of promises, unline Promise.all it will not
	 * stop when one promise is rejected. Instead all promises are run and an
	 * array of objects describing the promise resolution is returned
	 */
	var hashSettled = function hashSettled(promises) {
	  var keys = Object.keys(promises);
	  return Promise.all(keys.map(function (k) {
	    return Promise.resolve(promises[k]).then(function (value) {
	      var r = {
	        state: 'fulfilled',
	        key: k,
	        value: value
	      };
	      return r;
	    }, function (reason) {
	      var r = {
	        state: 'rejected',
	        key: k,
	        reason: reason
	      };
	      return r;
	    });
	  }));
	},


	/**
	 * Validate data againsts fields
	 * @param {Array} contract Validation rules
	 * @param {Object} data Form data
	 * @return {Object|Boolean} true if passed, error object if failed,
	 * array error messages keyed on field.name
	 */
	validate = function validate(contract, data) {
	  var promises = {};
	  contract.forEach(function (validation, cx) {
	    var name = validation.key,
	        value = data[name];
	    validation.promises.forEach(function (p, i) {
	      var key = name + '.' + cx + '.' + i,
	          thisArg = p.arg === undefined ? null : p.arg,
	          validationMessage = p.msg || validation.msg;

	      promises[key] = p.rule(value, data, validationMessage, thisArg);
	    });
	  });

	  return new Promise(function (resolve, reject) {
	    hashSettled(promises).then(function (res) {
	      var rejectedErrors = function rejectedErrors(r) {
	        return r.state === 'rejected';
	      };
	      var errors = res.filter(rejectedErrors),
	          ret = {};
	      errors.forEach(function (err) {
	        var k = err.key.split('.').shift();
	        if (!ret[k]) {
	          ret[k] = [];
	        }
	        if (ret[k].indexOf(err.reason) === -1) {
	          ret[k].push(err.reason);
	        }
	      });

	      if (errors.length === 0) {
	        resolve(true);
	      }
	      reject(ret);
	    });
	  });
	};

	exports.default = validate;
	exports.after = _after2.default;
	exports.before = _before2.default;
	exports.blacklist = _blacklist2.default;
	exports.email = _email2.default;
	exports.equals = _equals2.default;
	exports.equalto = _equalto2.default;
	exports.float = _float2.default;
	exports.greaterthan = _greaterthan2.default;
	exports.int = _int2.default;
	exports.lessthan = _lessthan2.default;
	exports.notEqual = _notEqual2.default;
	exports.regex = _regex2.default;
	exports.required = _required2.default;
	exports.whitelist = _whitelist2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Check if a value is after a given date
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  var test = Date.parse(value);
	  if (typeof arg === 'function') {
	    arg = arg(value, row);
	  }
	  var compare = Date.parse(arg);

	  if (test > compare) {
	    return Promise.resolve();
	  }
	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Check if a value is before a given date
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  var test = Date.parse(value);
	  if (typeof arg === 'function') {
	    arg = arg(value, row);
	  }
	  var compare = Date.parse(arg);

	  if (test < compare) {
	    return Promise.resolve();
	  }
	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Check if a value is in a blacklist
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {array} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  if (typeof arg === 'function') {
	    arg = arg(value, row);
	  }
	  if (arg.indexOf(value) === -1) {
	    return Promise.resolve();
	  }
	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isEmail = __webpack_require__(6);

	var _isEmail2 = _interopRequireDefault(_isEmail);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Check if a value is an email
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  if ((0, _isEmail2.default)(value)) {
	    return Promise.resolve();
	  };
	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	// Email address matcher.
	var matcher = /.+\@.+\..+/;

	/**
	 * Loosely validate an email address.
	 *
	 * @param {string} string
	 * @return {boolean}
	 */
	function isEmail(string) {
	  return matcher.test(string);
	}

	/*
	 * Exports.
	 */

	module.exports = isEmail;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Check if a value can be coerced to an integer
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  if (typeof arg === 'function') {
	    arg = arg(value, row);
	  }

	  if (value == arg) {
	    return Promise.resolve();
	  }
	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Check if a value matches another fields value
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  if (typeof arg === 'function') {
	    arg = arg(value, row);
	  }

	  if (value === arg) {
	    return Promise.resolve();
	  }
	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Check if a value can be coerced to an integer
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  if (typeof arg === 'function') {
	    arg = arg(value, row);
	  }

	  var float = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;

	  if (arg !== null) {
	    if (arg.min !== undefined && parseInt(value, 10) < parseInt(arg.min, 10)) {
	      return Promise.reject(msg(value, row, arg));
	    }

	    if (arg.max && parseInt(value, 10) > parseInt(arg.max, 10)) {
	      return Promise.reject(msg(value, row, arg));
	    }
	  }

	  if (float.test(value)) {
	    return Promise.resolve();
	  }
	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Check if a value is greater than foo
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  var compare = arg;
	  if (typeof arg === 'function') {
	    compare = arg(value, row);
	  }
	  if ((typeof compare === 'undefined' ? 'undefined' : _typeof(compare)) === 'object') {
	    value = compare.value;
	    compare = compare.compare;
	  }
	  if (parseInt(value, 10) > parseInt(compare, 10)) {
	    return Promise.resolve();
	  }

	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Check if a value can be coerced to an integer
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  if (typeof arg === 'function') {
	    arg = arg(value, row);
	  }

	  var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;

	  if (arg !== null) {
	    if (arg.min !== undefined && parseInt(value, 10) < parseInt(arg.min, 10)) {
	      return Promise.reject(msg(value, row, arg));
	    }

	    if (arg.max && parseInt(value, 10) > parseInt(arg.max, 10)) {
	      return Promise.reject(msg(value, row, arg));
	    }
	  }

	  if (int.test(value)) {
	    return Promise.resolve();
	  }
	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Check if a value is less than foo
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  var compare = arg;
	  if (typeof arg === 'function') {
	    compare = arg(value, row);
	  }
	  if ((typeof compare === 'undefined' ? 'undefined' : _typeof(compare)) === 'object') {
	    value = compare.value;
	    compare = compare.compare;
	  }

	  if (parseInt(value, 10) < parseInt(compare, 10)) {
	    return Promise.resolve();
	  }

	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Check if a value can be coerced to an integer
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  if (typeof arg === 'function') {
	    arg = arg(value, row);
	  }

	  if (value != arg) {
	    return Promise.resolve();
	  }
	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Check if a value matches a given regex
	 * @param {String} value Regex to match
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  var test = typeof arg === 'function' ? arg(value, row) : arg;
	  var regex = new RegExp(test, 'g');

	  if (regex.test(value)) {
	    return Promise.resolve();
	  }
	  return Promise.reject(msg(value, row, arg));
	};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Check if a value is greater than foo
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {*} args Field arguements
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg) {
	  return new Promise(function (resolve, reject) {
	    if (value !== '' && value !== undefined) {
	      return resolve();
	    }
	    return reject(msg(value, row));
	  });
	};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Check if a value is in a whitelist
	 * @param {String} value To validate
	 * @param {Object} row Form data
	 * @param {Function} msg Error message function
	 * @param {array} arg Validation arguement
	 * @return {Promise} .
	 */
	exports.default = function (value, row, msg, arg) {
	  if (typeof arg === 'function') {
	    arg = arg(value, row);
	  }
	  if (arg.indexOf(value) !== -1) {
	    return Promise.resolve();
	  }
	  return Promise.reject(msg(value, row, arg));
	};

/***/ })
/******/ ])
});
;
//# sourceMappingURL=index.js.map