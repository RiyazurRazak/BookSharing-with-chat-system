import mongoose from 'mongoose'

const donatebooks = mongoose.Schema({
    id:{type: mongoose.Schema.Types.ObjectId},
    _id:{type: mongoose.Schema.Types.ObjectId},
    bookname:{type:String, required:true},
    bookdesc:{type:String, required:true},
    bookimagepath:{type:String , required:true},
    uploadby:{type:String, required:true},
    uploadate:{type:String, required:true},
    isasked:{type:Boolean, required:true},
    askedby:{type:String, required:true},
})

const DonatedBooks = mongoose.model("donatedbooks" , donatebooks)

export default DonatedBooks