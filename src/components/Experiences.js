import "./Components.css"
import Modal from "./Modal"
import ModalContent from "./ModalContent"
import { React, useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { skillImages } from "../utils/constants"

function ExperienceSkills({ skills }) {
    const skillTagsRef = useRef(null)
    const [scrollDirection, setScrollDirection] = useState(null)

    // Scroll function to move left or right based on scroll direction
    useEffect(() => {
        const container = skillTagsRef.current
        if (!scrollDirection || !container) return

        const scrollSpeed = 2
        const scrollInterval = setInterval(() => {
            if (scrollDirection === "left") {
                container.scrollBy({ left: -scrollSpeed, behavior: "smooth" })
            } else if (scrollDirection === "right") {
                container.scrollBy({ left: scrollSpeed, behavior: "smooth" })
            }
        }, 0)

        // Clear interval when scroll direction changes or component unmounts
        return () => clearInterval(scrollInterval)
    }, [scrollDirection])

    // Handle mouse movement within the skill tags container
    const handleMouseMove = (event) => {
        const container = skillTagsRef.current
        const { left, right, width } = container.getBoundingClientRect()
        const mouseX = event.clientX

        // Set scroll direction based on mouse position
        if (mouseX < left + width * 0.25) {
            setScrollDirection("left")
        } else if (mouseX > right - width * 0.25) {
            setScrollDirection("right")
        } else {
            setScrollDirection(null)
        }
    }

    // Stop scrolling when the mouse leaves the container
    const handleMouseLeave = () => {
        setScrollDirection(null)
    }

    return (
        <>
            <div
                className="experience-skill-tags"
                ref={skillTagsRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {skills.map((skill, index) => {
                    return (
                        <>
                            <div key={index} className="experience-logo">
                                <img
                                    className="experience-skill-logo"
                                    src={`./resources/images/skill-logos/${skillImages[skill]}`}
                                    alt="skill-logo"
                                />
                                <p className="experience-skill">{skill}</p>
                            </div>
                            {/* <div key={index} className="experience-skill-tag">
                                <p className="experience-skill">{skill}</p>
                            </div> */}
                        </>
                    )
                })}
            </div>
        </>
    )
}

function ExperienceCard({ experience, modalOpen, open, close, index }) {
    const experienceCardRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-active")
                    observer.unobserve(entry.target)
                }
            })
        })
        observer.observe(experienceCardRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <>
            <div ref={experienceCardRef} className="experience-card fade-in">
                <img
                    className="experience-thumbnail"
                    src={experience.img}
                    alt="thumbnail"
                />
                <h2 className="experience-title">{experience.title}</h2>
                <h3 className="experience-company">{experience.companyName}</h3>
                <ExperienceSkills skills={experience.skills}></ExperienceSkills>
                <div className="experience-description">
                    {experience.descriptions.map((description, index) => {
                        return <p key={index}>{description}</p>
                    })}
                </div>
                <div className="experience-buttons">
                    <div
                        className="experience-button"
                        onClick={() => (modalOpen ? close() : open(index))}
                    >
                        <i className="fa-regular fa-lightbulb fa-icon-highlight"></i>
                    </div>
                    <a
                        className="experience-button"
                        href={`${experience.link}`}
                    >
                        <i className="fa-solid fa-link fa-icon"></i>
                    </a>
                </div>
            </div>
        </>
    )
}

function Experiences() {
    const allExperiences = [
        {
            title: "Software Developer",
            companyName: "Whatnot Startup Studio, Thailand",
            descriptions: [
                "Whatnot Startup Studio is a startup studio that helps entrepreneurs build their ideas into successful businesses.",
                "Whatnot partnered with another startup, Blockchain Labs, to collaborate on a project called Aira, a LINE AI job matching chatbot to help job seekers find jobs more easily.",
            ],
            img: "./resources/images/experience-images/whatnot-thumbnail.png",
            link: "https://www.helloaira.io/",
            skills: [
                "Python",
                "Javascript",
                "React",
                "Azure",
                "LineAPI",
                "Selenium",
                "BeautifulSoup",
            ],
            modalContent: {
                title: "Whatnot Startup Studio",
                content: (
                    <ModalContent
                        imgDirectory="aira-chatbot"
                        skills={[]}
                        comments={[]}
                        features={[
                            {
                                title: "Chatting with Aira",
                                subtitle: [
                                    "The Azure function I created will format the data received by the chatbot function and display the appropriate type of message. In this case, the message sent is a simple text message.",
                                ],
                                img: [["aira-chatting.png", "90%"]],
                            },
                            {
                                title: "Job Search",
                                subtitle: [
                                    "When you ask Aira for a list of jobs, my Azure function will display a carousel of job cards.",
                                ],
                                img: [["aira-job-search.png", "90%"]],
                            },
                            {
                                title: "Resume Analysis",
                                subtitle: [
                                    "I made use of the LINE LIFF app and LINE rich menu to allow the user to upload their resume and get feedback from Aira on how they can craft a more effective resume.",
                                ],
                                img: [["aira-rich-menu.jpg", "70%"]],
                            },
                            {
                                title: "Aira Webpages",
                                subtitle: [
                                    "I also made webpages to display job details and resume feedback using React. ",
                                    "You can't see the animations, but I added some into the website to make it look nicer because I like animations :)",
                                ],
                                img: [
                                    ["aira-job-details.png", "80%"],
                                    ["aira-resume-feedback.png", "80%"],
                                ],
                            },
                            {
                                title: "Web Scraping",
                                subtitle: [
                                    "I created an API that would scrape various sites to enrich the existing data we had on companies to show more relevant data to users.",
                                    "Some of the tools I used were BeautifulSoup and an unofficial Bard API.",
                                    "There are no screenshots of this since it is just code.",
                                ],
                                img: [],
                            },
                        ]}
                    />
                ),
            },
        },
    ]
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const close = () => {
        setModalOpen(false)
        document.querySelector("body").style.overflow = "unset"
        setModalContent(null)
    }
    const open = (index) => {
        setModalOpen(true)
        document.querySelector("body").style.overflow = "hidden"
        setModalContent(allExperiences[index].modalContent)
    }
    return (
        <>
            <section className="experiences">
                <div className="section-header">
                    <h1 className="section-title">Experience</h1>
                    <hr />
                </div>
                <div className="experience-cards">
                    {allExperiences.map((experience, index) => {
                        return (
                            <ExperienceCard
                                key={index}
                                experience={experience}
                                modalOpen={modalOpen}
                                open={open}
                                close={close}
                                index={index}
                            />
                        )
                    })}
                </div>
                <AnimatePresence
                    initial={false}
                    mode="wait"
                    onExitComplete={() => null}
                >
                    {modalOpen && (
                        <Modal
                            modalOpen={modalOpen}
                            handleClose={close}
                            modalContent={modalContent}
                        />
                    )}
                </AnimatePresence>
            </section>
        </>
    )
}

export default Experiences
