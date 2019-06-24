"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var firebase = _interopRequireWildcard(require("firebase/app"));

require("firebase/auth");

var _Errors = _interopRequireDefault(require("./Errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  margin: "0 auto",
  padding: 30
};
var SIGNUP_LINK_STYLE = {
  display: "inline-block",
  marginLeft: 10
};

var Login =
/*#__PURE__*/
function (_Component) {
  _inherits(Login, _Component);

  function Login(props) {
    var _this;

    _classCallCheck(this, Login);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Login).call(this, props));
    _this.state = {
      email: localStorage.userEmail || "",
      password: localStorage.userPassword || "",
      errors: []
    };
    _this.handleOnChangeEmail = _this.handleOnChangeEmail.bind(_assertThisInitialized(_this));
    _this.handleOnChangePassword = _this.handleOnChangePassword.bind(_assertThisInitialized(_this));
    _this.handleOnSubmit = _this.handleOnSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Login, [{
    key: "handleOnChangeEmail",
    value: function handleOnChangeEmail(e) {
      this.setState({
        email: e.target.value
      });
    }
  }, {
    key: "handleOnChangePassword",
    value: function handleOnChangePassword(e) {
      this.setState({
        password: e.target.value
      });
    }
  }, {
    key: "handleOnSubmit",
    value: function handleOnSubmit(e) {
      var _this2 = this;

      var _this$state = this.state,
          email = _this$state.email,
          password = _this$state.password;
      var errors = [];
      var isValid = true;
      e.preventDefault();

      if (!email.length) {
        isValid = false;
        errors.push("Email can't be blank.");
      }

      if (!password.length) {
        isValid = false;
        errors.push("Password can't be blank.");
      }

      if (!isValid) {
        this.setState({
          errors: errors
        });
        return;
      }

      firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        localStorage.userEmail = email;
        localStorage.userPassword = password;

        _reactRouter.hashHistory.push("/rooms");
      })["catch"](function () {
        _this2.setState({
          errors: ["Incorrect email or password"]
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("form", {
        style: FORM_STYLE,
        onSubmit: this.handleOnSubmit
      }, _react["default"].createElement(_Errors["default"], {
        errorMessage: this.state.errors
      }), _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", null, "Email address"), _react["default"].createElement("input", {
        type: "email",
        className: "form-control",
        placeholder: "email",
        onChange: this.handleOnChangeEmail,
        value: this.state.email
      })), _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", null, "Password"), _react["default"].createElement("input", {
        type: "password",
        className: "form-control",
        placeholder: "password",
        onChange: this.handleOnChangePassword,
        value: this.state.password
      })), _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("button", {
        className: "btn btn-large btn-default"
      }, "Login"), _react["default"].createElement("div", {
        style: SIGNUP_LINK_STYLE
      }, _react["default"].createElement(_reactRouter.Link, {
        to: "/signup"
      }, "create new account"))));
    }
  }]);

  return Login;
}(_react.Component);

exports["default"] = Login;