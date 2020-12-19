import express from 'express'
import bcrypt from 'bcrypt'
const dotenv = require('dotenv').config()
import fileUpload from 'express-fileupload'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import cloudinary from 'cloudinary'

const router = express.Router()

//models
import NewUser from '../models/UserRegister'
import Books from '../models/UploadBooks'
import Stationary from '../models/OthersUpload'
import DonatedBooks from '../models/DonatedBooks'
import DonatedStationary from '../models/DonatedOtherItems'


//helper (mail)
import nodemailerHandller from '../Helpers/mail'



//configs
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});



// login and register routers ////////////////////////////////////////////////////////////////////////////////////////

router.post('/register' , (req,res)=>{

    const userName = req.body.userName
    const password = req.body.pass
    const email = req.body.email

    console.log(email)
    
    const register = new NewUser({
        username: userName,
        ischat:true,
        email: email,
        avatar:"https://plumepoetry.com/wp-content/uploads/2019/12/default-profile.png"
    })
    bcrypt.genSalt(10 , (err , salt)=>{
            bcrypt.hash(password , salt , (err , hash)=>{
                 register.password = hash
                     register.save((err)=>{
                         if(err){
                            if (err.name === 'MongoError' && err.code === 11000) {
                              return  res.send({isUserExsisted : true})
                            }
                            else{
                                console.log(err)
                                return res.send("unable to register")
                            }
                         }
                         else{
                            const accessToken = generateAccessToken({user: userName})
                            res.send({user: userName , accesstoken:accessToken, istrue:true})
                         }
                      
                     })
                 })
     })
})

router.post('/login' , (req,res)=>{

    const userName = req.body.userName
    const password = req.body.pass
   
    
    NewUser.findOne({username: userName}).then(user =>{
        if(!user) res.send({isNotUser : true})
        if(password == null) res.send("no Passport Found")
        else{
        bcrypt.compare(password , user.password , (err , isMatch)=>{
             
            if(err){
               res.sendStatus(503)
            }
            if(isMatch){
                const accessToken = generateAccessToken({user: user.username})
                res.send({user: user.username , accesstoken:accessToken, istrue:true})
            }
            else{
              res.send({isPasswordWrong : true})
            }

        })
    }
    })
  
})

function generateAccessToken(user) {
    return jwt.sign(user, "grjaejrg@jfg", { expiresIn: '2d' })
}

router.get('/isuserlogged', authenticateToken, (req,res)=>{
    const currentUser = req.user;
    res.json({isSigned :true ,loggedUser : currentUser} )
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if(authHeader === "Bearer null") return res.redirect("/login")
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, "grjaejrg@jfg", (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user.user
      next()
    })
  }


  ////// home page routers////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/homebooks", (req, res)=>{
    Books.find({}, "bookname , bookimagepath").sort({_id: -1}).limit(10).exec((err , docs)=>{
        res.send(docs)
    })
})

router.get("/homestationaries", (req, res)=>{
     Stationary.find({}, "name , imagepath").sort({_id: -1}).limit(10).exec((err , docs)=>{
        res.send(docs)
    })
})

router.get("/bestdonars", (req, res)=>{
    NewUser.find({}, "username , avatar").sort({booksupload : -1}).limit(2).exec((err, docs)=>{
        res.send(docs)
    })
})

router.get("/beststationarydonars", (req, res)=>{
    NewUser.find({}, "username , avatar").sort({stationaryupload : -1}).limit(2).exec((err, docs)=>{
        res.send(docs)
    })
})

router.get("/donatedbooks" , (req, res)=>{
    DonatedBooks.find({} ,(err,docs)=>{
        if(err) console.log(err)
        else res.send(docs)
    })
})


router.get("/donatestationary",(req,res)=>{
    DonatedStationary.find({},(err, docs)=>{
        if(err) console.log(err)
        else res.send(docs)
    })
})


// book page router //////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/books", (req,res)=>{
    Books.find({}, "bookname , bookimagepath").sort({_id :-1}).exec((err, docs)=>{
        res.send(docs)
    })
})

router.get("/book" , (req,res)=>{
    const bookId = req.query.id
    Books.find({_id: bookId}, (err, doc)=>{
        res.send(doc)
    })
})


///stationary page router///////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/stationaries",  (req,res)=>{
    Stationary.find({},"name , imagepath").sort({_id:-1}).exec((err,docs)=>{
        res.send(docs)
    })
})

router.get("/stationary" , (req,res)=>{
    const bookId = req.query.id
    Stationary.find({_id: bookId}, (err, doc)=>{
        res.send(doc)
    })
})



////chatrouters////////////////////////////////////////////////////////////////////////////////////////////////////////////  

