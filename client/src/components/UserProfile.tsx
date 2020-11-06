import React from 'react';
import { useContext } from 'react';

import authContext from '../contexts/authContext';
import useAuth from '../hooks/useAuth';
import useProfile from '../hooks/useProfile';

import Background from './images/bg1.jpg';

import './UserProfile.scss'

type profile = {
    _id: string,
    googleId: string;
    firstName: string;
    LastName: string;
    image: string;
    squadId: string
}





const UserProfile: React.FC = () => {
    const profile: profile = useAuth();
    const {events} = useProfile();

    if (!profile){return<></>}

    console.log(profile);
    console.log(events);

    const imageUrl: string = profile.image ? profile.image : 'https://via.placeholder.com/200';

    const eventList = (events) => {
        let list;
        if (events) {
            list = events.map((squad) => {
                return <li>{squad.title}</li>
            });
        }
        return list;
    }

    const renderList = eventList(events);


    return (
        <div className="user-profile-container background-container" style={{backgroundImage:`url(${Background})` }}>
            <div className="item" style={{display: 'flex'}}>
                <div className="image">
                    <img className="ui image fluid" alt="profile-pic" src={imageUrl} />
                </div>
                <div className="info">
                    <h1 className="ui header">Welcome to your Profile {profile.firstName}!</h1>
                    <h3 className="ui header">Your Squads</h3>
                    <ul style={{textAlign: 'left'}}>
                        {renderList}
                    </ul>
                </div>
            </div>
            
        </div>
    );
}

export default UserProfile;