'use strict';

import Immutable from 'immutable';
import { isImmutable, shallowEqual } from './utils';

const NOOP = () => {};

// Use symbols to help prevent access to internals
const __state__ = '_state_';
const __lastState__ = '_lastState_';
const __containers__ = '_containers_';
/**
 * Cync.Store Data Store
 *
 * Examples:
 *    // extend Cync Store
 *    class MyStore extends Cync.Store {
 *      constructor(state) {
 *        super(state);
 *        export
 *      }
 *      ...
 *    }
 *
 */
export class Store {

  constructor(props) {
    let state = (props || {});
    this[__lastState__] =
    this[__state__] = isImmutable(state, Immutable.Map) ? state : Immutable.Map(state);
    this[__containers__] = [];
  }

  setState(obj, fn) {
    let cb = fn || NOOP;
    let _newState = isImmutable(obj, Immutable.Map) ? obj : Immutable.Map(obj);
    let _state = this[__state__];

    if (Immutable.is(_newState, _state)) {
      cb();
      return;
    }

    this[__lastState__] = _state;
    this[__state__] = _newState;

    this._stateDidChange(this[__state__]);
    cb(this[__state__]);
  }
  
  get lastState() {
    return this[__lastState__];
  }

  get state() {
    return this[__state__];
  }

  _stateDidChange(state) {
    this._storeDidUpdate();
  }

  isIn(immObj, path) {
    let _v = this[__state__].getIn(path);
    return Immutable.is(_v, immObj);
  }

  _storeDidUpdate() {
    Object.keys(this[__containers__]).forEach((c) => {
      this[__containers__][c].forEach((fn) => {
        let props = this.state.getIn([...c.split('.')])
        fn(props);
      });
    });
   }

  onStateDidUpdate(path, fn) {
    Array.isArray(this[__containers__][path])
      ? this[__containers__][path].push(fn)
      : this[__containers__][path] = [fn];
  }

}

export default Store;
