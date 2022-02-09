import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import * as AppPropTypes from '../../lib/PropTypes';

import { setPannelOpen as setPannelOpenAction } from '../../../redux/actions/siteActions';

const propTypes = {
    setPannelOpen: PropTypes.func.isRequired,
};

const defaultProps = {
    // setPannelOpen: () => {},
};

const Feedback = ({ setPannelOpen }) => {
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const onFormSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log(email, body);
        // const id = setTimeout(() => setSubmitted(false), 3);
        // setPannelOpen(false);
        // return clearTimeout(id);
    };

    return (
        <div className="bg-slate-100">
            {submitted ? (
                <>
                    <h3>Thank you for your feedback</h3>
                    <p>
                        We read every thing you send us, but it may take some
                        time to change things, so thank you for your patience
                    </p>
                </>
            ) : (
                <>
                    <h3>Give some Feeback</h3>
                    <div>
                        Your feedback is valuable in helping the development of
                        this website.
                    </div>
                    <form onSubmit={onFormSubmit}>
                        <div>
                            <label htmlFor="email">
                                Email
                                <input
                                    type="text"
                                    aria-label="Email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="feedback">
                                Feedback
                                <textarea
                                    id="feedback"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                />
                            </label>
                        </div>

                        <input type="submit" value="Submit" />
                    </form>
                </>
            )}
        </div>
    );
};

Feedback.propTypes = propTypes;
Feedback.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({}),
    (dispatch) => ({
        setPannelOpen: (value) => dispatch(setPannelOpenAction(value)),
    }),
)(Feedback);

export default WithReduxContainer;
