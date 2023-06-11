
import{lazy} from "react";

const Main = lazy(()=>import ('../Pages/Main'));
const Emails = lazy(()=>import('../Components/Emails'));
const viewEmail = lazy(()=>import('../Components/viewEmail'));
const routes = {
    main:{
        path:'/',
        element:Main
    },
    emails:{
        path:'/emails',
        element:Emails
    },
    view:{
        path:'/view',
        element:viewEmail
    },
    invalid:{
        path:'/*',
        element:Emails
    }
    
}

export {routes};