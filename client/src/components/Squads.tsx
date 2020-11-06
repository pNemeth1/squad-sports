import React from 'react';
import {useState} from 'react';

import Search from './Search';
import ShowEventCreate from './ShowEventCreate';

import Background from './images/bg2.jpg';

type squads = {
    data: []
}

const Squads: React.FC = () => {
    const [squadsProps, setSquadsProps] = useState<squads>({data:[]});
    const [activeItem, setActiveItem] = useState(1);
    const [cityTerm, setCityTerm] = useState('')
    const [sportsTerm, setsportsTerm] = useState('')

    console.log(squadsProps)
    return (
        <div className="overview-container background-container" style={{ backgroundImage:`url(${Background})`}}>
            <div className={activeItem === 1 ? '' : 'u-hide'} style={{width: '60%'}}>
                <Search activeItem={activeItem} setActiveItem={setActiveItem} setSquadsProps={setSquadsProps} squadsProps={squadsProps} cityTerm={cityTerm} setCityTerm={setCityTerm} />
            </div>
            <div className={activeItem === 2 ? '' : 'u-hide'} style={{width: '60%'}}>
                <ShowEventCreate setActiveItem={setActiveItem} activeItem={activeItem} setSquadsProps={setSquadsProps} squadsProps={squadsProps} setCityTerm={setCityTerm} />
            </div>
                

        </div>
    )
    
} 

export default Squads;