const Product = require("../model/Product")

const fetchProduct = async (req, res, next) => {
    let products = await Product.find()
    res.send({ data: products })
}

const store = async (req, res, next) => {

    try {
        let product = await Product.create({ ...req.body, created_by: req.user._id })
        res.send(product)
    } catch (err) {
        next(err)
    }
}
const update = async (req, res, next) => {
    // console.log( req.params.id)
    // return;
    try {
        /* check if the porudct belongs to the same seller  */
        let product = await Product.findByIdAndUpdate(req.params.id, { ...req.body })
        res.send(product)
    } catch (err) {
        next(err)
    }
}




module.exports = {
    fetchProduct,
    store,
    update
}