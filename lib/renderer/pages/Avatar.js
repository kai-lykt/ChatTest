"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Avatar;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AVATAR_STYLE = {
  width: 32,
  textAlign: "center",
  fontSize: 24
};

function Avatar(props) {
  var photoURL = props.user.photoURL;

  if (photoURL) {
    // photoURL 있는 경우 그 이미지 출력
    return _react["default"].createElement("img", {
      className: "img-rounded",
      src: photoURL,
      style: AVATAR_STYLE
    });
  } else {
    // 기본 이미지
    return _react["default"].createElement("div", {
      style: AVATAR_STYLE
    }, _react["default"].createElement("span", {
      className: "icon icon-user"
    }));
  }
}