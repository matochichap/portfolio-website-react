import './Components.css'
import { React, useState, useEffect, useRef } from 'react'
import { Link } from 'react-scroll';

function NavBar() {
    const [isDarkMode, setIsDarkMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches)
    const darkLightModeBtn = useRef(null)
    const root = document.getElementById("root")
    // set mode according to user theme setting
    isDarkMode ? root.classList.remove("light-mode") : root.classList.add("light-mode")
    // toggle dark light mode
    const toggleMode = () => {
        // change color scheme
        root.classList.toggle("light-mode")
        setIsDarkMode(!isDarkMode)
    }

    useEffect(() => {
        // dropdown animation when hamburgerBtn is pressed
        const hamburgerBtn = document.querySelector(".hamburger-btn")
        const dropDownNav = document.querySelector(".dropdown-animation")
        const toggleDropdown = () => {
            dropDownNav.classList.toggle("dropdown-animation-active")
        }
        hamburgerBtn.addEventListener("click", toggleDropdown)

        // close dropdown bar when scrolling
        const removeDropdown = () => {
            dropDownNav.classList.remove("dropdown-animation-active")
        }
        document.addEventListener("scroll", removeDropdown)

        return () => {
            hamburgerBtn.removeEventListener("click", toggleDropdown)
            document.removeEventListener("scroll", removeDropdown)
        }
    }, [])
    
    return (
        <>
        <nav className='navbar'>
            <div className='main-nav'>
                <div className='nav-logo'>
                    <Link className='link' to='intro' smooth={true} duration={500}>Rui Jia</Link>
                </div>
                <div className='nav-options'>
                    <div onClick={toggleMode} className='dark-light-mode-toggle-btn' ref={darkLightModeBtn}>
                        {isDarkMode ? <i className="fa-solid fa-sun"></i> 
                                    : <i className="fa-solid fa-moon"></i>}
                    </div>
                    <div className='nav-links'>
                        <Link className='link' to='about' smooth={true} duration={500}>About</Link>
                        <Link className='link' to='projects' smooth={true} duration={500}>Projects</Link>
                        <Link className='link' to='skills' smooth={true} duration={500}>Skills</Link>
                        <Link className='link' to='contact' smooth={true} duration={500}>Contact</Link>
                    </div>
                        <div className='hamburger-btn'>
                        <div className='hamburger-line'></div>
                        <div className='hamburger-line'></div>
                        <div className='hamburger-line'></div>
                    </div>
                </div>
            </div>
            <div className='dropdown-nav dropdown-animation'>
                    <Link className='link' to='about' smooth={true} duration={500}>About</Link>
                    <Link className='link' to='projects' smooth={true} duration={500}>Projects</Link>
                    <Link className='link' to='skills' smooth={true} duration={500}>Skills</Link>
                    <Link className='link' to='contact' smooth={true} duration={500}>Contact</Link>
            </div>
        </nav>
        </>
    )
}

export default NavBar