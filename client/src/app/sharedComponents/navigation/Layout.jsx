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
            <NavBar />
            {children}
        </>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
