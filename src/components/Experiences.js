import "./Components.css"
import Modal from "./Modal"
import ModalContent from "./ModalContent"
import Lightbulb from "./Lightbulb"
import { React, useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { skillImages } from "../utils/constants"

function ExperienceSkills({ skills }) {
    const skillTagsRef = useRef(null)
    const [scrollDirection, setScrollDirection] = useState(null)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    const detectTouchDevice = () => {
        return "ontouchstart" in window || navigator.maxTouchPoints > 0
    }

    useEffect(() => {
        setIsTouchDevice(detectTouchDevice())
    }, [])

    // Scroll function to move left or right based on scroll direction
    useEffect(() => {
        if (isTouchDevice) return
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
    }, [scrollDirection, isTouchDevice])

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
                        <div key={index} className="experience-logo">
                            <img
                                className="experience-skill-logo"
                                src={`./resources/images/skill-logos/${skillImages[skill]}`}
                                alt="skill-logo"
                            />
                            <p className="experience-skill">{skill}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

function ExperienceCard({ experience, modalOpen, open, close, index }) {
    const experienceCardRef = useRef(null)
    const experienceDescriptionRef = useRef(null)
    const handleDescriptionClick = () => {
        experienceDescriptionRef.current.classList.toggle(
            "experience-descriptions-clicked"
        )
    }

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
                <div
                    ref={experienceDescriptionRef}
                    className="experience-descriptions"
                    onClick={handleDescriptionClick}
                >
                    {experience.descriptions.map((description, index) => {
                        return (
                            <p className="experience-description" key={index}>
                                {description}
                            </p>
                        )
                    })}
                </div>
                <div className="experience-buttons">
                    <Lightbulb
                        index={index}
                        open={open}
                        close={close}
                        modalOpen={modalOpen}
                    />
                    {/* <div
                        className="experience-button"
                        onClick={() => (modalOpen ? close() : open(index))}
                    >
                        <i className="fa-regular fa-lightbulb fa-icon-highlight"></i>
                    </div> */}
                    {/* <a
                        className="experience-button"
                        href={`${experience.link}`}
                    >
                        <i className="fa-solid fa-link fa-icon"></i>
                    </a> */}
                </div>
            </div>
        </>
    )
}

function Experiences() {
    const allExperiences = [
        {
            title: "Software Engineer",
            companyName: "Visa, Singapore",
            descriptions: [
                "Visa is a global payments technology company that connects consumers, businesses, banks, and governments to fast, secure, and reliable electronic payments.",
                "I worked on MCP agents to improve the efficiency of internal processes and enhance the user experience for Visa employees.",
            ],
            img: "./resources/images/experience-images/visa-thumbnail.png",
            skills: [
                "Java",
                "Python",
                "MCP",
                "FastAPI",
                "SpringBoot",
            ],
            modalContent: {
                title: "Visa",
                link: "https://www.visa.com",
                content: (
                    <ModalContent
                        directory="visa"
                        skills={[]}
                        comments={[]}
                        features={[
                            {
                                title: "MCP Agent Workflow",
                                subtitle: [
                                    "The following outlines the AI workflow. A key part is the orchestrator, where it decides the MCP tool to call and the arguments to be supplied to the MCP tools.",
                                ],
                                img: [
                                    {
                                        imagePath: "visa-agent-workflow.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Tool Chaining",
                                subtitle: [
                                    "I added functionality to the orchestrator to allow multiple tools to be called at each step, until the query has been fulfilled.",
                                    "This improved the maintainability of MCP tools and allowed more complex queries to be handled.",
                                    "In the example, the agent understands the query and calls one or more tools. At each step, the agent evaluates the response and decides whether to call more tools or return the final response.",
                                ],
                                img: [
                                    {
                                        imagePath: "visa-tool-chaining.png",
                                        width: "100%",
                                    },
                                ],
                                video: [
                                ],
                            }
                        ]}
                    />
                )
            }

        },
        {
            title: "Full Stack Developer",
            companyName: "Leasi, Norway",
            descriptions: [
                "Leasi offers a centralized system for fleet control, allowing contractors and construction companies to streamline operations.",
                "I worked on development of the platform, during my 6 month internship under the NUS NOC program."
            ],
            img: "./resources/images/experience-images/leasi-thumbnail.png",
            skills: [
                "Appfarm",
                "GraphQL",
                "Javascript",
                "Python",
                "Node",
                "Express",
                "MongoDB",
                "Selenium",
            ],
            modalContent: {
                title: "Leasi",
                link: "https://www.leasi.io/en",
                content: (
                    <ModalContent
                        directory="leasi"
                        skills={[]}
                        comments={[]}
                        features={[
                            {
                                title: "Mobile View for machines",
                                subtitle: [
                                    "This was the first task I worked on at Leasi. A mobile view was needed for contractors to view their machines easily on the go.",
                                    " I worked on the frontend components to fetch and display the machine data.",
                                ],
                                img: [
                                    {
                                        imagePath: "leasi-mobile-view.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Automated advanced search with Selenium",
                                subtitle: [
                                    "There were a lot of repetitive tasks that needed to be done manually, which was time-consuming.",
                                    "One of these tasks was calling a webhook function after every change in the database.",
                                    "I automated this process using Selenium to look for changes in the database saving time and reducing human error.",
                                ],
                                img: [],
                                video: [
                                    {
                                        videoId:
                                            "13ytacK_RA-w8hOikFaOlfbOGbmnFnc7T",
                                        width: "100%",
                                        aspectRatio: "1.87",
                                    },
                                ],
                            },
                            {
                                title: "Webhooks for real-time updates",
                                subtitle: [
                                    "Leasi's customers needed to routinely fetch data from our APIs to get notified of updates, which was inefficient.",
                                    "The webhooks system that I implemented allowed any events to be tracked and sent to the customer's server immediately.",
                                ],
                                img: [
                                    {
                                        imagePath: "leasi-webhooks.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Database migration",
                                subtitle: [
                                    "I was tasked with migrating the database from Appfarm's database system to MongoDB.",
                                    "This was an initial integration test to ensure that MongoDB was compatiable with Appfarm.",
                                    "I also created a backend server with Express and Mongoose for the Appfarm frontend to interact with the MongoDB database.",
                                ],
                                img: [
                                    {
                                        imagePath: "leasi-migration.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                        ]}
                    />
                ),
            },
        },
        {
            title: "XR Software Engineer",
            companyName: "Smart Systems Institute, Singapore",
            descriptions: [
                "Smart Systems Institute is a research institute at NUS that focuses on developing innovative solutions for smart systems and technologies.",
                "I worked on a project called RobiButler, which aims to enable remote users to interact with a robot assistant through XR technologies.",
            ],
            img: "./resources/images/experience-images/ssi-thumbnail.png",
            skills: [
                "Python",
                "C#",
                "Unity",
                "WebRTC",
                "Websocket",
                "MRTK3",
                "MetaXR",
            ],
            modalContent: {
                title: "Smart Systems Institute",
                link: "https://ssi.nus.edu.sg/",
                content: (
                    <ModalContent
                        directory="ssi"
                        skills={[]}
                        comments={[]}
                        features={[
                            {
                                title: "WebRTC Connection via Websocket",
                                subtitle: [
                                    "The diagram below shows a simplified flow of the WebRTC communication flow between the RobiButler and the user.",
                                    "The WebRTC connection allows the user to see the robot's camera feed and send commands to the robot.",
                                    "In the case of the demo video at the bottom of the page, the camera is simulated by a webcam feed, but can be easily replaced with the robot's camera feed.",
                                ],
                                img: [
                                    {
                                        imagePath: "ssi-diagram.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Meta Quest 3 Interface",
                                subtitle: [
                                    "I developed the RobiButler UI using MRTK3 components and tested it with the Meta Quest 3 headset.",
                                    "The interface allows users to interact with the robot using hand gestures and voice commands.",
                                ],
                                img: [
                                    {
                                        imagePath: "ssi-ui.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Demo",
                                subtitle: [
                                    "The demo shows the real time video stream and text communication between the VR headset and the Python server via the WebRTC connection.",
                                ],
                                img: [],
                                video: [
                                    {
                                        videoId:
                                            "15WVg8cXMkZgfEP4h4kaYm610Mumi88HH",
                                        width: "100%",
                                        aspectRatio: "1/1",
                                    },
                                ],
                            },
                        ]}
                    />
                ),
            },
        },
        {
            title: "Software Engineer",
            companyName: "Qritive, Singapore",
            descriptions: [
                "Qritive assists pathologists in diagnosing diseases by analyzing medical images with AI solutions.",
                "I worked on integrating medical imaging APIs and creating data visualizations for the platform.",
            ],
            img: "./resources/images/experience-images/qritive-thumbnail.png",
            skills: [
                "Python",
                "Java",
                "Javascript",
                "React",
                "Bioformats",
                "ChartJS",
            ],
            modalContent: {
                title: "Qritive",
                link: "https://qritive.com/",
                content: (
                    <ModalContent
                        directory="qritive"
                        skills={[]}
                        comments={[]}
                        features={[
                            {
                                title: "Image Processing with Bioformats and OpenSlide",
                                subtitle: [
                                    "A key part of Qritive's platform is the ability to view and analyze medical images.",
                                    "I worked on integrating medical imaging APIs like Bioformats and OpenSlide, to allow the platform to read and display various image formats.",
                                    "These image formats include DICOM, SVS, and other common medical imaging formats.",
                                ],
                                img: [
                                    {
                                        imagePath:
                                            "qritive-openslide-images.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Benchmarking Bioformats and OpenSlide",
                                subtitle: [
                                    "I conducted benchmarking tests to compare the performance of Bioformats and OpenSlide in reading large medical images.",
                                    "The tests measured the time taken to load and display images of different sizes.",
                                ],
                                img: [
                                    {
                                        imagePath: "qritive-timings.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Data Visualization with ChartJS",
                                subtitle: [
                                    "I used ChartJS to create interactive charts to display data on the platform.",
                                    "These charts are used to help pathologists visualize and analyze data more effectively.",
                                ],
                                img: [
                                    {
                                        imagePath: "qritive-bar-chart.png",
                                        width: "100%",
                                    },
                                    {
                                        imagePath: "qritive-pie-chart.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                        ]}
                    />
                ),
            },
        },
        {
            title: "Software Developer",
            companyName: "Whatnot Startup Studio, Thailand",
            descriptions: [
                "Whatnot Startup Studio is a startup studio that helps entrepreneurs build their ideas into successful businesses.",
                "I worked on Aira, a LINE AI job matching chatbot to help job seekers find jobs more easily.",
            ],
            img: "./resources/images/experience-images/whatnot-thumbnail.png",
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
                link: "https://www.helloaira.io/",
                content: (
                    <ModalContent
                        directory="aira-chatbot"
                        skills={[]}
                        comments={[]}
                        features={[
                            {
                                title: "Chatting with Aira",
                                subtitle: [
                                    "I created an Azure function that would handle the chatbot's responses to user queries.",
                                    "The Azure function I created will format the data received by the chatbot function and display the appropriate type of message. In this case, the message sent is a simple text message.",
                                ],
                                img: [
                                    {
                                        imagePath: "aira-chatting.png",
                                        width: "90%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Job Search",
                                subtitle: [
                                    "When you ask Aira for a list of jobs, the chatbot will display a carousel of job cards.",
                                ],
                                img: [
                                    {
                                        imagePath: "aira-job-search.png",
                                        width: "90%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Resume Analysis",
                                subtitle: [
                                    "I made use of the LINE LIFF app and LINE rich menu to allow the user to upload their resume and get feedback from Aira on how they can craft a more effective resume.",
                                ],
                                img: [
                                    {
                                        imagePath: "aira-rich-menu.jpg",
                                        width: "70%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Aira Webpages",
                                subtitle: [
                                    "I also made webpages to display job details and resume feedback using React. ",
                                    "You can't see the animations, but I added some into the website to make it look nicer because I like animations :)",
                                ],
                                img: [
                                    {
                                        imagePath: "aira-job-details.png",
                                        width: "80%",
                                    },
                                    {
                                        imagePath: "aira-resume-feedback.png",
                                        width: "80%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Web Scraping",
                                subtitle: [
                                    "I created an API that would scrape various sites to enrich the existing data we had on companies to show more relevant data to users.",
                                    "Some of the tools I used were BeautifulSoup and an unofficial Bard API.",
                                    "There are no screenshots of this since it is just code.",
                                ],
                                img: [],
                                video: [],
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
export { ExperienceSkills }
