// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import * as AppPropTypes from '../../../../lib/PropTypes';

import CharacterCreation from '../../../sharedComponents/characterCreation/CharacterCreation';

const propTypes = {};

const defaultProps = {};

const Login = () => {
    return (
        <div className="flex flex-auto flex-col">
            <h1 className="font-header text-center py-5">THIS IS THE LOGIN</h1>

            <CharacterCreation className="flex-auto" />
            <div className="">
                News
                <p>Here are the new updates!</p>
            </div>
        </div>
    );
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
