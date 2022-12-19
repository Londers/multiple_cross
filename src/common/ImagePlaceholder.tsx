import React, {useEffect, useRef} from "react";

import InnerHTML from 'dangerously-set-html-content'

function ImagePlaceholder(props: { svg: string, phase: number, id: string }) {
    let setF = useRef<Function>((e: number) => {
    })

    function kostil(script: string, id: string): string {
        const kostil1 = 'function setPhase(phase){';
        const kostil2 = '    modever=0;\n' +
            '    currentPhase=0;\n' +
            `    if (typeof setVisualMode !== 'undefined') setVisualMode(modever);\n` +
            `    if (typeof dropLight !== 'undefined') dropLight();\n` +
            `    if (typeof dropDirect !== 'undefined') dropDirect();\n` +
            `    if (typeof dropLocale !== 'undefined') dropLocale();\n`

        if (script.indexOf(kostil1) === -1) {
            return ""
        }
        script = script.substring(0, script.indexOf(kostil1)) + kostil2 + script.substring(script.indexOf(kostil1))
        const start = script.indexOf(kostil1) + kostil1.length

        script = script.slice(0, start) + script.slice(start).replace("};", "")
        script = script.replace(kostil1, "")

        const scrStart = script.indexOf("<script>") + 8
        const scrEnd = script.indexOf("</script>")
        script = script.slice(0, scrStart) + kostil1 + script.slice(scrStart, scrEnd) + "};" + script.slice(scrEnd)

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

        const int = setInterval(() => {
            //@ts-ignore
            if (typeof setPhase === "function" && setPhase.toString().includes(id)) {
                //@ts-ignore
                setF.current = (setPhase as Function).bind({})
                setF.current(props.phase)
                clearInterval(int)
            }
        }, 10)
        return script
    }

    const svg = props.svg
    const script = kostil(props.svg?.slice(props.svg?.indexOf("<script>"), props.svg?.indexOf("</script>") + 9), props.id)

    useEffect(() => {
        //@ts-ignore
        if (typeof setPhase !== "undefined") {
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
            {
                // @ts-ignore
                svg ? (script!=="" ? <InnerHTML html={
                    svg.slice(0, svg.indexOf("<script>")) +
                    script +
                    svg.slice(svg.indexOf("</script>") + 9)
                }/> : <InnerHTML html={svg}/>) : <div />
            }
            {
                //@ts-ignore
                svg && script !== "" ? <InnerHTML html={script} hidden={true}/> : <div/>
            }
        </div>
    )
}

export default ImagePlaceholder