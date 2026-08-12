'use strict';

// Minimal tape-compatible shim backed by node:test + node:assert.
//
// It lets the existing tape-style test bodies run unchanged on Node's built-in
// test runner: `require('./tape-adapter')` returns a `tape(name[, opts], cb)`
// function that registers a node:test case and invokes `cb(t)` with a `t`
// object whose methods forward to node:assert. Only the surface the path tests
// actually use needs to work, but the full common tape API is provided so the
// shim is drop-in.

var test = require('node:test');
var assert = require('node:assert');

function makeAssert(t) {
  return {
    // Strict equality
    strictEqual: function (actual, expected, msg) {
      assert.strictEqual(actual, expected, msg);
    },
    equal: function (actual, expected, msg) {
      assert.strictEqual(actual, expected, msg);
    },
    equals: function (actual, expected, msg) {
      assert.strictEqual(actual, expected, msg);
    },
    is: function (actual, expected, msg) {
      assert.strictEqual(actual, expected, msg);
    },

    // Inequality
    notEqual: function (actual, expected, msg) {
      assert.notStrictEqual(actual, expected, msg);
    },
    notStrictEqual: function (actual, expected, msg) {
      assert.notStrictEqual(actual, expected, msg);
    },
    notEquals: function (actual, expected, msg) {
      assert.notStrictEqual(actual, expected, msg);
    },
    isNot: function (actual, expected, msg) {
      assert.notStrictEqual(actual, expected, msg);
    },

    // Deep equality (tape's deepEqual is a loose deep compare)
    deepEqual: function (actual, expected, msg) {
      assert.deepEqual(actual, expected, msg);
    },
    deepEquals: function (actual, expected, msg) {
      assert.deepEqual(actual, expected, msg);
    },
    same: function (actual, expected, msg) {
      assert.deepEqual(actual, expected, msg);
    },
    deepLooseEqual: function (actual, expected, msg) {
      assert.deepEqual(actual, expected, msg);
    },
    looseEqual: function (actual, expected, msg) {
      assert.deepEqual(actual, expected, msg);
    },
    looseEquals: function (actual, expected, msg) {
      assert.deepEqual(actual, expected, msg);
    },
    deepStrictEqual: function (actual, expected, msg) {
      assert.deepStrictEqual(actual, expected, msg);
    },
    strictSame: function (actual, expected, msg) {
      assert.deepStrictEqual(actual, expected, msg);
    },
    notDeepEqual: function (actual, expected, msg) {
      assert.notDeepEqual(actual, expected, msg);
    },
    notSame: function (actual, expected, msg) {
      assert.notDeepEqual(actual, expected, msg);
    },

    // Truthiness
    ok: function (value, msg) {
      assert.ok(value, msg);
    },
    true: function (value, msg) {
      assert.ok(value, msg);
    },
    assert: function (value, msg) {
      assert.ok(value, msg);
    },
    notOk: function (value, msg) {
      assert.ok(!value, msg);
    },
    false: function (value, msg) {
      assert.ok(!value, msg);
    },

    // Exceptions
    throws: function (fn, expected, msg) {
      assert.throws(fn, expected, msg);
    },
    doesNotThrow: function (fn, expected, msg) {
      assert.doesNotThrow(fn, expected, msg);
    },

    // Explicit pass/fail
    pass: function (msg) {
      assert.ok(true, msg);
    },
    fail: function (msg) {
      assert.fail(msg || 'fail');
    },

    // Diagnostics / lifecycle — no-ops under node:test
    comment: function (msg) {
      if (typeof t !== 'undefined' && t && typeof t.diagnostic === 'function') {
        t.diagnostic(String(msg));
      }
    },
    plan: function () {},
    end: function () {},
    skip: function () {}
  };
}

module.exports = function tape(name, optsOrCb, maybeCb) {
  var opts = {};
  var cb = optsOrCb;
  if (typeof optsOrCb === 'object' && optsOrCb !== null) {
    opts = optsOrCb;
    cb = maybeCb;
  }

  var testOpts = {};
  if (opts.skip) testOpts.skip = true;
  if (opts.todo) testOpts.todo = true;

  test(name, testOpts, function () {
    cb(makeAssert());
  });
};
