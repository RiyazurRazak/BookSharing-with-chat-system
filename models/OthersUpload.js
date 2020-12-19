import mongoose from 'mongoose'

const others = mongoose.Schema({
    name:{type:String, required:true},
    desc:{type:String, required:true},
    imagepath:{type:String, required:true},
    uploadby:{type:String, required:true},
    uploadate:{type:String, required:true},
    isasked:{type:Boolean, required:true},
    askedby:{type:String, required:true},
})

const otherProductsModel = mongoose.model("otherProduct" , others)

export default otherProductsModel