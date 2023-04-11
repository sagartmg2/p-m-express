const Product = require("../model/Product")
const path = require("path")
const fs = require("fs")

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
        // let file_name = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(img.name)
        let file_name = img.name;


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
    let product_data = await Product.findById(req.params.id)
    // [1.png,2.png]
    let old_images = product_data.images

    console.log(old_images)
    // return;
    let sent_old_images = req.body.images  // [1.png]

    let images = [] // [3.png]

    old_images.forEach(img => {
        if (sent_old_images?.includes(img)) {
            images.push(img)
        } else {
            // delete 
            fs.unlinkSync(path.resolve("uploads", img))
        }
    })

    /* final images  [1.png, 3.png]  */




    try {
        for (let i = 0; i < req.files?.images?.length; i++) {
            let img = req.files.images[i]
            // let file_name = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(img.name)
            let file_name = img.name;


            try {
                await img.mv(path.join(__dirname, '../', "uploads/") + file_name)
                images.push(file_name)
            } catch (err) {
            }
        }




        /* check if the porudct belongs to the same seller  */
        let product = await Product.findByIdAndUpdate(req.params.id, { ...req.body, images }, {
            runValidators: true,
            new: true,
        })
        res.send(product)
    } catch (err) {
        next(err)
    }
}


const remove = async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if(product){

        // console.log()
        // [ '1.png', '2.png' ]
        product.images.forEach(img =>{
            fs.unlinkSync(path.resolve("uploads",img))
        })
        await Product.findByIdAndDelete(req.params.id)
        return res.status(204).end()
    }

    res.status(404).send("Resource not found")
    


    // if (product) {
    // }else{
    //     res.send("somehting eror.")
    // }
}





module.exports = {
    fetchProduct,
    store,
    update,
    remove
}