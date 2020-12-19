import mongoose from 'mongoose'

const books = mongoose.Schema({
    bookname:{type:String, required:true},
    bookdesc:{type:String, required:true},
    bookimagepath:{type:String , required:true},
    uploadby:{type:String, required:true},
    uploadate:{type:String, required:true},
    isasked:{type:Boolean, required:true},
    askedby:{type:String, required:true},
})

const BooksModel = mongoose.model("book" , books)

export default BooksModel