import { motion } from "framer-motion"

function Backdrop({ children, onClick }) {
    return (
        <motion.div
            className="backdrop"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}

function Modal({ handleClose, modalContent }) {
    const { title, link, content } = modalContent
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            },
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    }
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="modal-nav">
                    <h2 className="modal-title">{title}</h2>
                    <div className="modal-buttons">
                        <a href={link} className="modal-button">
                            <i
                                className="fa-solid fa-link fa-icon"
                                onClick={handleClose}
                            ></i>
                        </a>
                        <div className="modal-button" onClick={handleClose}>
                            <i className="fa-solid fa-xmark fa-icon"></i>
                        </div>
                    </div>
                </div>
                <div className="modal-content">{content}</div>
            </motion.div>
        </Backdrop>
    )
}

export default Modal
