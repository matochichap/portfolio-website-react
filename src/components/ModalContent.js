function ModalSkills({ skills }) {
    return (
        <>
            <h3 className="modal-heading">Skills</h3>
            <div className="modal-project-skill-tags">
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
                                        src={`./resources/images/project-modal-images/${imgDirectory}/${imagePath}`}
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
            <ModalSkills skills={skills} />
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
