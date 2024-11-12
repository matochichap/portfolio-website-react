import "./Components.css"
import Modal from "./Modal"
import ModalContent from "./ModalContent"
import { React, useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"

function ProjectCard({ project, modalOpen, open, close, index }) {
    const projectCardRef = useRef(null)
    const projectCardInnerRef = useRef(null)
    const projectFrontFlipBtnRef = useRef(null)
    const projectBackFlipBtnRef = useRef(null)

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

        // Flip card animation
        const projectCardInner = projectCardInnerRef.current
        const frontFlipBtn = projectFrontFlipBtnRef.current
        const backFlipBtn = projectBackFlipBtnRef.current

        const flipCard = () => {
            projectCardInner.classList.toggle("project-flip-card-animation")
        }
        frontFlipBtn.addEventListener("click", flipCard)
        backFlipBtn.addEventListener("click", flipCard)

        return () => {
            observer.disconnect()
            frontFlipBtn.removeEventListener("click", flipCard)
            backFlipBtn.removeEventListener("click", flipCard)
        }
    }, [])

    return (
        <div className="project-card fade-in" ref={projectCardRef}>
            <div className="project-card-inner" ref={projectCardInnerRef}>
                <div className="project-card-front">
                    <div className="project-img-box">
                        <img
                            className="project-img"
                            src={`./resources/images/project-icons/${project.img}`}
                            alt="icon"
                        />
                    </div>
                    <div className="project-title-box">
                        <h2 className="project-title">{project.title}</h2>
                        <div className="project-flip-icon-box">
                            <i
                                className="fa-regular fa-lightbulb fa-icon-highlight project-flip-icon"
                                onClick={() =>
                                    modalOpen ? close() : open(index)
                                }
                            ></i>
                            <i
                                className="fa-solid fa-repeat project-flip-icon fa-icon"
                                ref={projectFrontFlipBtnRef}
                            ></i>
                        </div>
                    </div>
                </div>
                <div className="project-card-back">
                    <div className="project-card-back-inner">
                        <p className="project-subtitle">{project.subtitle}</p>
                        <div className="project-buttons">
                            <a
                                className="project-link"
                                href={`${project.link}`}
                            >
                                <i
                                    className="fa-solid fa-link fa-icon"
                                    style={{ scale: "90%" }}
                                ></i>
                            </a>
                            <div
                                className="project-modal"
                                onClick={() =>
                                    modalOpen ? close() : open(index)
                                }
                            >
                                <i className="fa-regular fa-lightbulb fa-icon-highlight"></i>
                            </div>
                            <div
                                className="project-flip-icon-back-box"
                                ref={projectBackFlipBtnRef}
                            >
                                <i className="fa-solid fa-repeat fa-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Projects() {
    const allProjects = [
        {
            title: "TikTok Ad Moderation",
            subtitle:
                "A full stack web app that optimally matches ads to moderators, enhancing efficiency with violation flagging and text categorisation.",
            img: "tiktok-icon.png",
            link: "https://devpost.com/software/igmoid-masterchefs",
            modalContent: {
                title: "TikTok Ad Moderation",
                content: (
                    <ModalContent
                        directory="tiktok-ad-moderation"
                        skills={["Flask", "React", "Python", "MaterialUI"]}
                        comments={[
                            "This project was for the TikTok Hackathon Challenge 2023 which won 1st place and I mainly worked on the full stack web app to showcase our allocation models.",
                            "This was a really interesting project to work on as it was the first ML project I worked on and it gave me some ideas for future ML projects.",
                        ]}
                        features={[
                            {
                                title: "Input form",
                                subtitle: [
                                    "Inputs to pass into the allocation models, the main input is the video file to analyse.",
                                ],
                                img: [
                                    {
                                        imagePath: "form.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Result page",
                                subtitle: [
                                    "The model analyses the video and the results are displayed on this page.",
                                ],
                                img: [
                                    {
                                        imagePath: "ad-scoring.png",
                                        width: "100%",
                                    },
                                    {
                                        imagePath: "moderator-matching.png",
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
            title: "PortFlow",
            subtitle:
                "A full stack web app to automate combining different orders to the same shipments using machine learning.",
            img: "portflow-icon.png",
            link: "https://matochichap.github.io/PSA_CodeSprint/",
            modalContent: {
                title: "PortFlow",
                content: (
                    <ModalContent
                        directory="portflow"
                        skills={["Flask", "React", "Python", "Gurobi"]}
                        comments={[
                            "This project was for the PSA Hackathon 2023 where I worked mostly on the backend to combine the different orders using our allocation model.",
                        ]}
                        features={[
                            {
                                title: "Assign orders",
                                subtitle: [
                                    "You can select the orders to combine which will update the incoming and outgoing shipments.",
                                ],
                                img: [
                                    {
                                        imagePath: "pending-orders.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Incoming and Outgoing shipments",
                                subtitle: [
                                    "Pages to show all the incoming and outgoing shipments.",
                                ],
                                img: [
                                    {
                                        imagePath: "incoming-shipments.png",
                                        width: "100%",
                                    },
                                    {
                                        imagePath: "outgoing-shipments.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "View shipment details",
                                subtitle: [
                                    "Page to show the shipment details when you click on a shipment in the incoming/outgoing shipments page.",
                                ],
                                img: [
                                    {
                                        imagePath: "shipment-details.png",
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
            title: "Party Website",
            subtitle:
                "A website built with Flask and MySQL with authentication and CRUD functionality to allow users to create and join parties.",
            img: "party-icon.png",
            link: "https://github.com/matochichap/party-website",
            modalContent: {
                title: "Party Website",
                content: (
                    <ModalContent
                        directory="party-website"
                        skills={["Flask", "SQLAlchemy", "HTML", "CSS"]}
                        comments={[
                            "This was actually an assignment for an internship application which I was able to complete within 3 days even though I was given 7 days to complete it.",
                            "I was really happy with how it turned out since I was able to implement user authentication, CRUD functionality and also make the UI look pretty good in just 3 days.",
                        ]}
                        features={[
                            {
                                title: "User authentication",
                                subtitle: [
                                    "Simple login and register page to create and manage users' profiles.",
                                ],
                                img: [
                                    {
                                        imagePath: "login.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Main page",
                                subtitle: [
                                    "Creators of parties are able to remove members from their parties and edit and delete the party.",
                                    "Users can join and leave other people's parties.",
                                ],
                                img: [
                                    {
                                        imagePath: "parties.png",
                                        width: "100%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "Create/Update party",
                                subtitle: [
                                    "Page dynamically changes depending on whether the user wants to create or edit a party.",
                                ],
                                img: [
                                    {
                                        imagePath: "create-party.png",
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
            title: "Transfer Netflix profile",
            subtitle:
                "A bot built with Selenium to helps you automate adding all your watch history into another profile.",
            img: "netflix-icon.png",
            link: "https://github.com/matochichap/transfer-netflix-profile",
            modalContent: {
                title: "Transfer Netflix profile",
                content: (
                    <ModalContent
                        directory="transfer-netflix-profile"
                        skills={["Python", "Pandas", "Selenium"]}
                        comments={[
                            "I decided to work on this project because I could not find a way to transfer all the shows I watched on Netflix to another profile.",
                            "Netflix allows you to download your watch history as a csv file so I used pandas to import and clean the data, and then used Selenium to add all the shows to the new profile.",
                            "Unfortunately, I can't use the bot right now since I cancelled my subscription so my bot didn't get very far into the page.",
                        ]}
                        features={[
                            {
                                title: "Data cleaning",
                                subtitle: [
                                    "I used Pandas to clean the data from the csv file so that there are only unique show titles that the Selenium bot could use to add the shows to the profile.",
                                ],
                                img: [],
                                video: [],
                            },
                            {
                                title: "Automatic login",
                                subtitle: [
                                    "Surprisingly, the login worked even though this code is over a year old at the time of writing this.",
                                ],
                                img: [
                                    {
                                        imagePath: "netflix-sign-in.png",
                                        width: "90%",
                                    },
                                ],
                                video: [],
                            },
                            {
                                title: "I'm broke",
                                subtitle: [
                                    "Maybe I should use a VPN and get a Thai Netflix account",
                                ],
                                img: [
                                    {
                                        imagePath: "netflix-pricing.png",
                                        width: "90%",
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
            title: "YouTube Downloader",
            subtitle:
                "A simple Python app that helps you download videos from YouTube built with Tkinter.",
            img: "youtube-icon.png",
            link: "https://github.com/matochichap/youtube-downloader",
            modalContent: {
                title: "YouTube Downloader",
                content: (
                    <ModalContent
                        directory="youtube-downloader"
                        skills={["Python", "Tkinter"]}
                        comments={[
                            "This was a really simple project that I created so that I did not have to watch ads to download YouTube videos from shady websites.",
                            "I put these types of projects in because while they were simple, they were really useful tools that I ended up using.",
                        ]}
                        features={[
                            {
                                title: "Download videos",
                                subtitle: [
                                    "I spent way too much time trying to make the UI look decent.",
                                    "You just need to put in the link and file path to search for the file to download, then choose the video resolution to download.",
                                ],
                                img: [
                                    {
                                        imagePath: "youtube-downloader.png",
                                        width: "90%",
                                    },
                                ],
                                video: [],
                            },
                        ]}
                    />
                ),
            },
        },
        // {
        //     title: "Queue App API",
        //     subtitle:
        //         "An API with user authentication built with MongoDB, Express and PassportJS for a larger project I'm working on.",
        //     img: "queue-icon.png",
        //     link: "https://github.com/matochichap/queue-app-db-api",
        //     modalContent: {
        //         title: "Queue App API",
        //         content: (
        //             <ModalContent
        //                 directory={null}
        //                 skills={["Express", "MongoDB", "PassportJS", "API"]}
        //                 comments={[
        //                     "One of the things I hate doing is queuing.",
        //                     "The idea for this project is to create an app that businesses can easily implement so that customers can spend less time queuing.",
        //                     "This is still a work in progress and was more of a way for me to learn MongoDB and get familiar with Express.",
        //                 ]}
        //                 features={[
        //                     {
        //                         title: "User authentication",
        //                         subtitle: [
        //                             "This API is meant to store customers' and businesses' data and they need to be authenticated before they can access that data.",
        //                             "Users need to be logged in before they can access the API routes which was done with PassportJS.",
        //                         ],
        //                         img: [],
        //                         video: [],
        //                     },
        //                     {
        //                         title: "Database",
        //                         subtitle: [
        //                             "I used MongoDB Atlas to store the user data on the cloud so that it would be easier to scale if the project gets bigger.",
        //                         ],
        //                         img: [],
        //                         video: [],
        //                     },
        //                 ]}
        //             />
        //         ),
        //     },
        // },
        {
            title: "Turtle Crossing",
            subtitle:
                "Crossy Road but with turtles built with Python and Turtle graphics that gets harder as you clear more levels.",
            img: "turtle-crossing-icon.png",
            link: "https://github.com/matochichap/turtle-crossing",
            modalContent: {
                title: "Turtle Crossing",
                content: (
                    <ModalContent
                        directory="turtle-crossing"
                        skills={["Python", "TurtleGraphics"]}
                        comments={[
                            "This was a project I worked on while learning Python that I really enjoyed making.",
                            "There were other simple games that I made with turtle graphics but this is my favorite one.",
                        ]}
                        features={[
                            {
                                title: "Gameplay",
                                subtitle: [
                                    "Cross the road without getting hit by the cars, the cars move faster as you clear more levels.",
                                ],
                                img: [
                                    {
                                        imagePath: "turtle-crossing.png",
                                        width: "80%",
                                    },
                                ],
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
        setModalContent(allProjects[index].modalContent)
    }
    return (
        <>
            <section className="projects">
                <div className="section-header">
                    <h1 className="section-title">Projects</h1>
                    <hr />
                </div>
                <div className="project-cards">
                    {allProjects.map((project, index) => {
                        return (
                            <ProjectCard
                                key={index}
                                project={project}
                                modalOpen={modalOpen}
                                close={close}
                                open={open}
                                index={index}
                            ></ProjectCard>
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

export default Projects
