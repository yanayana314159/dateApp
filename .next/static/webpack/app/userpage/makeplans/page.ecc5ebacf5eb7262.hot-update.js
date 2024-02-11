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

/***/ "(app-pages-browser)/./app/components/calculateFreeTime.tsx":
/*!**********************************************!*\
  !*** ./app/components/calculateFreeTime.tsx ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ calculateFreeTime; }\n/* harmony export */ });\nfunction calculateFreeTime(events) {\n    // 取得したカレンダーから空き時間を2進数形式で抽出\n    const bitEmptyTimeOfDays = calculateEmptyTimeOfDays(events);\n    //console.log(bitEmptyTimeOfDays);\n    // Date形式に戻す\n    const emptyTimeOfDays = changeBitToDate(bitEmptyTimeOfDays);\n    // 出力\n    const freeTime = displayDays(emptyTimeOfDays);\n    const fullcalendarData = convertToFullcalendarData(freeTime);\n    return {\n        freeTime,\n        fullcalendarData\n    };\n// 日毎に、空き時間が「10:00-11:30,14:15-15:45」のような形式で出力される\n}\n/**\n * 空き日程をbit形式で返却\n */ const convertToFullcalendarData = (freeTime)=>{\n    const events = [];\n    freeTime.map((schedule)=>{\n        const startStr = schedule.split(\"-\")[0];\n        const endStr = schedule.split(\"-\")[1];\n        const start = new Date(startStr);\n        const end = new Date(endStr);\n        const event = {\n            title: \"デートできます\\uD83E\\uDD42\",\n            start: start,\n            end: end\n        };\n        //console.log(event);\n        events.push(event);\n    });\n    return events;\n};\nfunction calculateEmptyTimeOfDays(events) {\n    const bitDays = {};\n    events.map((event)=>{\n        const bitDay = changeDateToBit(event);\n        const { key, value } = bitDay;\n        if (bitDays[key] !== undefined) {\n            // 論理和を取る\n            // 追記：BigInt型にキャストして演算を行う\n            bitDays[key] = \"0b\" + (BigInt(bitDays[key]) | BigInt(value)).toString(2).padStart(56, \"0\");\n        } else {\n            bitDays[key] = value;\n        }\n    });\n    return bitDays;\n}\n/**\n * bit形式に変換\n * @return {\"key\": key, \"value\": value}, key = 日付, value = bit\n * bit定義 → 15分区切りで表現、0 = 予定なし、1 = 予定あり\n * 例（_は実際には含まれない）：11:00-12:15予定あり → 「0000_0000_1111_1000_0000_0000_0000_0000_0000_0000_0000」\n * 4 * 11 = 44bit→56bit\n */ function changeDateToBit(event) {\n    const start = event.start;\n    const end = event.end;\n    // 対象の時間\n    const clockIn = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 9, 0);\n    const clockOut = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 23, 0);\n    let dateBit = \"0b\";\n    let checkDuration = new Date(clockIn);\n    for(let i = 0; i < 56; i++){\n        if (start <= checkDuration && checkDuration < end) {\n            dateBit += \"1\";\n        } else {\n            dateBit += \"0\";\n        }\n        if (checkDuration >= clockOut) {\n            break;\n        }\n        checkDuration.setMinutes(checkDuration.getMinutes() + 15);\n    }\n    const dateKey = getDateLabel(start);\n    return {\n        key: dateKey,\n        value: dateBit\n    };\n}\n/**\n * Bit形式の日付をDate型に戻す\n * @return {<日付> : {\"start\": <日時>, \"end\": <日時>}[]}[]\n */ function changeBitToDate(bitDays) {\n    const freeTimes = {};\n    Object.keys(bitDays).forEach((key)=>{\n        // 先頭の「0b」除去\n        const dateBit = bitDays[key].replace(/^0b/, \"\");\n        // 範囲の始点を設定\n        const clockIn = new Date(key);\n        clockIn.setHours(9);\n        clockIn.setMinutes(0);\n        let start;\n        let end;\n        const freeDurations = [];\n        for(let i = 0; i < dateBit.length; i++){\n            const bit = dateBit.charAt(i);\n            if (!start) {\n                if (bit === \"0\") {\n                    start = new Date(clockIn);\n                    start.setMinutes(start.getMinutes() + 15 * i);\n                }\n            } else {\n                if (bit === \"1\" || i === dateBit.length - 1) {\n                    if (bit === \"1\") {\n                        end = new Date(clockIn);\n                        end.setMinutes(end.getMinutes() + 15 * i);\n                    } else {\n                        end = new Date(clockIn);\n                        end.setMinutes(end.getMinutes() + 15 * (i + 1));\n                    }\n                    freeDurations.push({\n                        start: getDateTimeLabel(start),\n                        end: getDateTimeLabel(end)\n                    });\n                    // リセット\n                    start = undefined;\n                    end = undefined;\n                }\n            }\n        }\n        freeTimes[key] = freeDurations;\n    });\n    return freeTimes;\n}\n/**\n * 日時をシートに表示\n * @param days {<日付> : {\"start\": <日時>, \"end\": <日時>}[]}[]\n */ function displayDays(days) {\n    const freeTime = [];\n    Object.keys(days).forEach((key, i)=>{\n        if (days[key].length === 0) {\n            const value = \"\".concat(key, \" 09:00-\").concat(key, \" 23:00\");\n            freeTime.push(value);\n        } else {\n            days[key].forEach((e)=>{\n                const value = \"\".concat(e.start, \"-\").concat(e.end);\n                freeTime.push(value);\n            });\n        }\n    // 出力\n    });\n    return freeTime;\n}\n/**\n * YYYY/MM/DDを返す\n */ function getDateLabel(date) {\n    return \"\".concat(date.getFullYear(), \"/\").concat((\"0\" + (date.getMonth() + 1)).slice(-2), \"/\").concat((\"0\" + date.getDate()).slice(-2));\n}\n/**\n * hh:mmを返す\n */ function getTimeLabel(date) {\n    return \"\".concat((\"0\" + date.getHours()).slice(-2), \":\").concat((\"0\" + date.getMinutes()).slice(-2));\n}\n/**\n * YYYY/MM/DD hh:mmを返す\n */ function getDateTimeLabel(date) {\n    return \"\".concat(date.getFullYear(), \"/\").concat((\"0\" + (date.getMonth() + 1)).slice(-2), \"/\").concat((\"0\" + date.getDate()).slice(-2), \" \").concat((\"0\" + date.getHours()).slice(-2), \":\").concat((\"0\" + date.getMinutes()).slice(-2));\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL2NhbGN1bGF0ZUZyZWVUaW1lLnRzeCIsIm1hcHBpbmdzIjoiOzs7O0FBRWUsU0FBU0Esa0JBQWtCQyxNQUFXO0lBQ25ELDJCQUEyQjtJQUUzQixNQUFNQyxxQkFBcUJDLHlCQUF5QkY7SUFDcEQsa0NBQWtDO0lBQ2xDLFlBQVk7SUFDWixNQUFNRyxrQkFBa0JDLGdCQUFnQkg7SUFDeEMsS0FBSztJQUVMLE1BQU1JLFdBQVdDLFlBQVlIO0lBRTdCLE1BQU1JLG1CQUFtQkMsMEJBQTBCSDtJQUNuRCxPQUFPO1FBQUVBO1FBQVVFO0lBQWlCO0FBRXBDLGlEQUFpRDtBQUNuRDtBQUVBOztDQUVDLEdBRUQsTUFBTUMsNEJBQTRCLENBQUNIO0lBQ2pDLE1BQU1MLFNBQWMsRUFBRTtJQUN0QkssU0FBU0ksR0FBRyxDQUFDLENBQUNDO1FBQ1osTUFBTUMsV0FBV0QsU0FBU0UsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZDLE1BQU1DLFNBQVNILFNBQVNFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNyQyxNQUFNRSxRQUFRLElBQUlDLEtBQUtKO1FBQ3ZCLE1BQU1LLE1BQU0sSUFBSUQsS0FBS0Y7UUFFckIsTUFBTUksUUFBUTtZQUNaQyxPQUFPO1lBQ1BKLE9BQU9BO1lBQ1BFLEtBQUtBO1FBQ1A7UUFDQSxxQkFBcUI7UUFDckJoQixPQUFPbUIsSUFBSSxDQUFDRjtJQUNkO0lBQ0EsT0FBT2pCO0FBQ1Q7QUFDQSxTQUFTRSx5QkFBeUJGLE1BQW9DO0lBQ3BFLE1BQU1vQixVQUFxQyxDQUFDO0lBRTVDcEIsT0FBT1MsR0FBRyxDQUFDLENBQUNRO1FBQ1YsTUFBTUksU0FBU0MsZ0JBQWdCTDtRQUMvQixNQUFNLEVBQUVNLEdBQUcsRUFBRUMsS0FBSyxFQUFFLEdBQW1DSDtRQUV2RCxJQUFJRCxPQUFPLENBQUNHLElBQUksS0FBS0UsV0FBVztZQUM5QixTQUFTO1lBQ1QseUJBQXlCO1lBQ3pCTCxPQUFPLENBQUNHLElBQUksR0FDVixPQUNBLENBQUNHLE9BQU9OLE9BQU8sQ0FBQ0csSUFBSSxJQUFJRyxPQUFPRixNQUFLLEVBQUdHLFFBQVEsQ0FBQyxHQUFHQyxRQUFRLENBQUMsSUFBSTtRQUNwRSxPQUFPO1lBQ0xSLE9BQU8sQ0FBQ0csSUFBSSxHQUFHQztRQUNqQjtJQUNGO0lBRUEsT0FBT0o7QUFDVDtBQUVBOzs7Ozs7Q0FNQyxHQUNELFNBQVNFLGdCQUFnQkwsS0FBaUM7SUFDeEQsTUFBTUgsUUFBUUcsTUFBTUgsS0FBSztJQUN6QixNQUFNRSxNQUFNQyxNQUFNRCxHQUFHO0lBRXJCLFFBQVE7SUFDUixNQUFNYSxVQUFVLElBQUlkLEtBQ2xCRCxNQUFNZ0IsV0FBVyxJQUNqQmhCLE1BQU1pQixRQUFRLElBQ2RqQixNQUFNa0IsT0FBTyxJQUNiLEdBQ0E7SUFFRixNQUFNQyxXQUFXLElBQUlsQixLQUNuQkQsTUFBTWdCLFdBQVcsSUFDakJoQixNQUFNaUIsUUFBUSxJQUNkakIsTUFBTWtCLE9BQU8sSUFDYixJQUNBO0lBR0YsSUFBSUUsVUFBa0I7SUFDdEIsSUFBSUMsZ0JBQWdCLElBQUlwQixLQUFLYztJQUU3QixJQUFLLElBQUlPLElBQUksR0FBR0EsSUFBSSxJQUFJQSxJQUFLO1FBQzNCLElBQUl0QixTQUFTcUIsaUJBQWlCQSxnQkFBZ0JuQixLQUFLO1lBQ2pEa0IsV0FBVztRQUNiLE9BQU87WUFDTEEsV0FBVztRQUNiO1FBRUEsSUFBSUMsaUJBQWlCRixVQUFVO1lBQzdCO1FBQ0Y7UUFDQUUsY0FBY0UsVUFBVSxDQUFDRixjQUFjRyxVQUFVLEtBQUs7SUFDeEQ7SUFFQSxNQUFNQyxVQUFrQkMsYUFBYTFCO0lBQ3JDLE9BQU87UUFBRVMsS0FBS2dCO1FBQVNmLE9BQU9VO0lBQVE7QUFDeEM7QUFFQTs7O0NBR0MsR0FFRCxTQUFTOUIsZ0JBQWdCZ0IsT0FBa0M7SUFDekQsTUFBTXFCLFlBQWlFLENBQUM7SUFFeEVDLE9BQU9DLElBQUksQ0FBQ3ZCLFNBQVN3QixPQUFPLENBQUMsQ0FBQ3JCO1FBQzVCLFlBQVk7UUFDWixNQUFNVyxVQUFVZCxPQUFPLENBQUNHLElBQUksQ0FBQ3NCLE9BQU8sQ0FBQyxPQUFPO1FBRTVDLFdBQVc7UUFDWCxNQUFNaEIsVUFBVSxJQUFJZCxLQUFLUTtRQUN6Qk0sUUFBUWlCLFFBQVEsQ0FBQztRQUNqQmpCLFFBQVFRLFVBQVUsQ0FBQztRQUVuQixJQUFJdkI7UUFDSixJQUFJRTtRQUNKLE1BQU0rQixnQkFBZ0IsRUFBRTtRQUN4QixJQUFLLElBQUlYLElBQUksR0FBR0EsSUFBSUYsUUFBUWMsTUFBTSxFQUFFWixJQUFLO1lBQ3ZDLE1BQU1hLE1BQU1mLFFBQVFnQixNQUFNLENBQUNkO1lBQzNCLElBQUksQ0FBQ3RCLE9BQU87Z0JBQ1YsSUFBSW1DLFFBQVEsS0FBSztvQkFDZm5DLFFBQVEsSUFBSUMsS0FBS2M7b0JBQ2pCZixNQUFNdUIsVUFBVSxDQUFDdkIsTUFBTXdCLFVBQVUsS0FBSyxLQUFLRjtnQkFDN0M7WUFDRixPQUFPO2dCQUNMLElBQUlhLFFBQVEsT0FBT2IsTUFBTUYsUUFBUWMsTUFBTSxHQUFHLEdBQUc7b0JBQzNDLElBQUlDLFFBQVEsS0FBSzt3QkFDZmpDLE1BQU0sSUFBSUQsS0FBS2M7d0JBQ2ZiLElBQUlxQixVQUFVLENBQUNyQixJQUFJc0IsVUFBVSxLQUFLLEtBQUtGO29CQUN6QyxPQUFPO3dCQUNMcEIsTUFBTSxJQUFJRCxLQUFLYzt3QkFDZmIsSUFBSXFCLFVBQVUsQ0FBQ3JCLElBQUlzQixVQUFVLEtBQUssS0FBTUYsQ0FBQUEsSUFBSTtvQkFDOUM7b0JBQ0FXLGNBQWM1QixJQUFJLENBQUM7d0JBQ2pCTCxPQUFPcUMsaUJBQWlCckM7d0JBQ3hCRSxLQUFLbUMsaUJBQWlCbkM7b0JBQ3hCO29CQUNBLE9BQU87b0JBQ1BGLFFBQVFXO29CQUNSVCxNQUFNUztnQkFDUjtZQUNGO1FBQ0Y7UUFDQWdCLFNBQVMsQ0FBQ2xCLElBQUksR0FBR3dCO0lBQ25CO0lBRUEsT0FBT047QUFDVDtBQUVBOzs7Q0FHQyxHQUNELFNBQVNuQyxZQUFZOEMsSUFFcEI7SUFDQyxNQUFNL0MsV0FBcUIsRUFBRTtJQUM3QnFDLE9BQU9DLElBQUksQ0FBQ1MsTUFBTVIsT0FBTyxDQUFDLENBQUNyQixLQUFLYTtRQUM5QixJQUFJZ0IsSUFBSSxDQUFDN0IsSUFBSSxDQUFDeUIsTUFBTSxLQUFLLEdBQUc7WUFDMUIsTUFBTXhCLFFBQVEsR0FBZ0JELE9BQWJBLEtBQUksV0FBYSxPQUFKQSxLQUFJO1lBQ2xDbEIsU0FBU2MsSUFBSSxDQUFDSztRQUNoQixPQUFPO1lBQ0w0QixJQUFJLENBQUM3QixJQUFJLENBQUNxQixPQUFPLENBQUMsQ0FBQ1M7Z0JBQ2pCLE1BQU03QixRQUFRLEdBQWM2QixPQUFYQSxFQUFFdkMsS0FBSyxFQUFDLEtBQVMsT0FBTnVDLEVBQUVyQyxHQUFHO2dCQUNqQ1gsU0FBU2MsSUFBSSxDQUFDSztZQUNoQjtRQUNGO0lBRUEsS0FBSztJQUNQO0lBQ0EsT0FBT25CO0FBQ1Q7QUFFQTs7Q0FFQyxHQUNELFNBQVNtQyxhQUFhYyxJQUFVO0lBQzlCLE9BQU8sR0FBeUIsT0FBdEJBLEtBQUt4QixXQUFXLElBQUcsS0FBOEMsT0FBM0MsQ0FBQyxNQUFPd0IsQ0FBQUEsS0FBS3ZCLFFBQVEsS0FBSyxFQUFDLEVBQUd3QixLQUFLLENBQUMsQ0FBQyxJQUFHLEtBRTVELE9BRitELENBQ3pFLE1BQU1ELEtBQUt0QixPQUFPLEVBQUMsRUFDbkJ1QixLQUFLLENBQUMsQ0FBQztBQUNYO0FBRUE7O0NBRUMsR0FDRCxTQUFTQyxhQUFhRixJQUFVO0lBQzlCLE9BQU8sR0FBd0MsT0FBckMsQ0FBQyxNQUFNQSxLQUFLRyxRQUFRLEVBQUMsRUFBR0YsS0FBSyxDQUFDLENBQUMsSUFBRyxLQUVoQyxPQUZtQyxDQUM3QyxNQUFNRCxLQUFLaEIsVUFBVSxFQUFDLEVBQ3RCaUIsS0FBSyxDQUFDLENBQUM7QUFDWDtBQUVBOztDQUVDLEdBQ0QsU0FBU0osaUJBQWlCRyxJQUFVO0lBQ2xDLE9BQU8sR0FBeUIsT0FBdEJBLEtBQUt4QixXQUFXLElBQUcsS0FBOEMsT0FBM0MsQ0FBQyxNQUFPd0IsQ0FBQUEsS0FBS3ZCLFFBQVEsS0FBSyxFQUFDLEVBQUd3QixLQUFLLENBQUMsQ0FBQyxJQUFHLEtBRXpELE9BRjRELENBQ3pFLE1BQU1ELEtBQUt0QixPQUFPLEVBQUMsRUFDbkJ1QixLQUFLLENBQUMsQ0FBQyxJQUFHLEtBQXdDLE9BQXJDLENBQUMsTUFBTUQsS0FBS0csUUFBUSxFQUFDLEVBQUdGLEtBQUssQ0FBQyxDQUFDLElBQUcsS0FFckMsT0FGd0MsQ0FDbEQsTUFBTUQsS0FBS2hCLFVBQVUsRUFBQyxFQUN0QmlCLEtBQUssQ0FBQyxDQUFDO0FBQ1giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2NvbXBvbmVudHMvY2FsY3VsYXRlRnJlZVRpbWUudHN4PzFjYjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcyB9IGZyb20gXCJAZnVsbGNhbGVuZGFyL2NvcmUvaW50ZXJuYWwtY29tbW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhbGN1bGF0ZUZyZWVUaW1lKGV2ZW50czogYW55KSB7XG4gIC8vIOWPluW+l+OBl+OBn+OCq+ODrOODs+ODgOODvOOBi+OCieepuuOBjeaZgumWk+OCkjLpgLLmlbDlvaLlvI/jgafmir3lh7pcblxuICBjb25zdCBiaXRFbXB0eVRpbWVPZkRheXMgPSBjYWxjdWxhdGVFbXB0eVRpbWVPZkRheXMoZXZlbnRzKTtcbiAgLy9jb25zb2xlLmxvZyhiaXRFbXB0eVRpbWVPZkRheXMpO1xuICAvLyBEYXRl5b2i5byP44Gr5oi744GZXG4gIGNvbnN0IGVtcHR5VGltZU9mRGF5cyA9IGNoYW5nZUJpdFRvRGF0ZShiaXRFbXB0eVRpbWVPZkRheXMpO1xuICAvLyDlh7rliptcblxuICBjb25zdCBmcmVlVGltZSA9IGRpc3BsYXlEYXlzKGVtcHR5VGltZU9mRGF5cyk7XG5cbiAgY29uc3QgZnVsbGNhbGVuZGFyRGF0YSA9IGNvbnZlcnRUb0Z1bGxjYWxlbmRhckRhdGEoZnJlZVRpbWUpO1xuICByZXR1cm4geyBmcmVlVGltZSwgZnVsbGNhbGVuZGFyRGF0YSB9O1xuXG4gIC8vIOaXpeavjuOBq+OAgeepuuOBjeaZgumWk+OBjOOAjDEwOjAwLTExOjMwLDE0OjE1LTE1OjQ144CN44Gu44KI44GG44Gq5b2i5byP44Gn5Ye65Yqb44GV44KM44KLXG59XG5cbi8qKlxuICog56m644GN5pel56iL44KSYml05b2i5byP44Gn6L+U5Y20XG4gKi9cblxuY29uc3QgY29udmVydFRvRnVsbGNhbGVuZGFyRGF0YSA9IChmcmVlVGltZTogc3RyaW5nW10pID0+IHtcbiAgY29uc3QgZXZlbnRzOiBhbnkgPSBbXTtcbiAgZnJlZVRpbWUubWFwKChzY2hlZHVsZSkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0U3RyID0gc2NoZWR1bGUuc3BsaXQoXCItXCIpWzBdO1xuICAgIGNvbnN0IGVuZFN0ciA9IHNjaGVkdWxlLnNwbGl0KFwiLVwiKVsxXTtcbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0U3RyKTtcbiAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShlbmRTdHIpO1xuXG4gICAgY29uc3QgZXZlbnQgPSB7XG4gICAgICB0aXRsZTogXCLjg4fjg7zjg4jjgafjgY3jgb7jgZnwn6WCXCIsXG4gICAgICBzdGFydDogc3RhcnQsXG4gICAgICBlbmQ6IGVuZCxcbiAgICB9O1xuICAgIC8vY29uc29sZS5sb2coZXZlbnQpO1xuICAgIGV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgfSk7XG4gIHJldHVybiBldmVudHM7XG59O1xuZnVuY3Rpb24gY2FsY3VsYXRlRW1wdHlUaW1lT2ZEYXlzKGV2ZW50czogeyBzdGFydDogRGF0ZTsgZW5kOiBEYXRlIH1bXSkge1xuICBjb25zdCBiaXREYXlzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbiAgZXZlbnRzLm1hcCgoZXZlbnQpID0+IHtcbiAgICBjb25zdCBiaXREYXkgPSBjaGFuZ2VEYXRlVG9CaXQoZXZlbnQpO1xuICAgIGNvbnN0IHsga2V5LCB2YWx1ZSB9OiB7IGtleTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0gPSBiaXREYXk7XG5cbiAgICBpZiAoYml0RGF5c1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIOirlueQhuWSjOOCkuWPluOCi1xuICAgICAgLy8g6L+96KiY77yaQmlnSW505Z6L44Gr44Kt44Oj44K544OI44GX44Gm5ryU566X44KS6KGM44GGXG4gICAgICBiaXREYXlzW2tleV0gPVxuICAgICAgICBcIjBiXCIgK1xuICAgICAgICAoQmlnSW50KGJpdERheXNba2V5XSkgfCBCaWdJbnQodmFsdWUpKS50b1N0cmluZygyKS5wYWRTdGFydCg1NiwgXCIwXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiaXREYXlzW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBiaXREYXlzO1xufVxuXG4vKipcbiAqIGJpdOW9ouW8j+OBq+WkieaPm1xuICogQHJldHVybiB7XCJrZXlcIjoga2V5LCBcInZhbHVlXCI6IHZhbHVlfSwga2V5ID0g5pel5LuYLCB2YWx1ZSA9IGJpdFxuICogYml05a6a576pIOKGkiAxNeWIhuWMuuWIh+OCiuOBp+ihqOePvuOAgTAgPSDkuojlrprjgarjgZfjgIExID0g5LqI5a6a44GC44KKXG4gKiDkvovvvIhf44Gv5a6f6Zqb44Gr44Gv5ZCr44G+44KM44Gq44GE77yJ77yaMTE6MDAtMTI6MTXkuojlrprjgYLjgoog4oaSIOOAjDAwMDBfMDAwMF8xMTExXzEwMDBfMDAwMF8wMDAwXzAwMDBfMDAwMF8wMDAwXzAwMDBfMDAwMOOAjVxuICogNCAqIDExID0gNDRiaXTihpI1NmJpdFxuICovXG5mdW5jdGlvbiBjaGFuZ2VEYXRlVG9CaXQoZXZlbnQ6IHsgc3RhcnQ6IERhdGU7IGVuZDogRGF0ZSB9KSB7XG4gIGNvbnN0IHN0YXJ0ID0gZXZlbnQuc3RhcnQ7XG4gIGNvbnN0IGVuZCA9IGV2ZW50LmVuZDtcblxuICAvLyDlr77osaHjga7mmYLplpNcbiAgY29uc3QgY2xvY2tJbiA9IG5ldyBEYXRlKFxuICAgIHN0YXJ0LmdldEZ1bGxZZWFyKCksXG4gICAgc3RhcnQuZ2V0TW9udGgoKSxcbiAgICBzdGFydC5nZXREYXRlKCksXG4gICAgOSxcbiAgICAwXG4gICk7XG4gIGNvbnN0IGNsb2NrT3V0ID0gbmV3IERhdGUoXG4gICAgc3RhcnQuZ2V0RnVsbFllYXIoKSxcbiAgICBzdGFydC5nZXRNb250aCgpLFxuICAgIHN0YXJ0LmdldERhdGUoKSxcbiAgICAyMyxcbiAgICAwXG4gICk7XG5cbiAgbGV0IGRhdGVCaXQ6IHN0cmluZyA9IFwiMGJcIjtcbiAgbGV0IGNoZWNrRHVyYXRpb24gPSBuZXcgRGF0ZShjbG9ja0luKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU2OyBpKyspIHtcbiAgICBpZiAoc3RhcnQgPD0gY2hlY2tEdXJhdGlvbiAmJiBjaGVja0R1cmF0aW9uIDwgZW5kKSB7XG4gICAgICBkYXRlQml0ICs9IFwiMVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlQml0ICs9IFwiMFwiO1xuICAgIH1cblxuICAgIGlmIChjaGVja0R1cmF0aW9uID49IGNsb2NrT3V0KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2hlY2tEdXJhdGlvbi5zZXRNaW51dGVzKGNoZWNrRHVyYXRpb24uZ2V0TWludXRlcygpICsgMTUpO1xuICB9XG5cbiAgY29uc3QgZGF0ZUtleTogc3RyaW5nID0gZ2V0RGF0ZUxhYmVsKHN0YXJ0KTtcbiAgcmV0dXJuIHsga2V5OiBkYXRlS2V5LCB2YWx1ZTogZGF0ZUJpdCB9O1xufVxuXG4vKipcbiAqIEJpdOW9ouW8j+OBruaXpeS7mOOCkkRhdGXlnovjgavmiLvjgZlcbiAqIEByZXR1cm4gezzml6Xku5g+IDoge1wic3RhcnRcIjogPOaXpeaZgj4sIFwiZW5kXCI6IDzml6XmmYI+fVtdfVtdXG4gKi9cblxuZnVuY3Rpb24gY2hhbmdlQml0VG9EYXRlKGJpdERheXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pIHtcbiAgY29uc3QgZnJlZVRpbWVzOiB7IFtrZXk6IHN0cmluZ106IHsgc3RhcnQ6IHN0cmluZzsgZW5kOiBzdHJpbmcgfVtdIH0gPSB7fTtcblxuICBPYmplY3Qua2V5cyhiaXREYXlzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAvLyDlhYjpoK3jga7jgIwwYuOAjemZpOWOu1xuICAgIGNvbnN0IGRhdGVCaXQgPSBiaXREYXlzW2tleV0ucmVwbGFjZSgvXjBiLywgXCJcIik7XG5cbiAgICAvLyDnr4Tlm7Ljga7lp4vngrnjgpLoqK3lrppcbiAgICBjb25zdCBjbG9ja0luID0gbmV3IERhdGUoa2V5KTtcbiAgICBjbG9ja0luLnNldEhvdXJzKDkpO1xuICAgIGNsb2NrSW4uc2V0TWludXRlcygwKTtcblxuICAgIGxldCBzdGFydDtcbiAgICBsZXQgZW5kO1xuICAgIGNvbnN0IGZyZWVEdXJhdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGVCaXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGJpdCA9IGRhdGVCaXQuY2hhckF0KGkpO1xuICAgICAgaWYgKCFzdGFydCkge1xuICAgICAgICBpZiAoYml0ID09PSBcIjBcIikge1xuICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoY2xvY2tJbik7XG4gICAgICAgICAgc3RhcnQuc2V0TWludXRlcyhzdGFydC5nZXRNaW51dGVzKCkgKyAxNSAqIGkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYml0ID09PSBcIjFcIiB8fCBpID09PSBkYXRlQml0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBpZiAoYml0ID09PSBcIjFcIikge1xuICAgICAgICAgICAgZW5kID0gbmV3IERhdGUoY2xvY2tJbik7XG4gICAgICAgICAgICBlbmQuc2V0TWludXRlcyhlbmQuZ2V0TWludXRlcygpICsgMTUgKiBpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5kID0gbmV3IERhdGUoY2xvY2tJbik7XG4gICAgICAgICAgICBlbmQuc2V0TWludXRlcyhlbmQuZ2V0TWludXRlcygpICsgMTUgKiAoaSArIDEpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZnJlZUR1cmF0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHN0YXJ0OiBnZXREYXRlVGltZUxhYmVsKHN0YXJ0KSxcbiAgICAgICAgICAgIGVuZDogZ2V0RGF0ZVRpbWVMYWJlbChlbmQpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIOODquOCu+ODg+ODiFxuICAgICAgICAgIHN0YXJ0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGVuZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmcmVlVGltZXNba2V5XSA9IGZyZWVEdXJhdGlvbnM7XG4gIH0pO1xuXG4gIHJldHVybiBmcmVlVGltZXM7XG59XG5cbi8qKlxuICog5pel5pmC44KS44K344O844OI44Gr6KGo56S6XG4gKiBAcGFyYW0gZGF5cyB7POaXpeS7mD4gOiB7XCJzdGFydFwiOiA85pel5pmCPiwgXCJlbmRcIjogPOaXpeaZgj59W119W11cbiAqL1xuZnVuY3Rpb24gZGlzcGxheURheXMoZGF5czoge1xuICBba2V5OiBzdHJpbmddOiB7IHN0YXJ0OiBzdHJpbmc7IGVuZDogc3RyaW5nIH1bXTtcbn0pIHtcbiAgY29uc3QgZnJlZVRpbWU6IHN0cmluZ1tdID0gW107XG4gIE9iamVjdC5rZXlzKGRheXMpLmZvckVhY2goKGtleSwgaSkgPT4ge1xuICAgIGlmIChkYXlzW2tleV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGAke2tleX0gMDk6MDAtJHtrZXl9IDIzOjAwYDtcbiAgICAgIGZyZWVUaW1lLnB1c2godmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXlzW2tleV0uZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGAke2Uuc3RhcnR9LSR7ZS5lbmR9YDtcbiAgICAgICAgZnJlZVRpbWUucHVzaCh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyDlh7rliptcbiAgfSk7XG4gIHJldHVybiBmcmVlVGltZTtcbn1cblxuLyoqXG4gKiBZWVlZL01NL0RE44KS6L+U44GZXG4gKi9cbmZ1bmN0aW9uIGdldERhdGVMYWJlbChkYXRlOiBEYXRlKSB7XG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LyR7KFwiMFwiICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpKS5zbGljZSgtMil9LyR7KFxuICAgIFwiMFwiICsgZGF0ZS5nZXREYXRlKClcbiAgKS5zbGljZSgtMil9YDtcbn1cblxuLyoqXG4gKiBoaDptbeOCkui/lOOBmVxuICovXG5mdW5jdGlvbiBnZXRUaW1lTGFiZWwoZGF0ZTogRGF0ZSkge1xuICByZXR1cm4gYCR7KFwiMFwiICsgZGF0ZS5nZXRIb3VycygpKS5zbGljZSgtMil9OiR7KFxuICAgIFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKClcbiAgKS5zbGljZSgtMil9YDtcbn1cblxuLyoqXG4gKiBZWVlZL01NL0REIGhoOm1t44KS6L+U44GZXG4gKi9cbmZ1bmN0aW9uIGdldERhdGVUaW1lTGFiZWwoZGF0ZTogRGF0ZSkge1xuICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS8keyhcIjBcIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKSkuc2xpY2UoLTIpfS8keyhcbiAgICBcIjBcIiArIGRhdGUuZ2V0RGF0ZSgpXG4gICkuc2xpY2UoLTIpfSAkeyhcIjBcIiArIGRhdGUuZ2V0SG91cnMoKSkuc2xpY2UoLTIpfTokeyhcbiAgICBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpXG4gICkuc2xpY2UoLTIpfWA7XG59XG4iXSwibmFtZXMiOlsiY2FsY3VsYXRlRnJlZVRpbWUiLCJldmVudHMiLCJiaXRFbXB0eVRpbWVPZkRheXMiLCJjYWxjdWxhdGVFbXB0eVRpbWVPZkRheXMiLCJlbXB0eVRpbWVPZkRheXMiLCJjaGFuZ2VCaXRUb0RhdGUiLCJmcmVlVGltZSIsImRpc3BsYXlEYXlzIiwiZnVsbGNhbGVuZGFyRGF0YSIsImNvbnZlcnRUb0Z1bGxjYWxlbmRhckRhdGEiLCJtYXAiLCJzY2hlZHVsZSIsInN0YXJ0U3RyIiwic3BsaXQiLCJlbmRTdHIiLCJzdGFydCIsIkRhdGUiLCJlbmQiLCJldmVudCIsInRpdGxlIiwicHVzaCIsImJpdERheXMiLCJiaXREYXkiLCJjaGFuZ2VEYXRlVG9CaXQiLCJrZXkiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsIkJpZ0ludCIsInRvU3RyaW5nIiwicGFkU3RhcnQiLCJjbG9ja0luIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJjbG9ja091dCIsImRhdGVCaXQiLCJjaGVja0R1cmF0aW9uIiwiaSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiZGF0ZUtleSIsImdldERhdGVMYWJlbCIsImZyZWVUaW1lcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicmVwbGFjZSIsInNldEhvdXJzIiwiZnJlZUR1cmF0aW9ucyIsImxlbmd0aCIsImJpdCIsImNoYXJBdCIsImdldERhdGVUaW1lTGFiZWwiLCJkYXlzIiwiZSIsImRhdGUiLCJzbGljZSIsImdldFRpbWVMYWJlbCIsImdldEhvdXJzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/calculateFreeTime.tsx\n"));

/***/ })

});