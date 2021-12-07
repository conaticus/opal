/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/pages/editor/CustomElements/CustomElement.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/editor/CustomElements/CustomElement.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CustomElement)\n/* harmony export */ });\nclass CustomElement {\r\n    constructor(type = \"div\") {\r\n        this.element = document.createElement(type);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/CustomElements/CustomElement.ts?");

/***/ }),

/***/ "./src/app/pages/editor/CustomElements/Tabs.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/editor/CustomElements/Tabs.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Tabs)\n/* harmony export */ });\n/* harmony import */ var _CustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomElement */ \"./src/app/pages/editor/CustomElements/CustomElement.ts\");\n\r\nclass Tabs extends _CustomElement__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor() {\r\n        super();\r\n        this.element.className = \"tabs\";\r\n        this.buttonsContainer = document.createElement(\"div\");\r\n        this.buttonsContainer.className = \"buttons-container\";\r\n        this.element.appendChild(this.buttonsContainer);\r\n        this.childElementContainer = document.createElement(\"div\");\r\n        this.childElementContainer.className = \"child-element-container\";\r\n        this.element.appendChild(this.childElementContainer);\r\n        this.tabs = {};\r\n        this.currentTabSet = false;\r\n    }\r\n    addTab(name, defaultElement) {\r\n        if (this.tabs[name]) {\r\n            console.error(`Tab '${name}' already exists.`);\r\n            return;\r\n        }\r\n        const button = document.createElement(\"button\");\r\n        button.innerText = name;\r\n        this.buttonsContainer.appendChild(button);\r\n        defaultElement.style.display = \"none\";\r\n        this.childElementContainer.appendChild(defaultElement);\r\n        this.tabs[name] = {\r\n            button,\r\n            element: defaultElement,\r\n            defaultElement,\r\n        };\r\n        if (!this.currentTabSet) {\r\n            this.setCurrentTab(name);\r\n            this.currentTabSet = true;\r\n        }\r\n        button.addEventListener(\"click\", () => {\r\n            this.setCurrentTab(name);\r\n        });\r\n    }\r\n    setChildElement(tabName, element) {\r\n        this.childElementContainer.childNodes.forEach(child => {\r\n            if (child === this.tabs[tabName].element)\r\n                child.remove();\r\n        });\r\n        this.childElementContainer.appendChild(element);\r\n        this.tabs[tabName].element = element;\r\n    }\r\n    setChildDefault(tabName) {\r\n        const tab = this.tabs[tabName];\r\n        this.setChildElement(tabName, tab.defaultElement);\r\n    }\r\n    setCurrentTab(name) {\r\n        if (!this.tabs[name]) {\r\n            console.error(`Tab '${name}' does not exist.`);\r\n            return;\r\n        }\r\n        for (const tabKey in this.tabs) {\r\n            const { element: tab } = this.tabs[tabKey];\r\n            if (tabKey === name) {\r\n                tab.style.display = \"block\";\r\n            }\r\n            else {\r\n                tab.style.display = \"none\";\r\n            }\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/CustomElements/Tabs.ts?");

/***/ }),

/***/ "./src/app/pages/editor/CustomElements/WidgetContainer.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/editor/CustomElements/WidgetContainer.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WidgetContainer)\n/* harmony export */ });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./src/app/pages/editor/globals.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ \"./src/app/pages/editor/types.ts\");\n/* harmony import */ var _util_appendCustomElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/appendCustomElement */ \"./src/app/pages/editor/util/appendCustomElement.ts\");\n/* harmony import */ var _CustomElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CustomElement */ \"./src/app/pages/editor/CustomElements/CustomElement.ts\");\n/* harmony import */ var _Widgets_TextWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Widgets/TextWidget */ \"./src/app/pages/editor/CustomElements/Widgets/TextWidget.ts\");\n\r\n\r\n\r\n\r\n\r\nclass WidgetContainer extends _CustomElement__WEBPACK_IMPORTED_MODULE_3__[\"default\"] {\r\n    constructor() {\r\n        super();\r\n        this.occupied = false;\r\n        this.element.className = \"widget-container\";\r\n        this.element.addEventListener(\"dragover\", (e) => {\r\n            if (this.occupied)\r\n                return;\r\n            e.preventDefault();\r\n        });\r\n        this.element.addEventListener(\"drop\", (e) => {\r\n            e.preventDefault();\r\n            const widgetType = Number(e.dataTransfer.getData(\"widget-type\"));\r\n            if (widgetType === undefined)\r\n                return;\r\n            this.createWidget(widgetType);\r\n        });\r\n    }\r\n    createWidget(widgetType) {\r\n        let widget;\r\n        switch (widgetType) {\r\n            case _types__WEBPACK_IMPORTED_MODULE_1__.WidgetType.TEXT:\r\n                widget = new _Widgets_TextWidget__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\r\n                break;\r\n            default:\r\n                return;\r\n        }\r\n        _globals__WEBPACK_IMPORTED_MODULE_0__.widgets.push(widget);\r\n        (0,_util_appendCustomElement__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.element, widget);\r\n        this.dispatchWidgetCreate(widget);\r\n        this.occupied = true;\r\n    }\r\n    dispatchWidgetCreate(widget) {\r\n        const widgetEvent = new CustomEvent(\"widget-create\", { detail: { widget } });\r\n        this.element.dispatchEvent(widgetEvent);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/CustomElements/WidgetContainer.ts?");

