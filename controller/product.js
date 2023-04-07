const Product = require("../model/Product")
const path = require("path")

const fetchProduct = async (req, res, next) => {
    let products = await Product.find()
    res.send({ data: products })
}

const store = async (req, res, next) => {


    let images = []

    req.files.images?.forEach(async (img) => {

        /* NOTE: we cannot use asyn await inside  a forEach function */
        // await promise
    })

    for (let i = 0; i < req.files.images?.length; i++) {
        let img = req.files.images[i]
        let file_name = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(img.name)


        try {
            await img.mv(path.join(__dirname, '../', "uploads/") + file_name)
            images.push(file_name)
        } catch (err) {
        }
    }





    try {
        let product = await Product.create({ ...req.body, images, created_by: req.user._id })
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