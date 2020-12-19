import React, { useEffect, useState } from 'react'
import './singleProductPage.css'
import { Helmet } from 'react-helmet'
import Axios from 'axios'
import {useParams} from "react-router-dom"

//redux
import {useSelector} from "react-redux"


//components
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




function SingleBook() {

  const {bookid} = useParams()
  const user = useSelector(state => state['userReducer'])
  const [book , setBook] = useState({})
  const [backdrop , setBackdrop] = useState(false)
  const [snackbar , setSnackBar] = useState(false)

  useEffect(()=>{
        getProductHandller()
  },[bookid])

  const getProductHandller = async ()=>{
        setBackdrop(true)
      await Axios.get(`/api/book?id=${bookid}`).then((res)=>{
        setBook(res.data[0])
        setBackdrop(false)      
      })
  }

  const askedHandller = (bookId)=>{
    
    Axios.patch("/api/bookasked" , {
      id:bookId,
      askedUserName: user
    }).then((res)=>{
      if(res.data.isAsked){
         setSnackBar(true)
         getProductHandller()
      }
    })

  }


    return (
        <div>

          <Helmet>
             <title>{book.bookname}</title>
          </Helmet>

          
          <div className="books">
             <div className="nav__container"><NavBar /></div>

             <div className="books__hero__content">
                 <h1 className="books__hero_heading">Details</h1>
             </div>
             <div className="singlebook__product">
               <SingleProductLg
                id={book._id}
                name={book.bookname}
                desc={book.bookdesc}
                image={book.bookimagepath}
                by={book.uploadby}
                at={book.uploadate} 
                isasked={book.isasked}
                asked={askedHandller}
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

export default SingleBook