/***/ }),

/***/ "./src/app/pages/editor/CustomElements/WidgetInspector.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/editor/CustomElements/WidgetInspector.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WidgetInspector)\n/* harmony export */ });\n/* harmony import */ var _CustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomElement */ \"./src/app/pages/editor/CustomElements/CustomElement.ts\");\n/* harmony import */ var _util_handleInspectorChange__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/handleInspectorChange */ \"./src/app/pages/editor/util/handleInspectorChange.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ \"./src/app/pages/editor/types.ts\");\n\r\n\r\n\r\nclass WidgetInspector extends _CustomElement__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(widget) {\r\n        super();\r\n        this.widget = widget;\r\n        this.element.className = \"widget-inspector\";\r\n        for (const propertyName in widget.propertyTypes) {\r\n            const widgetPropertyType = widget.propertyTypes[propertyName];\r\n            switch (widgetPropertyType) {\r\n                case _types__WEBPACK_IMPORTED_MODULE_2__.WidgetPropertyType.TEXT_SHORT:\r\n                    this.addTextShort(propertyName);\r\n                    break;\r\n                case _types__WEBPACK_IMPORTED_MODULE_2__.WidgetPropertyType.CHOICE:\r\n                    this.addChoice(propertyName);\r\n                    break;\r\n                case _types__WEBPACK_IMPORTED_MODULE_2__.WidgetPropertyType.SLIDER:\r\n                    this.addSlider(propertyName);\r\n                    break;\r\n                default: break;\r\n            }\r\n        }\r\n    }\r\n    addTextShort(propertyName) {\r\n        const inputElement = document.createElement(\"textarea\");\r\n        inputElement.className = \"widget-inspector-input\";\r\n        this.element.appendChild(inputElement);\r\n        const property = this.widget.properties[propertyName];\r\n        if (property.value)\r\n            inputElement.value = property.value;\r\n        inputElement.addEventListener(\"input\", () => {\r\n            (0,_util_handleInspectorChange__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(property, inputElement.value);\r\n        });\r\n        this.widget.element.addEventListener(\"input\", () => {\r\n            inputElement.value = this.widget.element.value;\r\n        });\r\n    }\r\n    addChoice(propertyName) {\r\n        const choiceElement = document.createElement(\"select\");\r\n        choiceElement.className = \"widget-inspector-input\";\r\n        const property = this.widget.properties[propertyName];\r\n        for (const choiceKey in property.value.choiceEnum) {\r\n            const choiceString = property.value.choiceEnum[choiceKey];\r\n            const optionElement = document.createElement(\"option\");\r\n            optionElement.innerText = choiceString;\r\n            choiceElement.appendChild(optionElement);\r\n        }\r\n        choiceElement.value = property.value.currentChoice;\r\n        this.element.appendChild(choiceElement);\r\n        choiceElement.addEventListener(\"input\", () => {\r\n            (0,_util_handleInspectorChange__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(property, choiceElement.value);\r\n        });\r\n    }\r\n    addSlider(propertyName) {\r\n        const sliderElement = document.createElement(\"input\");\r\n        sliderElement.className = \"widget-inspector-input\";\r\n        sliderElement.type = \"range\";\r\n        sliderElement.min = \"1\";\r\n        sliderElement.max = \"100\";\r\n        const property = this.widget.properties[propertyName];\r\n        sliderElement.value = property.value;\r\n        this.element.appendChild(sliderElement);\r\n        sliderElement.addEventListener(\"input\", () => {\r\n            (0,_util_handleInspectorChange__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(property, sliderElement.value);\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/CustomElements/WidgetInspector.ts?");

