import { useState, useEffect } from 'react';

import axios from 'axios';

const fetchData = async (): Promise<any> => {
    let result;
    try {
        result = await axios.get('/api/get_userevents');
        console.log(result)
    } catch (e) {
        console.log(e);
    }
    return result;
}

const useProfile = (): {events: object} => {
    const [events, setEvents] = useState({});

    useEffect(() => {
        const getEvents = async (): Promise<void> => {
            await fetchData().then((result) => {
                setEvents(result.data);
            })
        };
        getEvents();
    }, []);

    return {events};
}

export default useProfile;