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

/***/ "./src/app/pages/new-project/index.ts":
/*!********************************************!*\
  !*** ./src/app/pages/new-project/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nconst form = document.getElementById(\"new-project-form\");\r\nconst projectDirectoryInput = document.getElementById(\"project-directory-input\");\r\nconst projectDirDialogButton = document.getElementById(\"project-dir-dialog-button\");\r\nprojectDirDialogButton.addEventListener(\"click\", async (e) => {\r\n    e.preventDefault();\r\n    const dialogChoice = await ipc.invoke(\"request-dialog-choice\", { properties: [\"openDirectory\"] });\r\n    projectDirectoryInput.value = dialogChoice;\r\n});\r\nform.addEventListener(\"submit\", async (e) => {\r\n    e.preventDefault();\r\n    const projectName = document.getElementById(\"project-name-input\").value;\r\n    const rootDir = projectDirectoryInput.value;\r\n    try {\r\n        await fs.access(rootDir);\r\n    }\r\n    catch {\r\n        await fs.mkdir(rootDir);\r\n    }\r\n    if ((await fs.readdir(rootDir)).length !== 0) {\r\n        alert(\"ERROR: Directory must be empty.\");\r\n        return;\r\n    }\r\n    await fs.writeFile(`${rootDir}/project-info.json`, JSON.stringify({ name: projectName, isOpal: true }));\r\n    localStorage.setItem(\"currentProjectDirectory\", rootDir);\r\n    location.href = \"../editor/index.html\";\r\n});\r\n\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/new-project/index.ts?");

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
/******/ 	__webpack_modules__["./src/app/pages/new-project/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;