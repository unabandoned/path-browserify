# path-browserify change log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.2](https://github.com/unabandoned/path-browserify/compare/path-browserify-v1.0.1...path-browserify-v1.0.2) (2026-08-11)


### Miscellaneous Chores

* release path-browserify 1.0.2 ([2e89566](https://github.com/unabandoned/path-browserify/commit/2e895669719e2e791c84da40991858a17c560cc4))

## 1.0.1
* Fix a duplicate test name.
* Tweak LICENSE text so Github can recognise it.
* Tweak LICENSE text to include the year and author.
* Add security policy file.

## 1.0.0
This release updates to the Node v10.3.0 API. **This change is breaking**,
because path methods now throw errors when called with arguments that are not
strings.

* Add `path.parse` and `path.format`.
* Add `path.posix` as an alias to `path`.
* Port tests from Node.js.