/***/ }),

/***/ "./src/app/pages/editor/CustomElements/WidgetPreview.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/editor/CustomElements/WidgetPreview.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WidgetPreview)\n/* harmony export */ });\n/* harmony import */ var _CustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomElement */ \"./src/app/pages/editor/CustomElements/CustomElement.ts\");\n\r\nclass WidgetPreview extends _CustomElement__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(name, type) {\r\n        super();\r\n        this.name = name;\r\n        this.type = type;\r\n        this.element.className = \"widget-preview\";\r\n        this.element.innerText = name;\r\n        this.element.draggable = true;\r\n        this.element.addEventListener(\"dragstart\", (e) => {\r\n            e.dataTransfer.setData(\"widget-type\", String(type));\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/CustomElements/WidgetPreview.ts?");

/***/ }),

/***/ "./src/app/pages/editor/CustomElements/Widgets/TextWidget.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/editor/CustomElements/Widgets/TextWidget.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TextWidget)\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types */ \"./src/app/pages/editor/types.ts\");\n/* harmony import */ var _util_pxToNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/pxToNumber */ \"./src/app/pages/editor/util/pxToNumber.ts\");\n/* harmony import */ var _Widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Widget */ \"./src/app/pages/editor/CustomElements/Widgets/Widget.ts\");\n\r\n\r\n\r\nvar TextType;\r\n(function (TextType) {\r\n    TextType[\"HEADING_ONE\"] = \"Heading One\";\r\n    TextType[\"HEADING_TWO\"] = \"Heading Two\";\r\n    TextType[\"HEADING_THREE\"] = \"Heading Three\";\r\n    TextType[\"HEADING_FOUR\"] = \"Heading Four\";\r\n    TextType[\"HEADING_FIVE\"] = \"Heading Five\";\r\n    TextType[\"HEADING_SIX\"] = \"Heading Six\";\r\n    TextType[\"PARAGRAPH\"] = \"Paragraph\";\r\n})(TextType || (TextType = {}));\r\nclass TextWidget extends _Widget__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\r\n    constructor() {\r\n        super(\"textarea\", { text: _types__WEBPACK_IMPORTED_MODULE_0__.WidgetPropertyType.TEXT_SHORT, type: _types__WEBPACK_IMPORTED_MODULE_0__.WidgetPropertyType.CHOICE, size: _types__WEBPACK_IMPORTED_MODULE_0__.WidgetPropertyType.SLIDER });\r\n        this.element.className = \"text-widget\";\r\n        this.initialiseProperties();\r\n        this.setText(\"Text\");\r\n        this.setType(TextType.PARAGRAPH);\r\n        this.properties.text.handleInspectorChange = (value) => this.setText(value);\r\n        this.properties.type.handleInspectorChange = (value) => this.setType(value);\r\n        this.properties.size.handleInspectorChange = (value) => this.element.style.fontSize = value + \"px\";\r\n    }\r\n    initialiseProperties() {\r\n        this.properties.type = { value: { choiceEnum: TextType } };\r\n        this.properties.text = { value: \"\" };\r\n        this.properties.size = { value: (0,_util_pxToNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.element.style.fontSize) };\r\n    }\r\n    setText(value) {\r\n        this.properties.text.value = value;\r\n        this.element.value = value;\r\n    }\r\n    setType(value) {\r\n        this.properties.type.value.currentChoice = value;\r\n        switch (value) {\r\n            case TextType.HEADING_ONE:\r\n                this.element.className = \"text-widget text-widget-h1\";\r\n                break;\r\n            case TextType.HEADING_TWO:\r\n                this.element.className = \"text-widget text-widget-h2\";\r\n                break;\r\n            case TextType.HEADING_THREE:\r\n                this.element.className = \"text-widget text-widget-h3\";\r\n                break;\r\n            case TextType.HEADING_FOUR:\r\n                this.element.className = \"text-widget text-widget-h4\";\r\n                break;\r\n            case TextType.HEADING_FIVE:\r\n                this.element.className = \"text-widget text-widget-h5\";\r\n                break;\r\n            case TextType.HEADING_SIX:\r\n                this.element.className = \"text-widget text-widget-h6\";\r\n                break;\r\n            case TextType.PARAGRAPH:\r\n                this.element.className = \"text-widget text-widget-p\";\r\n                break;\r\n            default: break;\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/CustomElements/Widgets/TextWidget.ts?");

