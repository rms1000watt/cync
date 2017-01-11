'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.isImmutable = isImmutable;
exports.shallowEqual = shallowEqual;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if object is an Immutalbe object with
 * optional Immutalble class type checking
 *
 * @example
 *    isImmutable({test:'a'});
 *    // => false
 *    isImmutalbe(Immutable.Map({a:1}), Immutable.Map);
 *    // => true
 *
 * @param {Object} object to test
 * @param {any=} optional Immutable class to match
 * @return {Boolean}
 * @api public
 *
 */

function isImmutable(obj, type) {
  if (typeof type !== 'undefined') {
    return obj instanceof type;
  }
  // all Immutable.js objects have the same `toSeq` function
  // so we can just pick from one to test againt
  return (obj || {}).toSeq === _immutable2.default.Map.prototype.toSeq;
}

/**
 * Performs equality by iterating through keys on an object and returning
 * false when any key has values which are not strictly equal between
 * objA and objB. Returns true when the values of all keys are strictly equal.
 *
 * @param {object} objA
 * @param {object} objB
 *
 * @return {boolean}
 */

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object') {
    return false;
  }

  // Test for A's keys different from B.
  for (var key in objA) {
    if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
      return false;
    }
  }
  // Test for B's keys missing from A.
  for (var _key in objB) {
    if (objB.hasOwnProperty(_key) && !objA.hasOwnProperty(_key)) {
      return false;
    }
  }
  return true;
}