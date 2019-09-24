require('./sourcemap-register.js');module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(320);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 7:
/***/ (function(module) {

module.exports = require("../_handler");

/***/ }),

/***/ 154:
/***/ (function(module, __unusedexports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory(__webpack_require__(518)) :
	undefined;
}(this, (function (isPromise) { 'use strict';

isPromise = isPromise && isPromise.hasOwnProperty('default') ? isPromise['default'] : isPromise;

var handle = function handle(p) {
  return p.catch(function (err) {
    console.error(err);
    process.exit(1);
  });
};

/**
 * <a id="main"></a>
 * Catches a promise error, writes the stacktrace to stderr and exists
 *
 * [![](https://img.shields.io/npm/v/apr-main.svg?style=flat-square)](https://www.npmjs.com/package/apr-main) [![](https://img.shields.io/npm/l/apr-main.svg?style=flat-square)](https://www.npmjs.com/package/apr-main)
 *
 * @kind function
 * @name main
 * @param {Promise} input
 * @returns {Promise}
 *
 * @example
 * import main from 'apr-main';
 *
 * main(async () => 'hello') // writes nothing
 * main(async () => undefined) // writes nothing
 * main(async () => { throw new Error('uncaught error') }) // writes the stack trace to stderr and exists
 */
var main = function (p) {
  return isPromise(p) ? handle(p) : handle(p());
};

return main;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9yYW1pdG9zL2Rldi9hcHIvcGFja2FnZXMvbWFpbi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpc1Byb21pc2UgPSByZXF1aXJlKCdpcy1wcm9taXNlJyk7XG5cbmNvbnN0IGhhbmRsZSA9IHAgPT5cbiAgcC5jYXRjaChlcnIgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG4gIH0pO1xuXG4vKipcbiAqIDxhIGlkPVwibWFpblwiPjwvYT5cbiAqIENhdGNoZXMgYSBwcm9taXNlIGVycm9yLCB3cml0ZXMgdGhlIHN0YWNrdHJhY2UgdG8gc3RkZXJyIGFuZCBleGlzdHNcbiAqXG4gKiBbIVtdKGh0dHBzOi8vaW1nLnNoaWVsZHMuaW8vbnBtL3YvYXByLW1haW4uc3ZnP3N0eWxlPWZsYXQtc3F1YXJlKV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvYXByLW1haW4pIFshW10oaHR0cHM6Ly9pbWcuc2hpZWxkcy5pby9ucG0vbC9hcHItbWFpbi5zdmc/c3R5bGU9ZmxhdC1zcXVhcmUpXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9hcHItbWFpbilcbiAqXG4gKiBAa2luZCBmdW5jdGlvblxuICogQG5hbWUgbWFpblxuICogQHBhcmFtIHtQcm9taXNlfSBpbnB1dFxuICogQHJldHVybnMge1Byb21pc2V9XG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCBtYWluIGZyb20gJ2Fwci1tYWluJztcbiAqXG4gKiBtYWluKGFzeW5jICgpID0+ICdoZWxsbycpIC8vIHdyaXRlcyBub3RoaW5nXG4gKiBtYWluKGFzeW5jICgpID0+IHVuZGVmaW5lZCkgLy8gd3JpdGVzIG5vdGhpbmdcbiAqIG1haW4oYXN5bmMgKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ3VuY2F1Z2h0IGVycm9yJykgfSkgLy8gd3JpdGVzIHRoZSBzdGFjayB0cmFjZSB0byBzdGRlcnIgYW5kIGV4aXN0c1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IHAgPT4gKGlzUHJvbWlzZShwKSA/IGhhbmRsZShwKSA6IGhhbmRsZShwKCkpKTtcbiJdLCJuYW1lcyI6WyJoYW5kbGUiLCJwIiwiY2F0Y2giLCJlcnJvciIsImVyciIsImV4aXQiLCJtb2R1bGUiLCJpc1Byb21pc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxTQUFUQSxNQUFTO1NBQ2JDLEVBQUVDLEtBQUYsQ0FBUSxlQUFPO1lBQ0xDLEtBQVIsQ0FBY0MsR0FBZDtZQUNRQyxJQUFSLENBQWEsQ0FBYjtHQUZGLENBRGE7Q0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkFDLFFBQUEsR0FBaUI7U0FBTUMsVUFBVU4sQ0FBVixJQUFlRCxPQUFPQyxDQUFQLENBQWYsR0FBMkJELE9BQU9DLEdBQVAsQ0FBakM7Q0FBakI7Ozs7Ozs7OyJ9

/***/ }),

/***/ 320:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const Main = __webpack_require__(154);
const Exec = __webpack_require__(7);
const manifest = __webpack_require__(413);

Main(async () => {
  const exitCode = await Exec(manifest);
  process.exit(exitCode);
});


/***/ }),

