import { useState, useEffect } from 'react';

import axios from 'axios';

const fetchData = async (): Promise<any> => {
    let result;
    try {
        result = await axios.get('/api/get_userevents')
    } catch (e) {
        console.log(e);
    }
    return result;
}

const useProfile = (): {events: object} => {
    const [events, setEvents] = useState<[]>([]);

    useEffect(() => {
        const getStories = async (): Promise<void> => {
            await fetchData().then((result) => {
                setEvents(result.data);
            })
        };
        getStories();
    }, []);

    return {events};
}

export default useProfile;