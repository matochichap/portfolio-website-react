import './Components.css'
import { React, useEffect, useRef } from 'react'

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
                    setTimeout(removeTransitionDelay, 1000)
                }
            })
        },
        {
            threshold: 0.5
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
                    name: "MySQL",
                    img: "mysql-logo.png"
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
            <div className="section-header">
                <h1 className='section-title'>Skills</h1>
                <hr />
            </div>
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

export default Skills