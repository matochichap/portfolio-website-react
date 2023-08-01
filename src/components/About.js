import './Components.css'
import { React, useEffect, useRef } from 'react'

function About() {
    const componentRef = useRef(null)
    const [t1, t2, t3, t4] = [
        "I'm Rui Jia, an undergraduate at NUS pursuing a double major in Computer Science and Data Analytics. ",
        "I love finding new and creative ways to create better user experiences and solving complex problems through code. ",
        "I am interested in exploring software development and AI to find ways to automate processes to create meaningful tools. ",
        "With a combination of technical expertise and a creative mindset, I hope to create meaningful digital experiences that leave a lasting impact."
    ]
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("slide-in-active")
                }
            })
        })

        observer.observe(componentRef.current)

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <>
        <section className='about'>
            <h1 className='section-title'>About</h1>
            <hr />
                <div className='about-cards slide-in' ref={componentRef}>
                    <div className='about-card'>
                        <h2>{t1 + t2}</h2>
                    </div>
                    <div className='about-card'>
                        <h2>{t3 + t4}</h2>
                    </div>
                </div>
        </section>
        </>
    )
}

export default About