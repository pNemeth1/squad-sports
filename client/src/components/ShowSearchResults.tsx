import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import './SearchResults.scss';
import Background from './images/soccer-card.jpg';

type LandingProps = {
    squads: {
        data: [];
    };
};


interface squad {
    city: string,
    sports: string,
    street: string,
    title: string,
    desc: string,
    user: string,
    _id: string
    image: string,
}



const renderSquadList = (squads) => {
    let list;
    let imagePath: string = '';
    if (squads && squads.data) {
        list = squads.data.map((squad: squad) => {
            imagePath = squad.image ? squad.image : 'https://via.placeholder.com/50'
            return (
                <div key={squad._id} className="event-card" style={{ backgroundImage: `url(${Background})` }}>
                    <div className="placehold"><h3 className="ui header" style={{color: 'white'}}>{squad.title}</h3></div>
                    <div className="card-header">
                        <Link to={`/profile/${squad.user}`}>
                        <img className="ui image fluid" src={imagePath} alt="user-profile-pic"/>
                        </Link>
                        
                        <div className="header-container">
                            <p className="date-street">Where: {squad.street}</p>
                            <p className="date-street">When: {squad.street}</p>
                        </div>
                        
                    </div>
                    <div className="card-body">
                        {squad.desc}
                    </div>
                    <div className="card-comment-section">
                        <button className="ui button white">Comment!</button>
                    </div>

                </div>
            )
        });
    }

    return list;
}


const ShowSearchResults: React.FC<LandingProps> = ({squads}) => {
    console.log(squads)

    if (!squads.data){return<></>}

    const squadList = renderSquadList(squads)
    return (
        <div className={squads.data.length ? 'searchresult-container' : 'u-hide'}>
            {squadList}
        </div>
    )
}

export default ShowSearchResults;