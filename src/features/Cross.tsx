import React, {useEffect, useState} from "react";
import ImagePlaceholder from "../common/ImagePlaceholder";
import {IncomingWebSocketMessage} from "../common";
import {Button} from "@mui/material";

function Cross(props: { url: string, id: string }) {
    const [svg, setSvg] = useState<string>("")
    const [phase, setPhase] = useState<number>(1)

    useEffect(() => {
        const ws = new WebSocket(props.url)
        ws.onopen = console.log
        ws.onmessage = (msg) => {
            const data: IncomingWebSocketMessage = JSON.parse(msg.data)
            console.log(data)
            switch (data.type) {
                case "crossBuild" :
                    if ("svg" in data.data) {
                        setSvg(data.data.svg ?? "")
                    }
                    // setId(data.data.)
                    break;
                case "phase" :
                    setPhase(data.data.dk?.fdk ?? 1)
                    console.log("phase ", props.id)
                    break;
                default:
                    console.log("not found, ", data)
                    break;
            }
        }
        ws.onerror = console.log
        ws.onclose = console.log
    }, [props.url])

    return (
        <div>
            <Button variant="outlined" onClick={() => setPhase(phase + 1)}>hui</Button>
            <ImagePlaceholder svg={svg} phase={phase} id={props.id}/>
        </div>
    )
}

export default Cross;