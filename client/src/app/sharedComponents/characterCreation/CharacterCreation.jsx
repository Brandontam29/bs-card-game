import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
// import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

import * as AppPropTypes from '../../../lib/PropTypes';

import CreateAvatar from './CreateAvatar';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const CharacterCreation = ({ socket, className }) => {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('010101');
    const { lid } = useParams();

    const onFormSubmit = (e) => {
        console.log('submit');
        e.preventDefault();
        if (lid) {
            socket.emit('lobby:join', name, avatar, lid);

            return;
        }

        socket.emit('lobby:create', name, avatar);
    };

    return (
        <div
            // className={classNames('', {
            //     className: !className,
            // })}

            className={`max-w-[800px] mx-auto ${className || ''}`}
        >
            <form onSubmit={onFormSubmit}>
                <input
                    type="text"
                    placeholder="Name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <CreateAvatar />
                <button type="submit" onClick={onFormSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

CharacterCreation.propTypes = propTypes;
CharacterCreation.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({
        socket: site.socket,
    }),
    () => ({}),
)(CharacterCreation);

export default WithReduxContainer;
