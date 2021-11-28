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

/***/ "./src/app/CustomElements/CustomElement.ts":
/*!*************************************************!*\
  !*** ./src/app/CustomElements/CustomElement.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CustomElement)\n/* harmony export */ });\nclass CustomElement {\r\n    constructor(type = \"div\") {\r\n        this.element = document.createElement(type);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://pouch/./src/app/CustomElements/CustomElement.ts?");

/***/ }),

/***/ "./src/app/CustomElements/Tabs.ts":
/*!****************************************!*\
  !*** ./src/app/CustomElements/Tabs.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Tabs)\n/* harmony export */ });\n/* harmony import */ var _CustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomElement */ \"./src/app/CustomElements/CustomElement.ts\");\n\r\nclass Tabs extends _CustomElement__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor() {\r\n        super();\r\n        this.element.className = \"tabs\";\r\n        this.buttonsContainer = document.createElement(\"div\");\r\n        this.buttonsContainer.className = \"buttons-container\";\r\n        this.element.appendChild(this.buttonsContainer);\r\n        this.childElementContainer = document.createElement(\"div\");\r\n        this.childElementContainer.className = \"child-element-container\";\r\n        this.element.appendChild(this.childElementContainer);\r\n        this.tabs = {};\r\n        this.currentTabSet = false;\r\n    }\r\n    addTab(name, defaultElement) {\r\n        if (this.tabs[name]) {\r\n            console.error(`Tab '${name}' already exists.`);\r\n            return;\r\n        }\r\n        const button = document.createElement(\"button\");\r\n        button.innerText = name;\r\n        this.buttonsContainer.appendChild(button);\r\n        defaultElement.style.display = \"none\";\r\n        this.childElementContainer.appendChild(defaultElement);\r\n        this.tabs[name] = {\r\n            button,\r\n            element: defaultElement,\r\n            defaultElement,\r\n        };\r\n        if (!this.currentTabSet) {\r\n            this.setCurrentTab(name);\r\n            this.currentTabSet = true;\r\n        }\r\n        button.addEventListener(\"click\", () => {\r\n            this.setCurrentTab(name);\r\n        });\r\n    }\r\n    setChildElement(tabName, element) {\r\n        this.childElementContainer.childNodes.forEach(child => {\r\n            if (child === this.tabs[tabName].element)\r\n                child.remove();\r\n        });\r\n        this.childElementContainer.appendChild(element);\r\n        this.tabs[tabName].element = element;\r\n    }\r\n    setChildDefault(tabName) {\r\n        const tab = this.tabs[tabName];\r\n        this.setChildElement(tabName, tab.defaultElement);\r\n    }\r\n    setCurrentTab(name) {\r\n        if (!this.tabs[name]) {\r\n            console.error(`Tab '${name}' does not exist.`);\r\n            return;\r\n        }\r\n        for (const tabKey in this.tabs) {\r\n            const { element: tab } = this.tabs[tabKey];\r\n            if (tabKey === name) {\r\n                tab.style.display = \"block\";\r\n            }\r\n            else {\r\n                tab.style.display = \"none\";\r\n            }\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://pouch/./src/app/CustomElements/Tabs.ts?");

/***/ }),

/***/ "./src/app/CustomElements/WidgetContainer.ts":
/*!***************************************************!*\
  !*** ./src/app/CustomElements/WidgetContainer.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WidgetContainer)\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ \"./src/app/types.ts\");\n/* harmony import */ var _util_appendCustomElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/appendCustomElement */ \"./src/app/util/appendCustomElement.ts\");\n/* harmony import */ var _CustomElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomElement */ \"./src/app/CustomElements/CustomElement.ts\");\n/* harmony import */ var _Widgets_TextWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Widgets/TextWidget */ \"./src/app/CustomElements/Widgets/TextWidget.ts\");\n\r\n\r\n\r\n\r\nclass WidgetContainer extends _CustomElement__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\r\n    constructor() {\r\n        super();\r\n        this.occupied = false;\r\n        this.element.className = \"widget-container\";\r\n        this.element.addEventListener(\"dragover\", (e) => {\r\n            if (this.occupied)\r\n                return;\r\n            e.preventDefault();\r\n        }); // allow drop\r\n        this.element.addEventListener(\"drop\", (e) => {\r\n            e.preventDefault();\r\n            const widgetType = Number(e.dataTransfer.getData(\"widget-type\"));\r\n            if (widgetType === undefined)\r\n                return;\r\n            switch (widgetType) {\r\n                case _types__WEBPACK_IMPORTED_MODULE_0__.WidgetType.TEXT:\r\n                    this.addTextWidget();\r\n                    break;\r\n                default:\r\n                    return;\r\n            }\r\n        });\r\n    }\r\n    addTextWidget() {\r\n        const widget = new _Widgets_TextWidget__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\n        (0,_util_appendCustomElement__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.element, widget);\r\n        this.dispatchWidgetCreate(widget);\r\n        this.occupied = true;\r\n    }\r\n    dispatchWidgetCreate(widget) {\r\n        const widgetEvent = new CustomEvent(\"widget-create\", { detail: { widget } });\r\n        this.element.dispatchEvent(widgetEvent);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://pouch/./src/app/CustomElements/WidgetContainer.ts?");

