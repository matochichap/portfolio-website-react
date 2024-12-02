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
        }

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                updateDimensions(entry)
            }
        })

        const currentLightbulbRef = lightbulbRef.current

        resizeObserver.observe(currentLightbulbRef)

        return () => {
            resizeObserver.unobserve(currentLightbulbRef)
            resizeObserver.disconnect()
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
