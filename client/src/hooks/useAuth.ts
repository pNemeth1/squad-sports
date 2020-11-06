import {useEffect, useState} from 'react';
import axios from 'axios';


type APIResponse = {
    _id: string,
    googleId: string;
    firstName: string;
    LastName: string;
    image: string;
    squadId: string
}

const authContext = {
    _id: '',
    googleId: '',
    firstName: '',
    LastName: '',
    image: '',
    squadId: ''
}


const useAuth = (): APIResponse => {
    const [auth, setAuth] = useState<APIResponse>(authContext);

    useEffect((): void => {
        const getAuth = async (): Promise<void> => {
            await axios.get('/api/current_user').then((result)  => {
                setAuth(result.data);
              });
          };
          getAuth();
        }, []);

    return auth;
}

export default useAuth;
