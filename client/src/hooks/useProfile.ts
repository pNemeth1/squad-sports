import { useState, useEffect } from 'react';

import axios from 'axios';

const fetchData = async () => {
    let result;
    try {
        result = await axios.get('/api/get_userstories')
    } catch (e) {
        console.log(e);
    }
    return result;
}

const useProfile = () => {
    const [events, setEvents] = useState();

    useEffect(() => {
        const getStories = async () => {
            await fetchData().then((result) => {
                setEvents(result.data);
            })
        };
        getStories();
    }, []);

    return {events};
}

export default useProfile;