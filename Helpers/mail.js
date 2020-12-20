import mongoose from "mongoose"
import User from '../models/UserRegister'
import nodemailer from 'nodemailer'
const dotenv = require('dotenv').config()



const nodemailerHandller = (askedData, askedby)=>{

    const recieverUserName = askedData[0].uploadby
    const senderUserName = askedby


    User.find({"username": {$in:[recieverUserName, senderUserName]}}, (err , docs)=>{
      if(err) console.log(err)
      else {
        cb(docs[0].email ,docs[1].email , senderUserName , recieverUserName)
      }
    })
  }

  function cb(sender, reciever, senderUserName, recieverUserName){

    let transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_TRIP_USER,
        pass: process.env.MAIL_TRIP_SECRET
      }
    });

  let mailOptions = {
      from: sender,
      to: reciever,
      subject: 'A Book / Stationary is Requested',
      html: `<h1>Hai ${recieverUserName}</h1><p>I'm ${senderUserName} from booksharing. I saw your book in that website. I really want that book / stationary. Can i meet and get that book / stationary.</p><h3>Thanks for your help</h3><p>You can also chat with me in booksharing website. my chat name is ${senderUserName}</p><p>Email was sent in behalf of booksharing website. Happy Sharing</p>`
  }

  transport.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else { 
        console.log('Email sent: ' + info.response);
      }
    });
  }


export default nodemailerHandller