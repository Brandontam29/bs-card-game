/* eslint-disable jsx-a11y/no-redundant-roles */
// import * as AppPropTypes from '../../../lib/PropTypes';

const propTypes = {};

const defaultProps = {};
const News = () => {
    return (
        <div className="max-w-2xl mx-auto py-4 px-6 m-8 bg-white">
            <h2>News</h2>
            <p>Here are the new updates!</p>
            {/* tailwindcss preflight removes implicit roll */}
            <ul role="list">
                <li>Added avatar creation</li>
                <li>Added multiplayer mode</li>
                <li>Added rules and feedback tab</li>
            </ul>
        </div>
    );
};

News.propTypes = propTypes;
News.defaultProps = defaultProps;

export default News;
