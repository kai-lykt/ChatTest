"use strict";

var firebase = _interopRequireWildcard(require("firebase/app"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRouter = require("react-router");

var _Login = _interopRequireDefault(require("./pages/Login"));

var _Signup = _interopRequireDefault(require("./pages/Signup"));

var _Rooms = _interopRequireDefault(require("./pages/Rooms"));

var _Room = _interopRequireDefault(require("./pages/Room"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// define routing
var appRouting = _react["default"].createElement(_reactRouter.Router, {
  history: _reactRouter.hashHistory
}, _react["default"].createElement(_reactRouter.Route, {
  exact: true,
  path: "/"
}, _react["default"].createElement(_reactRouter.Route, {
  path: "/login",
  component: _Login["default"]
}), _react["default"].createElement(_reactRouter.Route, {
  path: "/signup",
  component: _Signup["default"]
}), _react["default"].createElement(_reactRouter.Route, {
  path: "/rooms",
  component: _Rooms["default"]
}, _react["default"].createElement(_reactRouter.Route, {
  path: ":roomId",
  component: _Room["default"]
}))));

if (!location.hash.length) {
  location.hash = "#/login";
}

var firebaseConfig = {
  apiKey: "AIzaSyBu6Nm9MGFBUsAL2do5SGmVvzGqCAOclmU",
  authDomain: "electron-chat-app-8b705.firebaseapp.com",
  databaseURL: "https://electron-chat-app-8b705.firebaseio.com",
  projectId: "electron-chat-app-8b705",
  storageBucket: "electron-chat-app-8b705.appspot.com",
  messagingSenderId: "154428290542",
  appId: "1:154428290542:web:ecb03943ccb0c1f8"
};
firebase.initializeApp(firebaseConfig); // rendering application

(0, _reactDom.render)(appRouting, document.getElementById("root")); // render(
//     <div>JSX!!</div>,
//     document.getElementById("app")
// );