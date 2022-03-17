import { Link } from 'react-router-dom';

const propTypes = {};

const defaultProps = {};

const NotConnected = () => {
    return (
        <div className="max-w-[700px] mx-auto text-center">
            <h1 className="my-6">You are not connected for some reason</h1>
            <div>return to home maybe? :(</div>
            <div className="border border-black border-solid max-w-[50%] mx-auto my-4">
                <Link to="/">Fly me to the moon</Link>
            </div>
        </div>
    );
};

NotConnected.propTypes = propTypes;
NotConnected.defaultProps = defaultProps;

export default NotConnected;
