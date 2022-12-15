import React, {useEffect, useRef, useState} from "react";
// import {useAppSelector} from "../app/hooks";
// import {selectCrossInfo, selectSVG} from "../features/crossSlice";

import InnerHTML from 'dangerously-set-html-content'

function ImagePlaceholder(props: { svg: string, phase: number, id: string }) {

    let setF = useRef<Function>((n: number) => {
    })

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
        script = script.slice(0, scrStart) + kostil1 + `console.log('${id}')` + script.slice(scrStart, scrEnd) + "};" + script.slice(scrEnd)

        script = script.replaceAll("document.getElementById('", `document.querySelector('#${"cross" + id} #`)

        let lastIndex = 0
        while (true) {
            let startIndex = script.indexOf("document.querySelector(", lastIndex)
            if (startIndex === -1) break
            startIndex += 23
            lastIndex = startIndex

            let endIndex = script.indexOf(")", startIndex)
            let replValue = script.slice(startIndex, endIndex)

            script = script.replace(replValue, replValue.replaceAll(".", "\\\\."))

            replValue = script.slice(startIndex, endIndex + 2)
            script = script.replace(replValue, replValue.replaceAll("=", "\\\\="))
        }


            try {
                //@ts-ignore
                setF.current = (setPhase as Function).bind({})
            } catch (e) {
            }

        // console.log(script)
        return script
    }

    // function bigKostil(html: string): string {
    //     let lastIndex = 0
    //     while(true) {
    //         let startIndex = html.indexOf('id="', lastIndex)
    //         if (startIndex === -1) break
    //         startIndex += 4
    //         lastIndex = startIndex
    //
    //         let endIndex = html.indexOf('"', startIndex)
    //         let replValue = html.slice(startIndex, endIndex)
    //
    //         html = html.replace(replValue, replValue.replaceAll(".", "\\\\."))
    //     }
    //     return html
    // }

    // const svg = useAppSelector(selectSVG)?.replace("let currentPhase", "var currentPhase")
    // const svg = bigKostil(props.svg)
    const svg = props.svg
    const script = kostil(props.svg?.slice(props.svg?.indexOf("<script>"), props.svg?.indexOf("</script>") + 9), props.id)
    // const [setPhaseCustom, setSetPhaseCustom] = useState<Function>(() => {})
    // const phase = useAppSelector(selectCrossInfo).dk?.fdk

    // useEffect(() => {
    //     // //@ts-ignore
    //     // if (typeof setPhase !== "undefined") {
    //     //     //@ts-ignore
    //     //     setF.current = (setPhase as Function).bind({})
    //     // }
    // }, [setF, setF.current])

    useEffect(() => {
        //@ts-ignore
        if (typeof setPhase !== "undefined") {
            try {
                // @ts-ignore боль, костыль из-за onload в картике
                modever = 0; currentPhase = 0; setVisualMode(modever); dropLight(); dropDirect(); dropLocale();
            } catch (e) {
                // console.log(e)
            }
            if (props.phase) {
                try {
                    setF.current(props.phase)
                } catch (err) {
                    console.log(err)
                    // alert("Ошибка: отсутсвует картинка фазы: " + props.phase)
                }
            }
        }
    }, [props.phase])

    return (
        <div style={{height: "450px", width: "450px"}} id={"cross" + props.id}>
            {props.phase}
            {
                // @ts-ignore
                svg ? <InnerHTML html={
                    svg.slice(0, svg.indexOf("<script>")) +
                    script +
                    svg.slice(svg.indexOf("</script>") + 9)
                }/> : <div/>
            }
            {
                //@ts-ignore
                svg ? <InnerHTML html={script}/> : <div/>
            }
        </div>
    )
}

export default ImagePlaceholder