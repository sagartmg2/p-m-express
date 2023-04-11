
const mongoose = require('mongoose');
const { SELLER, BUYER } = require('../constants/role');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


/*  
        {
            products: [
                {name:watch,quantity:10,price:1000,status:pending},
                {name:mouse,quantity:10,price:1000,status:shipped},
                {name:mouse,quantity:10,price:1000,status:reject},
            ]
            created_by
        }
*/

/* embeded documents vs reference documenets */
const OrderSchema = new Schema({
    products: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                min: 0,
                required: true,

            },
            price: {
                type: Number,
                min: 0,
                required: true,
            },
            status: {
                type: String,
                enum: ["pending", "shipped", "rejected"],
                default: "pending"
            },
            product_id: {
                type: ObjectId,
                ref: "Product",
                required: true
            }
        },


    ],
    created_by: {
        type: ObjectId,
        ref: "User",
        required: true
    }
});


module.exports = mongoose.model("Order", OrderSchema)

