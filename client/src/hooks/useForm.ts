import { useState } from "react";
import { useHistory }  from 'react-router-dom';

import axios from 'axios';


const fetchData = async (formData: object, url: string): Promise<any> => {
  let result;
  try {
    result = await axios.post(url, formData);
  } catch(e) {
    console.log(e);
  }

  return result;
}

type State = { 
  city: string; 
  sports: string;
  street: string,
  title: string,
  desc: string;
}

type searchFormData = {
  city: string,
  sports: string
}

type squadData = {
  data: []
}



const useForm = (): {
  state: State;
  onHandleChange: (evt: Event) => void;
  onHandleSubmit: (state: State, formType: number, setSquadsProps:Function) => Promise<void>;
  showError: boolean;
  squadId: string,
} => {


  const [state, setState] = useState({
    city: '',
    sports: '',
    street: '',
    title: '',
    desc: ''
  });

  const [showError, setShowError] = useState<boolean>(false);
  const [squadId, setSquadId] = useState<string>('');
  const history = useHistory();


  const handleSearchEvents = async (searchFormData: searchFormData, url: string, setSquadsProps: Function): Promise<void> => {
    await fetchData(searchFormData, url).then((result) => {
      console.log(result);
      setSquadsProps(result);
    });
  }

  const handleEventCreate = async (searchFormData: State, url: string, setSquadsProps: Function): Promise<void> => {
    await fetchData(searchFormData, url).then((result) => {
      setSquadsProps(result);
    });
  }
  

  const onHandleChange = (evt: any) => {
    const value = evt.target.value;

    setState({
      ...state,
      [evt.target?.name]: value,
    });
  };

  const onHandleSubmit = async (state: State, formType: number, setSquadsProps:Function) => {
    // console.log(state);
    let url: string = '';
    let formData: State = {
      city: '',
      sports: '',
      street: '',
      title: '',
      desc: ''
    };
    let searchFormData: searchFormData = {
      city: '',
      sports: ''
    }
    if (formType === 1) {
      if (!state.city || !state.sports) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
      } else {
        searchFormData.city = state.city;
        searchFormData.sports = state.sports;
        url = '/api/get_stories';
        console.log('exec')
        handleSearchEvents(searchFormData, url, setSquadsProps);
        
      }
    } else if (formType === 2) {
      if (!state.city || !state.sports || !state.street || !state.title || !state.desc) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
      } else {
        formData.city = state.city;
        formData.sports = state.sports;
        formData.street = state.street;
        formData.title = state.title;
        formData.desc = state.desc;
        url = '/api/create_event';
        setState({
          city: '',
          sports: '',
          street: '',
          title: '',
          desc: ''
        });
        handleEventCreate(formData, url, setSquadsProps);
      }
    }
    
  };

  return { state, onHandleChange, onHandleSubmit, showError, squadId };
};

export default useForm;
