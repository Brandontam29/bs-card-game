import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import * as AppPropTypes from '../../../lib/PropTypes';
import NavBar from './NavBar';

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

const Layout = ({ children }) => {
    return (
        <>
            <div className="w-0 h-0 absolute top-0 left-0 hidden" />
            <NavBar />
            {children}
        </>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
