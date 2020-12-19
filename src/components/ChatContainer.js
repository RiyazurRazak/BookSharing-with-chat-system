import React, { useEffect, useState } from 'react'
import "./ChatContainer.css"
import Axios from 'axios'
import {useParams , useHistory} from "react-router-dom"

//redux
import {useSelector} from "react-redux"


//scroll
import { animateScroll } from "react-scroll";

//ui
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'

//icon
import SendIcon from '@material-ui/icons/Send'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'


function ChatContainer() {

    const history = useHistory() 
    const user = useSelector(state => state['userReducer'])
    const {chattouser} = useParams()
    const [message , setMessage] = useState("")
    const [messages , setMessages] = useState([])
    const [contactDetails , setContactDetails] = useState({})

    useEffect(()=>{
          getchatsHandller()
          getContactDetails()
    },[chattouser])

    const getchatsHandller = async ()=>{
        await Axios.get(`/api/getchat?currentUser=${user}&reqContact=${chattouser}`).then((res)=> {
              if(res.data.length > 0)  setMessages(res.data[0].msg)
              else setMessage([])
              setMessage("")
              animateScroll.scrollToBottom({
                containerId:"chatcontainer"
              })
        })
    }

    const getContactDetails = async ()=>{
      await Axios.get(`/api/getcontactdetails?user=${chattouser}`).then((res)=> {
        setContactDetails(res.data)
        window.scrollTo(0,document.body.scrollHeight);
      })
    }

    const sendMessageHandller =  () =>{
       Axios.put("/api/updatechat", {
            from:user,
            to: chattouser,
            message: message,
            timestamp: new Date().toLocaleString(),
          }).then((res)=> {
            console.log(res.data.chatupdate)
            if(res.data.chatupdate) getchatsHandller()
          })
        
    }
    return (
      <div>
        <div className="chatcontainer">
        <div className="chat-mobile__profile">
            <IconButton onClick={()=> history.goBack()}>
              <ArrowBackIosIcon />
            </IconButton>
            <img src={contactDetails.avatar}></img>
            <p>{contactDetails.username}</p>
          </div>
             <div className="chat__container">
               <div id="chatcontainer" className="chatcontainer__chats">
                 {messages.map((message, index)=>{
                     return(
                           <div key={index} className={`chat__container__msg-container ${user == message.from && "current__user"}`}>
                              <p className="chat__container__text">{message.msg}</p>
                              <p className="chat__container__timestamp">{message.timestamp || "11.1"}</p>
                           </div>
                        )})
                    }
                </div>    
              </div>
            <div>
              <div className="chatcontainer__input__container">
               <TextField id="standard-textarea" className="chatContainer__input"  placeholder="Type A Message" value={message} onChange={(e) => setMessage(e.target.value)} multiline rowsMax={5}/>
               <IconButton className="send__icon_cont" onClick={sendMessageHandller}>
                 <SendIcon className="send__icon" />
               </IconButton>
              </div>
            </div>
        </div>
        </div>
    )
}

export default ChatContainer
