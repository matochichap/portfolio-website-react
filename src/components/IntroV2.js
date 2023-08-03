import './Components.css'
import IDE from './IDE'
import { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';

function Intro() {
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const btnRef = useRef(null)
    const ideRef = useRef(null)
    const removeTransitionDelay = () => {
        btnRef.current.style.transitionDelay = "0s"
    }
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("intro-animation")
                    // remove delay after title and subtitle transition finish playing
                    setTimeout(removeTransitionDelay, 1000)
                }
            })
        })

        observer.observe(titleRef.current)
        observer.observe(subtitleRef.current)
        observer.observe(btnRef.current)
        observer.observe(ideRef.current)

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <>
        <section id='intro' className='intro' style={{backgroundImage: `url("./resources/images/intro-background.jpg")`}}>
            <div className='intro-content'>
                <div className='intro-content-left'>
                    <h1 className='intro-title' ref={titleRef}>
                        Rui Jia
                    </h1>
                    <h2 className='intro-subtitle' ref={subtitleRef}>
                        Computer Science undergratuate at NUS
                    </h2>
                    <div className='intro-wrapper intro-link' ref={btnRef}>
                        <Link className='intro-linkx' to='projects' smooth={true} duration={500}>View Projects</Link>
                    </div>
                </div>
                <div className='intro-content-right' ref={ideRef}>
                    <IDE/>
                </div>
            </div>
        </section>
        {/* <section id='intro' className='intro'>
            <div>
                <div className='intro-filler'></div>
                <div className='intro-icon-box'>
                    <img className='intro-icon' src="./resources/images/programming.png" alt="icon" />
                </div>
                <div className='intro-text-box'>
                    <code className='intro-text'>
                        {text}<Cursor></Cursor>
                    </code>
                </div>
                <div className='intro-filler'></div>
            </div>
        </section> */}
        </>
    )
}

export default Intro