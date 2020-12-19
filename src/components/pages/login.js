import React, {useState} from 'react'
import './login.css'
import { Helmet } from 'react-helmet'
import { Link, useHistory, useLocation} from 'react-router-dom';
import Axios from "axios";

//redux
import { useDispatch }from 'react-redux'
import {user} from '../../actions/index'


//ui
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { motion } from "framer-motion";

//illustrations
import welcomeSvg from '../../assets/welcome.svg'

//icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



function login() {

   //hooks
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } };

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword , setShowPassword]=useState(false)
    const [isNotUser, setIsNotUser] = useState(false)
    const [IsWrongPass , setIsWrongPass] = useState(false)
    
    

  

    const loginHandller = async ()=>{
        await Axios.post("/api/login" , {userName: userName , pass: password}).then((res)=>{
           if(res.data.isPasswordWrong){
              setIsWrongPass(res.data.isPasswordWrong)
          }
          else if(res.data.istrue){
            dispatch(user(res.data.user))
            localStorage.setItem("booksharing" , res.data.accesstoken)
            history.push(from)
          }
          else if(res.data.isNotUser){
            setIsNotUser(res.data.isNotUser)
          }
      
        })
    }

    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
         <div className="login__page">
         <div className="login__page__row">
             <img className="login__page__img" src={welcomeSvg}></img>
             <h3>Login</h3>
        </div>
         <div className="login__page__row">
           <FormControl>
             <InputLabel htmlFor="input-with-icon-adornment">User Name</InputLabel>
             <Input
              id="input-with-icon-adornment"
              value={userName}
              fullWidth
              onChange={(e)=>setUserName(e.target.value) }
              startAdornment={
                <InputAdornment position="start">
                   <AccountCircle />
                </InputAdornment>
               }
             />
          </FormControl>
         </div>
         
         <div className="login__page__row">
          <FormControl >
             <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
             <Input
               id="standard-adornment-password"
               type={showPassword ? 'text' : 'password'}
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
               endAdornment={
                  <InputAdornment position="end">
                  <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword(!showPassword)}
                  onMouseDown={()=>setShowPassword(false)}
                  >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  </InputAdornment>
               }
             />
         </FormControl>
         </div>
         <div className="login__page__row login__button">
         <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
           <Button onClick={loginHandller}>Login</Button>
           </motion.div>
         </div>
         <Link to={'/register'}><p className="login__link">Not yet Register? Register Now</p></Link> 
         </div>
       
         <Dialog  open={isNotUser}  onClose={()=>setIsNotUser(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
             <DialogTitle>You Are Not Having Account In Our Website</DialogTitle>
             <DialogActions>
               <Link to={'/register'}>Register Now</Link>
             </DialogActions>
         </Dialog>

         <Dialog className="login__dialog" open={IsWrongPass}  onClose={()=>setIsWrongPass(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
             <DialogTitle>You Entered Password Is Wrong Try Again</DialogTitle>
         </Dialog>
        </div>
    )
}

export default login
