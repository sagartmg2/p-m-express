function createProduct(req, res) {
    // insert in dabase 
    res.send("data inserted")
}

const fetchProducts = (req, res) => {
    // fetch from datbase 
    res.send([{}, {}])
}

const updateProduct = (req, res) => {
    // fetch from datbase 
    res.send([{}, {}])
}

module.exports = createProduct // default export  // only one per module/page

module.exports.fetchProducts = fetchProducts  // named export

// module.exports = {  // named export 
//     fetchProducts: fetchProducts,
//     updateProduct: updateProduct
// }