router.get("/getchatmembers", (req,res)=>{
    NewUser.find({ischat:true},"username , avatar", (err, docs)=>{
        if(err) console.log(err)
        res.send(docs)
    })
})

router.get("/getcontactdetails", (req,res)=>{
    const contactUser = req.query.user

    NewUser.findOne({username: contactUser}, "username , avatar", (err, doc)=>{
        res.send(doc)
    })
})

router.get("/getchat", (req,res)=>{

    const user = req.query.currentUser
    const contact = req.query.reqContact
   
    if(user == "null"){
        console.log("err")
    }else{   
    NewUser.findOne({username: user},"conversation" , (err, chats)=>{
        if(err) console.log(err)
        else {
        const contactChats = chats.conversation.filter((contacts , index, arr)=>{
             if(contacts.contact === contact){
               return contacts
             }
         })
           res.send(contactChats)
        }   
   

    })}
})

router.put("/updatechat" , (req, res)=>{

    const fromUser = req.body.from
    const toUser = req.body.to
    const message = req.body.message
    const date = req.body.timestamp
    const users = [{query:{username: fromUser, "conversation.contact" : toUser}, contact: toUser}, {query:{username: toUser, "conversation.contact" : fromUser}, contact: fromUser}]

   users.map((user)=>{return(     
  NewUser.updateMany(user.query,{
    $push:{"conversation.$.msg":{
                msg: message,
                from: fromUser,
                to: toUser,
                timestamp: date
                }
           }
    }, (err , result)=>{
        if (err) {
            console.log(err);
          } 
        else if(!result.nModified){
                NewUser.updateOne({username: user.query.username},{
                    $push:{
                        conversation:[{contact: user.contact , msg:[{
                            msg: message,
                            from: fromUser,
                            to: toUser,
                            timestamp: new Date().toLocaleString()
                        }]}]
                    }, 
                },(err)=>{
                    if(err) console.log(err)
                })  
              }
        })
    )})
    res.send({chatupdate : true})
})



///dashboard routers ///////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/uploadbook" , async (req, res)=>{

        const image = req.files.file
        const reqTitle = req.body.title
        const reqDesc = req.body.desc
        const uploadby = req.body.by

      
       
        if(image){
            image.mv(`${__dirname}/public/assets/uploads/${image.name}`, err => {
                 if (err) {
                  console.error(err);
                  return res.status(500).send(err);
                 }
            })
        
         await cloudinary.v2.uploader.upload(`${__dirname}/public/assets/uploads/${image.name}` , (err , result)=>{
            if(err) console.log(err)
            else {
                const newUpload = new Books({
                    bookname: reqTitle,
                    bookdesc : reqDesc,
                    bookimagepath: result.secure_url,
                    uploadby:uploadby,
                    uploadate: new Date().toLocaleDateString(),
                    isasked: false,
                    askedby: "null",
                })
                newUpload.save((err)=>{
                    if(err) res.sendStatus(500)
                    else{
                        NewUser.updateOne({username: uploadby},{
                            $inc:{
                            booksupload: 1
                        }
                    },{new : true},(err)=>{
                        if(err) res.send({isUploaded : false})
                        res.send({isUploaded : true})
                    })}
                })
            }
        });

        fs.unlinkSync(`${__dirname}/public/assets/uploads/${image.name}`)
    }
    else{
        res.send({isNotUpladImage : true})
    }
})

router.patch("/bookasked" , (req,res)=>{
        const id = req.body.id
        const askedby = req.body.askedUserName

        Books.updateOne({_id:id},{
            askedby: askedby,
            isasked : true
        },((err)=>{
            if(err) console.log(err)
            else res.send({isAsked: true})
        }))

        Books.find({_id:id}, "askedby , uploadby" ,(err, data)=>{
            nodemailerHandller(data)
        })
       
})

