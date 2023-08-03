import { motion } from "framer-motion";

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

function Modal({handleClose, modalContent}) {
    const {title, content} = modalContent
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
                <div className="modal-nav">
                    <h2 className='modal-title'>{title}</h2>
                    <i className='fa-solid fa-xmark fa-icon modal-close-btn' onClick={handleClose}></i>
                </div>
                <div className="modal-content">
                    {content}
                </div>
            </motion.div>
        </Backdrop>
    )
}

export default Modal