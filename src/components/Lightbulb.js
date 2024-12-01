import { useEffect, useRef } from "react"

function Lightbulb({ index, open, close, modalOpen }) {
    const lightbulbRef = useRef(null)
    const lightbulbButtonRef = useRef(null)
    useEffect(() => {
        const updateDimensions = () => {
            const lightbulbButtonHeight =
                lightbulbButtonRef.current.clientHeight
            const lightbulbWidth = lightbulbRef.current.clientWidth
            lightbulbButtonRef.current.style.setProperty(
                "--lightbulb-button-height",
                `${lightbulbButtonHeight}px`
            )
            lightbulbButtonRef.current.style.setProperty(
                "--lightbulb-width",
                `${lightbulbWidth}px`
            )
            console.log(lightbulbButtonHeight, lightbulbWidth)
        }

        // Initial dimensions update
        updateDimensions()

        // Add event listener for window resize
        window.addEventListener("resize", updateDimensions)

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener("resize", updateDimensions)
        }
    }, [])

    return (
        <>
            <div
                ref={lightbulbButtonRef}
                className="lightbulb-button"
                onClick={() => (modalOpen ? close() : open(index))}
            >
                <i
                    ref={lightbulbRef}
                    className="fa-regular fa-lightbulb fa-icon-highlight lightbulb"
                ></i>
                <p className="lightbulb-text">See More</p>
            </div>
        </>
    )
}

export default Lightbulb
