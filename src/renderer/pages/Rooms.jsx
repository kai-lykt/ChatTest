import React, { Component } from "react";
import { hashHistory } from "react-router";
import RoomItem from "./RoomItem";
import firebase from "firebase/app";
import "firebase/database";

const ICON_CHAT_STYLE = {
    fontSize: 120,
    color: "#ddd"
};

const FORM_STYLE = {
    display: "flex"
};

const BUTTON_STYLE = {
    marginLeft: 10
};

export default class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: "",
            rooms: []
        };
        this.db = firebase.database();
        this.handleOnChangeRoomName = this.handleOnChangeRoomName.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchRooms();
    }

    handleOnChangeRoomName (e) {
        this.setState({
            roomName: e.target.value
        })
    }

    handleOnSubmit(e) {
        const { roomName } = this.state;
        e.preventDefault();
        if (!roomName.length) {
            return;
        }
        // firebase db에 새 채팅방 데이터 만들기
        const newRoomRef = this.db.ref("/chatrooms").push();
        const newRoom = {
            description: roomName
        };
        // 생성한 채팅방의 설명 변경
        newRoomRef.update(newRoom).then(() => {
            // 상태 초기화
            this.setState({roomName: ""});
            // 채팅방 목록 다시 불러오기
            return this.fetchRooms().then(() => {
                hashHistory.push(`/rooms/${newRoomRef.key}`);
            });
        });
    }

    fetchRooms () {
        // firebase db에서 채팅방 가져오기
        return this.db.ref("/chatrooms").once("value")
            .then(snapshot => {
                const rooms = [];
                snapshot.forEach(item => {
                    // 데이터 객체 할당
                    rooms.push(Object.assign({key: item.key}, item.val()));
                });
                // 객체를 state로 저장
                this.setState({ rooms });
            })
            .catch(err => {
                console.log(err);
            });
    }

    // 채팅방 리스트 렌더링
    renderRoomList() {
        const { roomId } = this.props.params;
        const { rooms, roomName } = this.state;
        return (
            <div className="list-group">
                {rooms.map(r => <RoomItem room={r} key={r.key} selected={r.key === roomId} /> )}
                <div className="list-group-header">
                    <form style={FORM_STYLE} onSubmit={this.handleOnSubmit}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="New room"
                            onChange={this.handleOnChangeRoomName}
                            value={roomName}
                        />
                        <button className="btn btn-default" style={BUTTON_STYLE}>
                            <span className="icon icon-plus" />
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // 채팅방 상세 렌더링
    renderRoom () {
        if (this.props.children) {
            return this.props.children;
        } else {
            return (
                <div className="text-center">
                    <div style={ICON_CHAT_STYLE}>
                        <span className="icon icon-chat" />
                    </div>
                    <p>
                        Join a chat room from the sidebar or create your chat room.
                    </p>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="pane-group">
                <div className="pane-sm sidebar">
                    {this.renderRoomList()}
                </div>
                <div className="pane">
                    {this.renderRoom()}
                </div>
            </div>
        );
    }
}