import React from 'react';

import './ShowLogin.scss';
import Background from './images/bg1.jpg';

const ShowLogin: React.FC = () => {

    return (
        <div className="login-container background-container" style={{ backgroundImage: `url(${Background})` }}>
            <div className="item">
                <a className="ui button red" href="/auth/google"><i className="google icon"></i> Login With Google</a>
            </div>
            <div className="item">
                <button className="ui button blue"><i className="facebook square icon"></i> Login With Facebook</button>
            </div>
            <div className="item">
                <button className="ui button pink"><i className="instagram icon"></i> Login With Instagram</button>
            </div>
            
        </div>
    )

}

export default ShowLogin;