"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _electron = require("electron");

var window;

function createWindow() {
  window = new _electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  window.loadURL("file://".concat(__dirname, "/../../index.html")); // window.webContents.openDevTools();

  window.on("close", function () {
    window = null;
  });
}

var _default = createWindow;
exports["default"] = _default;