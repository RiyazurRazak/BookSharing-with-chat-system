import React, { useEffect, useState } from 'react'
import './productPage.css'
import { Helmet } from 'react-helmet'
import Axios from 'axios'


//components
import NavBar from '../NavBar'
import Footer from '../Footer'
import ProductContainer from '../ProductContainer'
import Backdrop from '../Backdrop'


function books() {


  const [books , setBooks] = useState([])
  const [backdrop , setBackdrop] = useState(false)
 
  useEffect(()=>{
      getBooksHandller()
  },[])


  const getBooksHandller = async ()=>{
    setBackdrop(true)
    await Axios.get("/api/books").then((res) =>{
       setBooks(res.data)
       setBackdrop(false)
      })
  }

    return (
        <div>
           <Helmet>
             <title>Books</title>
             <meta property="og:title" content="Books - Booksharing"></meta>
             <meta name="description" content="In this page you can find books that donars will donate it. You can also ask them to get it."></meta>
          </Helmet>

          <div className="books">
          <div className="nav__container"><NavBar /></div>

       
          <div className="books__hero__content">
              <h1 className="books__hero_heading">Books</h1>
          </div>
          <div className="books__product__container">
            {books.map((book , index)=>{
              return(
                <ProductContainer 
                key={index}
                type={"book"}
                id={book._id}
                title={book.bookname}
                image ={book.bookimagepath}
                />
              )
            })}
          </div>
       
        </div>
          <Footer />

         <Backdrop isLoad={backdrop} />
        </div>
    )
}

export default books
