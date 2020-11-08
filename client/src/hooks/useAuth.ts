import {useEffect, useState} from 'react';
import axios from 'axios';


type APIResponse = {
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

const authContext = {
    _id: '',
    googleId: '',
    firstName: '',
    lastName: '',
   image: {
    meta_data: {
        path: ''
    }
   },
    squadId: ''
}


const useAuth = (): {
    profile: APIResponse,
    setAuth: Function
} => {
    const [profile, setAuth] = useState<APIResponse>(authContext);

    useEffect((): void => {
        const getAuth = async (): Promise<void> => {
            await axios.get('/api/current_user').then((result)  => {
                setAuth(result.data);
              });
          };
          getAuth();
        }, []);

    return {profile, setAuth};
}

export default useAuth;
