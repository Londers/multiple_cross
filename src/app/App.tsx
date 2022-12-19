import React, {useEffect} from 'react';
import './App.css';
import {Position} from "../common";
import Cross from "../features/Cross";
import {Grid} from '@mui/material';

function buildUrl(pos: Position) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return `wss://192.168.115.134:4443/user/Admin/crossW?Region=${pos.region}&Area=${pos.area}&ID=${pos.id}`
    } else {
        return `wss://${window.location.host}/user/${localStorage.getItem("login")}/crossW?Region=${pos.region}&Area=${pos.area}&ID=${pos.id}`
    }
}

function App() {
    const crosses: Position[] = JSON.parse(localStorage.getItem("multipleCross") ?? "[]")
    const middle = Math.round(crosses.length / 2)

    useEffect(() => {window.onbeforeunload = () => localStorage.removeItem("multipleCross")}, [])

    return (
        <div className="App">
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {crosses.slice(0, middle).map((cross, index) =>
                    <Cross key={index} url={buildUrl(cross)} id={Object.values(cross).join("-")}/>)
                }
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {crosses.slice(middle).map((cross, index) =>
                    <Cross key={index + middle} url={buildUrl(cross)} id={Object.values(cross).join("-")}/>)
                }
            </Grid>
        </div>
    );
}

export default App;
