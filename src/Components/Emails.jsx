import { useEffect, useState } from "react";
import { useOutletContext,useParams} from "react-router-dom";
import { API_URLS } from "../services/api.urls";
import useApi from "../hooks/useApi";
import {checkbox,Box,List,ListItems} from '@mui/material';
import {DeleteOutLine} from '@mui/icons-material';
import Email from "./common/Email";
import NoMails from "./common/noMails";
import { EMPTY_TABS } from "../Contants/Contants";

const Emails = ({openDrawerData}) =>{

    const[selectedEmails,setSelectedEmails] = useState([]);
    const[refereshScreen,setRefreshScreen]=useState(false);

    const {openDrawer} =useOutletContext();

    const {type} = useParams;
    
    const getGmailsService = useApi(API_URLS.getEmailFromType);
    const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);

    useEffect(()=>{
        getGmailsService.call({},type)
    },[type,refereshScreen])

    const selectAllEmails = (e) => {
        if(e.target.checked){
            const emails = getEmailsService?.response?.map(email=>email._id)
            setSelectedEmails(emails)
        }else{
            setSelectedEmails([]);
        }
    }

    const deleteSelectedEmails= (e) =>{
        if(type === 'bin'){
           deleteEmailService.call(selectAllEmails);
        }else{
            moveEmailsToBinService.call(selectedEmails)
        }
        setRefreshScreen(prevState =>!prevState)
    }
    return(
        <Box style = {openDrawerData ? { marginLeft:250 ,width:'calc(100%-250px)'} : {width:'100%'}}>
            <Box style = {{padding:'20px 10px 0 10px',display:'flex',alignItems:'center'}}>
                <checkbox size="small" onChange={(e)=> selectedEmails(e)}/>
                <DeleteOutLine onClick={(e)=>deleteSelectedEmails(e)}/>
            </Box>
            <List>
                {
                    getGmailsService?.response?.map(email=>(
                    <Email 
                         key={email._id}
                         email={email}
                         selectedEmails={selectedEmails}
                         setRefreshScreen={setRefreshScreen}
                         setSelectedEmails={setSelectedEmails}
                    />
                    ))
                }
            </List>
            {
                getGmailsService?.response?.length === 0 &&
                <NoMails message={EMPTY_TABS}/>
            }
            </Box>
    )
}

export default Emails;