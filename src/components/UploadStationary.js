import React, { useState } from 'react'
import './UploadBook.css'
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





function UploadStationary() {


    const user = useSelector(state => state['userReducer'])
    const [stationaryName , setstationaryName] = useState("")
    const [stationaryDesc , setStationaryDesc] = useState("")
    const [previewImage, setPreviewImage] =useState(null)
    const [imageFile, setimageFile] =useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [loading, setIsLoading] = useState(false)
 

    const imageUploadHandller = (e) =>{

        const reader = new FileReader();
        setimageFile(e.target.files[0])  
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setPreviewImage(reader.result)
        }
    }

    const uploadHandller = async () =>{

        let data = new FormData()
        data.append('filename', imageFile.name)
        data.append('file', imageFile)
        data.append('title', stationaryName)
        data.append('desc', stationaryDesc)
        data.append('by', user)

        await Axios.post("/api/uploadotherstationary", data ).then((res)=> {
            setIsLoading(true)
            if(res.data.isUploaded){
                setstationaryName("")
                setStationaryDesc("")
                setPreviewImage(null)
                setIsLoading(false)
                setOpenSnackbar(true)
            }
            else if(res.data.isNotUpladImage){
                alert("Please Upload An Stationary Item Image!!")
            }
        })
    }


    return (
        <div>
            <Helmet>
                <title>Upload Stationaries</title>
            </Helmet>
            <h1>Uploads</h1>
            <div className="uploadbook__row">
            <TextField  label="Stationary Name"  required placeholder="Enter Book Title" fullWidth  value={stationaryName} onChange={(e) => setstationaryName(e.target.value)} />  
            </div>
            <div className="uploadbook__row">
            <TextField  label="Stationary / other description"  required placeholder="About the book" fullWidth multiline rowsMax={7}  value={stationaryDesc} onChange={(e) => setStationaryDesc(e.target.value)} />  
            </div>
            <div>
              {previewImage && <img className="uploadbooks-previewImg" src={previewImage}></img>}  
            <input id="contained-button-file" accept="image/*" className="uploadbook__input" type="file" onChange={imageUploadHandller} />
            <label htmlFor="contained-button-file">
            <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
               <span className="uploadbooks__btns">Upload image</span>
            </motion.div>
             </label>
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="uploadbooks__cont">
               <button onClick={uploadHandller} className="uploadbooks__btns">Donate It</button>
            </motion.div>

            <Backdrop isLoad={loading} />
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
               <Alert onClose={()=> setOpenSnackbar(false)} severity="success">Stationary Uploaded Successfully</Alert>
            </Snackbar>
        </div>
    )
}

export default UploadStationary
