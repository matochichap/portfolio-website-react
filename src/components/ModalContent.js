import { ExperienceSkills } from "./Experiences"

function ModalSkills({ skills }) {
    return (
        <>
            <h3 className="modal-heading">Skills</h3>
            <ExperienceSkills skills={skills}></ExperienceSkills>
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

function ModalFeatures({ features, directory, showHeader }) {
    return (
        <>
            {showHeader ? <h3 className="modal-heading">Features</h3> : null}
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
                        <div className="modal-features-medias">
                            {feature.img.map((image, index) => {
                                const { imagePath, width } = image
                                return (
                                    <img
                                        key={index}
                                        className="modal-features-media"
                                        style={{ width: width }}
                                        src={`./resources/images/modal-images/${directory}/${imagePath}`}
                                        alt="feature"
                                    />
                                )
                            })}
                        </div>
                        <div className="modal-features-medias">
                            {/* NOTE: use google drive to store videos */}
                            {feature.video.map((video, index) => {
                                const { videoId, width, aspectRatio } = video
                                return (
                                    <iframe
                                        title="video"
                                        key={index}
                                        className="modal-features-media"
                                        style={{
                                            border: "none",
                                            width: width,
                                            aspectRatio: aspectRatio,
                                        }}
                                        src={`https://drive.google.com/file/d/${videoId}/preview`}
                                        allow="autoplay"
                                        allowFullScreen
                                    ></iframe>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

function ModalContent({ skills, comments, features, directory }) {
    return (
        <>
            {skills.length > 0 ? <ModalSkills skills={skills} /> : null}
            {comments.length > 0 ? <ModalComments comments={comments} /> : null}
            {features.length > 0 ? (
                <ModalFeatures
                    features={features}
                    directory={directory}
                    showHeader={skills.length > 0 || comments.length > 0}
                />
            ) : null}
        </>
    )
}

export default ModalContent
