import React from 'react';
import { useContext, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import authContext from '../contexts/authContext';
import useAuth from '../hooks/useAuth';
import useProfile from '../hooks/useProfile';

import ShowProfileInfo from './ShowProfileInfo';

import Background from './images/bg1.jpg';


import './UserProfile.scss'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40rem',
        height: '35rem'
    },
};

Modal.setAppElement('#root');

type profile = {
    _id: string,
    googleId: string;
    firstName: string;
    lastName: string;
    image: {
        meta_data: {
            path: string;
        }
    };
    squadId: string
}



const UserProfile: React.FC = () => {
    const {profile, setAuth} = useAuth();
    const { events } = useProfile();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<any>();
    const [preview, setPreview] = useState<any>();
    // let subtitle;

    if (!profile) { return <></> }

    console.log(profile);
    console.log(typeof events);

    // const imageUrl: string = profile.image ? profile.image : 'https://via.placeholder.com/200';

    const openModal = () => {
        setIsOpen(true);
    }

    // const afterOpenModal = () => {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }

    const closeModal = () => {
        setPreview('');
        setIsOpen(false);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
  
        axios.post('/api/image_upload', formData , config)
            .then((response) => {
                setAuth(response);
            }).catch((error) => {
                console.log(error);
        });
    }
  
    const onChange = (e) => {
        const fileURL = URL.createObjectURL(e.target.files[0]);
        setPreview(fileURL);
        setFile(e.target.files[0]);
    }


    return (
        <div className="user-profile-container background-container" style={{ backgroundImage: `url(${Background})` }}>
            <Modal
                isOpen={modalIsOpen}
                
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                onChange={onChange}
                onFormSubmit={onFormSubmit}
                image={preview}
                >
                <div className="header" style={{display: 'flex', justifyContent: 'space-around'}}>
                    <h3>Upload your Image!</h3>
                    <i className="window close outline icon" onClick={closeModal} style={{fontSize: '1.5rem'}}></i>
                    
                </div>
                <div className="preview-container" style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
                    <img className="ui medium rounded image" src={preview ? preview : 'https://via.placeholder.com/200'} style={{maxHeight: '20rem', width: 'auto', borderRadius: '5%'}}></img>
                </div>
                
                
                
                
                <div>
                <form onSubmit={onFormSubmit} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <input type="file" className="" name="myImage" onChange={onChange} />
                    {console.log(file)}
                <button className="upload-button ui button white" type="submit">Go!</button>
                </form>
                </div>
            </Modal>
            <div className="header-container">
                <div className="item">
                    
                    <h1 className="ui header" style={{ color: 'white' }}>{profile.firstName} {profile.lastName}</h1>
                    <img className="ui image fluid" alt="profile-pic" src={profile.image ? profile.image.meta_data.path : ''} />
                    <button className="ui button white" onClick={openModal}>Edit Profile Pic</button>
                </div>
            </div>

            <ShowProfileInfo events={events} />

        </div>
    );
}

export default UserProfile;