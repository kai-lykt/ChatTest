"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Errors;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ERRORS_STYLE = {
  padding: 10,
  marginBottom: 30,
  borderRadius: 5,
  color: "#e62626",
  backgroundColor: "#ffdddf"
};
/**
 * @return {null}
 */

function Errors(props) {
  var errorMessages = props.errorMessages;

  if (!errorMessages || !errorMessages.length) {
    return null;
  }

  return _react["default"].createElement("div", {
    style: ERRORS_STYLE
  }, errorMessages.map(function (e) {
    return _react["default"].createElement("div", {
      key: e
    }, e);
  }));
}