const Order = require("../model/Order")
const Product = require("../model/Product")


const store = async (req, res, next) => {
    // console.log("store order");



    // req.body.products= [  {id,quantity}]
    /* in DB we need [name , quanity, price, createdy_by,status] */


    let request_products = req.body.products  //   // [  {_id} ]
    // req.body.products.map(product =>{
    //     return {

    //     }
    // })

    let products = []
    for (let index = 0; index < request_products.length; index++) {
        let product = await Product.findById(request_products[index].product_id)
        products.push({
            name: product.name,
            quantity: request_products[index].quantity,
            price: product.price,
            status: "pending",
            product_id: product._id
        })
    }

    let order = await Order.create({
        products,
        created_by: req.user._id
    })

    res.send(order)

}

module.exports = {
    store
}