/***/ }),

/***/ "./src/app/pages/editor/CustomElements/Widgets/Widget.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/editor/CustomElements/Widgets/Widget.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Widget)\n/* harmony export */ });\n/* harmony import */ var _CustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CustomElement */ \"./src/app/pages/editor/CustomElements/CustomElement.ts\");\n\r\nclass Widget extends _CustomElement__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(type = \"div\", propertyTypes) {\r\n        super(type);\r\n        this.propertyTypes = propertyTypes;\r\n        this.properties = {};\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/CustomElements/Widgets/Widget.ts?");

/***/ }),

/***/ "./src/app/pages/editor/globals.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/editor/globals.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"widgets\": () => (/* binding */ widgets)\n/* harmony export */ });\nconst widgets = [];\r\n\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/globals.ts?");

/***/ }),

/***/ "./src/app/pages/editor/index.ts":
/*!***************************************!*\
  !*** ./src/app/pages/editor/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/load */ \"./src/app/pages/editor/scripts/load.ts\");\n/* harmony import */ var _scripts_sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/sidebar */ \"./src/app/pages/editor/scripts/sidebar.ts\");\n/* harmony import */ var _scripts_preview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/preview */ \"./src/app/pages/editor/scripts/preview.ts\");\n/* harmony import */ var _scripts_save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/save */ \"./src/app/pages/editor/scripts/save.ts\");\n/* harmony import */ var _scripts_ipc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/ipc */ \"./src/app/pages/editor/scripts/ipc.ts\");\n/* harmony import */ var _scripts_ipc__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_scripts_ipc__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _scripts_eventListeners__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scripts/eventListeners */ \"./src/app/pages/editor/scripts/eventListeners.ts\");\n/* harmony import */ var _scripts_eventListeners__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_scripts_eventListeners__WEBPACK_IMPORTED_MODULE_5__);\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/index.ts?");

/***/ }),

/***/ "./src/app/pages/editor/scripts/eventListeners.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/editor/scripts/eventListeners.ts ***!
  \********************************************************/
/***/ (() => {

eval("history.pushState(null, null, document.title);\r\naddEventListener(\"popstate\", () => {\r\n    history.pushState(null, null, document.title);\r\n});\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/scripts/eventListeners.ts?");

/***/ }),

/***/ "./src/app/pages/editor/scripts/ipc.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/editor/scripts/ipc.ts ***!
  \*********************************************/
/***/ (() => {

eval("ipc.on(\"open-menu\", () => {\r\n    location.href = \"../menu/index.html\";\r\n});\r\nipc.on(\"new-project\", () => {\r\n    location.href = \"../new-project/index.html\";\r\n});\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/scripts/ipc.ts?");

/***/ }),

/***/ "./src/app/pages/editor/scripts/load.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/editor/scripts/load.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst load = async () => {\r\n    const projectInfoRaw = await fs.readFile(`${localStorage.getItem(\"currentProjectDirectory\")}/project-info.json`, \"utf8\");\r\n    const projectInfo = JSON.parse(projectInfoRaw);\r\n    document.title = `Opal - ${projectInfo.name}`;\r\n};\r\nload();\r\n\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/scripts/load.ts?");

/***/ }),

/***/ "./src/app/pages/editor/scripts/preview.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/editor/scripts/preview.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CustomElements_WidgetContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CustomElements/WidgetContainer */ \"./src/app/pages/editor/CustomElements/WidgetContainer.ts\");\n/* harmony import */ var _util_appendCustomElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/appendCustomElement */ \"./src/app/pages/editor/util/appendCustomElement.ts\");\n/* harmony import */ var _CustomElements_WidgetInspector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CustomElements/WidgetInspector */ \"./src/app/pages/editor/CustomElements/WidgetInspector.ts\");\n/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidebar */ \"./src/app/pages/editor/scripts/sidebar.ts\");\n\r\n\r\n\r\n\r\nconst preview = document.getElementById(\"preview\");\r\nconst widgetContainer = new _CustomElements_WidgetContainer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n(0,_util_appendCustomElement__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(preview, widgetContainer);\r\nwidgetContainer.element.addEventListener(\"widget-create\", (e) => {\r\n    const widgetInspector = new _CustomElements_WidgetInspector__WEBPACK_IMPORTED_MODULE_2__[\"default\"](e.detail.widget);\r\n    _sidebar__WEBPACK_IMPORTED_MODULE_3__.tabs.setChildElement(\"Inspector\", widgetInspector.element);\r\n    _sidebar__WEBPACK_IMPORTED_MODULE_3__.tabs.setCurrentTab(\"Inspector\");\r\n});\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/scripts/preview.ts?");

