import React, { useEffect, useState } from 'react'
import {Redirect, Route} from 'react-router-dom';
import Axios from 'axios';

//redux
import { useDispatch }from 'react-redux'
import {user} from '../actions/index'


//ui

import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'




function ProtectedRouter({component: Component, ...rest}) {

    const dispatch = useDispatch()
    const [isLoaded , setIsLoaded] = useState(false)
    const [auth , setIsAuth] = useState(false)
    const [backdrop , setBackdrop] = useState(true)

    useEffect(()=>{
        fetchUser()          
    },[])

  
    const fetchUser = async ()=>{
        await  Axios.get("/api/isuserlogged",{
            headers:{
                authorization: 'Bearer '+ localStorage.getItem("booksharing")
              }
        }).then((res)=>{
           if(res.data.isSigned){
             setIsAuth(res.data.isSigned)
             dispatch(user(res.data.loggedUser))
           }else{
               setIsAuth(false)
           }
        })
        setIsLoaded(true)
        setBackdrop(false)
      }
       
    return (
       <>{
           isLoaded?
       <Route 
       {...rest}
       render={(props) => auth ?  <Component {...props}  />  : 
       <Redirect to ={{pathname : '/login' , state:{from:props.location}}} /> } /> 
       : 
       <Backdrop className="backdrop" open={backdrop}>
          <CircularProgress color="inherit" />
       </Backdrop>
       }
       </>
    )

  
}

export default ProtectedRouter
