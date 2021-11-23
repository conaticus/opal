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

/***/ "./src/app/CustomElements/Tabs.ts":
/*!****************************************!*\
  !*** ./src/app/CustomElements/Tabs.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Tabs = /** @class */ (function () {\r\n    function Tabs() {\r\n        this.element = document.createElement(\"div\");\r\n        this.element.className = \"tabs\";\r\n        this.buttonsContainer = document.createElement(\"div\");\r\n        this.buttonsContainer.className = \"buttons-container\";\r\n        this.element.appendChild(this.buttonsContainer);\r\n        this.childElementContainer = document.createElement(\"div\");\r\n        this.childElementContainer.className = \"child-element-container\";\r\n        this.element.appendChild(this.childElementContainer);\r\n        this.tabs = {};\r\n        this.currentTabSet = false;\r\n    }\r\n    Tabs.prototype.addTab = function (name, childElement) {\r\n        var _this = this;\r\n        if (this.tabs[name]) {\r\n            console.error(\"Tab '\".concat(name, \"' already exists.\"));\r\n            return;\r\n        }\r\n        var button = document.createElement(\"button\");\r\n        button.innerText = name;\r\n        this.buttonsContainer.appendChild(button);\r\n        childElement.style.display = \"none\";\r\n        this.childElementContainer.appendChild(childElement);\r\n        this.tabs[name] = {\r\n            button: button,\r\n            element: childElement\r\n        };\r\n        if (!this.currentTabSet) {\r\n            this.setCurrentTab(name);\r\n            this.currentTabSet = true;\r\n        }\r\n        button.addEventListener(\"click\", function () {\r\n            _this.setCurrentTab(name);\r\n        });\r\n    };\r\n    Tabs.prototype.setCurrentTab = function (name) {\r\n        if (!this.tabs[name]) {\r\n            console.error(\"Tab '\".concat(name, \"' does not exist.\"));\r\n            return;\r\n        }\r\n        for (var tabKey in this.tabs) {\r\n            var tab = this.tabs[tabKey].element;\r\n            if (tabKey === name) {\r\n                tab.style.display = \"block\";\r\n            }\r\n            else {\r\n                tab.style.display = \"none\";\r\n            }\r\n        }\r\n    };\r\n    return Tabs;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tabs);\r\n\n\n//# sourceURL=webpack://pouch/./src/app/CustomElements/Tabs.ts?");

/***/ }),

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/sidebar */ \"./src/app/scripts/sidebar.ts\");\n\r\n\n\n//# sourceURL=webpack://pouch/./src/app/index.ts?");

/***/ }),

/***/ "./src/app/scripts/sidebar.ts":
/*!************************************!*\
  !*** ./src/app/scripts/sidebar.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CustomElements_Tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CustomElements/Tabs */ \"./src/app/CustomElements/Tabs.ts\");\n/* harmony import */ var _util_appendCustomElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/appendCustomElement */ \"./src/app/util/appendCustomElement.ts\");\n\r\n\r\nvar sidebar = document.getElementById(\"sidebar\");\r\nvar tabs = new _CustomElements_Tabs__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\nvar textWidget = document.createElement(\"h1\");\r\ntextWidget.innerText = \"Text\";\r\ntabs.addTab(\"Widgets\", textWidget);\r\nvar inspectorHeading = document.createElement(\"h1\");\r\ninspectorHeading.innerText = \"Welcome to the inspector\";\r\ntabs.addTab(\"Inspector\", inspectorHeading);\r\n(0,_util_appendCustomElement__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(sidebar, tabs);\r\n\n\n//# sourceURL=webpack://pouch/./src/app/scripts/sidebar.ts?");

/***/ }),

/***/ "./src/app/util/appendCustomElement.ts":
/*!*********************************************!*\
  !*** ./src/app/util/appendCustomElement.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * Append `customElement.element` as a child of `destination`\r\n * @param destination Destination HTMLElement\r\n * @param customElement Custom pouch element\r\n */\r\nvar appendCustomElement = function (destination, customElement) {\r\n    destination.appendChild(customElement.element);\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appendCustomElement);\r\n\n\n//# sourceURL=webpack://pouch/./src/app/util/appendCustomElement.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app/index.ts");
/******/ 	
/******/ })()
;