const injectDevServer = require('@cypress/react/plugins/react-scripts');

/// <reference types="cypress" />
// https://on.cypress.io/plugins-guide

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    if (config.testingType === 'component') {
        injectDevServer(on, config);
    }

    return config; // IMPORTANT to return a config
};