/***/ 413:
/***/ (function(module) {

module.exports = {"name":"cache","inputs":{"version":{"description":"output the version number","required":false,"default":false,"boolean":true,"name":"version"},"no-default-rc":{"description":"prevent Yarn from automatically detecting yarnrc and npmrc files","required":false,"default":false,"boolean":true,"name":"no-default-rc"},"use-yarnrc":{"description":"specifies a yarnrc file that Yarn should use (.yarnrc only, not .npmrc)","required":false,"name":"use-yarnrc"},"verbose":{"description":"output verbose messages on internal operations","required":false,"default":false,"boolean":true,"name":"verbose"},"offline":{"description":"trigger an error if any required dependencies are not available in local cache","required":false,"default":false,"boolean":true,"name":"offline"},"prefer-offline":{"description":"use network only if dependencies are not available in local cache","required":false,"default":false,"boolean":true,"name":"prefer-offline"},"enable-pnp":{"description":"enable the Plug'n'Play installation","required":false,"default":false,"boolean":true,"name":"enable-pnp"},"disable-pnp":{"description":"disable the Plug'n'Play installation","required":false,"default":false,"boolean":true,"name":"disable-pnp"},"strict-semver":{"required":false,"default":false,"boolean":true,"name":"strict-semver"},"json":{"descriptions":"format Yarn log messages as lines of JSON (see jsonlines.org)","required":false,"default":false,"boolean":true,"name":"json"},"ignore-scripts":{"descriptions":"don't run lifecycle scripts","required":false,"default":false,"boolean":true,"name":"ignore-scripts"},"har":{"descriptions":"save HAR output of network traffic","required":false,"default":false,"boolean":true,"name":"har"},"ignore-platform":{"descriptions":"ignore platform checks","required":false,"default":false,"boolean":true,"name":"ignore-platform"},"ignore-engines":{"descriptions":"ignore engines check","required":false,"default":false,"boolean":true,"name":"ignore-engines"},"ignore-optional":{"descriptions":"ignore optional dependencies","required":false,"default":false,"boolean":true,"name":"ignore-optional"},"force":{"descriptions":"install and build packages even if they were built before, overwrite lockfile","required":false,"default":false,"boolean":true,"name":"force"},"skip-integrity-check":{"descriptions":"run install without checking if node_modules is installed","required":false,"default":false,"boolean":true,"name":"skip-integrity-check"},"check-files":{"descriptions":"install will verify file tree of packages for consistency","required":false,"default":false,"boolean":true,"name":"check-files"},"no-bin-links":{"descriptions":"don't generate bin links when setting up packages","required":false,"default":false,"boolean":true,"name":"no-bin-links"},"flat":{"descriptions":"only allow one version of a package","required":false,"default":false,"boolean":true,"name":"flat"},"production":{"required":false,"default":false,"boolean":true,"name":"production"},"no-lockfile":{"description":"don't read or generate a lockfile","required":false,"default":false,"boolean":true,"name":"no-lockfile"},"non-interactive":{"description":"do not show interactive prompts","required":false,"default":true,"boolean":true,"name":"non-interactive"},"pure-lockfile":{"description":"don't generate a lockfile","required":false,"default":false,"boolean":true,"name":"pure-lockfile"},"frozen-lockfile":{"description":"don't generate a lockfile and fail if an update is needed","required":false,"default":false,"boolean":true,"name":"frozen-lockfile"},"update-checksums":{"description":"update package checksums from current repository","required":false,"default":false,"boolean":true,"name":"update-checksums"},"link-duplicates":{"description":"create hardlinks to the repeated modules in node_modules","required":false,"default":false,"boolean":true,"name":"link-duplicates"},"link-folder":{"description":"specify a custom folder to store global links","required":false,"name":"link-folder"},"global-folder":{"description":"specify a custom folder to store global packages","required":false,"name":"global-folder"},"modules-folder":{"description":"rather than installing modules into the node_modules folder relative to the cwd, output them here","required":false,"name":"modules-folder"},"preferred-cache-folder":{"description":"specify a custom folder to store the yarn cache if possible","required":false,"name":"preferred-cache-folder"},"cache-folder":{"description":"specify a custom folder that must be used to store the yarn cache","required":false,"name":"cache-folder"},"mutex":{"description":"use a mutex to ensure only one yarn instance is executing","required":false,"name":"mutex"},"no-emoji":{"description":"disabled emoji in output","required":false,"default":false,"boolean":true,"name":"no-emoji"},"silent":{"description":"skip Yarn console logs, other types of logs (script output) will be printed","required":false,"default":false,"boolean":true,"name":"silent"},"cwd":{"description":"working directory to use","required":false,"name":"cwd"},"proxy":{"required":false,"name":"proxy"},"https-proxy":{"required":false,"name":"https-proxy"},"registry":{"description":"override configuration registry","required":false,"name":"registry"},"no-progress":{"description":"disable progress bar","required":false,"default":false,"boolean":true,"name":"no-progress"},"network-concurrency":{"description":"maximum number of concurrent network requests","required":false,"name":"network-concurrency"},"network-timeout":{"description":"TCP timeout for network requests","required":false,"name":"network-timeout"},"no-scripts-prepend-node-path":{"description":"don't prepend the node executable dir to the PATH in scripts","name":"no-scripts-prepend-node-path"},"no-node-version-check":{"description":"do not warn when using a potentially unsupported Node version","required":false,"default":false,"boolean":true,"name":"no-node-version-check"},"focus":{"description":"Focus on a single workspace by installing remote copies of its sibling workspaces","required":false,"default":false,"boolean":true,"name":"focus"},"otp":{"description":"one-time password for two factor authentication","required":false,"name":"otp"},"help":{"description":"output usage information","required":false,"default":false,"boolean":true,"name":"help"}}};

/***/ }),

/***/ 518:
/***/ (function(module) {

module.exports = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}


/***/ })

/******/ });
//# sourceMappingURL=index.js.map