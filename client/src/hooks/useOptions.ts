import { useState, useEffect } from 'react';
import axios from 'axios';


type APIResponse = {
    data: {
        data: {
            data: [];
        }
    }
}

const fetchData = async (requestHeaders: object): Promise<APIResponse>  => {
    let data;
    try {
        data = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', requestHeaders);
        data = data.data.data;
    } catch(e) {
        console.log(e);
    }
    return data;
};




const useOptions = (): {cities: string[], sports: string[], onFormSubmit: (evt: Event) => void} => {
    const [cities, setcities] = useState<string[]>([]);
    const [sports, setSports] = useState<string[]>([]);

    const sportOptions: Array<string> = ['Football', 'Basketball', 'Running', 'Gym', 'Cycling'];
    const cityOptions: Array<string> = ['Berlin', 'Hamburg', 'Munich', 'Stuttgart', 'Gladbach'];

    useEffect(() => {

        const getCities = async () => {
            // const requestHeaders = {
            //     headers: 
            //     {
            //         "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            //         "x-rapidapi-key": keys.cityKey,
            //     },
            //     params: {
            //         "countryIds": "DE"
            //     }
            // };
            // const result = await fetchData(requestHeaders);
            setcities(cityOptions);
            setSports(sportOptions);
            
        };
        getCities();

        

    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log('submitted!');
    }

    return { onFormSubmit, cities, sports };

}

export default useOptions;