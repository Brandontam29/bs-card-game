import { PropTypes } from 'prop-types';
import XIcon from '../icons/X';

const propTypes = {
    onClick: PropTypes.func,
};

const defaultProps = {
    onClick: () => {},
};

const CloseButton = ({ onClick }) => {
    return (
        <button type="button" onClick={onClick} className="w-5 h-auto">
            <XIcon />
        </button>
    );
};

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
