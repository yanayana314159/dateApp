"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/userpage/makeplans/page",{

/***/ "(app-pages-browser)/./app/components/scheduleAdjustment.tsx":
/*!***********************************************!*\
  !*** ./app/components/scheduleAdjustment.tsx ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ScheduleAdjustment; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nfunction ScheduleAdjustment(props) {\n    const userSchedule = props.user_schedule;\n    const loverSchedule = props.lover_schedule;\n    //startとendがStringになっているのでDate型に変換して扱いやすいようにする\n    const userEvents = [];\n    const loverEvents = [];\n    //ユーザーの予定をDate型に変換\n    for (const userEvent of userSchedule){\n        const title = userEvent.title;\n        const startDate = new Date(userEvent.start);\n        const endDate = new Date(userEvent.end);\n        userEvents.push({\n            title,\n            startDate,\n            endDate\n        });\n    }\n    //恋人の予定をDate型に変換\n    for (const loverEvent of loverSchedule){\n        const title = loverEvent.title;\n        const startDate = new Date(loverEvent.start);\n        const endDate = new Date(loverEvent.end);\n        loverEvents.push({\n            title,\n            startDate,\n            endDate\n        });\n    }\n    /*\n\n  for (const userEvent of userSchedule) {\n    for (const loverEvent of loverSchedule) {\n      if (userEvent.start === loverEvent.start) {\n        return (\n          <>\n            <br />\n          </>\n        );\n      }\n    }\n  }\n  */ return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);\n} /*\n<a>{JSON.stringify(user_schedule)}</a>\n      <br />\n      <a>{JSON.stringify(lover_schedule)}</a>\n*/ \n_c = ScheduleAdjustment;\nvar _c;\n$RefreshReg$(_c, \"ScheduleAdjustment\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL3NjaGVkdWxlQWRqdXN0bWVudC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBT2UsU0FBU0EsbUJBQW1CQyxLQUFZO0lBQ3JELE1BQU1DLGVBQWVELE1BQU1FLGFBQWE7SUFDeEMsTUFBTUMsZ0JBQWdCSCxNQUFNSSxjQUFjO0lBRTFDLDhDQUE4QztJQUM5QyxNQUFNQyxhQUFhLEVBQUU7SUFDckIsTUFBTUMsY0FBYyxFQUFFO0lBQ3RCLGtCQUFrQjtJQUNsQixLQUFLLE1BQU1DLGFBQWFOLGFBQWM7UUFDcEMsTUFBTU8sUUFBUUQsVUFBVUMsS0FBSztRQUM3QixNQUFNQyxZQUFZLElBQUlDLEtBQUtILFVBQVVJLEtBQUs7UUFDMUMsTUFBTUMsVUFBVSxJQUFJRixLQUFLSCxVQUFVTSxHQUFHO1FBQ3RDUixXQUFXUyxJQUFJLENBQUM7WUFBRU47WUFBT0M7WUFBV0c7UUFBUTtJQUM5QztJQUNBLGdCQUFnQjtJQUNoQixLQUFLLE1BQU1HLGNBQWNaLGNBQWU7UUFDdEMsTUFBTUssUUFBUU8sV0FBV1AsS0FBSztRQUM5QixNQUFNQyxZQUFZLElBQUlDLEtBQUtLLFdBQVdKLEtBQUs7UUFDM0MsTUFBTUMsVUFBVSxJQUFJRixLQUFLSyxXQUFXRixHQUFHO1FBQ3ZDUCxZQUFZUSxJQUFJLENBQUM7WUFBRU47WUFBT0M7WUFBV0c7UUFBUTtJQUMvQztJQUVBOzs7Ozs7Ozs7Ozs7O0VBYUEsR0FFQSxxQkFBTztBQUNULEVBRUE7Ozs7QUFJQTtLQTVDd0JiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9jb21wb25lbnRzL3NjaGVkdWxlQWRqdXN0bWVudC50c3g/ZmQ2YSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgdXNlcl9zY2hlZHVsZTogW3sgdGl0bGU6IHN0cmluZzsgc3RhcnQ6IERhdGU7IGVuZDogRGF0ZSB9XTtcbiAgbG92ZXJfc2NoZWR1bGU6IFt7IHRpdGxlOiBzdHJpbmc7IHN0YXJ0OiBEYXRlOyBlbmQ6IERhdGUgfV07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTY2hlZHVsZUFkanVzdG1lbnQocHJvcHM6IFByb3BzKSB7XG4gIGNvbnN0IHVzZXJTY2hlZHVsZSA9IHByb3BzLnVzZXJfc2NoZWR1bGU7XG4gIGNvbnN0IGxvdmVyU2NoZWR1bGUgPSBwcm9wcy5sb3Zlcl9zY2hlZHVsZTtcblxuICAvL3N0YXJ044GoZW5k44GMU3RyaW5n44Gr44Gq44Gj44Gm44GE44KL44Gu44GnRGF0ZeWei+OBq+WkieaPm+OBl+OBpuaJseOBhOOChOOBmeOBhOOCiOOBhuOBq+OBmeOCi1xuICBjb25zdCB1c2VyRXZlbnRzID0gW107XG4gIGNvbnN0IGxvdmVyRXZlbnRzID0gW107XG4gIC8v44Om44O844K244O844Gu5LqI5a6a44KSRGF0ZeWei+OBq+WkieaPm1xuICBmb3IgKGNvbnN0IHVzZXJFdmVudCBvZiB1c2VyU2NoZWR1bGUpIHtcbiAgICBjb25zdCB0aXRsZSA9IHVzZXJFdmVudC50aXRsZTtcbiAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZSh1c2VyRXZlbnQuc3RhcnQpO1xuICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZSh1c2VyRXZlbnQuZW5kKTtcbiAgICB1c2VyRXZlbnRzLnB1c2goeyB0aXRsZSwgc3RhcnREYXRlLCBlbmREYXRlIH0pO1xuICB9XG4gIC8v5oGL5Lq644Gu5LqI5a6a44KSRGF0ZeWei+OBq+WkieaPm1xuICBmb3IgKGNvbnN0IGxvdmVyRXZlbnQgb2YgbG92ZXJTY2hlZHVsZSkge1xuICAgIGNvbnN0IHRpdGxlID0gbG92ZXJFdmVudC50aXRsZTtcbiAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZShsb3ZlckV2ZW50LnN0YXJ0KTtcbiAgICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUobG92ZXJFdmVudC5lbmQpO1xuICAgIGxvdmVyRXZlbnRzLnB1c2goeyB0aXRsZSwgc3RhcnREYXRlLCBlbmREYXRlIH0pO1xuICB9XG5cbiAgLypcblxuICBmb3IgKGNvbnN0IHVzZXJFdmVudCBvZiB1c2VyU2NoZWR1bGUpIHtcbiAgICBmb3IgKGNvbnN0IGxvdmVyRXZlbnQgb2YgbG92ZXJTY2hlZHVsZSkge1xuICAgICAgaWYgKHVzZXJFdmVudC5zdGFydCA9PT0gbG92ZXJFdmVudC5zdGFydCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgKi9cblxuICByZXR1cm4gPD48Lz47XG59XG5cbi8qXG48YT57SlNPTi5zdHJpbmdpZnkodXNlcl9zY2hlZHVsZSl9PC9hPlxuICAgICAgPGJyIC8+XG4gICAgICA8YT57SlNPTi5zdHJpbmdpZnkobG92ZXJfc2NoZWR1bGUpfTwvYT5cbiovXG4iXSwibmFtZXMiOlsiU2NoZWR1bGVBZGp1c3RtZW50IiwicHJvcHMiLCJ1c2VyU2NoZWR1bGUiLCJ1c2VyX3NjaGVkdWxlIiwibG92ZXJTY2hlZHVsZSIsImxvdmVyX3NjaGVkdWxlIiwidXNlckV2ZW50cyIsImxvdmVyRXZlbnRzIiwidXNlckV2ZW50IiwidGl0bGUiLCJzdGFydERhdGUiLCJEYXRlIiwic3RhcnQiLCJlbmREYXRlIiwiZW5kIiwicHVzaCIsImxvdmVyRXZlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/scheduleAdjustment.tsx\n"));

/***/ })

});