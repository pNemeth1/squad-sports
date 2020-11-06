import React from 'react';
import { Link, useParams } from 'react-router-dom';

import './Search.scss';

import useOptions from '../hooks/useOptions';
import useForm from '../hooks/useForm';

import ShowSearchResults from './ShowSearchResults';



interface city {
    id: string;
    city: string;
}


const renderCities = (cities) => {
    let cityList;
    if (cities && cities.data) {
        cityList = cities.map((city: city) => {
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

type SearchProps = {
    activeItem: number,
    setActiveItem: Function,
    squadsProps: {
        data: [];
    }
    setSquadsProps: Function,
    cityTerm: string,
    setCityTerm: Function
}


const Overview: React.FC<SearchProps> = ({ setActiveItem, setSquadsProps, squadsProps}) => {

    const { cities, sports } = useOptions();
    const { state, onHandleSubmit, onHandleChange, showError } = useForm();
    const params = useParams()


    if (!cities) { return <></> };




    const cityList: object = renderCities(cities);
    const sportsList: object = renderSports(sports);

    const handleSubmit = (e) => {
        e.preventDefault();
        onHandleSubmit(state, 1, setSquadsProps);
    }

    const handleClick = () => {
        setActiveItem(2);
    }



    return (
        <div>
            <div className="item-container">
                <h2 className="ui header" style={{ color: 'white' }}>Looking to Join a Squad today?</h2>
                <form className="ui form"
                    onSubmit={(e) => handleSubmit(e) as unknown as (event: React.ChangeEvent<HTMLFormElement>) => void}
                >
                    <div className={showError ? 'error' : 'error u-hide'}>
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
                            {sportsList}
                        </select>
                    </div>
                    <button className="ui button white">Go!</button>
                </form>
                <button onClick={handleClick} className="ui button black create-button">Or Create Your Own!</button>


            </div>

            <ShowSearchResults squads={squadsProps} />
        </div>
    );
}

export default Overview;