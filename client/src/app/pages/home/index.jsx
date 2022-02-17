import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../lib/PropTypes';

import CharacterCreation from '../../sharedComponents/characterCreation/CharacterCreation';

const propTypes = {};

const defaultProps = {};
const Home = () => {
    return (
        <>
            <Helmet>
                <title>Cheat Card Game - Free Online Multiplayer Card Game</title>
                <meta
                    name="description"
                    content="Also known as Bullshit, Cheat is a card game where players lie about playing the right 
                    cards. Figure out who is cheating and don't get caught yourself!"
                />
            </Helmet>
            <div className="flex flex-auto flex-col">
                <h1 className="font-header text-center py-5">Welcome to Cheat Card Game</h1>

                <CharacterCreation className="flex-auto" />
                <div className="">
                    News
                    <p>Here are the new updates!</p>
                </div>
            </div>
        </>
    );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({}) => ({}),
    () => ({}),
)(Home);

export default WithReduxContainer;
