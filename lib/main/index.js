"use strict";

require("@babel/polyfill");

var _electron = require("electron");

var _createWindow = _interopRequireDefault(require("./createWindow"));

var _setAppMenu = _interopRequireDefault(require("./setAppMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_electron.app.on("ready", function () {
  (0, _setAppMenu["default"])();
  (0, _createWindow["default"])();
});

_electron.app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    _electron.app.quit();
  }
});

_electron.app.on("activate", function (_e, hasVisibleWindows) {
  if (!hasVisibleWindows) {
    (0, _createWindow["default"])();
  }
});