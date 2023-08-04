import './Components.css'
import IDE from './IDE'
import { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';

function Intro() {
    const textRef = useRef(null)
    const btnRef = useRef(null)
    const ideRef = useRef(null)
    const nextTransition = () => {
        btnRef.current.classList.add("intro-animation")
        ideRef.current.classList.add("intro-animation")
    }
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("intro-animation")
                    // add next transiton after first plays
                    setTimeout(nextTransition, 1000)
                }
            })
        })

        observer.observe(textRef.current)

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <>
        <section id='intro' className='intro' style={{backgroundImage: `url("./resources/images/intro-background.jpg")`}}>
            <div className='intro-content'>
                <div className='intro-content-left'>
                    <div className="intro-content-text" ref={textRef}>
                        <h1 className='intro-title'>
                            Rui Jia
                        </h1>
                        <h2 className='intro-subtitle'>
                            Computer Science undergratuate
                        </h2>
                    </div>
                    <div className='intro-wrapper intro-link' ref={btnRef}>
                        <Link className='intro-linkx' to='projects' smooth={true} duration={500}>View Projects</Link>
                    </div>
                </div>
                <div id='intro-content-right' className='intro-content-right' ref={ideRef}>
                    <IDE/>
                </div>
            </div>
        </section>
        </>
    )
}

export default Intro