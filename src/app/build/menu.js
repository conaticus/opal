/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/pages/menu/index.ts":
/*!*************************************!*\
  !*** ./src/app/pages/menu/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nconst openProjectButton = document.getElementById(\"open-project-btn\");\r\nopenProjectButton.addEventListener(\"click\", async () => {\r\n    const dialogChoice = await ipc.invoke(\"request-dialog-choice\", { properties: [\"openDirectory\"] });\r\n    const projectInfoRaw = await fs.readFile(`${dialogChoice}/project-info.json`, \"utf8\");\r\n    const projectInfo = JSON.parse(projectInfoRaw);\r\n    if (projectInfo.isOpal) {\r\n        localStorage.setItem(\"currentProjectDirectory\", dialogChoice);\r\n        location.href = \"../editor/index.html\";\r\n    }\r\n    else {\r\n        alert(\"ERROR: Project is not an Opal project.\");\r\n    }\r\n});\r\n\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/menu/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app/pages/menu/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;