import React from 'react';

import { Link } from 'react-router-dom';

import { useContext } from 'react';
import AuthContext from '../contexts/authContext';



const Header: React.FC = () => {
    const contextType = AuthContext;
    const auth = useContext(contextType);


    const renderAuth = (auth) => {
        console.log(auth)
        if (auth === null) {
            return;
        } else if (auth && auth.profile) {
            return (
                <p className="ui item">
                    <a href="/api/logout">Logout</a>
                </p>
            );
        } else  {
            return (
                <Link to="/login">
                    <p className="ui item">
                        Login
                    </p>
                </Link>
                // <a className="ui item" href="/auth/google">Login</a>
            );
        }
    }

    // const profileUrl = (auth) => {
    //     return `/profile/${auth.data._id}`
    // }

    return (
        <div>
            <div className="ui secondary pointing menu">
                <Link to="/">
                    <p className="item">
                        Home
                </p>
                </Link>

                <Link to="/squads">
                    <p className="item">
                        Find Your Squad!
                </p>
                </Link>
                <Link to='/user_profile'>
                    <p className="item">
                        Profile
                </p>
                </Link>
                <div className="right menu">

                    {renderAuth(auth)}

                </div>
            </div>

        </div>
    )
}

export default Header;