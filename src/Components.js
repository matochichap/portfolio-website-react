import './Components.css'
import { React, useState, useEffect, useRef } from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from "framer-motion";

function NavBar() {
    const darkLightModeBtn = useRef(null)
    // toggle dark light mode
    const toggleMode = () => {
        // change color scheme
        const root = document.getElementById("root")
        root.classList.toggle("light-mode")

        // switch icon
        const dark = darkLightModeBtn.current.querySelector(".dark")
        const light = darkLightModeBtn.current.querySelector(".light")
        dark.classList.toggle("hide")
        light.classList.toggle("hide")
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
                        <i className="fa-solid fa-sun dark"></i>
                        <i className="fa-solid fa-moon light hide"></i>
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

function Buffer(props) {
    const {id} = props
    return (
        <div id={id} className='buffer'></div>
    )
}

function Intro() {
    const [text] = useTypewriter({
        words: ["Hi, I'm Rui Jia.", "I'm a CS student.", "Scroll down to see my really nice website!"],
        typeSpeed: 50,
        loop: false
    })
    return (
        <>
        <section id='intro' className='intro'>
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

function About() {
    const componentRef = useRef(null)
    const [t1, t2, t3, t4] = [
        "I'm Rui Jia, an undergraduate at NUS pursuing a double major in Computer Science and Data Analytics. ",
        "I love finding new and creative ways to create better user experiences and solving complex problems through code, especially solving problems that I encounter in my daily life. ",
        "I am interested in exploring areas like software development and AI to find ways to automate processes to create meaningful tools that can improve people's lives. ",
        "With a combination of technical expertise and a creative mindset, I strive to create meaningful digital experiences that leave a lasting impact."
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

function SkillCategory(props) {
    const skillCategoryRef = useRef(null)
    const skillCardsRef = useRef(null)
    const {category} = props
    const removeTransitionDelay = () => {
        // remove transition delay on children
        for (const skillCard of skillCardsRef.current.children) {
            skillCard.style.transitionDelay = "0s"
        }
    }
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // be careful changing html structure will affect this line
                const [title, cards] = Array.from(entry.target.children)
                if (entry.isIntersecting) {
                    title.classList.add("slide-in-active")
                    Array.from(cards.children).forEach(card => {
                        card.classList.add("slide-in-active")
                    })
                    // need to wait for animation to finish playing before removing delay
                    setTimeout(removeTransitionDelay, 1500)
                }
            })
        })

        observer.observe(skillCategoryRef.current)

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <div className='skill-category' ref={skillCategoryRef}>
            <h2 className='section-subtitle slide-in'>{category.name}</h2>
            <div className='skill-cards' ref={skillCardsRef}>
                {category.skills.map((skill, index) => {
                    return (
                        <div key={index} className='skill-card slide-in'>
                            <img className='skill-card-img' src={`./resources/images/skill-logos/${skill.img}`} alt="logo" />
                            <p className='skill-name'>{skill.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function Skills() {
    const allSkills = [
        {
            name: "Programming Languages",
            skills: [
                {
                    name: "Java",
                    img: "java-logo.png"
                },
                {
                    name: "Python",
                    img: "py-logo.png"
                },
                {
                    name: "Javascript",
                    img: "js-logo.png"
                }
            ]
        },
        {
            name: "Web Development",
            skills: [
                {
                    name: "React",
                    img: "react-logo.png"
                },
                {
                    name: "NodeJS",
                    img: "node-logo.png"
                },
                {
                    name: "Flask",
                    img: "flask-logo.png"
                }
            ]
        },
        {
            name: "Web Scraping",
            skills: [
                {
                    name: "BeautifulSoup",
                    img: "bs4-logo.png"
                },
                {
                    name: "Selenium",
                    img: "selenium-logo.png"
                }
            ]
        },
        {
            name: "Database",
            skills: [
                {
                    name: "SQLite",
                    img: "sqlite-logo.png"
                },
                {
                    name: "MongoDB",
                    img: "mongodb-logo.png"
                }
            ]
        }
    ]
    return (
        <>
        <section className='skills'>
            <h1 className='section-title'>Skills</h1>
            <hr />
            <div className='skill-categories'>
                {allSkills.map((category, index) => {
                    return (
                        <SkillCategory key={index} category={category}></SkillCategory>
                    )
                })}
            </div>
        </section>
        </>
    )
}

function ProjectCard({project, modalOpen, open, close}) {
    const projectCardRef = useRef(null)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-active")
                    observer.unobserve(entry.target)
                }
            })
        })

        observer.observe(projectCardRef.current)

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <div className='project-card fade-in' ref={projectCardRef}>
            <div className='project-card-inner'>
                <div className='project-card-front'>
                    <div className='project-img-box'>
                        <img className='project-img' src={`./resources/images/project-icons/${project.img}`} alt="icon" />
                    </div>
                    <h2 className='project-title'>{project.title}</h2>
                </div>
                <div className='project-card-back'>
                    <div className='project-skill-tags'>
                        {project.skills.map((skill, index) => {
                            return (
                                <div key={index} className="project-skill-tag">
                                    <p className="project-skill">{skill}</p>
                                </div>
                            )
                        })}
                    </div>
                    <p className='project-subtitle'>{project.subtitle}</p>
                    <a className='project-link' href={`${project.link}`}>
                        <i className="fa-solid fa-link" style={{color: "#5182d6"}}></i>
                    </a>
                    {/* not using for now, remove hide continue working on it*/}
                    <motion.button
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                    className='hide'
                    onClick={() => (modalOpen ? close(): open())}>
                        <i className='fa-solid fa-arrow-up-right-from-square'></i>
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

function Projects() {
    const [modalOpen, setModalOpen] = useState(false)
    const close = () => {
        setModalOpen(false)
        document.querySelector("body").style.overflow = "unset"
    }
    const open = () => {
        setModalOpen(true)
        document.querySelector("body").style.overflow = "hidden"
    }
    const allProjects = [
        {
            title: "Aira Chatbot",
            subtitle: "A LINE AI job matching chatbot I helped develop during my internship with Whatnot Startup Studio.",
            img: "aira-icon.png",
            link: "https://www.helloaira.io/",
            skills: ["Python", "JS", "React", "bs4"]
        },
        {
            title: "Party Website",
            subtitle: "A website built with Flask and MySQL with authentication and CRUD functionality to allow users to create and join parties.",
            img: "party-icon.png",
            link: "https://github.com/matochichap/party-website",
            skills: ["Flask", "MySQL", "HTML", "CSS"]
        },
        {
            title: "Transfer Netflix profile",
            subtitle: "A bot built with Selenium to helps you automate adding all your watch history into another profile.",
            img: "netflix-icon.png",
            link: "https://github.com/matochichap/transfer-netflix-profile",
            skills: ["Python", "Pandas", "Selenium"]
        },
        {
            title: "YouTube Downloader",
            subtitle: "A simple Python app that helps you download videos from YouTube built with Tkinter.",
            img: "youtube-icon.png",
            link: "https://github.com/matochichap/youtube-downloader",
            skills: ["Python", "Tkinter"]
        },
        {
            title: "Snake Game",
            subtitle: "Simple snake game built with Python and Turtle graphics that can save you high score too.",
            img: "snake-icon.png",
            link: "https://github.com/matochichap/snake-game",
            skills: ["Python", "Turtle", "OOP"]            
        },
        {
            title: "Turtle Crossing",
            subtitle: "Crossy Road but with turtles that gets harder as you clear more levels built with Python and Turtle graphics.",
            img: "turtle-crossing-icon.png",
            link: "https://github.com/matochichap/turtle-crossing",
            skills: ["Python", "Turtle", "OOP"]            
        }
    ]
    return (
        <>
        <section className='projects'>
            <h1 className='section-title'>Projects</h1>
            <hr />
            <div className='project-cards'>
                {allProjects.map((project, index) => {
                    return (
                        <ProjectCard 
                        key={index} 
                        project={project}
                        modalOpen={modalOpen}
                        close={close}
                        open={open}></ProjectCard>
                    )
                })}
            </div>
            <AnimatePresence
            initial={false}
            mode='wait'
            onExitComplete={() => null}>
                {modalOpen && <Modal modalOpen={modalOpen} handleClose={close}/>}
            </AnimatePresence>
        </section>
        </>
    )
}

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
                <div className="contact-link-box"><a href={links.linkedin}><i className="fa-brands fa-linkedin fa-icons"></i></a></div>
                <div className="contact-link-box"><a href={links.github}><i className="fa-brands fa-github fa-icons"></i></a></div>
                <div className="contact-link-box"><a href={links.email}><i className="fa-solid fa-envelope fa-icons"></i></a></div>
            </div>
            <p className="copyright">© Copyright {year} Chan Rui Jia</p>
        </section>
        </>
    )
}

function Backdrop({children, onClick}) {
    return (
        <motion.div 
        className='backdrop' 
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{opacity: 0}}>
            {children}
        </motion.div>
    )
}

function Modal({handleClose, text}) {
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500
            }
        },
        exit: {
            y: "100vh",
            opacity: 0
        }
    }
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
            onClick={e => e.stopPropagation()}
            className='modal'
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
                <motion.button
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                className='modal-close-btn'
                onClick={handleClose}>
                    exit
                </motion.button>
                <div className='content'>woidaajwoiadj</div>
            </motion.div>
        </Backdrop>
    )
}

export { NavBar, Buffer, Intro, About, Skills, Projects, Contact }