/***/ }),

/***/ "./src/app/pages/editor/scripts/save.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/editor/scripts/save.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nipc.on(\"save\", () => {\r\n});\r\n\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/scripts/save.ts?");

/***/ }),

/***/ "./src/app/pages/editor/scripts/sidebar.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/editor/scripts/sidebar.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"tabs\": () => (/* binding */ tabs)\n/* harmony export */ });\n/* harmony import */ var _CustomElements_Tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CustomElements/Tabs */ \"./src/app/pages/editor/CustomElements/Tabs.ts\");\n/* harmony import */ var _CustomElements_WidgetPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CustomElements/WidgetPreview */ \"./src/app/pages/editor/CustomElements/WidgetPreview.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ \"./src/app/pages/editor/types.ts\");\n/* harmony import */ var _util_appendCustomElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/appendCustomElement */ \"./src/app/pages/editor/util/appendCustomElement.ts\");\n\r\n\r\n\r\n\r\nconst sidebar = document.getElementById(\"sidebar\");\r\nconst tabs = new _CustomElements_Tabs__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\ntabs.addTab(\"Widgets\", new _CustomElements_WidgetPreview__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"Text\", _types__WEBPACK_IMPORTED_MODULE_2__.WidgetType.TEXT).element);\r\nconst inspectorDefaultChild = document.createElement(\"p\");\r\ninspectorDefaultChild.innerText = \"No widget is selected.\";\r\ntabs.addTab(\"Inspector\", inspectorDefaultChild);\r\n(0,_util_appendCustomElement__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(sidebar, tabs);\r\n\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/scripts/sidebar.ts?");

/***/ }),

/***/ "./src/app/pages/editor/types.ts":
/*!***************************************!*\
  !*** ./src/app/pages/editor/types.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WidgetType\": () => (/* binding */ WidgetType),\n/* harmony export */   \"WidgetPropertyType\": () => (/* binding */ WidgetPropertyType)\n/* harmony export */ });\nvar WidgetType;\r\n(function (WidgetType) {\r\n    WidgetType[WidgetType[\"TEXT\"] = 0] = \"TEXT\";\r\n})(WidgetType || (WidgetType = {}));\r\nvar WidgetPropertyType;\r\n(function (WidgetPropertyType) {\r\n    WidgetPropertyType[WidgetPropertyType[\"TEXT_SHORT\"] = 0] = \"TEXT_SHORT\";\r\n    WidgetPropertyType[WidgetPropertyType[\"CHOICE\"] = 1] = \"CHOICE\";\r\n    WidgetPropertyType[WidgetPropertyType[\"SLIDER\"] = 2] = \"SLIDER\";\r\n})(WidgetPropertyType || (WidgetPropertyType = {}));\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/types.ts?");

/***/ }),

/***/ "./src/app/pages/editor/util/appendCustomElement.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/editor/util/appendCustomElement.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * Append `customElement.element` as a child of `destination`\r\n * @param destination Destination HTMLElement\r\n * @param customElement Custom pouch element\r\n */\r\nconst appendCustomElement = (destination, customElement) => {\r\n    destination.appendChild(customElement.element);\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appendCustomElement);\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/util/appendCustomElement.ts?");

/***/ }),

/***/ "./src/app/pages/editor/util/handleInspectorChange.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/editor/util/handleInspectorChange.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst handleInspectorChange = (property, ...data) => {\r\n    if (property.handleInspectorChange)\r\n        property.handleInspectorChange(...data);\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleInspectorChange);\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/util/handleInspectorChange.ts?");

/***/ }),

/***/ "./src/app/pages/editor/util/pxToNumber.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/editor/util/pxToNumber.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst pxToNumber = (pxString) => {\r\n    return Number(pxString.substring(0, pxString.length - 2));\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pxToNumber);\r\n\n\n//# sourceURL=webpack://opal/./src/app/pages/editor/util/pxToNumber.ts?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app/pages/editor/index.ts");
/******/ 	
/******/ })()
;