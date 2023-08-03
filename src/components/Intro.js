import './Intro.css'
import { useTypewriter, Cursor } from 'react-simple-typewriter';

function Intro() {
    const [text] = useTypewriter({
        words: ["Hi, I'm Rui Jia.", "I'm a CS student.", "Scroll down to see my really nice website!"],
        typeSpeed: 50,
        loop: false
    })
    return (
        <>
        <section id='intro' className='intro' style={{backgroundImage: `url("./resources/images/intro-background.jpg")`}}>
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
        </section>
        </>
    )
}

export default Intro