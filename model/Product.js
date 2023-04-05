
const mongoose = require('mongoose');
const { SELLER, BUYER } = require('../constants/role');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    name: {
        type: String,
        maxlength: 255,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    description: {
        type: String,
    },
    images: {
        type: [String]  // store path of our images
    },
    categories: {
        type: [String]
    },
    brands: {
        type: [String]
    },
    /* 
        {
            name:"product-1",
            price:100,
            created_by:{
                name:"ram",
                email:"r@r.com"
            }
        }
    */
    created_by: {
        type : ObjectId  // just like SQL , the is reference to the id of users table/collection
    }

});


module.exports = mongoose.model("Product", ProductSchema)

