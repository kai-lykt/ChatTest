"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _electron = require("electron");

var _createWindow = _interopRequireDefault(require("./createWindow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function setAppMenu() {
  var template = [{
    label: "File",
    submenu: [{
      label: "New Window",
      accelerator: "CmdOrCtrl+N",
      click: _createWindow["default"]
    }, {
      type: "separator"
    }, {
      label: "Close",
      accelerator: "CmdOrCtrl+W",
      role: "close"
    }]
  }, {
    label: "Edit",
    submenu: [{
      label: "Copy",
      accelerator: "CmdOrCtrl+C",
      role: "copy"
    }, {
      label: "Paste",
      accelerator: "CmdOrCtrl+V",
      role: "paste"
    }, {
      label: "Cut",
      accelerator: "CmdOrCtrl+X",
      role: "cut"
    }, {
      label: "Select All",
      accelerator: "CmdOrCtrl+A",
      role: "selectall"
    }]
  }, {
    label: "View",
    submenu: [{
      label: "Reload",
      accelerator: "CmdOrCtrl+R",
      click: function click(item, focusedWindow) {
        return focusedWindow && focusedWindow.reload();
      }
    }, {
      label: "Toggle DevTools",
      accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
      click: function click(item, focusedWindow) {
        return focusedWindow && focusedWindow.toggleDevTools();
      }
    }]
  }]; // if macOS

  if (process.platform === "darwin") {
    template.unshift({
      label: _electron.app.getName(),
      submenu: [{
        role: "about"
      }, {
        type: "separator"
      }, {
        role: "services",
        submenu: []
      }, {
        type: "separator"
      }, {
        role: "hide"
      }, {
        role: "hideothers"
      }, {
        role: "unhide"
      }, {
        type: "separator"
      }, {
        role: "quit"
      }]
    });
    template.push({
      role: "window",
      submenu: [{
        "role": "minimize"
      }, {
        "role": "zoom"
      }]
    });
  }

  var appMenu = _electron.Menu.buildFromTemplate(template);

  _electron.Menu.setApplicationMenu(appMenu);
}

var _default = setAppMenu;
exports["default"] = _default;