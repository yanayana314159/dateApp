"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/escalade";
exports.ids = ["vendor-chunks/escalade"];
exports.modules = {

/***/ "(rsc)/./node_modules/escalade/sync/index.mjs":
/*!**********************************************!*\
  !*** ./node_modules/escalade/sync/index.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(start, callback) {\n    let dir = (0,path__WEBPACK_IMPORTED_MODULE_0__.resolve)(\".\", start);\n    let tmp, stats = (0,fs__WEBPACK_IMPORTED_MODULE_1__.statSync)(dir);\n    if (!stats.isDirectory()) {\n        dir = (0,path__WEBPACK_IMPORTED_MODULE_0__.dirname)(dir);\n    }\n    while(true){\n        tmp = callback(dir, (0,fs__WEBPACK_IMPORTED_MODULE_1__.readdirSync)(dir));\n        if (tmp) return (0,path__WEBPACK_IMPORTED_MODULE_0__.resolve)(dir, tmp);\n        dir = (0,path__WEBPACK_IMPORTED_MODULE_0__.dirname)(tmp = dir);\n        if (tmp === dir) break;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZXNjYWxhZGUvc3luYy9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdDO0FBQ0c7QUFFM0MsNkJBQWUsb0NBQVVJLEtBQUssRUFBRUMsUUFBUTtJQUN2QyxJQUFJQyxNQUFNTCw2Q0FBT0EsQ0FBQyxLQUFLRztJQUN2QixJQUFJRyxLQUFLQyxRQUFRTCw0Q0FBUUEsQ0FBQ0c7SUFFMUIsSUFBSSxDQUFDRSxNQUFNQyxXQUFXLElBQUk7UUFDekJILE1BQU1OLDZDQUFPQSxDQUFDTTtJQUNmO0lBRUEsTUFBTyxLQUFNO1FBQ1pDLE1BQU1GLFNBQVNDLEtBQUtKLCtDQUFXQSxDQUFDSTtRQUNoQyxJQUFJQyxLQUFLLE9BQU9OLDZDQUFPQSxDQUFDSyxLQUFLQztRQUM3QkQsTUFBTU4sNkNBQU9BLENBQUNPLE1BQU1EO1FBQ3BCLElBQUlDLFFBQVFELEtBQUs7SUFDbEI7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL215YXBwLy4vbm9kZV9tb2R1bGVzL2VzY2FsYWRlL3N5bmMvaW5kZXgubWpzPzRjZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlybmFtZSwgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgcmVhZGRpclN5bmMsIHN0YXRTeW5jIH0gZnJvbSAnZnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhcnQsIGNhbGxiYWNrKSB7XG5cdGxldCBkaXIgPSByZXNvbHZlKCcuJywgc3RhcnQpO1xuXHRsZXQgdG1wLCBzdGF0cyA9IHN0YXRTeW5jKGRpcik7XG5cblx0aWYgKCFzdGF0cy5pc0RpcmVjdG9yeSgpKSB7XG5cdFx0ZGlyID0gZGlybmFtZShkaXIpO1xuXHR9XG5cblx0d2hpbGUgKHRydWUpIHtcblx0XHR0bXAgPSBjYWxsYmFjayhkaXIsIHJlYWRkaXJTeW5jKGRpcikpO1xuXHRcdGlmICh0bXApIHJldHVybiByZXNvbHZlKGRpciwgdG1wKTtcblx0XHRkaXIgPSBkaXJuYW1lKHRtcCA9IGRpcik7XG5cdFx0aWYgKHRtcCA9PT0gZGlyKSBicmVhaztcblx0fVxufVxuIl0sIm5hbWVzIjpbImRpcm5hbWUiLCJyZXNvbHZlIiwicmVhZGRpclN5bmMiLCJzdGF0U3luYyIsInN0YXJ0IiwiY2FsbGJhY2siLCJkaXIiLCJ0bXAiLCJzdGF0cyIsImlzRGlyZWN0b3J5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/escalade/sync/index.mjs\n");

/***/ })

};
;