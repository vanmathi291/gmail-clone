import {useState} from 'react';
import API from '../services/api';

const useApi = (urlObject) =>{
    const [response,setReponse] = useState(null);
    const[error,setError] = useState("");
    const[isLoading,setIsLoading] = useState(false);

    const call = async (payload)=>{
        setReponse(null);
        setError("");
        setIsLoading(true);

        try{
            let res = await API(urlObject,payload);
            setReponse(res.data);
        }catch(error){
            setError(error.message);
        }finally{
            setIsLoading(false);
        }
    }

    return {call,response,error,isLoading};
}

export default useApi;