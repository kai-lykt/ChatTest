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

var SIGNUP_FORM_STYLE = {
  margin: "0 auto",
  padding: 30
};
var CANCEL_BUTTON_STYLE = {
  marginLeft: 10
};

var Signup =
/*#__PURE__*/
function (_Component) {
  _inherits(Signup, _Component);

  function Signup(props) {
    var _this;

    _classCallCheck(this, Signup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Signup).call(this, props));
    _this.state = {
      email: "",
      password: "",
      name: "",
      photoURL: "",
      errors: []
    };
    _this.handleOnChangeEmail = _this.handleOnChangeEmail.bind(_assertThisInitialized(_this));
    _this.handleOnChangePassword = _this.handleOnChangePassword.bind(_assertThisInitialized(_this));
    _this.handleOnChangeName = _this.handleOnChangeName.bind(_assertThisInitialized(_this));
    _this.handleOnChangePhotoURL = _this.handleOnChangePhotoURL.bind(_assertThisInitialized(_this));
    _this.handleOnSubmit = _this.handleOnSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Signup, [{
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
    key: "handleOnChangeName",
    value: function handleOnChangeName(e) {
      this.setState({
        name: e.target.value
      });
    }
  }, {
    key: "handleOnChangePhotoURL",
    value: function handleOnChangePhotoURL(e) {
      this.setState({
        photoURL: e.target.value
      });
    }
  }, {
    key: "handleOnSubmit",
    value: function handleOnSubmit(e) {
      var _this2 = this;

      var _this$state = this.state,
          email = _this$state.email,
          password = _this$state.password,
          name = _this$state.name,
          photoURL = _this$state.photoURL;
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

      if (!name.length) {
        isValid = false;
        errors.push("Name can't be blank.");
      }

      if (!isValid) {
        this.setState({
          errors: errors
        });
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        var user = firebase.auth().currentUser;
        return user.updateProfile({
          displayName: name,
          photoURL: photoURL
        });
      }).then(function () {
        _reactRouter.hashHistory.push("/rooms");
      })["catch"](function (err) {
        _this2.setState({
          errors: [err.message]
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("form", {
        style: SIGNUP_FORM_STYLE,
        onSubmit: this.handleOnSubmit
      }, _react["default"].createElement(_Errors["default"], {
        errorMessage: this.state.errors
      }), _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", null, "Email address*"), _react["default"].createElement("input", {
        type: "email",
        className: "form-control",
        placeholder: "email",
        value: this.state.email,
        onChange: this.handleOnChangeEmail
      })), _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", null, "Password*"), _react["default"].createElement("input", {
        type: "password",
        className: "form-control",
        placeholder: "password",
        value: this.state.password,
        onChange: this.handleOnChangePassword
      })), _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", null, "User name*"), _react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "name",
        value: this.state.name,
        onChange: this.handleOnChangeName
      })), _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", null, "Photo URL"), _react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "photo URL",
        value: this.state.photoURL,
        onChange: this.handleOnChangePhotoURL
      })), _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("button", {
        className: "btn btn-large btn-primary"
      }, "Create new account"), _react["default"].createElement(_reactRouter.Link, {
        to: "/login"
      }, _react["default"].createElement("button", {
        type: "button",
        style: CANCEL_BUTTON_STYLE,
        className: "btn btn-large btn-default"
      }, " Cancel"))));
    }
  }]);

  return Signup;
}(_react.Component);

exports["default"] = Signup;