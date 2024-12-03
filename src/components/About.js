import "./Components.css"
import { React, useEffect, useRef } from "react"

function About() {
    const aboutImgRef = useRef(null)
    const aboutCardRef = useRef(null)
    const [t1, t2, t3, t4] = [
        "I'm Rui Jia, a CS undergraduate at the National University of Singapore.",
        "I love finding new and creative ways to create better user experiences and solving interesting problems through code. ",
        "With a combination of technical expertise and a creative mindset, I hope to create meaningful digital experiences that leave a lasting impact.",
        "I am interested in exploring software development and AI to find ways to create meaningful tools. ",
    ]
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    aboutImgRef.current.classList.add("slide-in-active")
                    setTimeout(() => {
                        aboutCardRef.current.classList.add("slide-in-active")
                    }, 500)
                }
            })
        })

        const currentAboutImgRef = aboutImgRef.current
        const currentAboutCardRef = aboutCardRef.current

        observer.observe(currentAboutImgRef)
        observer.observe(currentAboutCardRef)

        return () => {
            observer.unobserve(currentAboutImgRef)
            observer.unobserve(currentAboutCardRef)
            observer.disconnect()
        }
    }, [])

    return (
        <>
            <section className="about">
                <div className="section-header">
                    <h1 className="section-title">About</h1>
                    <hr />
                </div>
                <div className="about-section">
                    <img
                        ref={aboutImgRef}
                        className="about-img"
                        src="./resources/images/about.jpg"
                        alt="about"
                    />
                    <div ref={aboutCardRef} className="about-card">
                        <h2>{t1}</h2>
                        <h2>{t2}</h2>
                        <h2>{t3}</h2>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About