router.patch("/askstationary" , (req,res)=>{
        const id = req.body.id
        const askedby = req.body.askedUserName

        Stationary.updateOne({_id:id},{
            askedby: askedby,
            isasked : true
        },((err)=>{
            if(err) console.log(err)
            else res.send({isAsked: true})
        }))

        Stationary.find({_id:id}, "askedby , uploadby" ,(err, data)=>{
            nodemailerHandller(data)
        })
})


    
router.post("/uploadotherstationary" , async (req, res)=>{

    const image = req.files.file
    const reqTitle = req.body.title
    const reqDesc = req.body.desc
    const uploadby = req.body.by
   

    if(image){
        image.mv(`${__dirname}/public/assets/uploads/${image.name}`, err => {
             if (err) {
              console.error(err);
              return res.status(500).send(err);
             }
        })
    

    await cloudinary.v2.uploader.upload(`${__dirname}/public/assets/uploads/${image.name}` , (err , result)=>{
        if(err) console.log(err)
        else {        
           const newUpload = new Stationary({
             name: reqTitle,
             desc : reqDesc,
             imagepath: result.secure_url,
             uploadby:uploadby,
             uploadate: new Date().toLocaleDateString(),
             isasked: false,
             askedby: "null",
           })
           newUpload.save((err)=>{
             if(err) console.log(err)
             else{
               NewUser.updateOne({username: uploadby},{
                $inc:{
                 stationaryupload: 1
                }
            },{new : true},(err)=>{
              if(err) res.send({isUploaded : false})
              res.send({isUploaded : true})
           })}
        })
        }
    })
    
      fs.unlinkSync(`${__dirname}/public/assets/uploads/${image.name}`)
  }
  else{
      res.send({isNotUpladImage : true})
  }
})


router.get("/bookannouncements",(req,res)=>{
    const user = req.query.user

    Books.find({uploadby: user, isasked: true},"bookname , uploadate , askedby", (err,doc)=>{
        if(err) console.log(err)
        else res.send(doc)
    })
})

router.get("/stationaryannouncements",(req,res)=>{

    const user = req.query.user

    Stationary.find({uploadby: user, isasked: true},"name , uploadate , askedby", (err,doc)=>{
        if(err) console.log(err)
        else res.send(doc)
    })
})

router.put("/approvebook", (req,res)=>{

    const bookId = req.body.id

    Books.findOne({_id:bookId}, (err,docs)=>{
                const doc = docs.toJSON()
                doc.id = bookId
           DonatedBooks.create(doc,(err)=>{
            if(err) console.log(err)
            else {
                Books.deleteOne({_id:bookId} ,(err)=>{
                    if(err) console.log(err)
                    else res.send({isUpdated: true})
                })
            }
        })
    })  
})

router.patch("/denybook", (req, res)=>{

   const bookId = req.body.id

    Books.updateOne({_id:bookId},{
        isasked:false,
        askedby:"null"
    },(err)=>{
        if(err) console.log(err)
        else res.send({isUpdated: true})
    })
})

router.put("/approvestationary", (req,res)=>{

    const stationaryId = req.body.id

    Stationary.findOne({_id:stationaryId}, (err,docs)=>{
        if(err) console.log(err)
        else {
            const doc = docs.toJSON()
            doc.id = stationaryId
            DonatedStationary.create(doc,(err)=>{
            if(err) console.log(err)
            else{
                Stationary.deleteOne({_id:stationaryId} ,(err)=>{
                    if(err) console.log(err)
                    else res.send({isUpdated: true})
                })
            }
        })
    }
    })
})

router.patch("/denystationary", (req, res)=>{

    const stationaryId = req.body.id
 
     Stationary.updateOne({_id:stationaryId},{
         isasked:false,
         askedby:"null"
     },(err)=>{
         if(err) console.log(err)
         else res.send({isUpdated: true})
     })
})


router.get("/getsettings/:user", (req,res)=>{
    const userName = req.params.user

    NewUser.find({username: userName},"ischat , avatar , email", (err , docs)=>{
        if(err) console.log(err)
        res.send(docs)
    })
})

router.patch("/updatesettings", async (req,res)=>{
    const userName = req.body.user
    const chat = req.body.ischat
    const mail = req.body.email
    if (!req.files || Object.keys(req.files).length === 0) {      
    NewUser.updateOne({username: userName},{
        ischat : chat,
        email : mail,
    },((err)=>{
        if(err) console.log(err)
        else res.send({isupdated: true})
    }))
        return;
    }
    const uploadImage = req.files.file

   if(uploadImage){
      uploadImage.mv(`${__dirname}/public/assets/uploads/${userName}-${uploadImage.name}`, err => {
        if (err) {
         console.error(err);
         return res.status(500).send(err);
        }
    })

     await cloudinary.v2.uploader.upload(`${__dirname}/public/assets/uploads/${userName}-${uploadImage.name}` , (err , result)=>{
       if(err) console.log(err)
       else{
        NewUser.updateOne({username: userName},{
            ischat : chat,
            avatar: result.secure_url,
            email : mail,
        },((err)=>{
            if(err) console.log(err)
            else res.send({isupdated: true})
        }))
    }
   })
   fs.unlinkSync(`${__dirname}/public/assets/uploads/${userName}-${uploadImage.name}`)
}
})

router.get("/booksaskednotifications", (req,res)=>{

    const userName = req.query.user

     Books.find({uploadby: userName , isasked: true}, (err, docs)=>{
         if(err) console.log(err)
         else res.send(docs)
     })
})



export default router
