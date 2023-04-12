const Product = require("../model/Product")
const User = require("../model/User")
const path = require("path")
const fs = require("fs")

const fetchProduct = async (req, res, next) => {



    /* page 1 */
    // let products = await Product.find().skip(0).limit(25)

    /* page 2  */
    // let products = await Product.find().skip(25).limit(25)

    // console.log(req.query)
    // return;

    let per_page = parseInt(req.query.per_page) || 25
    let page = parseInt(req.query.page) || 1
    let search_term = req.query.search_term || ""


    let price_from = parseFloat(req.query.price_from) || 0
    let price_to = parseFloat(req.query.price_to) || 999999999999


    // let products = await Product.find({ name: RegExp(search_term, "i") }).skip((page - 1) * per_page).limit(per_page)

    let sort_by = req.query.sort_by || {}


    switch (sort_by) {
        case "nameasc":
            sort_by = { name: 1 }
            break;
        case "namedesc":
            sort_by = { name: -1 }
            break;
        case "priceasc":
            sort_by = { price: 1 }
            break;
        case "pricedesc":
            sort_by = { price: -1 }
            break;
        default:
            sort_by = {};
            break;
    }


    let total_products = await Product.aggregate([
        {
            $match: {
                $or: [
                    { name: RegExp(search_term, "i") },
                    { brands: RegExp(search_term, "i") },
                    { categories: RegExp(search_term, "i") }
                ],
            }
        },
        {
            $match: {
                $and: [
                    { price: { $gte: price_from } },
                    { price: { $lte: price_to } },
                ]
            }
        },
        {
            $sort: sort_by
        },
        {
            $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "created_by",
                as: "created_by"
            }
        },
        {
            $unwind: "$created_by"
        },
        {
            // db.users.find({},{name:1,_id:0})
            $project: {
                "created_by.password": 0
            }
        }

    ])


    let products = await Product.aggregate([
        {
            $match: {
                $or: [
                    { name: RegExp(search_term, "i") },
                    { brands: RegExp(search_term, "i") },
                    { categories: RegExp(search_term, "i") }
                ],
            }
        },
        {
            $match: {
                $and: [
                    { price: { $gte: price_from } },
                    { price: { $lte: price_to } },
                ]
            }
        },
        {
            $sort: sort_by
        },
        {
            $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "created_by",
                as: "created_by"
            }
        },
        {
            $unwind: "$created_by"
        },
        {
            // db.users.find({},{name:1,_id:0})
            $project: {
                "created_by.password": 0
            }
        },
        {
            $facet: {
                meta_data: [{ $count: "total" }, { $addFields: { per_page, page } }],
                products: [{ $skip: ((page - 1) * per_page) }, { $limit: per_page }]
            }
        },
        // {
        //     $skip: ((page - 1) * per_page)
        // },
        // {
        //     $limit: per_page
        // },

    ])




    /* query operator $or */

    // let products = await Product.find(
    //     {
    //         $or: [
    //             { name: RegExp(search_term, "i") },
    //             { brands: RegExp(search_term, "i") },
    //             { categories: RegExp(search_term, "i") }
    //         ],
    //         $and: [
    //             { price: { $gte: 1000 } }
    //         ]
    //     }
    // ).skip((page - 1) * per_page).limit(per_page)

    /* sql / realtionship -> Join */
    /* mongodb-> aggregation */

    /*
     Aggrgation   (advance find method)  // analogy of water filtrations
     Aggrgation framework 
     Aggrgation pipeline 

     collection of different filters  
     */

    // let products = await Product.aggregate([
    //     // .find({name:"mouse"})
    //     {
    //         $match: {
    //             $or: [
    //                 { name: RegExp(search_term, "i") },
    //                 { brands: RegExp(search_term, "i") },
    //                 { categories: RegExp(search_term, "i") }
    //             ]
    //         }
    //     }, // searched by name
    //     {
    //         $match: {
    //             $and: [
    //                 { price: { $gte: price_from } },
    //                 { price: { $lte: price_to } },
    //             ]
    //         }
    //     },
    // ])

    /* totoal:38,page:1,per_page=25,products :[25datas..] */






    // console.log(products.length)

    // res.send({
    //     meta_data: {
    //         total: total_products.length,
    //         page: page,
    //         per_page
    //     },
    //     products
    // })

    res.send({
        data: products
    })



    // res.send({ data: products })
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

    if (product) {

        // console.log()
        // [ '1.png', '2.png' ]
        product.images.forEach(img => {
            fs.unlinkSync(path.resolve("uploads", img))
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