"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RoomItem;

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LINK_STYLE = {
  color: "inherit",
  textDecoration: "none"
};

function RoomItem(props) {
  var selected = props.selected;
  var _props$room = props.room,
      description = _props$room.description,
      key = _props$room.key;
  return _react["default"].createElement("div", {
    className: selected ? "list-group-item selected" : "list-group-item"
  }, _react["default"].createElement(_reactRouter.Link, {
    to: "/rooms/".concat(key),
    style: LINK_STYLE
  }, _react["default"].createElement("div", {
    className: "media-body"
  }, _react["default"].createElement("strong", null, description))));
}