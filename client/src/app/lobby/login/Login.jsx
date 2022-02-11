import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import * as AppPropTypes from '../../../lib/PropTypes';

import CharacterCreation from '../../sharedComponents/characterCreation/CharacterCreation';

const propTypes = {
    socket: PropTypes.string,
    inGame: PropTypes.bool.isRequired,
    setSocket: PropTypes.func,
};

const defaultProps = {
    socket: null,
    setSocket: () => {},
};

const Login = ({ socket, inGame, setSocket }) => {
    useEffect(() => {});

    return (
        <div>
            THI SIS THE LOGIN
            <CharacterCreation />
        </div>
    );
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site, lobby }) => ({
        socket: site.socket,
        inGame: lobby.inGame,
    }),
    (dispatch) => ({}),
)(Login);

export default WithReduxContainer;
