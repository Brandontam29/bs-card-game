import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'boring-avatars';

import * as AppPropTypes from '../../../lib/PropTypes';

// import { setAvatar as setAvatarAction } from '../../../redux/actions/playerActions';

import Chevron from '../icons/Chevron';
import Dice from '../icons/Dice';

const propTypes = {
    avatar: PropTypes.string.isRequired,
    setAvatar: PropTypes.func.isRequired,
};

const defaultProps = {};

const CreateAvatar = ({ avatar, setAvatar }) => {
    // const [avatar, setAvatar] = useState('000000');

    const randomize = () => {};
    const increment = (n) => {
        const str = avatar.slice();
        const arr = [str.substring(0, 2), str.substring(2, 4), str.substring(4, 6)];

        const code = 1 + parseInt(arr[n], 10) > 99 ? 0 : 1 + parseInt(arr[n], 10);
        arr[n] = Math.floor(code / 10) ? `${code}` : `0${code}`;
        const newCode = arr[0] + arr[1] + arr[2];

        setAvatar(newCode);
    };

    const decrement = (n) => {
        const str = avatar.slice();
        const arr = [str.substring(0, 2), str.substring(2, 4), str.substring(4, 6)];

        const code = parseInt(arr[n], 10) - 1 < 0 ? 99 : parseInt(arr[n], 10) - 1;
        arr[n] = Math.floor(code / 10) ? `${code}` : `0${code}`;
        const newCode = arr[0] + arr[1] + arr[2];

        setAvatar(newCode);
    };

    return (
        <div className="relative flex flex-row py-3">
            {/* Left Buttons */}
            <div className="flex flex-col flex-grow flex-shrink justify-end">
                <button className="h-5" type="button" onClick={() => increment(2)}>
                    <Chevron />
                </button>
                <button className="h-5" type="button" onClick={() => increment(1)}>
                    <Chevron />
                </button>
                <button className="h-5" type="button" onClick={() => increment(0)}>
                    <Chevron />
                </button>
            </div>
            {/* Avatar */}
            <div className=" ">
                <div />
                <div className="">
                    <Avatar name={avatar} square="true" variant="beam" size={60} />
                </div>
                <div />
            </div>
            {/* Right Buttons */}
            <div className="flex flex-col flex-grow justify-start">
                <button className="h-5" type="button" onClick={() => decrement(2)}>
                    <Chevron right />
                </button>
                <button className="h-5" type="button" onClick={() => decrement(1)}>
                    <Chevron right />
                </button>
                <button className="h-5" type="button" onClick={() => decrement(0)}>
                    <Chevron right />
                </button>
            </div>
            <button
                type="button"
                className="absolute top-0 right-0 -translate-x-1/2"
                onClick={randomize}
            >
                <Dice className="h-[15px] w-[15px]" />
            </button>
        </div>
    );
};

CreateAvatar.propTypes = propTypes;
CreateAvatar.defaultProps = defaultProps;

const WithReduxContainer = connect(
    () => ({}),
    (dispatch) => ({
        // setAvatarAction: (value) => dispatch(setAvatarAction(value)),
    }),
)(CreateAvatar);

export default WithReduxContainer;
