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

        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("lightbulb-button-expand")
                    }, 500)
                }
            })
        })

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                updateDimensions(entry)
            }
        })

        const currentLightbulbButtonRef = lightbulbButtonRef.current
        const currentLightbulbRef = lightbulbRef.current

        intersectionObserver.observe(currentLightbulbButtonRef)
        resizeObserver.observe(currentLightbulbRef)

        return () => {
            intersectionObserver.unobserve(currentLightbulbButtonRef)
            intersectionObserver.disconnect()

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
