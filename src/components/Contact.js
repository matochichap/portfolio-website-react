import './Components.css'
import { React } from 'react'

function Contact() {
    const year = new Date().getFullYear()
    const links = {
        linkedin: "https://www.linkedin.com/in/chan-rui-jia",
        github: "https://github.com/matochichap",
        email: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&su=Hey+there!&to=ruijia.chan@gmail.com"
    }
    return (
        <>
        <section className='contact'>
            <h1 className='section-title'>Contact</h1>
            <hr />
            <div className='contact-links'>
                <div className="contact-link-box"><a href={links.linkedin}><i className="fa-brands fa-linkedin contact-fa-icons fa-icon"></i></a></div>
                <div className="contact-link-box"><a href={links.github}><i className="fa-brands fa-github contact-fa-icons fa-icon"></i></a></div>
                <div className="contact-link-box"><a href={links.email}><i className="fa-solid fa-envelope contact-fa-icons fa-icon"></i></a></div>
            </div>
            <p className="copyright">© Copyright {year} Chan Rui Jia</p>
        </section>
        </>
    )
}

export default Contact