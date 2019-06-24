"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FORM_STYLE = {
  display: "flex"
};
var BUTTON_STYLE = {
  marginLeft: 10
};

var NewMessage =
/*#__PURE__*/
function (_Component) {
  _inherits(NewMessage, _Component);

  function NewMessage(props) {
    var _this;

    _classCallCheck(this, NewMessage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NewMessage).call(this, props));
    _this.state = {
      message: ""
    };
    _this.handleOnChange = _this.handleOnChange.bind(_assertThisInitialized(_this));
    _this.handleOnSubmit = _this.handleOnSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(NewMessage, [{
    key: "handleOnChange",
    value: function handleOnChange(e) {
      this.setState({
        message: e.target.value
      });
    }
  }, {
    key: "handleOnSubmit",
    value: function handleOnSubmit(e) {
      var onMessagePost = this.props.onMessagePost;

      if (!onMessagePost || !this.state.message.length) {
        return;
      }

      onMessagePost(this.state.message);
      this.setState({
        message: ""
      });
      e.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("form", {
        style: FORM_STYLE,
        onSubmit: this.handleOnSubmit
      }, _react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        onChange: this.handleOnChange,
        value: this.state.message
      }), _react["default"].createElement("button", {
        className: "btn btn-large btn-primary",
        style: BUTTON_STYLE
      }, "POST"));
    }
  }]);

  return NewMessage;
}(_react.Component);

exports["default"] = NewMessage;