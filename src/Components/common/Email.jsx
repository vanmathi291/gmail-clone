
import {Box,Typography,checkbox,Styled} from '@mui/material';
import {Star,StarBorder} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {routes} from '../routes/routes';
import { API_URLS } from '../../services/api.urls';
import useApi from '../../hooks/useApi';

const Wrapper = Styled(Box)({
    padding:'0 0 0 10px',
    background:'#f2f6fc',
    display:'flex',
    alignItems:'center',
    cursor:'pointer',
    '& > div':{
        display:'flex',
        width:'100%',
        '& > p':{
            fontSize:14
        }
    }
})

const Indicator = Styled(Typography)({
    fontSize:'12px !important',
    background:'#ddd',
    color:'#222',
    padding:'0 4px',
    borderRadius:4,
    marginRight: 6
});

const Date = Styled(Typography)({
    marginLeft:'auto',
    marginRight:'20',
    fontSize:12,
    color:'#5F6368'
})

const Email = ({email,selectedEmails},setRefreshScreen,setSelectedEmails) =>{
     
    const navigate = useNavigate();  
    const toggleStarredService = useApi(API_URLS.toggleStarredEmails);
    const toggleStarredMails=()=>{
      toggleStarredService.call({id: email._id,value: !email.starred})
      setRefreshScreen(prevState=>!prevState)
    }

    const onValueChange = ()=>{
        if(selectedEmails.includes(email._id)){
            setSelectedEmails(prevState =>prevState.filter(id =>id != email._id));
        }else{
            setSelectedEmails(prevState => [...prevState,email._id]);
        }
    }

    return(
      <Wrapper>
        <checkbox
         size="small"
         checked={selectedEmails.includes(email._id)}
         onChange={()=>onValueChange()}
         />
         {
            email.starred ?
            <star fontSize="small"style={{marginRight:10,color:'#FFF222'}} onClick={()=>toggleStarredMails} />
            :
            <StarBorder fontSize='small' style={{marginRight:10}} onClick={()=>toggleStarredMails} />
         }
       
        <Box onClick = {()=> navigate(routes.view.path,{state:{email:email}})}>
        <Typography stye={{width:200}}>{email.name}</Typography>
        <Indicator>Inbox</Indicator>
        <Typography>{email.subject}{email.body && '-'}{email.body}</Typography>
        <Date>
            {(new window.Date(email.date)).getDate()}
            {(new window.Date(email.date)).toLocaleString('default',{month:'long'})}
        </Date>
        </Box>
      </Wrapper>
    )
}

export default Email;