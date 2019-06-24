import React from "react";

const AVATAR_STYLE = {
    width: 32,
    textAlign: "center",
    fontSize: 24
};

export default function Avatar(props) {
    const { photoURL } = props.user;
    if (photoURL) {
        // photoURL 있는 경우 그 이미지 출력
        return <img className="img-rounded" src={photoURL} style={AVATAR_STYLE} />;
    } else {
        // 기본 이미지
        return (
            <div style={AVATAR_STYLE}>
                <span className="icon icon-user" />
            </div>
        );
    }
}