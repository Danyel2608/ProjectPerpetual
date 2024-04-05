import classes from './ModalAdmin.module.css';

function ModalAdmin(props) {
    const handleCloseModal = () => {
        props.onClose();
    };
    return (
        <>
            <div
                className={`${classes["md-modal"]} ${classes["modal-effect"]}} ${props.visible && classes["md-show"]
                    }`}
            >
                <div
                    className={`${classes["md-content"]} ${props.data.itsOk ? classes.success : classes.danger
                        }`}
                >
                    <h3>{props.data.title}</h3>
                    <div>
                        <p>{props.data.message}</p>
                        <button onClick={handleCloseModal} className={classes["md-close"]}>
                            Close me!
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes["md-overlay"]} />
        </>
    );
}

export default ModalAdmin;
