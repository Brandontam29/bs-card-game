import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import * as AppPropTypes from '../../lib/PropTypes';

import { setPannelOpen as setPannelOpenAction } from '../../../redux/actions/siteActions';
import CloseButton from './CloseButton';
import Ratings from './Ratings';

const propTypes = {
    closePannel: PropTypes.func.isRequired,
};

const defaultProps = {};

const Feedback = ({ closePannel }) => {
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
        // const id = setTimeout(() => setSubmitted(false), 3);
        // setPannelOpen(false);
        // return clearTimeout(id);
    };

    const handleCancel = () => {
        setEmail('');
        setComment('');
        setRating(0);
        closePannel();
    };

    return (
        <div className="">
            {submitted ? (
                <>
                    <div className="flex flex-row justify-between flex-grow m-2">
                        <h2>Feedback</h2>
                        <CloseButton onClick={closePannel} />
                    </div>
                    <div className=" flex flex-col gap-2 m-2">
                        <p>
                            We read every thing you send us, but it may take some time to change
                            things.
                        </p>
                        <p>Thank you for your patience.</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-row justify-between flex-grow m-2">
                        <h2>Feedback</h2>
                        <CloseButton onClick={closePannel} />
                    </div>

                    <div className="m-2">
                        Your feedback is valuable in helping the development of this website.
                    </div>

                    <form className="flex flex-col gap-2 m-2">
                        <label htmlFor="email">
                            <div>Email</div>
                            <input
                                type="text"
                                aria-label="Email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border rounded w-4/5 p-1"
                            />
                        </label>
                        <Ratings rating={rating} onChange={setRating} />
                        <label htmlFor="comments">
                            <div>Comments</div>
                            <textarea
                                id="comments"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="border rounded w-full min-h-[100px] p-1"
                            />
                        </label>
                        <div className="flex flex-row justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="border border-solid border-gray-400 text-gray-500 rounded py-1 px-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-blue-500 rounded py-1 px-2 text-white"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

Feedback.propTypes = propTypes;
Feedback.defaultProps = defaultProps;

const WithReduxContainer = connect(
    () => ({}),
    (dispatch) => ({
        setPannelOpen: (value) => dispatch(setPannelOpenAction(value)),
    }),
)(Feedback);

export default WithReduxContainer;
