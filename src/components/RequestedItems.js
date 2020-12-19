import React, { useEffect, useState } from 'react'
import './RequestItems.css'
import { Helmet } from 'react-helmet'
import Axios from 'axios'

//redux
import {useSelector}from 'react-redux'

//ui
import MuiAlert from '@material-ui/lab/Alert';

//component
import List from "./List"

//illustration

import emptyIllustration from '../assets/emptycart.svg'





function RequestedItems() {

    const user = useSelector(state => state['userReducer'])

    const [booksAsked , setBooksAsked] = useState([])
    const [stationaryAsked , setStationaryAsked] = useState([])


    useEffect(()=>{
        getBookRequests()
        getStationaryRequests()
    },[])
  

    const getBookRequests = async ()=>{
        await Axios.get(`/api/bookannouncements?user=${user}`).then((res)=> setBooksAsked(res.data))
    }

    const getStationaryRequests = async ()=>{
        await Axios.get(`/api/stationaryannouncements?user=${user}`).then((res)=> setStationaryAsked(res.data))
    }

    const acceptBookRequestHandller = (bookId)=>{
         Axios.put("/api/approvebook" , {id:bookId}).then((res)=>{
            if(res.data.isUpdated) getBookRequests()
        })
    }

    const denyBookRequestHandller = (bookId)=>{
        Axios.patch("/api/denybook", {id: bookId}).then((res)=>{
            if(res.data.isUpdated) getBookRequests()
        })
    }

    const acceptStationaryHandller = (stationaryId)=>{
        Axios.put("/api/approvestationary" , {id:stationaryId}).then((res)=>{
            if(res.data.isUpdated) getStationaryRequests()
        })
    }

    const denyStationaryHandller = (stationaryId)=>{
        Axios.patch("/api/denystationary", {id: stationaryId}).then((res)=>{
            if(res.data.isUpdated) getStationaryRequests()
        })
    }


    return (
        <div>
              <Helmet>
                  <title>Requested Books / Stationaries</title>
              </Helmet>
              <MuiAlert elevation={5} variant="filled" severity="info"><strong>*Accept It</strong> - You Accept the request and give the book to the requested person. <br /> <strong>*Deny Request </strong> - You Deny the request and allow to show in website</MuiAlert>    
              <h1>Books</h1>
                 {booksAsked.length == 0? 
                 <img className="requestedItems__empty-illustration" src={emptyIllustration}></img> : 
                 booksAsked.map((book, index)=>{
                     return(
                        <List 
                         key={index}
                         id={book._id}
                         name={book.bookname}
                         date={book.uploadate}
                         askedby={book.askedby}
                         accept={acceptBookRequestHandller}
                         deny={denyBookRequestHandller}
                        />
                     )
                 })}
                 
              <h1>Stationaries / Others</h1>
                  {stationaryAsked.length == 0? 
                  <img className="requestedItems__empty-illustration" src={emptyIllustration}></img> :
                   stationaryAsked.map((stationary, index)=>{
                    return(
                      <List 
                        key={index}
                        id={stationary._id}
                        name={stationary.name}
                        date={stationary.uploadate}
                        askedby={stationary.askedby}
                        accept={acceptStationaryHandller}
                        deny={denyStationaryHandller}
                      />
                  )})}
        </div>
    )
}

export default RequestedItems
