
import {Box,Typography,styled,Divider} from '@mui/material';

const Component = styled(Box)({
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    marginTop:50,
    opacity:'8',
    width:100%
})



const NoMails = ()=>{
    return(
        <Component>
            <Typography>{message.heading}</Typography>
            <Typography>{message.subHeading}</Typography>
            <StyledDivider />
        </Component>
    )
}

export default NoMails;