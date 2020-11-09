import React from 'react';
import {Link, useParams} from 'react-router-dom'

import useSquad from '../hooks/useSquad';

import ShowCommentForm from './ShowCommentForm';
import Background from './images/bg1.jpg';
import './ShowSquad.scss';


const ShowSquad: React.FC = () => {

    const {squad, addComment, comments} = useSquad();
    console.log(squad)

    if (!squad){return <></>}

    let date = new Date(squad.date);
    let newDate =  date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    return (
        <div className="landing-container" style={{ backgroundImage:`url(${Background})`, display: 'flex' }}>

            <div className="item">
                <h1>{squad.title} in {squad.city}</h1>
                <div className="info" style={{display: 'flex'}}>
                    <img src={squad.image.meta_data ? squad.image.meta_data.path : ''} alt=""/>  
                    <ul style={{listStyle: 'none', textAlign: 'left'}}>
                    
                    <li>Where: {squad.street}</li>
                    <li>When: {newDate} at Time toDo!</li>
                    <li>Details: {squad.desc}</li>
                    <li><Link to={`/profile/${squad.user}`}>Creator: UserName of User toDo</Link></li>

                </ul>
                </div>
               
            </div>
            <div className="item">
                <h2>Comments:</h2>
                <ShowCommentForm comments={comments} addComment={addComment} squadId={squad._id} />
            </div>
            </div>
    )
}

export default ShowSquad;