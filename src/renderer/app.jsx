import * as firebase from "firebase/app";
import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Rooms from "./pages/Rooms";
import Room from "./pages/Room";

// define routing
const appRouting = (
    <Router history={hashHistory}>
        <Route exact path="/">
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/rooms" component={Rooms}>
                    <Route path=":roomId" component={Room}/>
                </Route>
        </Route>
    </Router>
);

if (!location.hash.length) {
        location.hash = "#/login";
}

const firebaseConfig = {
        apiKey: "AIzaSyBu6Nm9MGFBUsAL2do5SGmVvzGqCAOclmU",
        authDomain: "electron-chat-app-8b705.firebaseapp.com",
        databaseURL: "https://electron-chat-app-8b705.firebaseio.com",
        projectId: "electron-chat-app-8b705",
        storageBucket: "electron-chat-app-8b705.appspot.com",
        messagingSenderId: "154428290542",
        appId: "1:154428290542:web:ecb03943ccb0c1f8"
};

firebase.initializeApp(firebaseConfig);

// rendering application
render(
    appRouting,
    document.getElementById("root")
);

// render(
//     <div>JSX!!</div>,
//     document.getElementById("app")
// );