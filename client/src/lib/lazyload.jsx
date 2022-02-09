/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';

const propTypes = {
    importFunc: PropTypes.func.isRequired,
    fallback: PropTypes.node,
};

const defaultProps = {};

const lazyLoad = (importFunc, fallback) => {
    const LazyComponent = lazy(importFunc);

    return (props) => (
        <Suspense fallback={fallback}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

lazyLoad.propTypes = propTypes;
lazyLoad.defaultProps = defaultProps;

export default lazyLoad;

/**
 * use case
 */

// import { lazyLoad } from 'utils/loadable';

// export const NotFoundPage = lazyLoad(
//   () => import('./index'),
//   Fallback,
// );
