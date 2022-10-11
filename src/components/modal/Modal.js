import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Backdrop, Content} from './Modal.styled'

function Modal ({onClose, children}) {
    useEffect(() => {
        const handleKeydown = (e) => {
            if (e.code === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        }
    });

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
    }
}
    return (
        <Backdrop onClick={handleBackdrop}>
            <Content>
                { children }
            </Content>
        </Backdrop>
    );
}

Modal.propTypes = {
    handleKeydown: PropTypes.func,
    handleBackdrop: PropTypes.func,
    onClose: PropTypes.func,
}

export default Modal;