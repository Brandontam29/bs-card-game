import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import * as AppPropTypes from '../../../lib/PropTypes';
import NavBar from './NavBar';
import SidePannel from '../sidePannel/SidePannel';
import Backdrop from '../backdrop/Backdrop';

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
            <Backdrop />
            <SidePannel />
        </>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
