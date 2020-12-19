import React, { useEffect, useState } from 'react'
import './productPage.css'
import { Helmet } from 'react-helmet'
import Axios from 'axios'



//components
import NavBar from '../NavBar'
import Footer from '../Footer'
import ProductContainer from '../ProductContainer'
import Backdrop from '../Backdrop'

function stationary() {

  const [stationaries , setStationaries] = useState([])
  const [backdrop , setBackdrop] = useState(false)
 
   useEffect(()=>{
         getStationaryHandller()
   },[])


   const getStationaryHandller = async ()=>{
     setBackdrop(true)
     await Axios.get("/api/stationaries").then((res)=>{
        setStationaries(res.data)
        setBackdrop(false)
      })
   }

    return (
        <div>
           <Helmet>
             <title>Stationary / Others</title>
          </Helmet>

          <div className="books">
          <div className="nav__container"><NavBar /></div>

       
          <div className="books__hero__content">
              <h1 className="books__hero_heading">Stationary</h1>
              <div className="books__filter__container">
              </div>
          </div>
          <div className="books__product__container">
            {stationaries.map((stat, index)=>{
              return(
                <ProductContainer 
                key={index}
                type={"stationary"}
                id={stat._id}
                title={stat.name}
                image ={stat.imagepath}
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

export default stationary
