import React, { useEffect, useState } from 'react'
import './home.css'
import { Helmet } from 'react-helmet'
import Axios from 'axios'
import { Link } from 'react-router-dom'


//libraries
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import Button from '@material-ui/core/Button'

//components

import HeroComponent from '../HeroContent'
import NavBar from '../NavBar'
import SingleCard from '../SingleCard'
import Table from '../Table'
import Footer from '../Footer'
import Datasvg from '../../assets/data.svg'




function Home() {


    const [books , setBooks] = useState([])
    const [stationaries , setStationaries] = useState([])
    const [bestDonars, setBestDonars]= useState([])
    const [bestStationaryDonars, setBestStationaryDonars]= useState([])
    const [donatedBooksData , setDonatedBooksData] = useState([])
    const [donateStationaryData, setDonatedStationaryData] = useState([])



   useEffect(()=>{
       getBooksHandller()
       getStationaryHandller()
       getBestDonarsHandller()
       getBestStationaryDonarHandller()
       getDonatedBooksHandller()
       getDonatedStationaryHandller()
   },[])
 
  
   const getBooksHandller = async ()=>{
    await Axios.get("/api/homebooks").then((res)=> setBooks(res.data))
   }

   const getStationaryHandller = async ()=>{
    await Axios.get("/api/homestationaries").then((res)=> setStationaries(res.data))
   }

   const getBestDonarsHandller = async ()=>{
    await Axios.get("/api/bestdonars").then((res)=> setBestDonars(res.data))
   }

   const getBestStationaryDonarHandller = async ()=>{
    await Axios.get("/api/beststationarydonars").then((res)=> setBestStationaryDonars(res.data))
   }

   const getDonatedBooksHandller = async ()=>{
     await Axios.get("/api/donatedbooks").then((res)=> setDonatedBooksData(res.data))
   }

   const getDonatedStationaryHandller = async ()=>{
    await Axios.get("/api/donatestationary").then((res)=> setDonatedStationaryData(res.data))
  }
  



    return (
        <div>
            <Helmet>
                <title>Home</title>
                <meta property="og:title" content="Home - Booksharing"></meta>
                <meta name="description" content="Booksharing is a online portal which you can donate your old books to your juniors and needed people. sharing is good. register now"></meta>
            </Helmet>

            <NavBar />

            <HeroComponent />
            
            <div className="home__trending__books">
            <h1 className="home__heading">Recently Uploaded</h1>
            <div className="uk-position-relative uk-visible-toggle uk-light home__slider" tabIndex="-1" data-uk-slider>
               <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid">
                  {books.map((book , index)=>{
                      return(
                        <li key={index}>
                          <SingleCard 
                           type={"book"}
                           id={book._id}
                           name={book.bookname}
                           image={book.bookimagepath}
                          />
                        </li>
                      )
                  })}
                 
               
               </ul>
               <a className="uk-position-center-left uk-position-small uk-hidden-hover slide-nav" href="#" data-uk-slidenav-previous data-uk-slider-item="previous"><SkipPreviousIcon className="home__slidericon" /></a>
               <a className="uk-position-center-right uk-position-small uk-hidden-hover slide-nav" href="#" data-uk-slidenav-next data-uk-slider-item="next"><SkipNextIcon className="home__slidericon" /></a>
            </div>
            </div>

            <div className="home__stationary">
             <h1 className="home__heading">Strationary</h1>
             <div className="uk-position-relative uk-visible-toggle uk-light home__slider" tabIndex="-1" data-uk-slider>
               <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid">
                 {stationaries.map((stationary , index)=>{
                      return(
                        <li key={index}>
                          <SingleCard 
                           type={"stationary"}
                           id={stationary._id}
                           name={stationary.name}
                           image={stationary.imagepath}
                          />
                        </li>
                      )
                  })}
                  
               </ul>
               <a className="uk-position-center-left uk-position-small uk-hidden-hover slide-nav" href="#" data-uk-slidenav-previous data-uk-slider-item="previous"><SkipPreviousIcon className="home__slidericon" /></a>
               <a className="uk-position-center-right uk-position-small uk-hidden-hover slide-nav" href="#" data-uk-slidenav-next data-uk-slider-item="next"><SkipNextIcon className="home__slidericon" /></a>
            </div>
            </div>

            <div className="home__engineering">
                <h1 className="home__heading">Best Donars</h1>
                <h1 className="home__heading">Books</h1>
                 <div className="home__best__donars_container">
                     {bestDonars.map((donar , index)=>{
                         return(
                            <div key={index} className="home__best__donars">
                              <img className="home__best__donars__avatar" src={donar.avatar}></img>
                              <h3>{donar.username}</h3>
                            </div>
                         )
                     })}
                </div>
                <h1 className="home__heading">Stationary / Other Items</h1>
                 <div className="home__best__donars_container">
                     {bestStationaryDonars.map((donar , index)=>{
                         return(
                            <div key={index} className="home__best__donars">
                              <img className="home__best__donars__avatar" src={donar.avatar}></img>
                              <h3>{donar.username}</h3>
                            </div>
                         )
                     })}
                </div>
            </div>

            <div className="home__total-data">
                    <img className="home__data__illustration" src={Datasvg}></img>
                    <h1 className="home__heading-black">Total Books Shared : {donatedBooksData.length}</h1>
                     <Table 
                     rows={donatedBooksData}
                     columns={[{field:"bookname", headerName: "Book Title", width: 200},
                              {field:"uploadby", headerName: "Donar", width: 200},
                              {field:"askedby", headerName: "Donee", width: 200} ]}
                     />
                    <h1 className="home__heading-black">Total Stationary / Other Items Shared : {donateStationaryData.length}</h1>
                    <Table 
                     rows={donateStationaryData}
                     columns={[{field:"name", headerName: "Item Name", width: 200},
                              {field:"uploadby", headerName: "Donar", width: 200},
                              {field:"askedby", headerName: "Donee", width: 200} ]}
                     />
            </div>

            <div className="home__sharing_hero">
                <div className="home__sharing_hero__inner">
                  <h1>Sharing Is Good</h1>
                  <p>Share Your books Strationary and other things which should be very useful to Your Juniors</p>
                  <h6>Register Now and Share</h6>
                  <Link to={"/register"}><Button className="home__register_btn">Register Now</Button></Link> 
                </div> 
            </div>

            <Footer />
         
   
          


        </div>
    )
}

export default Home
