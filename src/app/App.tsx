import React from 'react';
import './App.css';
import {Position} from "../common";
import Cross from "../features/Cross";

function buildUrl(pos: Position) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return `wss://192.168.115.134:4443/user/Admin/crossW?Region=${pos.region}&Area=${pos.area}&ID=${pos.id}`
    } else {
        return `wss://${window.location.host}/user/${localStorage.getItem("login")}/crossW?Region=${pos.region}&Area=${pos.area}&ID=${pos.id}`
    }
}

function App() {
    const crosses: Position[] = JSON.parse(localStorage.getItem("multipleCross") ?? "[]")

    return (
        <div className="App">
            {crosses.map((cross, index) => <Cross key={index} url={buildUrl(cross)} id={Object.values(cross).join("-")}/>)}
        </div>
    );
}

export default App;
