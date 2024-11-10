import { useEffect, useRef, useState } from "react"

function ModalSkills({ skills }) {
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
        if (mouseX < left + width * 0.5) {
            setScrollDirection("left")
        } else if (mouseX > right - width * 0.5) {
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
            <h3 className="modal-heading">Skills</h3>
            <div
                className="modal-project-skill-tags"
                ref={skillTagsRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {skills.map((skill, index) => {
                    return (
                        <div key={index} className="modal-project-skill-tag">
                            <p className="modal-project-skill modal-subheading">
                                {skill}
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

function ModalComments({ comments }) {
    return (
        <>
            <h3 className="modal-heading">Comments</h3>
            <div className="modal-comments-card">
                {comments.map((comment, index) => {
                    return (
                        <p key={index} className="modal-subheading">
                            {comment}
                        </p>
                    )
                })}
            </div>
        </>
    )
}

function ModalFeatures({ features, imgDirectory }) {
    return (
        <>
            <h3 className="modal-heading">Features</h3>
            {features.map((feature, index) => {
                return (
                    <div key={index} className="modal-features-card">
                        <h4 className="modal-heading">{feature.title}</h4>
                        {feature.subtitle.map((text, index) => {
                            return (
                                <p key={index} className="modal-subheading">
                                    {text}
                                </p>
                            )
                        })}
                        <div className="modal-features-images">
                            {feature.img.map((image, index) => {
                                const [imagePath, width] = image
                                return (
                                    <img
                                        key={index}
                                        className="modal-features-image"
                                        style={{ width: width }}
                                        src={`./resources/images/modal-images/${imgDirectory}/${imagePath}`}
                                        alt="feature"
                                    />
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

function ModalContent({ skills, comments, features, imgDirectory }) {
    return (
        <>
            {skills.length > 0 ? <ModalSkills skills={skills} /> : null}
            {comments.length > 0 ? <ModalComments comments={comments} /> : null}
            {features.length > 0 ? (
                <ModalFeatures
                    features={features}
                    imgDirectory={imgDirectory}
                />
            ) : null}
        </>
    )
}

export default ModalContent
