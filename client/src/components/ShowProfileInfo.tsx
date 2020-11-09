import React, { useState } from 'react';
import Modal from 'react-modal';

import { Link } from 'react-router-dom';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');


type ShowProfileInfoProps = {
    events: {},
}

const ShowProfileInfo: React.FC<ShowProfileInfoProps> = ({events}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    let subtitle;

    if (!events) { return <></> }

    const eventList = (events) => {
        console.log(events);
        let list;
        if (events.length) {
            list = events.map((squad) => {
                console.log(squad);
                return <Link to={`/squad/${squad._id}`} key={squad._id}><li>{squad.title}</li></Link> 
            });
        } else {
            list = <div>Create an Event!</div>
        }
        return list;
    }

    

    
    const openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const renderList = eventList(events);

    return(
        <div className="main-container">
                <div className="squad-container item">
                    <h3 className="ui header" style={{ color: 'white' }}>Your Squads</h3>
                    <ul style={{ textAlign: 'left' }}>
                        {renderList}
                    </ul>
                </div>
                <div className="info-container item">
                    <h3 className="ui header" style={{ color: 'white' }}>Personal Info</h3>
                    <p>Hometown:</p>
                    <p>Hobbies:</p>
                    <p>Favourite Sports:</p>
                    <button className="ui button white" onClick={openModal}>Edit Profile Info</button>
                </div>
                
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
            </div>
    );

} 

export default ShowProfileInfo;