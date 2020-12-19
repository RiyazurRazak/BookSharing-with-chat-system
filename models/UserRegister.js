import { Email } from '@material-ui/icons'
import mongoose from 'mongoose'

const newUser = mongoose.Schema({
    username: {type: String, required:true, unique:true}, 
    password: {type: String, required:true},
    avatar:{type:String},
    ischat:{type:Boolean, required:true},
    email:{type:String ,required:true},
    conversation: Array,
    booksupload : Number,
    stationaryupload: Number,
})

const userModel = mongoose.model("user" , newUser)

export default userModel