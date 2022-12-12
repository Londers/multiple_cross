import React, {useEffect, useState} from "react";
// import {useAppSelector} from "../app/hooks";
// import {selectCrossInfo, selectSVG} from "../features/crossSlice";

import InnerHTML from 'dangerously-set-html-content'

function kostil(script: string, id: string): string {
    const kostil1 = 'function setPhase(phase){';
    const kostil2 = '    modever=0;\n' +
        '    currentPhase=0;\n' +
        `    if (typeof setVisualMode !== 'undefined') setVisualMode(modever);\n` +
        `    if (typeof dropLight !== 'undefined') dropLight();\n` +
        `    if (typeof dropDirect !== 'undefined') dropDirect();\n` +
        `    if (typeof dropLocale !== 'undefined') dropLocale();\n`

    script = script.substring(0, script.indexOf(kostil1)) + kostil2 + script.substring(script.indexOf(kostil1))
    const start = script.indexOf(kostil1) + kostil1.length

    script = script.slice(0, start) + script.slice(start).replace("};", "")
    script = script.replace(kostil1, "")

    const scrStart = script.indexOf("<script>") + 8
    const scrEnd = script.indexOf("</script>")
    script = script.slice(0, scrStart) + kostil1 + script.slice(scrStart, scrEnd) + "};"  + script.slice(scrEnd)

    script = script.replaceAll("document.", `document.getElementById('${id}')?.`)

    // console.log(script)
    return script
}

function ImagePlaceholder(props: {svg: string, phase: number, id: string}) {
    // const svg = useAppSelector(selectSVG)?.replace("let currentPhase", "var currentPhase")
    const script = props.svg?.slice(props.svg?.indexOf("<script>"), props.svg?.indexOf("</script>") + 9)
    // const [setPhaseCustom, setSetPhaseCustom] = useState<Function>(() => {})
    // const phase = useAppSelector(selectCrossInfo).dk?.fdk

    useEffect(() => {
        //@ts-ignore
        if (typeof setPhase !== "undefined") {
            // @ts-ignore
            // setSetPhaseCustom((setPhase as Function).bind({}))

            //@ts-ignore
            const setF = (setPhase as Function).bind({})

            // @ts-ignore боль, костыль из-за onload в картике
            // modever=0; currentPhase=0; setVisualMode(modever); dropLight(); dropDirect(); dropLocale();
            if (props.phase) {
                try {
                    setF(props.phase)
                } catch (err) {
                    console.log(err)
                    // alert("Ошибка: отсутсвует картинка фазы: " + props.phase)
                }
            }
        }
    }, [props.phase])

    return (
        <div style={{height: "450px", width: "450px"}}>
            {props.phase}
            {
                // @ts-ignore
                props.svg ? <InnerHTML html={props.svg.replaceAll("document.", `document.getElementById('${props.id}')?.`)}/> : <div/>
            }
            {
                //@ts-ignore
                props.svg ? <InnerHTML html={kostil(script, props.id)}/> : <div/>
            }
        </div>
    )
}

export default ImagePlaceholder