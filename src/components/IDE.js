import "./Components.css"
import { useState, useEffect, useRef } from "react"

function IDE() {
    /*
    Colors:
    red, blue, purple, orange, darkblue, default(white/black)
    */
    const [selectedFile, setSelectedFile] = useState("hello.py")
    const expandIconRef = useRef(null)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const ideBox = document.getElementById("intro-content-right")
        const expandIcon = expandIconRef.current
        const expandIde = () => {
            ideBox.classList.toggle("intro-content-right-expand-width") // 100% width
            setIsExpanded(!isExpanded)
        }

        expandIcon.addEventListener("click", expandIde)

        return () => {
            expandIcon.removeEventListener("click", expandIde)
        }
    }, [isExpanded])

    const tab = "    " // 4 spaces
    const ideTabs = {
        "hello.py": {
            icon: (
                <span>
                    <i className="fa-brands fa-python"></i>
                </span>
            ),
            code: [
                [
                    ["from ", "red"],
                    ["skills", "default"],
                    [" import ", "red"],
                    ["Skills", "orange"],
                ],
                [["", "default"]],
                [
                    ["class ", "red"],
                    ["RuiJia", "orange"],
                    ["(", "default"],
                    ["Skills", "orange"],
                    ["):", "default"],
                ],
                [
                    [`${tab}def `, "red"],
                    ["__init__", "purple"],
                    ["(self):", "default"],
                ],
                [
                    [`${tab}${tab}self.name `, "default"],
                    ["= ", "darkblue"],
                    ['"Rui Jia"', "blue"],
                ],
                [
                    [`${tab}${tab}self.major `, "default"],
                    ["= ", "darkblue"],
                    ['"Computer Science"', "blue"],
                ],
                [
                    [`${tab}${tab}self.university `, "default"],
                    ["= ", "darkblue"],
                    ['"National University of Singapore"', "blue"],
                ],
                [["", "default"]],
                [
                    [`${tab}def `, "red"],
                    ["says_hi", "purple"],
                    ["(self):", "default"],
                ],
                [
                    [`${tab}${tab}print`, "purple"],
                    ["(", "default"],
                    ['"Hi, I\'m Rui Jia"', "blue"],
                    [")", "default"],
                ],
                [["", "default"]],
                [
                    [`${tab}def `, "red"],
                    ["says_scroll_down", "purple"],
                    ["(self):", "default"],
                ],
                [
                    [`${tab}${tab}print`, "purple"],
                    ["(", "default"],
                    ['"Scroll down to see my really nice website!"', "blue"],
                    [")", "default"],
                ],
                [["", "default"]],
                [
                    ["RuiJia", "orange"],
                    ["().", "default"],
                    ["says_hi", "purple"],
                    ["()", "default"],
                ],
                [
                    ["RuiJia", "orange"],
                    ["().", "default"],
                    ["says_scroll_down", "purple"],
                    ["()", "default"],
                ],
            ],
        },
        "skills.py": {
            icon: (
                <span>
                    <i className="fa-brands fa-python"></i>
                </span>
            ),
            code: [
                [
                    ["class ", "red"],
                    ["Skills", "orange"],
                    [":", "default"],
                ],
                [
                    [`${tab}def `, "red"],
                    ["__init__", "purple"],
                    ["(self):", "default"],
                ],
                [
                    [`${tab}${tab}self.programming_languages `, "default"],
                    ["= ", "darkblue"],
                    ["[", "default"],
                ],
                [
                    [`${tab}${tab}${tab}"C"`, "blue"],
                    [", ", "default"],
                    [`"C#"`, "blue"],
                    [", ", "default"],
                    [`"Python"`, "blue"],
                    [", ", "default"],
                    [`"Java"`, "blue"],
                    [", ", "default"],
                    [`"Javascript"`, "blue"],
                ],
                [[`${tab}${tab}]`, "default"]],
                [["", "default"]],
                [
                    [`${tab}${tab}self.web_development `, "default"],
                    ["= ", "darkblue"],
                    ["{", "default"],
                ],
                [
                    [`${tab}${tab}${tab}"frontend"`, "blue"],
                    [": [", "default"],
                ],
                [
                    [`${tab}${tab}${tab}${tab}"HTML"`, "blue"],
                    [", ", "default"],
                    [`"CSS"`, "blue"],
                    [", ", "default"],
                    [`"React"`, "blue"],
                    [", ", "default"],
                    [`"MUI"`, "blue"],
                ],
                [
                    [`${tab}${tab}${tab}]`, "default"],
                    [",", "default"],
                ],
                [
                    [`${tab}${tab}${tab}"backend"`, "blue"],
                    [": [", "default"],
                ],
                [
                    [`${tab}${tab}${tab}${tab}"NodeJS"`, "blue"],
                    [", ", "default"],
                    [`"Express"`, "blue"],
                    [", ", "default"],
                    [`"Flask"`, "blue"],
                ],
                [
                    [`${tab}${tab}${tab}]`, "default"],
                    [",", "default"],
                ],
                [
                    [`${tab}${tab}${tab}"api"`, "blue"],
                    [": [", "default"],
                ],
                [
                    [`${tab}${tab}${tab}${tab}"WebRTC"`, "blue"],
                    [", ", "default"],
                    [`"Websocket"`, "blue"],
                ],
                [[`${tab}${tab}${tab}]`, "default"]],
                [[`${tab}${tab}}`, "default"]],
                [["", "default"]],
                [
                    [`${tab}${tab}self.databases `, "default"],
                    ["= ", "darkblue"],
                    ["[", "default"],
                ],
                [
                    [`${tab}${tab}${tab}"MySQL"`, "blue"],
                    [", ", "default"],
                    [`"SQLAlchemy"`, "blue"],
                    [", ", "default"],
                    [`"MongoDB"`, "blue"],
                    [", ", "default"],
                    [`"GraphQL"`, "blue"],
                ],
                [[`${tab}${tab}]`, "default"]],
                [["", "default"]],
                [
                    [`${tab}${tab}self.game_development `, "default"],
                    ["= ", "darkblue"],
                    ["[", "default"],
                ],
                [
                    [`${tab}${tab}${tab}"Unity"`, "blue"],
                    [", ", "default"],
                    [`"MRTK3"`, "blue"],
                    [", ", "default"],
                    [`"MetaXR"`, "blue"],
                ],
                [[`${tab}${tab}]`, "default"]],
            ],
        },
    }

    return (
        <div className="ide">
            <div className="ide-tabs">
                <div className="ide-files">
                    {Object.keys(ideTabs).map((file, index) => {
                        return (
                            <div
                                key={index}
                                className={`ide-tab${
                                    selectedFile === file
                                        ? " ide-tab-selected"
                                        : ""
                                }`}
                                onClick={() => setSelectedFile(file)}
                            >
                                {ideTabs[file].icon}
                                <span className="ide-tab-file">{file}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="ide-expand-icon-box" ref={expandIconRef}>
                    {isExpanded ? (
                        <i className="fa-solid fa-compress"></i>
                    ) : (
                        <i className="fa-solid fa-expand"></i>
                    )}
                </div>
            </div>
            <div className="ide-body">
                {ideTabs[selectedFile].code.map((line, index) => {
                    return (
                        <div key={index + 1} className="ide-line">
                            <pre className="ide-line-number">{index + 1}</pre>
                            <div className="ide-line-text-box">
                                {line.map((phrase, index) => {
                                    const [phraseString, color] = phrase
                                    return (
                                        <pre
                                            key={index}
                                            className="ide-line-text"
                                            style={{
                                                color: `var(--color-gh-${color})`,
                                                transition: "color 1s ease",
                                            }}
                                        >
                                            {phraseString}
                                        </pre>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default IDE
