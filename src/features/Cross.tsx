import React, {useEffect, useState} from "react";
import ImagePlaceholder from "../common/ImagePlaceholder";
import {IncomingWebSocketMessage} from "../common";

function Cross(props: { url: string, id: string }) {
    const [svg, setSvg] = useState<string>("")
    const [phase, setPhase] = useState<number>(1)
    const [description, setDescription] = useState<string>("")

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
                    if ("state" in data.data) {
                        setDescription(data.data.state?.name ?? "")
                    }
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

    const decodePhase = (phaseNum: number): string | number => {
        switch (phaseNum) {
            case 0:
                return "ЛР"
            case 9:
            case 13:
                return "Пром. такт"
            case 10:
            case 14:
                return "ЖМ"
            case 11:
            case 15:
                return "ОС"
            case 12:
                return "КК"
            default:
                return phaseNum
        }
    }

    return (
        <div>
            <div style={{fontSize: 13}}>{description}</div>
            <div style={{fontSize: 20}}>Фаза {decodePhase(phase)}</div>
            <ImagePlaceholder svg={svg} phase={phase} id={props.id}/>
        </div>
    )
}

export default Cross;