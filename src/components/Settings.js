import React, {useEffect, useState} from 'react'
import './Settings.css'
import Axios from 'axios'
import { Helmet } from 'react-helmet'


//redux
import {useSelector}from 'react-redux'


//ui
import TextField from '@material-ui/core/TextField'
import { motion } from "framer-motion"
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Backdrop from './Backdrop'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function Settings() {

    const user = useSelector(state => state['userReducer'])
    const [chatChecked , setChatChecked] = useState(true)
    const [imageUrl, setImageUrl] = useState("")
    const [email, setEmail] = useState("")
    const [imageFile, setimageFile] =useState(null)
    const [loading, setIsLoading] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)

    useEffect(()=>{
         getInitialSettings()
    },[])

    
    const imageUploadHandller = (e) =>{
        setimageFile(e.target.files[0])  
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setImageUrl(reader.result)
        }
    }

    const getInitialSettings = async ()=>{
        await Axios.get(`/api/getsettings/${user}`).then((res)=>{
            setChatChecked(res.data[0].ischat)
            setImageUrl(res.data[0].avatar)
            setEmail(res.data[0].email)
        })
    }
  
    const updateSettingsHandller = async ()=>{

        setIsLoading(true)

        let data = new FormData()
        if(imageFile != null){
            data.append('filename', imageFile.name)
            data.append('file', imageFile)
        }
        data.append('user', user)
        data.append('ischat', chatChecked)
        data.append('email', email)

        await Axios.patch("/api/updatesettings" , data).then((res)=>{
            setIsLoading(false)
            setOpenSnackbar(true)
        })
    }
    return (
        <div>
            <Helmet>
                <title>Settings</title>
            </Helmet>
            <div>
              <h1>Settings</h1>
            </div>
            <div className="settings__chat-switch" >
               <p>Is Accept For Visible Your Contact To other Users In Chat</p> 
               <label className="switch">
               <input type="checkbox" checked={chatChecked} onChange={(e) => setChatChecked(e.target.checked)}></input>
               <span className="slider round"></span>
               </label>
            </div>
            <div>
            <TextField  label="Email Address"  required type={"email"} placeholder="Enter Email Address" fullWidth  value={email} onChange={(e) => setEmail(e.target.value)} />  
            </div>
            <div className="settings__chat__imageurl">
            <h3>Display Picture</h3>
            <img className="settings__avatar" src={imageUrl} alt={user}></img>
            <input id="contained-button-file" accept="image/*" className="uploadbook__input" type="file" onChange={imageUploadHandller} />
            <label htmlFor="contained-button-file">
            <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
               <span className="uploadbooks__btns">Upload image</span>
            </motion.div>
            </label>
            </div>
            <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.5 }} className="uploadbooks__cont">
               <button onClick={updateSettingsHandller}  className="uploadbooks__btns">Update Settings</button>
            </motion.div>
            
            <Backdrop isLoad={loading} />
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
               <Alert onClose={()=> setOpenSnackbar(false)} severity="success">Settings Updated Successfully</Alert>
            </Snackbar>
        </div>
    )
}

export default Settings
