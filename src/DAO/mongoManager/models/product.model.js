import mongoose from "mongoose";

const productModel = mongoose.model('products',new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    code: {type:String, required:true, unique:true},
    price: {type:Number, required:true},
    status: {type:String, required:true},
    stock: {type:Number, required:true},
    category:  {type:String, required:true},
    thumbnail: String
}))

export default productModel