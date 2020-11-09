import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';


const fetchData = async (params: object): Promise<any> => {
    let result;
    try {
        result = await axios.post('/api/get_event', params);
    } catch(e) {
        console.log(e)
    }

    return result;
}

const postData = async (params: object): Promise<any> => {
    let result;
    try {
        result = await axios.post('/api/add_comment', params);
    } catch(e) {
        console.log(e)
    }

    return result;
}

type squad = {
    _id: string,
    city: string,
    title: string,
    desc: string,
    image: {
        meta_data:{
            path: string,
        }
    },
    sports: string,
    squadUserId: string,
    street: string,
    user: string
    comments: [{
        commentBody: string;
        commentDate: Date;
        commentUser: string;
        commentUserImage: {
            meta_data: {
                path: string;
            };
        };
    }]
    date: Date
}


type comments = [{
    commentBody: string
      commentDate: Date,
      commentUser: string,
      commentUserImage: {
          meta_data: {
              path: string
          }
      }
    }];




const useSquad = () => {
    const [squad, setSquad] = useState<squad>({
        _id: '',
        city: '',
        title: '',
        desc: '',
        image: {
            meta_data:{
                path: ''
            }
        },
        sports: '',
        squadUserId: '',
        street: '',
        user: '',
        comments: [{
            commentBody: '',
            commentDate: new Date(),
            commentUser: '',
            commentUserImage: {
                meta_data: {
                    path: '',
                }
            }
        }],
        date: new Date(),
    });

    const params: object = useParams<object>();
    const [comments, setComments] = useState<comments>(
        [{
            commentBody: '',
            commentDate: new Date(),
            commentUser: '',
            commentUserImage: {
                meta_data: {
                    path: '',
                }
            }
        }]
    );
    console.log(params)
    
    useEffect(() => {
        const getSquad = async (params: object): Promise<void> => {
            await fetchData(params).then((result) => {
                setSquad(result.data);
                setComments(result.data.comments);
            }).catch((e) =>{
                console.log(e)
            })
        };
        getSquad(params);

        
    }, []);

    const addComment = async (commentData: object): Promise<any> => {
        console.log(commentData);
        await postData(commentData).then((response) => {
            console.log(response)
            setComments(response.data.comments);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return {squad, addComment, comments};
       


}

export default useSquad;