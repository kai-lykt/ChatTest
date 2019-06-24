"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Message = _interopRequireDefault(require("./Message"));

var _NewMessage = _interopRequireDefault(require("./NewMessage"));

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/database");

require("firebase/auth");

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

var ROOM_STYLE = {
  padding: "10px 30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%"
};

var Room =
/*#__PURE__*/
function (_Component) {
  _inherits(Room, _Component);

  function Room(props) {
    var _this;

    _classCallCheck(this, Room);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Room).call(this, props));
    _this.state = {
      description: "",
      messages: []
    };
    _this.db = _app["default"].database();
    _this.handleMessagePort = _this.handleMessagePort.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Room, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var roomId = this.props.params.roomId;
      this.fetchRoom(roomId);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var roomId = nextProps.params.roomId;

      if (roomId === this.props.params.roomId) {
        return;
      }

      if (this.stream) {
        // 메세지 감시 제거
        this.stream.off();
      } // state 초기화


      this.setState({
        messages: []
      }); // 채팅방 다시 추출

      this.fetchRoom(roomId);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      setTimeout(function () {
        _this2.room.parentNode.scrollTop = _this2.room.parentNode.scrollHeight;
      }, 0);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.stream) {
        this.stream.off();
      }
    }
  }, {
    key: "handleMessagePort",
    value: function handleMessagePort(message) {
      var newItemRef = this.fbChatRoomRef.child("messages").push(); // firebase 로그인 사용자를 입력 사용자로

      this.user = this.user || _app["default"].auth().currentUser;
      return newItemRef.update({
        writtenBy: {
          uid: this.user.uid,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL
        },
        time: Date.now(),
        text: message
      });
    }
  }, {
    key: "fetchRoom",
    value: function fetchRoom(roomId) {
      var _this3 = this;

      // firebase db에서 채팅방 데이터 추출
      this.fbChatRoomRef = this.db.ref("/chatrooms/" + roomId);
      this.fbChatRoomRef.once("value").then(function (snapshot) {
        var _snapshot$val = snapshot.val(),
            description = _snapshot$val.description;

        _this3.setState({
          description: description
        });

        window.document.title = description;
      });
      this.stream = this.fbChatRoomRef.child("messages").limitToLast(10); // 채팅방 메세지 추가 검사

      this.stream.on("child_added", function (item) {
        var _ref = _this3.state || [],
            messages = _ref.messages; // 추가된 메세지를 state에 추가


        messages.push(Object.assign({
          key: item.key
        }, item.val()));

        _this3.setState({
          messages: messages
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var messages = this.state.messages;
      return _react["default"].createElement("div", {
        style: ROOM_STYLE,
        ref: function ref(room) {
          return _this4.room = room;
        }
      }, _react["default"].createElement("div", {
        className: "list-group"
      }, messages.map(function (m) {
        return _react["default"].createElement(_Message["default"], {
          key: m.key,
          message: m
        });
      })), _react["default"].createElement(_NewMessage["default"], {
        onMessagePost: this.handleMessagePort
      }));
    }
  }]);

  return Room;
}(_react.Component);

exports["default"] = Room;