/***/ }),

/***/ "./src/app/CustomElements/WidgetInspector.ts":
/*!***************************************************!*\
  !*** ./src/app/CustomElements/WidgetInspector.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WidgetInspector)\n/* harmony export */ });\n/* harmony import */ var _CustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomElement */ \"./src/app/CustomElements/CustomElement.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ \"./src/app/types.ts\");\n\r\n\r\nclass WidgetInspector extends _CustomElement__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(widget) {\r\n        super();\r\n        this.widget = widget;\r\n        for (const propertyName in widget.propertyTypes) {\r\n            const widgetPropertyType = widget.propertyTypes[propertyName];\r\n            switch (widgetPropertyType) {\r\n                case _types__WEBPACK_IMPORTED_MODULE_1__.WidgetPropertyType.TEXT_SHORT:\r\n                    this.addTextShort(propertyName);\r\n                    break;\r\n            }\r\n        }\r\n    }\r\n    addTextShort(propertyName) {\r\n        const inputElement = document.createElement(\"input\");\r\n        this.element.appendChild(inputElement);\r\n        const property = this.widget.properties[propertyName];\r\n        if (property)\r\n            inputElement.value = property;\r\n        inputElement.addEventListener(\"input\", () => {\r\n            this.widget.setText(inputElement.value);\r\n        });\r\n        this.widget.element.addEventListener(\"input\", () => {\r\n            inputElement.value = this.widget.element.value;\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://pouch/./src/app/CustomElements/WidgetInspector.ts?");

/***/ }),

/***/ "./src/app/CustomElements/WidgetPreview.ts":
/*!*************************************************!*\
  !*** ./src/app/CustomElements/WidgetPreview.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WidgetPreview)\n/* harmony export */ });\n/* harmony import */ var _CustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomElement */ \"./src/app/CustomElements/CustomElement.ts\");\n\r\nclass WidgetPreview extends _CustomElement__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(name, type) {\r\n        super();\r\n        this.name = name;\r\n        this.type = type;\r\n        this.element.className = \"widget-preview\";\r\n        this.element.innerText = name;\r\n        this.element.draggable = true;\r\n        this.element.addEventListener(\"dragstart\", (e) => {\r\n            e.dataTransfer.setData(\"widget-type\", String(type));\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://pouch/./src/app/CustomElements/WidgetPreview.ts?");

/***/ }),

/***/ "./src/app/CustomElements/Widgets/TextWidget.ts":
/*!******************************************************!*\
  !*** ./src/app/CustomElements/Widgets/TextWidget.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TextWidget)\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types */ \"./src/app/types.ts\");\n/* harmony import */ var _Widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Widget */ \"./src/app/CustomElements/Widgets/Widget.ts\");\n\r\n\r\nclass TextWidget extends _Widget__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\r\n    constructor() {\r\n        super(\"textarea\", { text: _types__WEBPACK_IMPORTED_MODULE_0__.WidgetPropertyType.TEXT_SHORT });\r\n        this.element.className = \"text-widget\";\r\n        this.setText(\"Text\");\r\n    }\r\n    setText(value) {\r\n        this.properties.text = value;\r\n        this.element.value = value;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://pouch/./src/app/CustomElements/Widgets/TextWidget.ts?");

/***/ }),

/***/ "./src/app/CustomElements/Widgets/Widget.ts":
/*!**************************************************!*\
  !*** ./src/app/CustomElements/Widgets/Widget.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Widget)\n/* harmony export */ });\n/* harmony import */ var _CustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CustomElement */ \"./src/app/CustomElements/CustomElement.ts\");\n\r\nclass Widget extends _CustomElement__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(type = \"div\", propertyTypes) {\r\n        super(type);\r\n        this.propertyTypes = propertyTypes;\r\n        this.properties = {};\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://pouch/./src/app/CustomElements/Widgets/Widget.ts?");

