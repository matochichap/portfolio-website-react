import "./Components.css"

function IDE() {
    /*
    Colors:
    red, blue, purple, orange, darkblue, default(white/black)
    */
   const ideBox = document.getElementById("intro-content-right")
    const expandIde = () => {
        ideBox.classList.toggle("intro-content-right-expand-width")
    }
    const tab = "    " // 4 spaces
    const code = [
        [["class ", "red"], ["RuiJia", "orange"], [":", "default"]],
        [[`${tab}def `, "red"], ["__init__", "purple"], ["(self):", "default"]],
        [[`${tab}${tab}self.name `, "default"], ["= ", "darkblue"], ["\"Rui Jia\"", "blue"]],
        [[`${tab}${tab}self.major `, "default"], ["= ", "darkblue"], ["\"Computer Science\"", "blue"]],
        [[`${tab}${tab}self.university `, "default"], ["= ", "darkblue"], ["\"National University of Singapore\"", "blue"]],
        [["", "default"]],
        [[`${tab}def `, "red"], ["says_hi", "purple"], ["(self):", "default"]],
        [[`${tab}${tab}print`, "purple"], ["(", "default"], ["\"Hi, I'm Rui Jia.\"", "blue"], [")", "default"]],
        [["", "default"]],
        [[`${tab}def `, "red"], ["says_scroll_down", "purple"], ["(self):", "default"]],
        [[`${tab}${tab}print`, "purple"], ["(", "default"], ["\"Scroll down to see my really nice website!\"", "blue"], [")", "default"]],
        [["", "default"]],
        [["RuiJia", "orange"], ["().", "default"], ["says_hi", "purple"], ["()", "default"]],
        [["RuiJia", "orange"], ["().", "default"], ["says_scroll_down", "purple"], ["()", "default"]],
    ]

    return (
        <div className="ide">
            <div className="ide-tabs">
                <div className="ide-tab">
                    <span>
                        <i className="fa-brands fa-python"></i>
                    </span>
                    <span className="ide-tab-file">hello.py</span>
                </div>
                <div className="ide-expand-icon-box" onClick={expandIde}>
                    <i className="fa-solid fa-arrows-left-right ide-expand-icon"></i>
                </div>
            </div>
            <div className="ide-body">
                {code.map((line, index) => {
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
                                        transition: "color 1s ease"
                                    }}
                                    >{phraseString}</pre>
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