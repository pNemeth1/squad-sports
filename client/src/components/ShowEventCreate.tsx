import React from 'react';
import { Link } from 'react-router-dom';


import Background from './images/bg2.jpg';
import useOptions from '../hooks/useOptions';
import useForm from '../hooks/useForm';

import './EventCreate.scss';


interface city {
    id: string;
    city: string;
}


const renderCities = (cities) => {
    let cityList;
    if (cities && cities.data) {
        cityList = cities.data.data.map((city: city) => {
            return <option key={city.id} value={city.id}>{city.city}</option>
        });
    }
    return cityList;
}

const renderSports = (sports: string[]): object => {
    let sportList = sports.map((sport) => {
        return <option key={sport} value={sport}>{sport}</option>
    });

    return sportList;
}

type CreateProps = {
    activeItem: number,
    setActiveItem: Function,
    setSquadsProps: Function,
    squadsProps: object
    setCityTerm: Function,
}

const ShowEventCreate: React.FC<CreateProps> = ({setActiveItem, setSquadsProps}) => {
    const { cities, sports } = useOptions();
    const { state, onHandleSubmit, onHandleChange, showError } = useForm();


    
    const handleSubmit = (e) => {
        e.preventDefault();
        onHandleSubmit(state, 2, setSquadsProps);
        setActiveItem(1);
    }

    const handleBack = () => {
        setActiveItem(1);
        
    }


    return (
        
            <div className="item-container">
                <h2 className="ui header" style={{ color: 'white' }}>Form your own Squad!</h2>
                <form className="ui form"
                    onSubmit={handleSubmit}
                >
                    <div className={showError ? 'error' : 'u-hide'}>
                        <i className="exclamation icon"></i>
                        Please select a city and sport :)
                    </div>
                    <div className="field">
                        <label htmlFor="">What City are you in?</label>
                        <select name="city"
                        value={state.city}
                        onChange={onHandleChange as unknown as (event: React.ChangeEvent<HTMLSelectElement>) => void}>
                            <option key="default-city" value="default1">Please Choose City</option>
                            {renderSports(cities)}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="">What kind of Sports do you feel like today?</label>
                        <select name="sports"
                            value={state.sports}
                            onChange={onHandleChange as unknown as (event: React.ChangeEvent<HTMLSelectElement>) => void}>
                            <option key="default-sports" value="default1">Today's Sports</option>
                            {renderSports(sports)}
                        </select>
                    </div>
                    <div className="field">
                        <label >What's the exact location?</label>
                        <input name="street" type="text"
                            value={state.street}
                            onChange={onHandleChange as unknown as (event: React.ChangeEvent<HTMLInputElement>) => void} />
                    </div>
                    <div className="field">
                        <label>Add a title!</label>
                        <input name="title" type="text"
                        value={state.title}
                        onChange={onHandleChange as unknown as (event: React.ChangeEvent<HTMLInputElement>) => void} />
                    </div>
                    <div className="field">
                        <label htmlFor="">Add a little description</label>
                        <textarea name="desc"
                            value={state.desc}
                            onChange={onHandleChange as unknown as (event: React.ChangeEvent<HTMLTextAreaElement>) => void}
                        ></textarea>
                    </div>
                </form>
                <div className="button-container" style={{display: 'flex'}}>
                    <button onClick={handleSubmit} className="ui button white">Go!</button>
                    <button onClick={handleBack} className="ui button small">Back to Search</button>
                </div>
            </div>
    );
}

export default ShowEventCreate;