/***/ }),

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/sidebar */ \"./src/app/scripts/sidebar.ts\");\n/* harmony import */ var _scripts_preview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/preview */ \"./src/app/scripts/preview.ts\");\n\r\n\r\n\n\n//# sourceURL=webpack://pouch/./src/app/index.ts?");

/***/ }),

/***/ "./src/app/scripts/preview.ts":
/*!************************************!*\
  !*** ./src/app/scripts/preview.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CustomElements_WidgetContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CustomElements/WidgetContainer */ \"./src/app/CustomElements/WidgetContainer.ts\");\n/* harmony import */ var _util_appendCustomElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/appendCustomElement */ \"./src/app/util/appendCustomElement.ts\");\n/* harmony import */ var _CustomElements_WidgetInspector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CustomElements/WidgetInspector */ \"./src/app/CustomElements/WidgetInspector.ts\");\n/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidebar */ \"./src/app/scripts/sidebar.ts\");\n\r\n\r\n\r\n\r\nconst preview = document.getElementById(\"preview\");\r\nconst widgetContainer = new _CustomElements_WidgetContainer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n(0,_util_appendCustomElement__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(preview, widgetContainer);\r\nwidgetContainer.element.addEventListener(\"widget-create\", (e) => {\r\n    const widgetInspector = new _CustomElements_WidgetInspector__WEBPACK_IMPORTED_MODULE_2__[\"default\"](e.detail.widget);\r\n    _sidebar__WEBPACK_IMPORTED_MODULE_3__.tabs.setChildElement(\"Inspector\", widgetInspector.element);\r\n    _sidebar__WEBPACK_IMPORTED_MODULE_3__.tabs.setCurrentTab(\"Inspector\");\r\n});\r\n\n\n//# sourceURL=webpack://pouch/./src/app/scripts/preview.ts?");

/***/ }),

/***/ "./src/app/scripts/sidebar.ts":
/*!************************************!*\
  !*** ./src/app/scripts/sidebar.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"tabs\": () => (/* binding */ tabs)\n/* harmony export */ });\n/* harmony import */ var _CustomElements_Tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CustomElements/Tabs */ \"./src/app/CustomElements/Tabs.ts\");\n/* harmony import */ var _CustomElements_WidgetPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CustomElements/WidgetPreview */ \"./src/app/CustomElements/WidgetPreview.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ \"./src/app/types.ts\");\n/* harmony import */ var _util_appendCustomElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/appendCustomElement */ \"./src/app/util/appendCustomElement.ts\");\n\r\n\r\n\r\n\r\nconst sidebar = document.getElementById(\"sidebar\");\r\nconst tabs = new _CustomElements_Tabs__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\ntabs.addTab(\"Widgets\", new _CustomElements_WidgetPreview__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"Text\", _types__WEBPACK_IMPORTED_MODULE_2__.WidgetType.TEXT).element);\r\nconst inspectorDefaultChild = document.createElement(\"p\");\r\ninspectorDefaultChild.innerText = \"No widget is selected.\";\r\ntabs.addTab(\"Inspector\", inspectorDefaultChild);\r\n(0,_util_appendCustomElement__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(sidebar, tabs);\r\n\r\n\n\n//# sourceURL=webpack://pouch/./src/app/scripts/sidebar.ts?");

/***/ }),

/***/ "./src/app/types.ts":
/*!**************************!*\
  !*** ./src/app/types.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WidgetType\": () => (/* binding */ WidgetType),\n/* harmony export */   \"WidgetPropertyType\": () => (/* binding */ WidgetPropertyType)\n/* harmony export */ });\nvar WidgetType;\r\n(function (WidgetType) {\r\n    WidgetType[WidgetType[\"TEXT\"] = 0] = \"TEXT\";\r\n})(WidgetType || (WidgetType = {}));\r\nvar WidgetPropertyType;\r\n(function (WidgetPropertyType) {\r\n    WidgetPropertyType[WidgetPropertyType[\"TEXT_SHORT\"] = 0] = \"TEXT_SHORT\";\r\n})(WidgetPropertyType || (WidgetPropertyType = {}));\r\n\n\n//# sourceURL=webpack://pouch/./src/app/types.ts?");

/***/ }),

/***/ "./src/app/util/appendCustomElement.ts":
/*!*********************************************!*\
  !*** ./src/app/util/appendCustomElement.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * Append `customElement.element` as a child of `destination`\r\n * @param destination Destination HTMLElement\r\n * @param customElement Custom pouch element\r\n */\r\nconst appendCustomElement = (destination, customElement) => {\r\n    destination.appendChild(customElement.element);\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appendCustomElement);\r\n\n\n//# sourceURL=webpack://pouch/./src/app/util/appendCustomElement.ts?");

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