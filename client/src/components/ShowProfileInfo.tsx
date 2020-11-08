import React, { useState } from 'react';
import Modal from 'react-modal';


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

    const eventList = (events) => {
        let list;
        if (events) {
            list = events.map((squad) => {
                return <li>{squad.title}</li>
            });
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