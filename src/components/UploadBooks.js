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



function UploadBooks() {

    
    const user = useSelector(state => state['userReducer'])
    const [bookTitle , setBookTitle] = useState("")
    const [bookDesc , setBookDesc] = useState("")
    const [imageFile, setimageFile] =useState(null)
    const [previewImage, setPreviewImage] =useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [loading, setIsLoading] = useState(false)

    const imageUploadHandller = (e) =>{
        setimageFile(e.target.files[0])  
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setPreviewImage(reader.result)
        }
    }

    const uploadHandller = async () =>{

        let data = new FormData()
        data.append('filename', imageFile.name)
        data.append('file', imageFile)
        data.append('title', bookTitle)
        data.append('desc', bookDesc)
        data.append('by', user)

        await Axios.post("/api/uploadbook", data ).then((res)=> {
          setIsLoading(true)
            if(res.data.isUploaded){
                setBookTitle("")
                setBookDesc("")
                setPreviewImage(null)
                setIsLoading(false)
                setOpenSnackbar(true)
            }
            else if(res.data.isNotUpladImage){
                alert("Please Upload An Book Image!!")
            }
        })
    }


    return (
        <div>
            <Helmet>
                <title>Upload Books</title>
            </Helmet>
            <h1>Uploads</h1>
            <div className="uploadbook__row">
            <TextField  label="Book Title"  required placeholder="Enter Book Title" fullWidth  value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />  
            </div>
            <div className="uploadbook__row">
            <TextField  label="Book Description"  required placeholder="About the book" fullWidth multiline rowsMax={7}  value={bookDesc} onChange={(e) => setBookDesc(e.target.value)} />  
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
               <button onClick={uploadHandller} className="uploadbooks__btns">Donate Book</button>
            </motion.div>

            <Backdrop isLoad={loading} />
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
               <Alert onClose={()=> setOpenSnackbar(false)} severity="success">Book Uploaded Successfully</Alert>
            </Snackbar>
        </div>
    )
}

export default UploadBooks
