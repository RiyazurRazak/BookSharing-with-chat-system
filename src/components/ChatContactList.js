import React, { useEffect, useState } from 'react'
import "./ChatContactList.css"
import { Link } from 'react-router-dom'
import Media from 'react-media'

//redux
import {useSelector} from "react-redux"

//ui
import { motion } from "framer-motion"
import Axios from 'axios'




function ChatContactList() {

     const user = useSelector(state => state['userReducer'])
     const [chatMembers , setChatMembers] = useState([])
     const [isSelected , setIsSelected] = useState(false)
     const [urlPath, setUrlPath]=useState("")
  

     useEffect(()=>{
        getContactList()
     },[])


     const getContactList= async ()=>{
         await Axios.get("/api/getchatmembers").then((res)=> setChatMembers(res.data))
      }

      const selectedMemberHandller = (index)=>{
           setIsSelected(index)
      }
    const spring = {
        type: "spring",
        stiffness: 500,
        damping: 30
      };


    return (
        <div className="chat__contact-container">
          { chatMembers.map((member, index)=>{
             if(member.username != user){
             return(
              <Link key={index} to={`/${urlPath}/${member.username}`}><li className="chatcontactlist" onClick={() => selectedMemberHandller(index)}>
                  <div className="chatcontactlist__avatar" >   
                     <img className="chatcontactlist__avatar" src={member.avatar}></img>
                     {isSelected === index &&
                     <motion.div
                      layoutId="outline"
                      className="chatcontactlist__outline"
                      initial={false}
                      animate={{ borderColor: "red" }}
                      transition={spring}
                     />}
                  </div>  
                  <div className="chatcontactlist__name__container">
                     <p className="chatcontactlist__name">{member.username}</p>
                  </div> 
               </li>
               </Link> )
             }})}

                 <Media  query="(min-width: 960px)">
                   {
                    matches =>{
                     matches? 
                     (setUrlPath("chat"))
                      : setUrlPath("m.chat")
                      return null
                    }
                    
                  }
                  </Media>
            
        </div>
    )
}

export default ChatContactList
