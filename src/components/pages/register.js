import React, {useState} from 'react'
import './login.css'
import { Helmet } from 'react-helmet'
import { Link, useHistory, useLocation} from 'react-router-dom';
import axios from "axios";

//redux
import { useDispatch }from 'react-redux'
import {user} from '../../actions/index'


//ui
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { motion } from "framer-motion";


//images
import welcomeSvg from '../../assets/welcome.svg'

//icons
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



function register() {

    //hooks
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } }; 


    const [userName, setUserName] = useState("")
    const [password , setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [showPassword , setShowPassword]=useState(false)
    const [isUserExist , setIsUserExist] = useState(false)
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    const registerHandller = () =>{
      if(email.length > 0 && userName.length > 0 && password.length > 0){
        if(email.match(mailformat)){
      axios.post('/api/register' , {userName: userName, pass: password, email:email}).then((res)=>{
        if(res.data.isUserExsisted){
          setIsUserExist(res.data.isUserExsisted)
        }
        else if(res.data.istrue){
          dispatch(user(res.data.user))
          localStorage.setItem("booksharing" , res.data.accesstoken)
          history.push(from)
        }
      })
    }
      else alert("Invalid Email Address")
    }
      else alert("All fields are required")
  }

    return (
        <div>
            <Helmet>
                <title>Register</title>
            </Helmet>
         <div className="login__page">
         <div className="login__page__row">
             <img className="login__page__img" src={welcomeSvg}></img>
             <h3>Register</h3>
        </div>
         <div className="login__page__row">
           <FormControl required>
             <InputLabel htmlFor="input-with-icon-adornment">User Name</InputLabel>
             <Input
              id="input-with-icon-adornment"
              value={userName}
              fullWidth
              onChange={(e)=> setUserName(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                   <AccountCircle />
                </InputAdornment>
               }
             />
          </FormControl>
         </div>

         <div className="login__page__row">
           <FormControl required>
             <InputLabel htmlFor="input-with-icon-adornment-email">Email</InputLabel>
             <Input
              id="input-with-icon-adornment-email"
              value={email}
              fullWidth
              type="email"
              onChange={(e)=>setEmail(e.target.value) }
              startAdornment={
                <InputAdornment position="start">
                   <AlternateEmailIcon />
                </InputAdornment>
               }
             />
          </FormControl>
         </div>
         
         <div className="login__page__row">
          <FormControl required >
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
           <Button onClick={registerHandller}>Register</Button>
          </motion.div>
         </div>
         <div>
         <Link to={"/login"}><p className="login__link">Already Register? SignIn Now</p></Link>
         </div>
         </div>
         
         <Dialog className="login__dialog" open={isUserExist}  onClose={()=>setIsUserExist(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
             <DialogTitle>UserName Already Exist. Try Some Other Names</DialogTitle>
         </Dialog>
        </div>
    )
}

export default register
