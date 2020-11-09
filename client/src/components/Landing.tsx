import React from 'react';

import { Link } from 'react-router-dom';

import './Landing.scss';

import Background from './images/bg1.jpg';

type LandingProps = {
    auth: boolean
};



const Landing: React.FC<LandingProps> = ({ auth }) => {


    // if (auth) {
    //     console.log('not authenticated!') 
    //     return<></> ;
    // }
    return (
    <div className="landing-container" style={{ backgroundImage:`url(${Background})` }}>
        <div className="landing item">
            <h1 className="ui header">Welcome to SquadSports!</h1>
                <h3 className="ui header">This App will help you to find likeminded Sport Maniacs who are searching for a Group or a Partner to Sport away! </h3>
        </div>
        <div className="landing item header">
            <Link to="/squads">
            <button className="ui button white">Get Started!</button>
            </Link>
           
        </div>
        
    </div>
    );
}

export default Landing;