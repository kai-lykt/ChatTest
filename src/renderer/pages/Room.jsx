import React, { Component } from "react";
import Message from "./Message";
import NewMessage from "./NewMessage";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const ROOM_STYLE = {
    padding: "10px 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
};

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            messages: []
        };
        this.db = firebase.database();
        this.handleMessagePort = this.handleMessagePort.bind(this);
    }

    componentDidMount() {
        const { roomId } = this.props.params;
        this.fetchRoom(roomId);
    }

    componentWillReceiveProps(nextProps) {
        const { roomId } = nextProps.params;
        if (roomId === this.props.params.roomId) {
            return;
        }
        if (this.stream) {
            // 메세지 감시 제거
            this.stream.off();
        }
        // state 초기화
        this.setState({ messages: [] });
        // 채팅방 다시 추출
        this.fetchRoom(roomId);
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.room.parentNode.scrollTop = this.room.parentNode.scrollHeight;
        }, 0);
    }

    componentWillUnmount() {
        if (this.stream) {
            this.stream.off();
        }
    }

    handleMessagePort(message) {
        const newItemRef = this.fbChatRoomRef.child("messages").push();
        // firebase 로그인 사용자를 입력 사용자로
        this.user = this.user || firebase.auth().currentUser;
        return newItemRef.update({
            writtenBy: {
                uid: this.user.uid,
                displayName: this.user.displayName,
                photoURL: this.user.photoURL,
            },
            time: Date.now(),
            text: message,
        });
    }

    fetchRoom(roomId) {
        // firebase db에서 채팅방 데이터 추출
        this.fbChatRoomRef = this.db.ref("/chatrooms/" + roomId);
        this.fbChatRoomRef.once("value").then(snapshot => {
            const { description } = snapshot.val();
            this.setState({ description: description });
            window.document.title = description;
        });
        this.stream = this.fbChatRoomRef.child("messages").limitToLast(10);
        // 채팅방 메세지 추가 검사
        this.stream.on("child_added", item => {
            const { messages } = this.state || [];
            // 추가된 메세지를 state에 추가
            messages.push(Object.assign({ key: item.key }, item.val()));
            this.setState({ messages });
        });
    }

    render() {
        const { messages } = this.state;
        return (
            <div style={ROOM_STYLE} ref={room => this.room = room}>
                <div className="list-group">
                    {messages.map(m => <Message key={m.key} message={m} />)}
                </div>
                <NewMessage onMessagePost={this.handleMessagePort} />
            </div>
        );
    }
}