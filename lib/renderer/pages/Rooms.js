"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _RoomItem = _interopRequireDefault(require("./RoomItem"));

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/database");

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

var ICON_CHAT_STYLE = {
  fontSize: 120,
  color: "#ddd"
};
var FORM_STYLE = {
  display: "flex"
};
var BUTTON_STYLE = {
  marginLeft: 10
};

var Rooms =
/*#__PURE__*/
function (_Component) {
  _inherits(Rooms, _Component);

  function Rooms(props) {
    var _this;

    _classCallCheck(this, Rooms);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rooms).call(this, props));
    _this.state = {
      roomName: "",
      rooms: []
    };
    _this.db = _app["default"].database();
    _this.handleOnChangeRoomName = _this.handleOnChangeRoomName.bind(_assertThisInitialized(_this));
    _this.handleOnSubmit = _this.handleOnSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Rooms, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchRooms();
    }
  }, {
    key: "handleOnChangeRoomName",
    value: function handleOnChangeRoomName(e) {
      this.setState({
        roomName: e.target.value
      });
    }
  }, {
    key: "handleOnSubmit",
    value: function handleOnSubmit(e) {
      var _this2 = this;

      var roomName = this.state.roomName;
      e.preventDefault();

      if (!roomName.length) {
        return;
      } // firebase db에 새 채팅방 데이터 만들기


      var newRoomRef = this.db.ref("/chatrooms").push();
      var newRoom = {
        description: roomName
      }; // 생성한 채팅방의 설명 변경

      newRoomRef.update(newRoom).then(function () {
        // 상태 초기화
        _this2.setState({
          roomName: ""
        }); // 채팅방 목록 다시 불러오기


        return _this2.fetchRooms().then(function () {
          _reactRouter.hashHistory.push("/rooms/".concat(newRoomRef.key));
        });
      });
    }
  }, {
    key: "fetchRooms",
    value: function fetchRooms() {
      var _this3 = this;

      // firebase db에서 채팅방 가져오기
      return this.db.ref("/chatrooms").once("value").then(function (snapshot) {
        var rooms = [];
        snapshot.forEach(function (item) {
          // 데이터 객체 할당
          rooms.push(Object.assign({
            key: item.key
          }, item.val()));
        }); // 객체를 state로 저장

        _this3.setState({
          rooms: rooms
        });
      })["catch"](function (err) {
        console.log(err);
      });
    } // 채팅방 리스트 렌더링

  }, {
    key: "renderRoomList",
    value: function renderRoomList() {
      var roomId = this.props.params.roomId;
      var _this$state = this.state,
          rooms = _this$state.rooms,
          roomName = _this$state.roomName;
      return _react["default"].createElement("div", {
        className: "list-group"
      }, rooms.map(function (r) {
        return _react["default"].createElement(_RoomItem["default"], {
          room: r,
          key: r.key,
          selected: r.key === roomId
        });
      }), _react["default"].createElement("div", {
        className: "list-group-header"
      }, _react["default"].createElement("form", {
        style: FORM_STYLE,
        onSubmit: this.handleOnSubmit
      }, _react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "New room",
        onChange: this.handleOnChangeRoomName,
        value: roomName
      }), _react["default"].createElement("button", {
        className: "btn btn-default",
        style: BUTTON_STYLE
      }, _react["default"].createElement("span", {
        className: "icon icon-plus"
      })))));
    } // 채팅방 상세 렌더링

  }, {
    key: "renderRoom",
    value: function renderRoom() {
      if (this.props.children) {
        return this.props.children;
      } else {
        return _react["default"].createElement("div", {
          className: "text-center"
        }, _react["default"].createElement("div", {
          style: ICON_CHAT_STYLE
        }, _react["default"].createElement("span", {
          className: "icon icon-chat"
        })), _react["default"].createElement("p", null, "Join a chat room from the sidebar or create your chat room."));
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "pane-group"
      }, _react["default"].createElement("div", {
        className: "pane-sm sidebar"
      }, this.renderRoomList()), _react["default"].createElement("div", {
        className: "pane"
      }, this.renderRoom()));
    }
  }]);

  return Rooms;
}(_react.Component);

exports["default"] = Rooms;