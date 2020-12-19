import React, { useEffect, useState } from 'react'
import './singleProductPage.css'
import { Helmet } from 'react-helmet'
import Axios from 'axios'
import {useParams} from "react-router-dom"

//redux
import {useSelector} from "react-redux"

import NavBar from '../NavBar'
import Footer from '../Footer'
import SingleProductLg from '../SingleProductLg'
import Backdrop from '../Backdrop'

//ui
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }




function SingleStationary() {

  const {stationaryid} = useParams()
  const user = useSelector(state => state['userReducer'])
  const [stationary , setStationary] = useState({})
  const [backdrop , setBackdrop] = useState(false)
  const [snackbar , setSnackBar] = useState(false)
 
  useEffect(()=>{
        getProductHandller()
  },[stationaryid])

  const getProductHandller = async ()=>{
      setBackdrop(true)
     await Axios.get(`/api/stationary?id=${stationaryid}`).then((res)=>{
          setStationary(res.data[0])
          setBackdrop(false)
      })
  }

  const askHandller = (id)=>{
        Axios.patch("/api/askstationary", {
          id: id,
          askedUserName: user
        }).then((res)=>{
          if(res.data.isAsked){
           setSnackBar(true)
           getProductHandller()
        }})
  }


    return (
        <div>

          <Helmet>
             <title>{stationary.name}</title>
          </Helmet>

            
          <div className="books">
             <div className="nav__container"><NavBar /></div>

             <div className="books__hero__content">
                 <h1 className="books__hero_heading">Details</h1>
             </div>
             <div className="singlebook__product">
               <SingleProductLg
                id={stationary._id}
                name={stationary.name}
                desc={stationary.desc}
                image={stationary.imagepath}
                by={stationary.uploadby}
                at={stationary.uploadate} 
                isasked={stationary.isasked}
                asked={askHandller}
               />
             </div>
       
          </div>

          <Footer />
          <Backdrop isLoad={backdrop} />


          <Snackbar open={snackbar} autoHideDuration={6000} onClose={() => setSnackBar(false)}  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
               <Alert onClose={()=> setSnackBar(false)} severity="success">Asked To Owner Successfully. Can also chat with him in chat</Alert>
          </Snackbar>
            
        </div>
    )
}

export default SingleStationary
